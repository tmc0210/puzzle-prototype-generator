import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import YAML from "yaml";
import { eventMatchesPattern, eventType } from "../../core/events.js";
import { enumerateRuntimeGraph } from "../../core/runtimeGraph.js";
import type { LevelDoc, PrototypePackage } from "../../core/types.js";
import { getRuntimeAdapter } from "../runtimeAdapter.js";

export type CandleExposureSequenceBranch = {
  branch: string;
  title?: string;
  source_rule: string;
  new_events: string[];
};

export type CandleExposureSequence = {
  schema_version: number;
  prototype: "candle_sokoban";
  event_authority: string;
  event_exposure_sequence: CandleExposureSequenceBranch[];
};

export type CandleExposureAuditOptions = {
  allowedExposureThrough: string;
  exactVersion?: string;
  maxStates?: number;
  maxTransitions?: number;
};

export type CandleExposureAuditReport = {
  schema_version: 1;
  prototype: "candle_sokoban";
  exact_version: string | null;
  level: {
    id: string;
    title: string;
    layout_sha256: string;
    win_condition: LevelDoc["win"];
  };
  exposure_gate: {
    sequence_ref: string;
    sequence_sha256: string;
    allowed_exposure_through: string;
    allowed_branches: string[];
    forbidden_branches: string[];
    allowed_event_patterns: string[];
    forbidden_event_patterns: string[];
  };
  graph: {
    status: "complete" | "exhausted";
    reason: string | null;
    reachable_state_count: number;
    legal_transition_count: number;
    win_state_count: number;
    max_observed_depth: number;
    budget: {
      max_states: number;
      max_transitions: number | null;
      terminalize_wins: true;
    };
  };
  reachable_event_counts: Record<string, number>;
  forbidden_hits: Array<{
    pattern: string;
    count: number;
    edge_indexes: number[];
  }>;
  verdict: "pass" | "fail" | "unknown";
  raw_graph: {
    nodes: Array<{
      index: number;
      key: string;
      depth: number;
      winning: boolean;
    }>;
    edges: Array<{
      index: number;
      from: number;
      to: number;
      action: string;
      events: string[];
    }>;
  };
};

export function loadCandleExposureSequence(
  sequencePath: string,
): { sequence: CandleExposureSequence; raw: string } {
  const raw = readFileSync(sequencePath, "utf8");
  const parsed = YAML.parse(raw) as Partial<CandleExposureSequence> | null;
  if (
    !parsed ||
    parsed.schema_version !== 1 ||
    parsed.prototype !== "candle_sokoban" ||
    typeof parsed.event_authority !== "string" ||
    !Array.isArray(parsed.event_exposure_sequence)
  ) {
    throw new Error(`Invalid Candle exposure sequence: ${sequencePath}`);
  }

  const branches = parsed.event_exposure_sequence.map((entry, index) => {
    if (
      !entry ||
      typeof entry.branch !== "string" ||
      typeof entry.source_rule !== "string" ||
      !Array.isArray(entry.new_events) ||
      entry.new_events.length === 0 ||
      entry.new_events.some((event) => typeof event !== "string")
    ) {
      throw new Error(`Invalid Candle exposure branch at index ${index}`);
    }
    return {
      branch: entry.branch,
      ...(typeof entry.title === "string" ? { title: entry.title } : {}),
      source_rule: entry.source_rule,
      new_events: [...entry.new_events],
    };
  });

  const branchIds = new Set<string>();
  const eventPatterns = new Set<string>();
  for (const branch of branches) {
    if (branchIds.has(branch.branch)) {
      throw new Error(`Duplicate Candle exposure branch '${branch.branch}'`);
    }
    branchIds.add(branch.branch);
    for (const event of branch.new_events) {
      if (eventPatterns.has(event)) {
        throw new Error(`Duplicate Candle exposure event pattern '${event}'`);
      }
      eventPatterns.add(event);
    }
  }

  return {
    sequence: {
      schema_version: 1,
      prototype: "candle_sokoban",
      event_authority: parsed.event_authority,
      event_exposure_sequence: branches,
    },
    raw,
  };
}

