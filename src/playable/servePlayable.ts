import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createReadStream } from "node:fs";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadPrototypePackage } from "../core/io.js";
import type { LevelDoc, PrototypePackage } from "../core/types.js";
import { diagnoseEditorLevel } from "./editorDiagnostics.js";
import {
  buildEditableLevelCatalog,
  promoteStudioLevel,
  readReviewQueueLevels,
  saveEditorLevel,
} from "./levelCatalog.js";

type ArchiveIndexCandidate = {
  candidate_id?: string;
  file?: string;
  source_candidate_version?: string;
  human_comment_ids?: string[];
  [key: string]: unknown;
};

type ArchiveIndex = {
  tag_vocabulary?: {
    aesthetic_score?: Record<string, string>;
    difficulty_score?: Record<string, string>;
    [key: string]: unknown;
  };
  candidates?: ArchiveIndexCandidate[];
  [key: string]: unknown;
};

type HumanComment = {
  id: string;
  author?: string;
  status?: string;
  aesthetic_score?: number | null;
  difficulty_score?: number | null;
  attached_to?: string[];
  text: string;
  created_at?: string;
};

type CandidateRecord = {
  metadata: Record<string, unknown>;
  humanComments: HumanComment[];
  humanVerdict: Record<string, unknown>;
  humanCalibration: Record<string, unknown>;
  evidenceRefs: string[];
  raw: string;
};

type ReviewPayload = {
  humanFinalStatus?: string;
  archiveEligibility?: string;
  playtestStatus?: string;
  aestheticScore?: number | null;
  difficultyScore?: number | null;
  allowedExposureThrough?: string | null;
  comment?: string;
};

type PlaytestReviewDoc = {
  schema_version: number;
  mechanic: string;
  reviews: PlaytestReviewEntry[];
};

type PlaytestReviewEntry = {
  level_id: string;
  status: string;
  aesthetic_score: number | null;
  aesthetic_label: string | null;
  difficulty_score: number | null;
  difficulty_label: string | null;
  allowed_exposure_through: string | null;
  updated_at: string;
  comments: HumanComment[];
};

const aestheticLabels: Record<number, string> = {
  1: "反例样本",
  2: "功能库存",
  3: "可用下界",
  4: "亮点候选",
  5: "标杆范例",
};

const difficultyLabels: Record<number, string> = {
  1: "教学见证",
  2: "简单练习",
  3: "常规流程",
  4: "阶段挑战",
  5: "高难终局",
};

const packagePath = process.argv[2] ?? "prototypes/pull_portal_fallback";
const optionArgs = process.argv.slice(3);
const port = Number(getOption(optionArgs, "--port") ?? process.env.PORT ?? 4173);
const pkg = await loadPrototypePackage(packagePath);
const playableRoot = path.join(pkg.root, "playable");
await assertExists(path.join(playableRoot, "index.html"));

const server = createServer((request, response) => {
  void handleRequest(request, response).catch((error: unknown) => {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : String(error),
    });
  });
});

server.listen(port, () => {
  console.log(`Playable review server: http://localhost:${port}`);
  console.log(`Prototype: ${pkg.root}`);
});

async function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  if (url.pathname === "/api/review-data" && request.method === "GET") {
    sendJson(response, 200, await buildReviewData(pkg));
    return;
  }
  if (url.pathname === "/api/editor-data" && request.method === "GET") {
    sendJson(response, 200, await buildEditableLevelCatalog(pkg));
    return;
  }
  if (url.pathname === "/api/editor/diagnose" && request.method === "POST") {
    const body = await readJsonBody<{
      level?: LevelDoc;
      solverMaxStates?: number;
      solverMaxDepth?: number;
      graphMaxStates?: number;
      graphMaxTransitions?: number;
    }>(request);
    if (!body.level) {
      sendJson(response, 400, { error: "level is required" });
      return;
    }
    sendJson(response, 200, diagnoseEditorLevel(pkg, body as { level: LevelDoc }));
    return;
  }
  if (url.pathname === "/api/editor/save-level" && request.method === "POST") {
    const body = await readJsonBody<{ sourceKey?: string; level?: LevelDoc }>(request);
    if (!body.level) {
      sendJson(response, 400, { error: "level is required" });
      return;
    }
    sendJson(response, 200, await saveEditorLevel(pkg, { sourceKey: body.sourceKey, level: body.level }));
    return;
  }
  if (url.pathname === "/api/editor/promote-level" && request.method === "POST") {
    const body = await readJsonBody<{ levelId?: string }>(request);
    if (!body.levelId) {
      sendJson(response, 400, { error: "levelId is required" });
      return;
    }
    const result = await promoteStudioLevel(pkg, body.levelId);
    sendJson(response, 200, {
      ...result,
      catalog: await buildEditableLevelCatalog(pkg),
    });
    return;
  }
  if (url.pathname === "/api/archive-review" && request.method === "POST") {
    const body = await readJsonBody<{ candidateId?: string; review?: ReviewPayload }>(request);
    if (!body.candidateId || !body.review) {
      sendJson(response, 400, { error: "candidateId and review are required" });
      return;
    }
    await saveArchiveReview(pkg, body.candidateId, body.review);
    sendJson(response, 200, await buildReviewData(pkg));
    return;
  }
  if (url.pathname === "/api/playtest-review" && request.method === "POST") {
    const body = await readJsonBody<{ levelId?: string; review?: ReviewPayload }>(request);
    if (!body.levelId || !body.review) {
      sendJson(response, 400, { error: "levelId and review are required" });
      return;
    }
    await savePlaytestReview(pkg, body.levelId, body.review);
    sendJson(response, 200, await buildReviewData(pkg));
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "Unknown API endpoint" });
    return;
  }
  await serveStatic(response, url.pathname);
}

