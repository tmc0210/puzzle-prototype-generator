import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import type { LevelDoc, LevelsDoc, PrototypePackage, WinCondition } from "../core/types.js";

export type EditableLevelSourceKind = "studio" | "package" | "archive";

export type EditableLevelSource = {
  key: string;
  source: EditableLevelSourceKind;
  levelId?: string;
  candidateId?: string;
  title: string;
  level: LevelDoc;
  readonly: boolean;
  queued: boolean;
  sourceFile?: string;
  metadata: Record<string, unknown>;
};

export type PlayableQueueEntry = {
  source: EditableLevelSourceKind;
  level_id?: string;
  candidate_id?: string;
  title?: string;
  added_at?: string;
};

export type PlayableQueueDoc = {
  schema_version: number;
  mechanic: string;
  entries: PlayableQueueEntry[];
};

export type EditableLevelCatalog = {
  mechanic: string;
  sources: EditableLevelSource[];
  queue: PlayableQueueDoc;
  writable: boolean;
};

export type SaveEditorLevelRequest = {
  sourceKey?: string;
  level: LevelDoc;
};

export type SaveEditorLevelResult = {
  savedKey: string;
  level: LevelDoc;
  catalog: EditableLevelCatalog;
};

type ArchiveIndexCandidate = {
  candidate_id?: string;
  file?: string;
  source_candidate_version?: string;
  [key: string]: unknown;
};

type ArchiveIndex = {
  candidates?: ArchiveIndexCandidate[];
  [key: string]: unknown;
};

type ParsedSourceKey =
  | { source: "studio"; levelId: string }
  | { source: "package"; levelId: string }
  | { source: "archive"; candidateId: string };

export async function buildEditableLevelCatalog(
  prototype: PrototypePackage,
): Promise<EditableLevelCatalog> {
  const studioLevels = await readStudioLevels(prototype.root, prototype.mechanic.id);
  const playableQueue = await readPlayableQueue(prototype.root, prototype.mechanic.id);
  const queuedKeys = new Set(playableQueue.entries.map(queueEntryKey).filter((key): key is string => Boolean(key)));

  const sources: EditableLevelSource[] = [];
  for (const level of studioLevels.levels) {
    sources.push({
      key: sourceKey("studio", level.id),
      source: "studio",
      levelId: level.id,
      title: level.title,
      level,
      readonly: false,
      queued: queuedKeys.has(sourceKey("studio", level.id)),
      metadata: {},
    });
  }

  for (const level of prototype.levels.levels) {
    sources.push({
      key: sourceKey("package", level.id),
      source: "package",
      levelId: level.id,
      title: level.title,
      level,
      readonly: true,
      queued: queuedKeys.has(sourceKey("package", level.id)),
      metadata: {},
    });
  }

  for (const archiveSource of await readArchiveSources(prototype)) {
    sources.push({
      ...archiveSource,
      queued: queuedKeys.has(sourceKey("archive", archiveSource.candidateId ?? "")),
    });
  }

  return {
    mechanic: prototype.mechanic.id,
    sources,
    queue: {
      ...playableQueue,
    },
    writable: true,
  };
}

export async function readPlayableLevelsForExport(
  prototype: PrototypePackage,
): Promise<LevelsDoc> {
  const playableQueue = await readPlayableQueue(prototype.root, prototype.mechanic.id);
  const hasExplicitQueue = playableQueue.entries.length > 0;

  if (!hasExplicitQueue) {
    const archivedSourceLevelIds = await readArchivedCanonicalSourceLevelIds(prototype.root);
    return {
      ...prototype.levels,
      levels: prototype.levels.levels.filter((level) => !archivedSourceLevelIds.has(level.id)),
    };
  }

  const catalog = await buildEditableLevelCatalog(prototype);
  const byKey = new Map(catalog.sources.map((source) => [source.key, source] as const));
  const levels: LevelDoc[] = [];
  const seen = new Set<string>();

  for (const entry of playableQueue.entries) {
    const key = queueEntryKey(entry);
    const source = key ? byKey.get(key) : undefined;
    if (!source || seen.has(source.level.id)) {
      continue;
    }
    seen.add(source.level.id);
    levels.push(source.level);
  }

  return {
    mechanic: prototype.mechanic.id,
    levels,
  };
}

