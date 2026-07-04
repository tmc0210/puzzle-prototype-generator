import { eventType } from "../../core/events.js";
import type { LevelAnalysis } from "../../workflows/levelAnalyzer.js";
import type {
  GenericSample,
  GenericSamplerProfile,
  Rng,
} from "../../workflows/genericSampler.js";
import type { MinerFinding, NormalizedMineOptions } from "../../workflows/seedMiner.js";

type TemplateSample = {
  generator: string;
  rows: string[];
};

const templates: TemplateSample[] = [
  {
    generator: "push_pull_line_probe",
    rows: ["########", "#PL.C+.#", "########"],
  },
  {
    generator: "push_pull_line_probe",
    rows: ["#######", "#@CCG.#", "#######"],
  },
  {
    generator: "anchor_shift_probe",
    rows: ["########", "#@PLCG.#", "########"],
  },
  {
    generator: "anchor_shift_probe",
    rows: ["#######", "#@BSCG#", "#######"],
  },
  {
    generator: "box_sticky_boundary_probe",
    rows: ["#######", "#..BS.#", "#@C.MG#", "#######"],
  },
  {
    generator: "box_sticky_boundary_probe",
    rows: ["########", "#..BS..#", "#..GMM@#", "########"],
  },
  {
    generator: "dual_anchor_room",
    rows: ["########", "#..BS..#", "#@PLCG.#", "########"],
  },
  {
    generator: "sticky_rigid_block_room",
    rows: ["#########", "#..BS...#", "#..GMM@.#", "#########"],
  },
  {
    generator: "dual_anchor_room",
    rows: ["#########", "#..BS...#", "#@PLC.G.#", "#########"],
  },
  {
    generator: "sticky_rigid_block_room",
    rows: ["#########", "#...BS..#", "#..@CMMG#", "#########"],
  },
];

export const realityAnchorSamplerProfile: GenericSamplerProfile = {
  mechanicId: "reality_anchor",
  reportToolId: "reality_anchor_raw_sampler_v1",
  maturity: "raw_sampler",
  scoreLabel: "rawInterestScore",
  supportedTags: [
    "push_object",
    "pull_object",
    "force_chain",
    "anchor_boundary_shift_push_pull",
    "anchor_boundary_shift_box_sticky",
    "move_sticky_rigid",
    "box_to_sticky",
    "sticky_to_box",
    "sticky_merge",
    "sticky_split",
    "dual_anchor_interaction",
    "boundary_sweep_normalization",
    "sticky_merge_after_conversion",
    "sticky_split_after_conversion",
    "rigid_block_constraint",
    "mixed_force_modes",
    "multi_object_force_chain",
    "two_dimensional_structure",
    "short_witness",
    "branching_win_dag",
  ],
  searchSpace:
    "reality_anchor raw sampler v1: templated push/pull, box/sticky boundary, anchor-shift, dual-anchor, and sticky-rigid probes",
  defaultPreset: "quick",
  defaultOptions: {
    iterations: 32,
    maxFindings: 8,
    minScore: 3,
    maxDepth: 90,
    maxStates: 8_000,
    graphMaxStates: 8_000,
  },
  presets: {
    quick: {
      iterations: 24,
      maxFindings: 6,
      maxInstances: 48,
      maxStates: 4_000,
      graphMaxStates: 4_000,
    },
    deep: {
      iterations: 72,
      maxFindings: 12,
      maxInstances: 0,
      maxStates: 16_000,
      graphMaxStates: 16_000,
    },
  },
  targetMode: "first_knowledge",
  sample: ({ index, seed, rng, options }) => sampleRealityAnchorLayout(index, seed, rng, options),
  enumerateSolveInstances: ({ sample }) => [
    {
      id: "default_targets",
      title: `${sample.generator} default target coverage`,
      winCondition: { type: "all_targets_covered_by_objects" },
      notes: ["Uses Reality Anchor's ordinary target-cover win condition."],
    },
  ],
  classifyTags: ({ analysis, sample }) => classifyRealityAnchorTags(analysis, sample),
  scoreFinding: ({ analysis, tags }) => scoreRealityAnchorFinding(analysis, tags),
  rejectFinding: ({ analysis, tags }) => rejectRealityAnchorFinding(analysis, tags),
  selectFindings: ({ findings, maxFindings }) => selectRealityAnchorFindings(findings, maxFindings),
  notes: ({ analysis, tags, sample }) => buildRealityAnchorNotes(analysis, tags, sample),
};