async function buildReviewData(prototype: PrototypePackage): Promise<Record<string, unknown>> {
  const index = await readArchiveIndex(prototype.root);
  const playtestReviews = await readPlaytestReviews(prototype.root, prototype.mechanic.id);
  const levelById = new Map(prototype.levels.levels.map((level) => [level.id, level] as const));
  const archiveRoot = path.join(prototype.root, "design_archive");

  const archiveEntries = await Promise.all(
    (index.candidates ?? []).map(async (entry) => {
      const recordPath = entry.file ? path.join(archiveRoot, entry.file) : undefined;
      const record = recordPath && (await fileExists(recordPath))
        ? parseCandidateRecord(await readFile(recordPath, "utf8"))
        : undefined;
      const sourceLevelId =
        stringValue(entry.source_candidate_version) ??
        stringValue(record?.metadata.source_candidate_version) ??
        stringValue(entry.candidate_id);
      const level = sourceLevelId ? levelById.get(sourceLevelId) : undefined;
      return {
        kind: "archive",
        candidateId: entry.candidate_id,
        levelId: sourceLevelId,
        playable: Boolean(level),
        level,
        metadata: {
          ...(record?.metadata ?? {}),
          ...entry,
        },
        humanComments: record?.humanComments ?? [],
        humanCalibration: record?.humanCalibration ?? {},
        evidenceRefs: record?.evidenceRefs ?? [],
      };
    }),
  );

  const archivedSourceLevelIds = archivedCanonicalSourceLevelIds(archiveEntries);
  const temporaryEntries = (await readReviewQueueLevels(prototype))
    .filter((level) => !archivedSourceLevelIds.has(level.id))
    .map((level) => ({
      kind: "temporary",
      levelId: level.id,
      level,
      review: playtestReviews.reviews.find((review) => review.level_id === level.id),
    }));

  return {
    writable: true,
    mechanic: prototype.mechanic.id,
    archiveEntries,
    temporaryEntries,
    playtestReviews,
    labels: {
      aesthetic: index.tag_vocabulary?.aesthetic_score ?? aestheticLabels,
      difficulty: index.tag_vocabulary?.difficulty_score ?? difficultyLabels,
    },
  };
}

function archivedCanonicalSourceLevelIds(
  archiveEntries: Array<{ levelId?: string; metadata: Record<string, unknown> }>,
): Set<string> {
  const ids = new Set<string>();
  for (const entry of archiveEntries) {
    if (!entry.levelId || !isCanonicalArchiveEntry(entry.metadata)) {
      continue;
    }
    ids.add(entry.levelId);
  }
  return ids;
}

function isCanonicalArchiveEntry(metadata: Record<string, unknown>): boolean {
  return stringValue(metadata.archive_eligibility) === "clean_archive" ||
    stringValue(metadata.human_final_status) === "accepted" ||
    stringValue(metadata.status) === "accepted";
}