export async function readReviewQueueLevels(prototype: PrototypePackage): Promise<LevelDoc[]> {
  return (await readPlayableLevelsForExport(prototype)).levels;
}

export async function saveEditorLevel(
  prototype: PrototypePackage,
  request: SaveEditorLevelRequest,
): Promise<SaveEditorLevelResult> {
  const source = request.sourceKey ? parseSourceKey(request.sourceKey) : undefined;
  const studioDoc = await readStudioLevels(prototype.root, prototype.mechanic.id);
  const existingIndex = source?.source === "studio"
    ? studioDoc.levels.findIndex((level) => level.id === source.levelId)
    : -1;
  const existingLevel = existingIndex >= 0 ? studioDoc.levels[existingIndex] : undefined;
  const packageIds = new Set(prototype.levels.levels.map((level) => level.id));
  const studioIds = new Set(studioDoc.levels.map((level) => level.id));
  if (existingLevel) {
    studioIds.delete(existingLevel.id);
  }

  const level = normalizeStudioLevel({
    incoming: request.level,
    prototype,
    source,
    existingLevel,
    studioIds,
    packageIds,
  });

  if (existingIndex >= 0) {
    studioDoc.levels[existingIndex] = level;
  } else {
    studioDoc.levels.push(level);
  }

  await writeStudioLevels(prototype.root, studioDoc);
  await ensurePlayableQueueEntry(
    prototype.root,
    prototype.mechanic.id,
    {
      source: "studio",
      level_id: level.id,
      title: level.title,
      added_at: new Date().toISOString(),
    },
    existingLevel && existingLevel.id !== level.id ? sourceKey("studio", existingLevel.id) : undefined,
  );

  const savedKey = sourceKey("studio", level.id);
  const catalog = await buildEditableLevelCatalog(prototype);
  return { savedKey, level, catalog };
}

export async function promoteStudioLevel(
  prototype: PrototypePackage,
  levelId: string,
): Promise<{ level: LevelDoc; replaced: boolean }> {
  const studioDoc = await readStudioLevels(prototype.root, prototype.mechanic.id);
  const level = studioDoc.levels.find((candidate) => candidate.id === levelId);
  if (!level) {
    throw new Error(`Unknown studio level '${levelId}'`);
  }

  const packagePath = path.join(prototype.root, "levels.yml");
  assertInsidePath(prototype.root, packagePath, "package levels");
  const raw = await readFile(packagePath, "utf8");
  const packageDoc = YAML.parse(raw) as LevelsDoc | null;
  if (!packageDoc || packageDoc.mechanic !== prototype.mechanic.id || !Array.isArray(packageDoc.levels)) {
    throw new Error("levels.yml is not a valid levels document");
  }

  const index = packageDoc.levels.findIndex((candidate) => candidate.id === level.id);
  const promoted = {
    ...level,
    status: normalizeLevelStatus(level.status),
  };
  if (index >= 0) {
    packageDoc.levels[index] = promoted;
  } else {
    packageDoc.levels.push(promoted);
  }
  await writeFile(packagePath, YAML.stringify(packageDoc, { lineWidth: 0 }), "utf8");
  const memoryIndex = prototype.levels.levels.findIndex((candidate) => candidate.id === promoted.id);
  if (memoryIndex >= 0) {
    prototype.levels.levels[memoryIndex] = promoted;
  } else {
    prototype.levels.levels.push(promoted);
  }
  return { level: promoted, replaced: index >= 0 };
}

export async function readStudioLevels(root: string, mechanicId: string): Promise<LevelsDoc> {
  const levelsPath = studioLevelsPath(root);
  const raw = await readOptional(levelsPath);
  if (!raw) {
    return { mechanic: mechanicId, levels: [] };
  }
  const parsed = YAML.parse(raw) as LevelsDoc | null;
  return {
    mechanic: parsed?.mechanic ?? mechanicId,
    levels: Array.isArray(parsed?.levels) ? parsed.levels : [],
  };
}

export async function readPlayableQueue(root: string, mechanicId: string): Promise<PlayableQueueDoc> {
  const queuePath = playableQueuePath(root);
  const raw = await readOptional(queuePath);
  if (!raw) {
    return { schema_version: 1, mechanic: mechanicId, entries: [] };
  }
  const parsed = YAML.parse(raw) as Partial<PlayableQueueDoc> | null;
  const entries = Array.isArray(parsed?.entries)
    ? parsed.entries.filter(isPlayableQueueEntry)
    : [];
  return {
    schema_version: parsed?.schema_version ?? 1,
    mechanic: parsed?.mechanic ?? mechanicId,
    entries,
  };
}

