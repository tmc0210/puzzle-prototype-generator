import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { parseLevel, renderState, replay } from "../../../src/prototypes/ice_slide_escape/mechanics.js";
import type { LevelDoc } from "../../../src/core/types.js";

const [, , layoutPath, startRaw, goalRaw, ...inputs] = process.argv;

if (!layoutPath || !startRaw || !goalRaw || inputs.length === 0) {
  throw new Error("usage: replay_scratch.ts layout.txt sx,sy gx,gy input...");
}

function point(raw: string): [number, number] {
  const [xRaw, yRaw] = raw.split(",");
  const x = Number(xRaw);
  const y = Number(yRaw);
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error(`bad point: ${raw}`);
  }
  return [x, y];
}

const pkg = await loadPrototypePackage("prototypes/ice_slide_escape");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "scratch_replay",
  title: "scratch_replay",
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: [],
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: [],
  expected_llm_player_evidence: [],
  layout,
  win: {
    type: "ice_slide_escape_explicit_goal",
    player_start: point(startRaw),
    player_goal: point(goalRaw),
  },
};

const initial = parseLevel(level);
console.log("initial");
console.log(renderState(initial));
let state = initial;
const allEvents: string[] = [];

for (const [index, input] of inputs.entries()) {
  const result = replay(pkg.mechanic, state, [input as "up" | "down" | "left" | "right"], {
    winCondition: level.win,
  });
  console.log(`\n${index + 1}. ${input} legal=${result.legal}`);
  console.log(result.events.join(" ") || "none");
  console.log(renderState(result.state));
  allEvents.push(...result.events);
  state = result.state;
}

console.log(`\nall events: ${allEvents.join(" ") || "none"}`);