function sampleRealityAnchorLayout(
  index: number,
  seed: number,
  rng: Rng,
  _options: NormalizedMineOptions,
): GenericSample {
  const template = templates[index % templates.length]!;
  const rows = maybeMirrorRows(template.rows, rng, template.generator);
  return {
    index,
    seed,
    generator: template.generator,
    layout: rows.join("\n"),
    metadata: {
      templateIndex: index % templates.length,
    },
  };
}

function maybeMirrorRows(rows: string[], rng: Rng, generator: string): string[] {
  if (generator === "push_pull_line_probe" || rng() >= 0.35) {
    return rows;
  }
  return rows.map((row) => [...row].reverse().join(""));
}

function classifyRealityAnchorTags(analysis: LevelAnalysis, sample: GenericSample): string[] {
  const events = analysis.solution.events;
  const types = new Set(events.map(eventType));
  const tags: string[] = [];

  pushIf(types.has("push_object"), tags, "push_object");
  pushIf(types.has("pull_object"), tags, "pull_object");
  pushIf(types.has("force_chain"), tags, "force_chain");
  pushIf(events.some((event) => event === "anchor_boundary_shift:push_pull"), tags, "anchor_boundary_shift_push_pull");
  pushIf(events.some((event) => event === "anchor_boundary_shift:box_sticky"), tags, "anchor_boundary_shift_box_sticky");
  pushIf(types.has("move_sticky_rigid"), tags, "move_sticky_rigid");
  pushIf(types.has("box_to_sticky"), tags, "box_to_sticky");
  pushIf(types.has("sticky_to_box"), tags, "sticky_to_box");
  pushIf(types.has("sticky_merge"), tags, "sticky_merge");
  pushIf(types.has("sticky_split"), tags, "sticky_split");

  const hasPushPullAnchor = sample.layout.includes("P") && sample.layout.includes("L");
  const hasBoxStickyAnchor = sample.layout.includes("B") && sample.layout.includes("S");
  pushIf(hasPushPullAnchor && hasBoxStickyAnchor, tags, "dual_anchor_interaction");
  pushIf(
    tags.includes("anchor_boundary_shift_box_sticky") &&
      (tags.includes("box_to_sticky") || tags.includes("sticky_to_box") || tags.includes("sticky_merge") || tags.includes("sticky_split")),
    tags,
    "boundary_sweep_normalization",
  );
  pushIf(tags.includes("box_to_sticky") && tags.includes("sticky_merge"), tags, "sticky_merge_after_conversion");
  pushIf(tags.includes("sticky_split"), tags, "sticky_split_after_conversion");
  pushIf(tags.includes("move_sticky_rigid") || hasAdjacentStickyCells(sample.layout), tags, "rigid_block_constraint");
  pushIf(tags.includes("push_object") && tags.includes("pull_object"), tags, "mixed_force_modes");
  pushIf(tags.includes("force_chain"), tags, "multi_object_force_chain");
  pushIf(sample.layout.includes("\n"), tags, "two_dimensional_structure");
  pushIf((analysis.solution.cost ?? 0) <= 2, tags, "short_witness");
  pushIf(analysis.agency.scc?.winSubgraphShape === "branching_win_dag", tags, "branching_win_dag");

  return tags;
}

function scoreRealityAnchorFinding(analysis: LevelAnalysis, tags: string[]): number {
  let score = 0;
  score += weighted(tags, "push_object", 3);
  score += weighted(tags, "pull_object", 7);
  score += weighted(tags, "force_chain", 8);
  score += weighted(tags, "anchor_boundary_shift_push_pull", 9);
  score += weighted(tags, "anchor_boundary_shift_box_sticky", 12);
  score += weighted(tags, "move_sticky_rigid", 8);
  score += weighted(tags, "box_to_sticky", 10);
  score += weighted(tags, "sticky_to_box", 10);
  score += weighted(tags, "sticky_merge", 12);
  score += weighted(tags, "sticky_split", 14);
  score += weighted(tags, "dual_anchor_interaction", 14);
  score += weighted(tags, "boundary_sweep_normalization", 14);
  score += weighted(tags, "sticky_merge_after_conversion", 14);
  score += weighted(tags, "sticky_split_after_conversion", 14);
  score += weighted(tags, "rigid_block_constraint", 8);
  score += weighted(tags, "mixed_force_modes", 10);
  score += weighted(tags, "multi_object_force_chain", 8);
  score += weighted(tags, "two_dimensional_structure", 6);
  score += weighted(tags, "branching_win_dag", 4);

  if (tags.includes("short_witness")) {
    score -= 6;
  }
  if ((analysis.solution.cost ?? 0) >= 3) {
    score += Math.min(8, (analysis.solution.cost ?? 0) - 2);
  }
  return score;
}