export async function readArchivedCanonicalSourceLevelIds(root: string): Promise<Set<string>> {
  const index = await readArchiveIndex(root);
  const ids = new Set<string>();
  for (const candidate of index.candidates ?? []) {
    const source = stringValue(candidate.source_candidate_version);
    if (source && isCanonicalArchiveCandidate(candidate)) {
      ids.add(source);
    }
  }
  return ids;
}

function normalizeStudioLevel(context: {
  incoming: LevelDoc;
  prototype: PrototypePackage;
  source?: ParsedSourceKey;
  existingLevel?: LevelDoc;
  studioIds: Set<string>;
  packageIds: Set<string>;
}): LevelDoc {
  const { incoming, prototype, source, existingLevel, studioIds, packageIds } = context;
  const requestedId = sanitizeId(incoming.id) ?? existingLevel?.id;
  const baseId = requestedId ?? `STUDIO_${dateStamp()}_DRAFT`;
  const needsDerivedId = source?.source !== "studio" || packageIds.has(baseId) || studioIds.has(baseId);
  const preferredId = needsDerivedId ? `STUDIO_${baseId.replace(/^STUDIO_/, "")}` : baseId;
  const id = uniqueId(preferredId, new Set([...studioIds, ...packageIds]));
  const target = defaultTarget(prototype);
  const now = new Date().toISOString();
  const lineagePatch = lineageFromSource(source);
  const lineageSource =
    lineagePatch.source ??
    incoming.lineage?.source ??
    existingLevel?.lineage?.source ??
    source?.source ??
    "new";
  const normalized: LevelDoc = {
    ...incoming,
    id,
    title: incoming.title.trim() || id,
    role: incoming.role ?? "review",
    status: normalizeLevelStatus(incoming.status),
    targets: nonEmptyStringArray(incoming.targets, target),
    known_before: stringArray(incoming.known_before),
    target_learning: nonEmptyStringArray(incoming.target_learning, target),
    support_level: incoming.support_level ?? "none",
    expected_solver_evidence: nonEmptyStringArray(incoming.expected_solver_evidence, "solvable") as LevelDoc["expected_solver_evidence"],
    expected_llm_player_evidence: stringArray(incoming.expected_llm_player_evidence) as LevelDoc["expected_llm_player_evidence"],
    layout: incoming.layout.replace(/\r/g, "").trimEnd(),
    lineage: {
      ...(incoming.lineage ?? existingLevel?.lineage ?? {}),
      ...lineagePatch,
      source: lineageSource,
      created_by: incoming.lineage?.created_by ?? existingLevel?.lineage?.created_by ?? "web_editor",
      created_at: incoming.lineage?.created_at ?? existingLevel?.lineage?.created_at ?? now,
    },
  };
  return normalized;
}

function lineageFromSource(source: ParsedSourceKey | undefined): Partial<NonNullable<LevelDoc["lineage"]>> {
  if (!source) {
    return { source: "new" };
  }
  if (source.source === "package") {
    return { source: "package", source_level_id: source.levelId };
  }
  if (source.source === "archive") {
    return { source: "archive_candidate", source_candidate_id: source.candidateId };
  }
  return {};
}

async function writeStudioLevels(root: string, doc: LevelsDoc): Promise<void> {
  const levelsPath = studioLevelsPath(root);
  assertInsidePath(root, levelsPath, "studio levels");
  await mkdir(path.dirname(levelsPath), { recursive: true });
  await writeFile(levelsPath, YAML.stringify(doc, { lineWidth: 0 }), "utf8");
}

async function ensurePlayableQueueEntry(
  root: string,
  mechanicId: string,
  entry: PlayableQueueEntry,
  replaceKey?: string,
): Promise<void> {
  const queue = await readPlayableQueue(root, mechanicId);
  const key = queueEntryKey(entry);
  if (!key) {
    return;
  }
  if (replaceKey && replaceKey !== key) {
    queue.entries = queue.entries.filter((candidate) => queueEntryKey(candidate) !== replaceKey);
  }
  const existing = queue.entries.findIndex((candidate) => queueEntryKey(candidate) === key);
  if (existing >= 0) {
    queue.entries[existing] = {
      ...queue.entries[existing],
      ...entry,
    };
  } else {
    queue.entries.push(entry);
  }

  const queuePath = playableQueuePath(root);
  assertInsidePath(root, queuePath, "playable queue");
  await mkdir(path.dirname(queuePath), { recursive: true });
  await writeFile(queuePath, YAML.stringify(queue, { lineWidth: 0 }), "utf8");
}