export function auditCandleExposure(
  pkg: PrototypePackage,
  level: LevelDoc,
  sequence: CandleExposureSequence,
  sequenceRaw: string,
  options: CandleExposureAuditOptions,
): CandleExposureAuditReport {
  if (pkg.mechanic.id !== "candle_sokoban") {
    throw new Error(`Exposure audit requires candle_sokoban, got '${pkg.mechanic.id}'`);
  }
  if ((level.win ?? pkg.mechanic.win).type !== "all_braziers_lit") {
    throw new Error("Formal Candle exposure audit requires the normal all_braziers_lit win condition.");
  }
  validateSequenceAuthority(pkg, sequence);

  const allowedIndex = sequence.event_exposure_sequence.findIndex(
    (branch) => branch.branch === options.allowedExposureThrough,
  );
  if (allowedIndex < 0) {
    throw new Error(
      `Unknown allowed_exposure_through '${options.allowedExposureThrough}'`,
    );
  }

  const allowedBranches = sequence.event_exposure_sequence.slice(0, allowedIndex + 1);
  const forbiddenBranches = sequence.event_exposure_sequence.slice(allowedIndex + 1);
  const allowedEventPatterns = allowedBranches.flatMap((branch) => branch.new_events);
  const forbiddenEventPatterns = forbiddenBranches.flatMap((branch) => branch.new_events);
  const maxStates = options.maxStates ?? 300_000;
  const maxTransitions = options.maxTransitions;
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const initial = adapter.parseLevel(level);
  const winCondition = level.win ?? pkg.mechanic.win;
  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    winCondition,
    { winCondition },
    {
      maxStates,
      ...(maxTransitions === undefined ? {} : { maxTransitions }),
      terminalizeWins: true,
    },
  );

  const reachableEventCounts: Record<string, number> = {};
  const forbiddenHitMap = new Map<string, { count: number; edgeIndexes: Set<number> }>();
  for (const [edgeIndex, edge] of graph.edges.entries()) {
    for (const event of edge.events) {
      const type = eventType(event);
      reachableEventCounts[type] = (reachableEventCounts[type] ?? 0) + 1;
      for (const pattern of forbiddenEventPatterns) {
        if (!eventMatchesPattern(event, pattern)) {
          continue;
        }
        const hit = forbiddenHitMap.get(pattern) ?? {
          count: 0,
          edgeIndexes: new Set<number>(),
        };
        hit.count += 1;
        hit.edgeIndexes.add(edgeIndex);
        forbiddenHitMap.set(pattern, hit);
      }
    }
  }

  const forbiddenHits = [...forbiddenHitMap.entries()]
    .map(([pattern, hit]) => ({
      pattern,
      count: hit.count,
      edge_indexes: [...hit.edgeIndexes].sort((left, right) => left - right),
    }))
    .sort((left, right) => left.pattern.localeCompare(right.pattern));
  const verdict =
    forbiddenHits.length > 0
      ? "fail"
      : graph.status === "complete"
        ? "pass"
        : "unknown";

  return {
    schema_version: 1,
    prototype: "candle_sokoban",
    exact_version: options.exactVersion ?? null,
    level: {
      id: level.id,
      title: level.title,
      layout_sha256: sha256(normalizeLayout(level.layout)),
      win_condition: winCondition,
    },
    exposure_gate: {
      sequence_ref: "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml",
      sequence_sha256: sha256(sequenceRaw),
      allowed_exposure_through: options.allowedExposureThrough,
      allowed_branches: allowedBranches.map((branch) => branch.branch),
      forbidden_branches: forbiddenBranches.map((branch) => branch.branch),
      allowed_event_patterns: allowedEventPatterns,
      forbidden_event_patterns: forbiddenEventPatterns,
    },
    graph: {
      status: graph.status,
      reason: graph.reason ?? null,
      reachable_state_count: graph.keys.length,
      legal_transition_count: graph.edges.length,
      win_state_count: graph.winStateIndexes.size,
      max_observed_depth: Math.max(0, ...graph.depthByIndex),
      budget: {
        max_states: maxStates,
        max_transitions: maxTransitions ?? null,
        terminalize_wins: true,
      },
    },
    reachable_event_counts: Object.fromEntries(
      Object.entries(reachableEventCounts).sort(([left], [right]) =>
        left.localeCompare(right),
      ),
    ),
    forbidden_hits: forbiddenHits,
    verdict,
    raw_graph: {
      nodes: graph.keys.map((key, index) => ({
        index,
        key,
        depth: graph.depthByIndex[index] ?? 0,
        winning: graph.winStateIndexes.has(index),
      })),
      edges: graph.edges.map((edge, index) => ({
        index,
        from: edge.from,
        to: edge.to,
        action: edge.action,
        events: edge.events,
      })),
    },
  };
}

function validateSequenceAuthority(
  pkg: PrototypePackage,
  sequence: CandleExposureSequence,
): void {
  const rules = new Map(pkg.mechanic.rules.map((rule) => [rule.id, rule]));
  const declaredEvents = new Set<string>();
  for (const rule of pkg.mechanic.rules) {
    for (const event of rule.emits ?? []) {
      declaredEvents.add(event);
    }
    for (const branch of rule.branches ?? []) {
      for (const event of branch.emits ?? []) {
        declaredEvents.add(event);
      }
    }
  }

  for (const branch of sequence.event_exposure_sequence) {
    if (!rules.has(branch.source_rule)) {
      throw new Error(
        `Exposure branch '${branch.branch}' references unknown rule '${branch.source_rule}'`,
      );
    }
    for (const event of branch.new_events) {
      if (!declaredEvents.has(event)) {
        throw new Error(
          `Exposure branch '${branch.branch}' references undeclared event '${event}'`,
        );
      }
    }
  }
}

function normalizeLayout(layout: string): string {
  return `${layout.replace(/\r/g, "").trimEnd()}\n`;
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}