async function saveArchiveReview(
  prototype: PrototypePackage,
  candidateId: string,
  review: ReviewPayload,
): Promise<void> {
  const archiveRoot = path.join(prototype.root, "design_archive");
  const indexPath = path.join(archiveRoot, "index.yml");
  assertInsidePath(prototype.root, indexPath, "archive index");
  const index = await readArchiveIndex(prototype.root);
  const entry = (index.candidates ?? []).find((candidate) => candidate.candidate_id === candidateId);
  if (!entry?.file) {
    throw new Error(`Archive candidate '${candidateId}' does not have a candidate file`);
  }

  const recordPath = path.join(archiveRoot, entry.file);
  assertInsidePath(archiveRoot, recordPath, "candidate record");
  const record = parseCandidateRecord(await readFile(recordPath, "utf8"));
  const timestamp = new Date().toISOString();
  const commentText = (review.comment ?? "").trim();
  const nextCommentId = commentText ? nextHumanCommentId(candidateId, record.humanComments) : undefined;
  const existingCommentIds = stringArray(record.metadata.human_comment_ids);
  const humanCommentIds = nextCommentId ? [...existingCommentIds, nextCommentId] : existingCommentIds;
  const humanReviewed = true;

  const metadata = {
    ...record.metadata,
    status: statusFromHumanFinalStatus(review.humanFinalStatus) ?? record.metadata.status,
    human_final_status: review.humanFinalStatus ?? record.metadata.human_final_status ?? "pending",
    archive_eligibility: review.archiveEligibility ?? record.metadata.archive_eligibility,
    human_reviewed: humanReviewed,
    aesthetic_score: normalizeScore(review.aestheticScore),
    aesthetic_label: labelForScore(review.aestheticScore, aestheticLabels),
    difficulty_score: normalizeScore(review.difficultyScore),
    difficulty_label: labelForScore(review.difficultyScore, difficultyLabels),
    allowed_exposure_through:
      normalizeNullableString(review.allowedExposureThrough) ??
      record.metadata.allowed_exposure_through ??
      null,
    review_integrity: "human_review",
    human_comment_ids: humanCommentIds,
  };

  const humanComments = [...record.humanComments];
  if (nextCommentId) {
    humanComments.push({
      id: nextCommentId,
      author: "human_designer",
      status: review.humanFinalStatus ?? "commented",
      aesthetic_score: normalizeScore(review.aestheticScore),
      difficulty_score: normalizeScore(review.difficultyScore),
      attached_to: ["candidate", "playable_playtest"],
      text: commentText,
      created_at: timestamp,
    });
  }

  const humanVerdict = {
    ...record.humanVerdict,
    status: review.humanFinalStatus ?? record.humanVerdict.status ?? "pending",
    human_comments: humanComments,
  };
  const humanCalibration = {
    ...record.humanCalibration,
    human_reviewed: true,
    aesthetic_score: normalizeScore(review.aestheticScore),
    aesthetic_label: labelForScore(review.aestheticScore, aestheticLabels),
    difficulty_score: normalizeScore(review.difficultyScore),
    difficulty_label: labelForScore(review.difficultyScore, difficultyLabels),
    allowed_exposure_through:
      normalizeNullableString(review.allowedExposureThrough) ??
      record.humanCalibration.allowed_exposure_through ??
      null,
    score_source: humanCommentIds,
  };

  const updatedRecord = replaceYamlFence(
    replaceSectionYamlFence(
      replaceSectionYamlFence(record.raw, "Human Verdict", humanVerdict),
      "Human Calibration",
      { human_calibration: humanCalibration },
    ),
    metadata,
  );
  await writeFile(recordPath, updatedRecord, "utf8");

  Object.assign(entry, {
    status: metadata.status,
    human_final_status: metadata.human_final_status,
    archive_eligibility: metadata.archive_eligibility,
    human_reviewed: true,
    aesthetic_score: metadata.aesthetic_score,
    aesthetic_label: metadata.aesthetic_label,
    difficulty_score: metadata.difficulty_score,
    difficulty_label: metadata.difficulty_label,
    allowed_exposure_through: metadata.allowed_exposure_through,
    review_integrity: "human_review",
    human_comment_ids: humanCommentIds,
  });
  await writeFile(indexPath, YAML.stringify(index, { lineWidth: 0 }), "utf8");
}