async function readArchiveSources(prototype: PrototypePackage): Promise<EditableLevelSource[]> {
  const index = await readArchiveIndex(prototype.root);
  const archiveRoot = path.join(prototype.root, "design_archive");
  const sources: EditableLevelSource[] = [];

  for (const entry of index.candidates ?? []) {
    const candidateId = stringValue(entry.candidate_id);
    if (!candidateId || !entry.file) {
      continue;
    }
    const filePath = path.join(archiveRoot, entry.file);
    assertInsidePath(archiveRoot, filePath, "archive candidate");
    const raw = await readOptional(filePath);
    if (!raw) {
      continue;
    }
    const metadata = {
      ...parseFirstYamlFence(raw),
      ...entry,
    };
    const layout = parseLayoutText(raw);
    if (!layout) {
      continue;
    }
    const solveInstance = parseLayoutYaml(raw);
    const level = archiveLevelFromRecord(prototype, {
      candidateId,
      sourceFile: entry.file,
      metadata,
      layout,
      solveInstance,
    });
    sources.push({
      key: sourceKey("archive", candidateId),
      source: "archive",
      candidateId,
      levelId: level.id,
      title: level.title,
      level,
      readonly: true,
      queued: false,
      sourceFile: entry.file,
      metadata,
    });
  }

  return sources;
}

function archiveLevelFromRecord(
  prototype: PrototypePackage,
  record: {
    candidateId: string;
    sourceFile: string;
    metadata: Record<string, unknown>;
    layout: string;
    solveInstance: Record<string, unknown>;
  },
): LevelDoc {
  const sourceLevelId =
    stringValue(record.metadata.source_candidate_version) ??
    stringValue(record.metadata.level_id) ??
    record.candidateId;
  const target = defaultTarget(prototype);
  return {
    id: sanitizeId(sourceLevelId) ?? sanitizeId(record.candidateId) ?? `ARCHIVE_${dateStamp()}`,
    title: stringValue(record.metadata.title) ?? record.candidateId,
    role: "review",
    status: normalizeLevelStatus(stringValue(record.metadata.status)),
    targets: [target],
    known_before: [],
    target_learning: [target],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: record.layout,
    ...(winFromSolveInstance(record.solveInstance) ? { win: winFromSolveInstance(record.solveInstance) } : {}),
    lineage: {
      source: "archive_candidate",
      source_candidate_id: record.candidateId,
      source_file: record.sourceFile,
    },
  };
}

function winFromSolveInstance(raw: Record<string, unknown>): WinCondition | undefined {
  const instance = objectValue(raw.base_instance) ?? raw;
  const winType =
    stringValue(instance.win_condition) ??
    stringValue(objectValue(instance.win)?.type);
  if (!winType) {
    return undefined;
  }
  const win: WinCondition = { type: winType };
  const start = pointTuple(instance.player_start);
  const goal = pointTuple(instance.player_goal);
  if (start) {
    win.player_start = start;
  }
  if (goal) {
    win.player_goal = goal;
  }
  return win;
}

async function readArchiveIndex(root: string): Promise<ArchiveIndex> {
  const indexPath = path.join(root, "design_archive", "index.yml");
  const raw = await readOptional(indexPath);
  if (!raw) {
    return { candidates: [] };
  }
  return YAML.parse(raw) as ArchiveIndex ?? { candidates: [] };
}

function queueEntryKey(entry: PlayableQueueEntry): string | undefined {
  if (entry.source === "archive" && entry.candidate_id) {
    return sourceKey("archive", entry.candidate_id);
  }
  if ((entry.source === "package" || entry.source === "studio") && entry.level_id) {
    return sourceKey(entry.source, entry.level_id);
  }
  return undefined;
}

function sourceKey(source: EditableLevelSourceKind, id: string): string {
  return `${source}:${id}`;
}

