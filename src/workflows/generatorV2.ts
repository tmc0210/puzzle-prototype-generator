import type {
  CandidateLevelV2,
  CandidatesV2Doc,
  CandidateTraceStep,
  CurriculumV2Package,
  InputId,
  LevelDoc,
  LevelSpecV2,
} from "../core/types.js";
import { solveWithRuntime } from "../core/solver.js";
import { eventsMatchPattern } from "../core/events.js";
import { getRuntimeAdapter } from "../prototypes/runtimeAdapter.js";
import { unavailableToolMessage } from "./toolMaturity.js";

type CandidateFactory = {
  id: string;
  supports: (spec: LevelSpecV2) => boolean;
  generate: (spec: LevelSpecV2) => CandidateLevelV2[];
};

type TraceReplayResult = {
  ok: boolean;
  events: string[];
  reasons: string[];
};

const pullPortalFactories: CandidateFactory[] = [
  {
    id: "pull_line",
    supports: (spec) => ["LS01_pull_discovery", "LS02_reposition_crate"].includes(spec.id),
    generate: (spec) =>
      spec.id === "LS02_reposition_crate"
        ? [
            candidate(spec, {
              suffix: "pull_open_side_door_001",
              factory: "pull_line",
              seed: 1102,
              motifs: ["pull_line", "opened_choke", "side_bypass_after_pull"],
              layout: ["#######", "###G###", "###C  #", "###@  #", "###   #", "#######"].join("\n"),
              solution_trace: [
                { input: "down", events: ["pull_crate"] },
                { input: "right", events: ["walk"] },
                { input: "up", events: ["walk"] },
                { input: "up", events: ["walk"] },
                { input: "left", events: ["walk"] },
                { input: "up", events: ["pull_crate"] },
              ],
              notes:
                "Guided pull application: the crate starts on the only door to the goal; pulling it opens the door, and the player must route around the moved crate to use the opened path.",
            }),
          ]
        : [
            candidate(spec, {
              suffix: "pull_line_001",
              factory: "pull_line",
              seed: 1001,
              motifs: ["pull_line"],
              layout: ["#####", "#C@G#", "#####", "#####"].join("\n"),
              solution_trace: [{ input: "right", events: ["pull_crate"] }],
              notes: "Minimal pull witness: the player must move away from the crate onto the goal.",
            }),
          ],
  },
  {
    id: "portal_bridge",
    supports: (spec) =>
      ["LS05_portal_pair", "LS06_normal_teleport", "LS07_sealed_region_transport"].includes(
        spec.id,
      ),
    generate: (spec) =>
      spec.id === "LS07_sealed_region_transport"
        ? [
            candidate(spec, {
              suffix: "sealed_region_transport_001",
              factory: "portal_bridge",
              seed: 2107,
              motifs: ["portal_bridge", "sealed_region", "post_teleport_navigation"],
              layout: ["#########", "#@A#    #", "####  G #", "#   B   #", "#########"].join("\n"),
              solution_trace: [
                { input: "right", events: ["portal_enter", "portal_teleport"] },
                { input: "up", events: ["walk"] },
                { input: "right", events: ["walk"] },
              ],
              notes:
                "Guided portal application: the start and goal regions are separated by walls; the portal is the only transfer, and the player must navigate inside the target region after teleporting.",
            }),
          ]
        : [
            candidate(spec, {
              suffix: "portal_bridge_001",
              factory: "portal_bridge",
              seed: 2001,
              motifs: ["portal_bridge"],
              layout: ["#######", "#@A#BG#", "#######", "#######"].join("\n"),
              solution_trace: [{ input: "right", events: ["portal_enter", "portal_teleport"] }],
              notes: "Minimal portal bridge: the portal pair is the only connection to the goal cell.",
            }),
          ],
  },
  {
    id: "fallback_push_gate",
    supports: (spec) =>
      ["LS10_blocked_exit_pushes_entrance", "LS11_trigger_fallback"].includes(spec.id),
    generate: (spec) =>
      spec.id === "LS11_trigger_fallback"
        ? [
            candidate(spec, {
              suffix: "approach_and_trigger_fallback_001",
              factory: "fallback_push_gate",
              seed: 4111,
              motifs: ["fallback_push_gate", "approach_from_trigger_side", "opened_corridor"],
              layout: [
                "#########",
                "####B####",
                "#### ####",
                "####A G##",
                "# @  ####",
                "#########",
              ].join("\n"),
              solution_trace: [
                { input: "right", events: ["walk"] },
                { input: "right", events: ["walk"] },
                {
                  input: "up",
                  events: ["portal_enter", "portal_exit_blocked", "portal_fallback_push"],
                },
                { input: "up", events: ["walk"] },
                { input: "right", events: ["walk"] },
                { input: "right", events: ["walk"] },
              ],
              notes:
                "Guided fallback application: the player must approach the entrance from the trigger side, push it into an alcove, then use the opened corridor to reach the goal.",
            }),
          ]
        : [
            candidate(spec, {
              suffix: "fallback_push_gate_001",
              factory: "fallback_push_gate",
              seed: 4001,
              motifs: ["fallback_push_gate"],
              layout: ["#######", "#   B #", "# A G #", "##@####", "#######"].join("\n"),
              solution_trace: [
                {
                  input: "up",
                  events: ["portal_enter", "portal_exit_blocked", "portal_fallback_push"],
                },
                { input: "up", events: ["walk"] },
                { input: "right", events: ["walk"] },
                { input: "right", events: ["walk"] },
              ],
              notes:
                "Fallback gate: the blocked paired exit pushes the entrance portal into an alcove, opening the path to the goal.",
            }),
          ],
  },
];