async function savePlaytestReview(
  prototype: PrototypePackage,
  levelId: string,
  review: ReviewPayload,
): Promise<void> {
  const levelIds = new Set([
    ...prototype.levels.levels.map((level) => level.id),
    ...(await readReviewQueueLevels(prototype)).map((level) => level.id),
  ]);
  if (!levelIds.has(levelId)) {
    throw new Error(`Unknown level id '${levelId}'`);
  }

  const reviewDoc = await readPlaytestReviews(prototype.root, prototype.mechanic.id);
  const existing = reviewDoc.reviews.find((entry) => entry.level_id === levelId);
  const entry = existing ?? {
    level_id: levelId,
    status: "defer",
    aesthetic_score: null,
    aesthetic_label: null,
    difficulty_score: null,
    difficulty_label: null,
    allowed_exposure_through: null,
    updated_at: new Date().toISOString(),
    comments: [],
  };
  if (!existing) {
    reviewDoc.reviews.push(entry);
  }

  entry.status = review.playtestStatus ?? entry.status;
  entry.aesthetic_score = normalizeScore(review.aestheticScore);
  entry.aesthetic_label = labelForScore(review.aestheticScore, aestheticLabels);
  entry.difficulty_score = normalizeScore(review.difficultyScore);
  entry.difficulty_label = labelForScore(review.difficultyScore, difficultyLabels);
  if (Object.hasOwn(review, "allowedExposureThrough")) {
    entry.allowed_exposure_through = normalizeNullableString(review.allowedExposureThrough);
  }
  entry.updated_at = new Date().toISOString();

  const commentText = (review.comment ?? "").trim();
  if (commentText) {
    entry.comments.push({
      id: nextPlaytestCommentId(levelId, entry.comments),
      author: "human_designer",
      status: entry.status,
      aesthetic_score: entry.aesthetic_score,
      difficulty_score: entry.difficulty_score,
      attached_to: ["temporary_playtest", "candidate"],
      text: commentText,
      created_at: entry.updated_at,
    });
  }

  const outPath = path.join(prototype.root, "playtest_reviews.yml");
  assertInsidePath(prototype.root, outPath, "playtest reviews");
  await writeFile(outPath, YAML.stringify(reviewDoc, { lineWidth: 0 }), "utf8");
}

async function readArchiveIndex(root: string): Promise<ArchiveIndex> {
  const indexPath = path.join(root, "design_archive", "index.yml");
  if (!(await fileExists(indexPath))) {
    return { candidates: [] };
  }
  const index = YAML.parse(await readFile(indexPath, "utf8")) as ArchiveIndex | null;
  return index ?? { candidates: [] };
}

async function readTemporaryQueue(root: string, levels: LevelDoc[]): Promise<LevelDoc[]> {
  const byId = new Map(levels.map((level) => [level.id, level] as const));
  const queuePath = path.join(root, "playtest_queue.yml");
  const playablePath = path.join(root, "playable_levels.yml");
  const raw = await readOptional(queuePath) ?? await readOptional(playablePath);
  if (!raw) {
    return levels;
  }

  const parsed = YAML.parse(raw) as { levels?: Array<string | { id?: string; level_id?: string }> } | null;
  const ids = (parsed?.levels ?? [])
    .map((entry) => (typeof entry === "string" ? entry : entry.level_id ?? entry.id))
    .filter((id): id is string => Boolean(id));
  return ids.map((id) => byId.get(id)).filter((level): level is LevelDoc => Boolean(level));
}

async function readPlaytestReviews(root: string, mechanicId: string): Promise<PlaytestReviewDoc> {
  const reviewPath = path.join(root, "playtest_reviews.yml");
  const raw = await readOptional(reviewPath);
  if (!raw) {
    return { schema_version: 1, mechanic: mechanicId, reviews: [] };
  }
  const parsed = YAML.parse(raw) as PlaytestReviewDoc | null;
  return {
    schema_version: parsed?.schema_version ?? 1,
    mechanic: parsed?.mechanic ?? mechanicId,
    reviews: Array.isArray(parsed?.reviews) ? parsed.reviews : [],
  };
}

function parseCandidateRecord(raw: string): CandidateRecord {
  const metadata = parseFirstYamlFence(raw);
  const humanVerdict = parseSectionYaml(raw, "Human Verdict");
  const calibrationWrapper = parseSectionYaml(raw, "Human Calibration");
  const humanCalibration = (
    typeof calibrationWrapper.human_calibration === "object" &&
    calibrationWrapper.human_calibration !== null
      ? calibrationWrapper.human_calibration
      : calibrationWrapper
  ) as Record<string, unknown>;
  const evidenceRefs = parseEvidenceRefs(raw);
  const humanComments = Array.isArray(humanVerdict.human_comments)
    ? (humanVerdict.human_comments as HumanComment[])
    : [];
  return { metadata, humanComments, humanVerdict, humanCalibration, evidenceRefs, raw };
}

function parseFirstYamlFence(raw: string): Record<string, unknown> {
  const match = raw.match(/```yaml[ \t]*\r?\n([\s\S]*?)\r?\n```/);
  return match ? (YAML.parse(match[1] ?? "") as Record<string, unknown>) : {};
}