function parseSourceKey(key: string): ParsedSourceKey {
  const [source, ...rest] = key.split(":");
  const id = rest.join(":");
  if (source === "studio" && id) {
    return { source, levelId: id };
  }
  if (source === "package" && id) {
    return { source, levelId: id };
  }
  if (source === "archive" && id) {
    return { source, candidateId: id };
  }
  throw new Error(`Invalid editor source key '${key}'`);
}

function parseFirstYamlFence(raw: string): Record<string, unknown> {
  const match = raw.match(/```yaml[ \t]*\r?\n([\s\S]*?)\r?\n```/);
  return match ? (YAML.parse(match[1] ?? "") as Record<string, unknown>) : {};
}

function parseLayoutYaml(raw: string): Record<string, unknown> {
  const section = sectionText(raw, "Layout") ?? "";
  const match = section.match(/```yaml[ \t]*\r?\n([\s\S]*?)\r?\n```/);
  return match ? (YAML.parse(match[1] ?? "") as Record<string, unknown>) : {};
}

function parseLayoutText(raw: string): string | undefined {
  const section = sectionText(raw, "Layout") ?? "";
  const matches = [...section.matchAll(/```text[ \t]*\r?\n([\s\S]*?)\r?\n```/g)];
  const body = matches.at(-1)?.[1];
  return body?.replace(/\r/g, "").trimEnd();
}

function sectionText(raw: string, heading: string): string | undefined {
  const pattern = new RegExp(`## ${escapeRegex(heading)}[^\\n]*\\n([\\s\\S]*?)(?=\\n## |$)`);
  return raw.match(pattern)?.[1];
}

function isPlayableQueueEntry(value: unknown): value is PlayableQueueEntry {
  if (!value || typeof value !== "object") {
    return false;
  }
  const entry = value as Partial<PlayableQueueEntry>;
  return entry.source === "studio" || entry.source === "package" || entry.source === "archive";
}

function isCanonicalArchiveCandidate(candidate: Record<string, unknown>): boolean {
  return stringValue(candidate.archive_eligibility) === "clean_archive" ||
    stringValue(candidate.human_final_status) === "accepted" ||
    stringValue(candidate.status) === "accepted";
}

function defaultTarget(prototype: PrototypePackage): string {
  return prototype.knowledge.knowledge[0]?.id ?? "solvable";
}

function normalizeLevelStatus(status: string | undefined): "draft" | "candidate" | "accepted" | "rejected" {
  if (status === "accepted" || status === "rejected" || status === "candidate" || status === "draft") {
    return status;
  }
  if (status?.includes("reject")) {
    return "rejected";
  }
  if (status?.includes("accept")) {
    return "accepted";
  }
  return "draft";
}

function sanitizeId(value: string | undefined): string | undefined {
  const normalized = value
    ?.trim()
    .replace(/[^A-Za-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
  if (!normalized) {
    return undefined;
  }
  return /^[A-Za-z]/.test(normalized) ? normalized : `L_${normalized}`;
}

function uniqueId(preferred: string, blocked: Set<string>): string {
  const base = sanitizeId(preferred) ?? `STUDIO_${dateStamp()}_DRAFT`;
  if (!blocked.has(base)) {
    return base;
  }
  for (let index = 2; index < 10_000; index += 1) {
    const candidate = `${base}_${index}`;
    if (!blocked.has(candidate)) {
      return candidate;
    }
  }
  throw new Error(`Unable to allocate unique level id for '${preferred}'`);
}

function nonEmptyStringArray<T extends string>(value: T[] | undefined, fallback: T): T[] {
  const array = stringArray(value) as T[];
  return array.length > 0 ? array : [fallback];
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function objectValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function pointTuple(value: unknown): [number, number] | undefined {
  if (!Array.isArray(value) || value.length !== 2) {
    return undefined;
  }
  const [x, y] = value;
  return typeof x === "number" && typeof y === "number" ? [x, y] : undefined;
}

function studioLevelsPath(root: string): string {
  return path.join(root, "studio", "levels.yml");
}

function playableQueuePath(root: string): string {
  return path.join(root, "playable_queue.yml");
}

function dateStamp(): string {
  return new Date().toISOString().slice(0, 10).replace(/-/g, "");
}

function assertInsidePath(root: string, target: string, label: string): void {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${root}: ${target}`);
  }
}

async function readOptional(filePath: string): Promise<string | undefined> {
  try {
    await access(filePath);
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
