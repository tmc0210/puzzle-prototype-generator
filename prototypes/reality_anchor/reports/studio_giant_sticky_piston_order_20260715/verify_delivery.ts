import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const prototypeRoot = path.join(repoRoot, "prototypes/reality_anchor");
const studioRoot = import.meta.dirname;

const specs = [
  {
    slot: "baseline",
    id: "RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5",
    version: "v5",
    sha256: "79dcb407d4464dc53e839129afb4e511a7785166d99a8fa58ad093509c9bdee4",
    layout: "candidates/baseline/RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5.txt",
    replay: "../input_replay_RA_FRESH_2026_07_15_TRIDENT_SYNC_FINAL_v5.json",
    inputCount: 14,
  },
  {
    slot: "application",
    id: "RA_FRESH_2026_07_15_FORGED_C_SYNC_v6",
    version: "v6",
    sha256: "31debfe814fda7a58cc198234445f2b0d58d8aba063fc8b473e3364bded03879",
    layout: "candidates/application/RA_FRESH_2026_07_15_FORGED_C_SYNC_v6.txt",
    replay: "../input_replay_RA_FRESH_2026_07_15_FORGED_C_SYNC_v6.json",
    inputCount: 12,
  },
  {
    slot: "challenge",
    id: "RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1",
    version: "v1",
    sha256: "027825ee031100ce6600d163cf967201c0670ee356ffe98362e335b4ec573541",
    layout: "candidates/challenge/RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1.txt",
    replay: "../input_replay_RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1.json",
    inputCount: 130,
  },
];

const normalize = (text: string): string => text.replaceAll("\r\n", "\n").replace(/\n$/, "");
const levelsDoc = YAML.parse(await readFile(path.join(prototypeRoot, "levels.yml"), "utf8"));
const queueDoc = YAML.parse(await readFile(path.join(prototypeRoot, "playable_queue.yml"), "utf8"));
const playableDoc = JSON.parse(await readFile(path.join(prototypeRoot, "playable/data.json"), "utf8"));
const packageLevels = levelsDoc.levels as any[];
const queueEntries = queueDoc.entries as any[];
const playableLevels = playableDoc.levels.levels as any[];

const results = [];
for (const spec of specs) {
  const raw = await readFile(path.join(studioRoot, spec.layout));
  const exactLayout = raw.toString("utf8");
  const rawHash = createHash("sha256").update(raw).digest("hex");
  const packageMatches = packageLevels.filter((level) => level.id === spec.id);
  const queueMatches = queueEntries.filter((entry) => entry.level_id === spec.id);
  const playableMatches = playableLevels.filter((level) => level.id === spec.id);
  const replay = JSON.parse(await readFile(path.resolve(studioRoot, spec.replay), "utf8"));
  if (rawHash !== spec.sha256) throw new Error(`${spec.id}: source hash mismatch`);
  if (packageMatches.length !== 1) throw new Error(`${spec.id}: package count ${packageMatches.length}`);
  if (queueMatches.length !== 1) throw new Error(`${spec.id}: queue count ${queueMatches.length}`);
  if (playableMatches.length !== 1) throw new Error(`${spec.id}: playable count ${playableMatches.length}`);
  const level = packageMatches[0];
  const queue = queueMatches[0];
  const playable = playableMatches[0];
  if (normalize(level.layout) !== normalize(exactLayout)) throw new Error(`${spec.id}: package layout mismatch`);
  if (normalize(playable.layout) !== normalize(exactLayout)) throw new Error(`${spec.id}: playable layout mismatch`);
  if (queue.source !== "package" || queue.status !== "pending_playtest") throw new Error(`${spec.id}: queue source/status mismatch`);
  if (level.expected_trace.length !== spec.inputCount) throw new Error(`${spec.id}: expected trace length mismatch`);
  if (playable.expected_trace.length !== spec.inputCount) throw new Error(`${spec.id}: playable trace length mismatch`);
  const expectedInputs = level.expected_trace.map((step: any) => step.input);
  if (JSON.stringify(expectedInputs) !== JSON.stringify(replay.inputs)) throw new Error(`${spec.id}: replay input mismatch`);
  if (replay.replay.completed !== true || replay.replay.legalThroughStep !== spec.inputCount || replay.final.isWin !== true) {
    throw new Error(`${spec.id}: replay is not fully legal/winning`);
  }
  for (let index = 0; index < level.expected_trace.length; index += 1) {
    const expectedEvents = level.expected_trace[index].events as string[];
    const actualEvents = replay.steps[index].events as string[];
    for (const base of expectedEvents) {
      if (!actualEvents.some((event) => event === base || event.startsWith(`${base}:`))) {
        throw new Error(`${spec.id}: step ${index + 1} missing event base ${base}`);
      }
    }
  }
  results.push({
    slot: spec.slot,
    id: spec.id,
    exact_version: spec.version,
    source_layout_sha256: rawHash,
    package_level_count: packageMatches.length,
    queue_entry_count: queueMatches.length,
    queue_source: queue.source,
    queue_status: queue.status,
    playable_level_count: playableMatches.length,
    layout_matches_package_and_playable: true,
    canonical_input_count: spec.inputCount,
    canonical_replay_legal_through: replay.replay.legalThroughStep,
    canonical_replay_win: replay.final.isWin,
    expected_event_bases_match: true,
  });
}

if (playableLevels.length !== specs.length) throw new Error(`playable queue export contains ${playableLevels.length} levels, expected ${specs.length}`);
const challengeNotes = packageLevels.find((level) => level.id === specs[2].id).design_notes as string;
if (!challengeNotes.includes("unique_within_budget") || !challengeNotes.includes("30000 状态预算耗尽")) {
  throw new Error("challenge delivery notes lost bounded-uniqueness limits");
}

const output = {
  schema_version: 1,
  verified_at: new Date().toISOString(),
  portfolio_id: "RA_PORTFOLIO_2026_07_15_GIANT_STICKY_PISTON_ORDER",
  prototype: "reality_anchor",
  build_command: "npx tsx src/playable/exportPlayable.ts prototypes/reality_anchor",
  playable_build_status: "built",
  level_source: "prototypes/reality_anchor/levels.yml",
  queue_source: "prototypes/reality_anchor/playable_queue.yml",
  playable_ref: "prototypes/reality_anchor/playable/data.json",
  exact_results: results,
  challenge_uniqueness_boundary: {
    declared_result: "unique_within_budget",
    raw_graph_status: "exhausted",
    max_states: 30000,
    complete_scc_claimed: false,
  },
  playtest_status: "pending_playtest",
  archive_status: "not_archived_waiting_for_playtest",
};

await writeFile(path.join(studioRoot, "delivery_verification.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