function parseSectionYaml(raw: string, heading: string): Record<string, unknown> {
  const section = sectionText(raw, heading);
  const match = section?.match(/```yaml[ \t]*\r?\n([\s\S]*?)\r?\n```/);
  return match ? (YAML.parse(match[1] ?? "") as Record<string, unknown>) : {};
}

function parseEvidenceRefs(raw: string): string[] {
  const section = sectionText(raw, "Evidence Refs");
  if (!section) {
    return [];
  }
  const match = section.match(/```text[ \t]*\r?\n([\s\S]*?)\r?\n```/);
  const body = match?.[1] ?? section;
  return body
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter((line) => line.length > 0 && !line.startsWith("```"));
}

function sectionText(raw: string, heading: string): string | undefined {
  const pattern = new RegExp(`## ${escapeRegex(heading)}[^\\n]*\\n([\\s\\S]*?)(?=\\n## |$)`);
  return raw.match(pattern)?.[1];
}

function replaceYamlFence(raw: string, value: unknown): string {
  return raw.replace(
    /```yaml\s*\n([\s\S]*?)\n```/,
    () => `\`\`\`yaml\n${YAML.stringify(value, { lineWidth: 0 }).trimEnd()}\n\`\`\``,
  );
}

function replaceSectionYamlFence(raw: string, heading: string, value: unknown): string {
  const pattern = new RegExp(`(## ${escapeRegex(heading)}[^\\n]*\\n[\\s\\S]*?)(\`\`\`yaml\\s*\\n)([\\s\\S]*?)(\\n\`\`\`)`);
  if (!pattern.test(raw)) {
    return raw;
  }
  return raw.replace(
    pattern,
    (_match, prefix: string, fenceStart: string, _previousYaml: string, fenceEnd: string) =>
      `${prefix}${fenceStart}${YAML.stringify(value, { lineWidth: 0 }).trimEnd()}${fenceEnd}`,
  );
}

async function serveStatic(response: ServerResponse, pathname: string): Promise<void> {
  const relative = pathname === "/"
    ? "index.html"
    : pathname === "/editor"
      ? "editor.html"
      : decodeURIComponent(pathname.slice(1));
  const target = path.resolve(playableRoot, relative);
  assertInsidePath(playableRoot, target, "static file");
  if (!(await fileExists(target))) {
    sendText(response, 404, "Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": mimeType(target) });
  createReadStream(target).pipe(response);
}

async function readJsonBody<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
}

function sendJson(response: ServerResponse, status: number, value: unknown): void {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(`${JSON.stringify(value, null, 2)}\n`);
}

function sendText(response: ServerResponse, status: number, value: string): void {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(value);
}

function mimeType(filePath: string): string {
  switch (path.extname(filePath)) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
    case ".map":
      return "application/json; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function normalizeScore(score: number | null | undefined): number | null {
  return typeof score === "number" && Number.isInteger(score) && score >= 1 && score <= 5 ? score : null;
}

function labelForScore(
  score: number | null | undefined,
  labels: Record<number, string>,
): string | null {
  const normalized = normalizeScore(score);
  return normalized ? labels[normalized] ?? null : null;
}

function normalizeNullableString(value: string | null | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function statusFromHumanFinalStatus(value: string | undefined): string | undefined {
  if (!value || value === "pending") {
    return undefined;
  }
  return value;
}

function nextHumanCommentId(candidateId: string, comments: HumanComment[]): string {
  const prefix = `HC_${candidateId}_`;
  const max = comments.reduce((current, comment) => {
    if (!comment.id.startsWith(prefix)) {
      return current;
    }
    const value = Number(comment.id.slice(prefix.length));
    return Number.isInteger(value) ? Math.max(current, value) : current;
  }, 0);
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

function nextPlaytestCommentId(levelId: string, comments: HumanComment[]): string {
  const safeLevelId = levelId.replace(/[^A-Za-z0-9_]/g, "_");
  const prefix = `HP_${safeLevelId}_`;
  return `${prefix}${String(comments.length + 1).padStart(3, "0")}`;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function assertInsidePath(root: string, target: string, label: string): void {
  const relative = path.relative(path.resolve(root), path.resolve(target));
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${root}: ${target}`);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readOptional(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

async function assertExists(filePath: string): Promise<void> {
  if (!(await fileExists(filePath))) {
    await mkdir(path.dirname(filePath), { recursive: true });
    throw new Error(`Playable output not found: ${filePath}. Run exportPlayable first.`);
  }
}

function getOption(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value`);
  }
  return value;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
