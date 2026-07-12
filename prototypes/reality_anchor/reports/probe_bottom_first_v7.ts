import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const layout = (await readFile("prototypes/reality_anchor/reports/RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_layout_v7.txt", "utf8")).trimEnd();
const level: LevelDoc = { id: "RA_CRO_v7_bottom_first_probe", title: "bottom first", layout, win: pkg.mechanic.win };
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const prefix = ["down","right","right","up","left","left","up","left","down","left","left","down","right","right","up","up","up","right"];
const replay = adapter.replay(pkg.mechanic, initial, prefix, { winCondition: level.win ?? pkg.mechanic.win });
const continuation = solveWithRuntime(runtime, replay.state, {
  winCondition: level.win ?? pkg.mechanic.win,
  maxStates: 750_000,
  maxDepth: 120,
});
console.log(JSON.stringify({
  candidateVersion: "RA_FRESH_2026_07_12_CUT_REBIND_ORTHOGONAL_v7",
  branch: "bottom_first_after_step14",
  prefix,
  prefixLegal: replay.legal,
  prefixWin: adapter.isWin(replay.state, level.win ?? pkg.mechanic.win),
  branchState: adapter.renderState(replay.state),
  continuation: {
    found: continuation.found,
    searchStatus: continuation.searchStatus,
    exploredStates: continuation.exploredStates,
    depth: continuation.depth,
    cost: continuation.cost,
    reason: continuation.reason,
    inputs: continuation.inputs,
    events: continuation.events,
  },
}, null, 2));