export function generateCandidatesV2Package(pkg: CurriculumV2Package): CandidatesV2Doc {
  if (!pkg.levelSpecsV2) {
    throw new Error("level_specs_v2.yml not found");
  }

  const factories = factoriesForMechanic(pkg.mechanic.id);
  if (factories.length === 0) {
    throw new Error(unavailableToolMessage(pkg.mechanic.id, "candidate_seed_factories"));
  }

  const candidates = pkg.levelSpecsV2.specs.flatMap((spec) =>
    factories
      .filter((factory) => factory.supports(spec))
      .flatMap((factory) => factory.generate(spec)),
  );

  return {
    mechanic: pkg.mechanic.id,
    status: "generated",
    generated_by: "generate_v2_minimal_seed_structures",
    candidates: candidates.map((candidateLevel) => verifyCandidate(pkg, candidateLevel)),
  };
}

export function summarizeCandidatesV2(doc: CandidatesV2Doc): string {
  const byFactory = countBy(doc.candidates.map((candidateLevel) => candidateLevel.factory));
  const byStatus = countBy(doc.candidates.map((candidateLevel) => candidateLevel.status));
  const lines: string[] = [
    `Generated candidates for ${doc.mechanic}`,
    `- candidates: ${doc.candidates.length}`,
    `- status: ${formatCounts(byStatus)}`,
    `- factories: ${formatCounts(byFactory)}`,
    "",
    ...doc.candidates.map(
      (candidateLevel) =>
        `- ${candidateLevel.id} -> ${candidateLevel.spec_id} [${candidateLevel.status}] ${candidateLevel.factory}`,
    ),
  ];
  return lines.join("\n");
}

function factoriesForMechanic(mechanicId: string): CandidateFactory[] {
  if (mechanicId === "pull_portal_fallback") {
    return pullPortalFactories;
  }
  return [];
}

function candidate(
  spec: LevelSpecV2,
  fields: Omit<CandidateLevelV2, "id" | "spec_id" | "title" | "status"> & {
    suffix: string;
  },
): CandidateLevelV2 {
  const { suffix, ...rest } = fields;
  return {
    id: `C_${spec.id}_${suffix}`,
    spec_id: spec.id,
    title: `${spec.title} Candidate`,
    status: "generated",
    ...rest,
  };
}

function verifyCandidate(
  pkg: CurriculumV2Package,
  candidateLevel: CandidateLevelV2,
): CandidateLevelV2 {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const level = toLevelDoc(candidateLevel);
  const initial = adapter.parseLevel(level);
  const solutionReplay = candidateLevel.solution_trace
    ? replayTrace(pkg, level, candidateLevel.solution_trace, { requireWin: true })
    : { ok: false, events: [], reasons: ["missing solution_trace"] };
  const probeReplay = candidateLevel.probe_trace
    ? replayTrace(pkg, level, candidateLevel.probe_trace, { requireWin: false, allowIllegal: true })
    : { ok: true, events: [], reasons: [] };
  const solverResult = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 20_000,
    maxDepth: 80,
  });

  const reasons = [
    ...solutionReplay.reasons.map((reason) => `solution_trace: ${reason}`),
    ...probeReplay.reasons.map((reason) => `probe_trace: ${reason}`),
    ...(solverResult.found ? [] : [`solver: ${solverResult.reason ?? "no solution found"}`]),
  ];
  const notes = [
    candidateLevel.notes,
    `generated checks: solution_events=${solutionReplay.events.join(",") || "none"}; probe_events=${
      probeReplay.events.join(",") || "none"
    }; solver=${solverResult.found ? `found cost ${solverResult.cost}` : "not found"}`,
    reasons.length > 0 ? `check failures: ${reasons.join("; ")}` : undefined,
  ].filter((note): note is string => Boolean(note));

  return {
    ...candidateLevel,
    status: reasons.length === 0 ? "verified" : "generated",
    notes: notes.join(" "),
  };
}

function replayTrace(
  pkg: CurriculumV2Package,
  level: LevelDoc,
  trace: CandidateTraceStep[],
  options: {
    requireWin: boolean;
    allowIllegal?: boolean;
  },
): TraceReplayResult {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  let state = adapter.parseLevel(level);
  const events: string[] = [];
  const reasons: string[] = [];

  for (const [index, traceStep] of trace.entries()) {
    const result = adapter.step(pkg.mechanic, state, traceStep.input as InputId, {
      winCondition: pkg.mechanic.win,
    });
    events.push(...result.events);

    if (!result.legal && !options.allowIllegal) {
      reasons.push(`step ${index + 1} '${traceStep.input}' was illegal (${result.reason})`);
    }

    for (const event of traceStep.events ?? []) {
      if (!eventsMatchPattern(result.events, event)) {
        reasons.push(`step ${index + 1} missing event '${event}'`);
      }
    }

    if (result.legal) {
      state = result.state;
    }
  }

  if (options.requireWin && !adapter.isWin(state, pkg.mechanic.win)) {
    reasons.push("trace does not end in the player-facing win condition");
  }

  return {
    ok: reasons.length === 0,
    events,
    reasons,
  };
}

function toLevelDoc(candidateLevel: CandidateLevelV2): LevelDoc {
  return {
    id: candidateLevel.id,
    title: candidateLevel.title,
    role: "mechanic_witness",
    status: "candidate",
    targets: [candidateLevel.spec_id],
    known_before: [],
    target_learning: [candidateLevel.spec_id],
    support_level: "high",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: candidateLevel.layout,
  };
}

function countBy(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

function formatCounts(counts: Map<string, number>): string {
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => `${key}=${count}`)
    .join(", ");
}
