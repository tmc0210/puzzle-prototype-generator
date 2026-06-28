import type {
  CandidateLevelV2,
  CandidatesV2Doc,
  CurriculumV2Package,
  LevelDoc,
  MechanicDoc,
  PrototypePackage,
} from "./types.js";
import { analyzeLevel } from "./levelAnalyzer.js";
import { solveWithRuntime } from "./solver.js";
import { getRuntimeAdapter } from "./runtimeAdapter.js";

export type ToolAvailability = {
  status: "implemented" | "unavailable";
  reason?: string;
};

export const __mechanicCamel__ToolAvailability = {
  runtimeAdapter: { status: "implemented" },
  seedFactories: { status: "implemented" },
  temporaryMiner: { status: "implemented" },
  puzzleScriptExporter: { status: "unavailable", reason: "Exporter not implemented yet." },
  puzzleScriptChecker: { status: "unavailable", reason: "Checker not implemented yet." },
} satisfies Record<string, ToolAvailability>;

type SeedFactory = {
  id: string;
  supports: (specIdOrGoal: string) => boolean;
  generate: (specIdOrGoal: string) => CandidateLevelV2[];
};

const seedFactories: SeedFactory[] = [
  {
    id: "smoke_witness",
    supports: () => true,
    generate: (specId) => [
      {
        id: `C_${specId}_smoke_witness_001`,
        spec_id: specId,
        title: "Smoke witness",
        status: "generated",
        factory: "smoke_witness",
        seed: 1,
        motifs: ["smoke"],
        layout: [
          "#####",
          "#@G #",
          "#####",
        ].join("\n"),
        solution_trace: [
          {
            input: "right",
            events: [],
          },
        ],
        notes: "Template smoke candidate. Replace with mechanism-specific structure.",
      },
    ],
  },
];

export function generate__MechanicPascal__Candidates(
  pkg: CurriculumV2Package,
): CandidatesV2Doc {
  assertMechanic(pkg.mechanic);
  if (!pkg.levelSpecsV2) {
    throw new Error("level_specs_v2.yml not found");
  }

  const candidates = pkg.levelSpecsV2.specs.flatMap((spec) =>
    seedFactories
      .filter((factory) => factory.supports(spec.id))
      .flatMap((factory) => factory.generate(spec.id))
      .map((candidate) => verifyCandidate(pkg.mechanic, candidate)),
  );

  return {
    mechanic: pkg.mechanic.id,
    status: "generated",
    generated_by: "__mechanic_id___seed_factories",
    candidates,
  };
}

function verifyCandidate(mechanic: MechanicDoc, candidate: CandidateLevelV2): CandidateLevelV2 {
  const adapter = getRuntimeAdapter(mechanic);
  const runtime = adapter.createRuntime(mechanic);
  const level = candidateToLevel(candidate);
  const initial = adapter.parseLevel(level);
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: mechanic.win,
    maxStates: 20_000,
    maxDepth: 80,
  });

  return {
    ...candidate,
    status: solution.found ? "verified" : "generated",
    notes: [
      candidate.notes,
      solution.found
        ? `solver found cost ${solution.cost}; events=${solution.events.join(",") || "none"}`
        : `solver failed: ${solution.reason ?? "no solution"}`,
    ]
      .filter(Boolean)
      .join(" "),
  };
}

export type __MechanicPascal__MinerReport = {
  prototype: string;
  generatedAt: string;
  status: "raw_findings";
  stats: {
    generated: number;
    invalid: number;
    unsolved: number;
    solved: number;
    kept: number;
  };
  findings: Array<{
    id: string;
    source: {
      tool: "__mechanic_id___temporary_miner";
      seed: number;
      index: number;
    };
    layout: string;
    observedEvents: string[];
    solution: {
      found: boolean;
      cost?: number;
      inputs: string[];
      events: string[];
    };
    graphStatus: "complete" | "exhausted";
    notes: string[];
  }>;
};

export function mine__MechanicPascal__Seeds(
  pkg: PrototypePackage,
): __MechanicPascal__MinerReport {
  assertMechanic(pkg.mechanic);

  // TODO: replace with a mechanism-aware search space.
  const smokeLayout = [
    "#####",
    "#@G #",
    "#####",
  ].join("\n");
  const level: LevelDoc = {
    id: "miner_smoke",
    title: "Miner smoke",
    role: "mechanic_witness",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: smokeLayout,
  };

  const analysis = analyzeLevel(pkg, level, { maxStates: 20_000, maxDepth: 80 });
  return {
    prototype: pkg.mechanic.id,
    generatedAt: new Date().toISOString(),
    status: "raw_findings",
    stats: {
      generated: 1,
      invalid: 0,
      unsolved: analysis.solution.found ? 0 : 1,
      solved: analysis.solution.found ? 1 : 0,
      kept: analysis.solution.found ? 1 : 0,
    },
    findings: analysis.solution.found
      ? [
          {
            id: "MF_0001",
            source: { tool: "__mechanic_id___temporary_miner", seed: 1, index: 1 },
            layout: smokeLayout,
            observedEvents: [...new Set(analysis.solution.events.map((event) => event.split(":")[0] ?? event))],
            solution: {
              found: true,
              cost: analysis.solution.cost,
              inputs: analysis.solution.inputs,
              events: analysis.solution.events,
            },
            graphStatus: analysis.graph.status,
            notes: ["Raw smoke finding. Replace miner search space before design use."],
          },
        ]
      : [],
  };
}

export function build__MechanicPascal__PuzzleScript(_pkg: PrototypePackage): string {
  throw new Error("__mechanic_id__ PuzzleScript exporter unavailable: implement this mechanism's exporter.");
}

export function check__MechanicPascal__PuzzleScript(_source: string): void {
  throw new Error("__mechanic_id__ PuzzleScript checker unavailable: implement this mechanism's checker.");
}

function candidateToLevel(candidate: CandidateLevelV2): LevelDoc {
  return {
    id: candidate.id,
    title: candidate.title,
    role: "mechanic_witness",
    status: "candidate",
    targets: [candidate.spec_id],
    known_before: [],
    target_learning: [candidate.spec_id],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: candidate.layout,
  };
}

function assertMechanic(mechanic: MechanicDoc): void {
  if (mechanic.id !== "__mechanic_id__") {
    throw new Error(`__mechanic_id__ tools cannot run for mechanic '${mechanic.id}'`);
  }
}