function rejectRealityAnchorFinding(analysis: LevelAnalysis, tags: string[]): string | undefined {
  const eventTypes = new Set(analysis.solution.events.map(eventType));
  const nonWalkEvents = [...eventTypes].filter((type) => type !== "walk");
  if (nonWalkEvents.length === 0) {
    return "Reality Anchor raw sampler rejects walk-only findings.";
  }
  if (analysis.graph.status !== "complete") {
    return "Reality Anchor raw sampler requires complete graph evidence for kept findings.";
  }
  const runtimeTags = tags.filter((tag) => runtimeTagSet.has(tag));
  if (runtimeTags.length === 1 && runtimeTags[0] === "push_object") {
    return "Reality Anchor raw sampler rejects single ordinary push-only findings.";
  }
  return undefined;
}

function selectRealityAnchorFindings(findings: MinerFinding[], maxFindings: number): MinerFinding[] {
  const selected: MinerFinding[] = [];
  const generatorCounts = new Map<string, number>();
  const signatureCounts = new Map<string, number>();
  const generatorCap = Math.max(2, Math.ceil(maxFindings * 0.5));

  for (const finding of findings) {
    const generatorCount = generatorCounts.get(finding.source.generator) ?? 0;
    if (generatorCount >= generatorCap) {
      continue;
    }
    const signature = findingSignature(finding);
    const signatureCount = signatureCounts.get(signature) ?? 0;
    if (signatureCount >= 2) {
      continue;
    }
    selected.push(finding);
    generatorCounts.set(finding.source.generator, generatorCount + 1);
    signatureCounts.set(signature, signatureCount + 1);
    if (selected.length >= maxFindings) {
      break;
    }
  }

  return selected;
}

function buildRealityAnchorNotes(
  analysis: LevelAnalysis,
  tags: string[],
  sample: GenericSample,
): string[] {
  const notes = [
    `Observed Reality Anchor raw sampler tags: ${tags.join(", ") || "none"}.`,
    "Ranked by reality_anchor_raw_sampler_v1; this is raw discovery evidence, not a quality score.",
    "Rewrite any useful finding into a fresh design_claim, probe, variation axis, or negative result before review.",
  ];
  if (sample.generator === "push_pull_line_probe") {
    notes.push("Line probe: useful for force-mode semantics, usually too thin for level design.");
  }
  if (tags.includes("dual_anchor_interaction")) {
    notes.push("Dual-anchor material: inspect whether both anchors create shared responsibility or merely coexist.");
  }
  if (tags.includes("boundary_sweep_normalization")) {
    notes.push("Boundary sweep: verify which later state consumes the normalization change before promoting it.");
  }
  if (tags.includes("sticky_merge_after_conversion")) {
    notes.push("Sticky merge after conversion: check whether the merge constrains later movement or only witnesses conversion.");
  }
  if (tags.includes("sticky_split_after_conversion")) {
    notes.push("Sticky split after conversion: inspect whether split identity matters after normalization.");
  }
  if (tags.includes("branching_win_dag")) {
    notes.push("Branching win DAG: read SCC facts as possible ordering freedom, not as automatic quality.");
  }
  if ((analysis.solution.cost ?? 0) <= 2) {
    notes.push("Short witness: likely needs a designer rewrite before it can support a player-facing claim.");
  }
  return notes;
}

function hasAdjacentStickyCells(layout: string): boolean {
  const rows = layout.replace(/\r/g, "").split("\n");
  for (const [y, row] of rows.entries()) {
    for (let x = 0; x < row.length; x += 1) {
      if (!isStickyGlyph(row[x])) {
        continue;
      }
      if (isStickyGlyph(row[x + 1]) || isStickyGlyph(rows[y + 1]?.[x])) {
        return true;
      }
    }
  }
  return false;
}

function isStickyGlyph(glyph: string | undefined): boolean {
  return glyph === "M" || glyph === "m";
}

function pushIf(condition: boolean, tags: string[], tag: string): void {
  if (condition) {
    tags.push(tag);
  }
}

function weighted(tags: string[], tag: string, value: number): number {
  return tags.includes(tag) ? value : 0;
}

function countEventType(events: string[], type: string): number {
  return events.filter((event) => eventType(event) === type).length;
}

function findingSignature(finding: MinerFinding): string {
  return [
    finding.source.generator,
    finding.solution.events.map(eventType).join(">"),
    finding.tags.filter((tag) => tag !== "short_witness").sort().join("+"),
  ].join("|");
}

const runtimeTagSet = new Set([
  "push_object",
  "pull_object",
  "force_chain",
  "anchor_boundary_shift_push_pull",
  "anchor_boundary_shift_box_sticky",
  "move_sticky_rigid",
  "box_to_sticky",
  "sticky_to_box",
  "sticky_merge",
  "sticky_split",
]);
