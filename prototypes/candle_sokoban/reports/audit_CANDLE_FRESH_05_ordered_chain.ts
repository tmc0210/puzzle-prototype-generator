import { writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_05_PHASE_SPLIT_WEAVE";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const maxStates = 50_000;

type Item = {
  state: typeof initial;
  phase: number;
  lockPushes: number;
  inputs: string[];
};

const candle = (state: typeof initial, id: string) =>
  state.candles.find((candidate) => candidate.id === id);
const indexAfter = (events: string[], event: string, after: number) =>
  events.findIndex((candidate, index) => index > after && candidate === event);
const ordered = (events: string[], sequence: string[]) => {
  let cursor = -1;
  for (const event of sequence) {
    cursor = indexAfter(events, event, cursor);
    if (cursor < 0) return false;
  }
  return true;
};
const bodyKey = (state: typeof initial, id: string) => {
  const target = candle(state, id);
  return target
    ? [...target.bodyCells]
        .sort((left, right) => left.y - right.y || left.x - right.x)
        .map((cell) => `${cell.x},${cell.y}`)
        .join(";")
    : "missing";
};
const keyOf = (item: Pick<Item, "state" | "phase" | "lockPushes">) =>
  `${runtime.key(item.state)}|PH:${item.phase}|LP:${Math.min(item.lockPushes, 3)}`;

const initialItem: Item = {
  state: initial,
  phase: 0,
  lockPushes: 0,
  inputs: [],
};
const queue: Item[] = [initialItem];
const seen = new Set<string>([keyOf(initialItem)]);
let cursor = 0;
let bypass: Item | undefined;

while (cursor < queue.length && seen.size <= maxStates) {
  const current = queue[cursor++]!;
  for (const action of runtime.actions(current.state, options)) {
    const result = runtime.step(current.state, action, options);
    if (!result.legal) continue;
    let phase = current.phase;
    const phaseAtStart = current.phase;
    const lockPushes =
      current.lockPushes +
      result.events.filter((event) => event === "push_axis:candle#4").length;
    const candle1 = candle(result.state, "candle#1");
    const candle2 = candle(result.state, "candle#2");
    const candle3 = candle(result.state, "candle#3");
    const candle4 = candle(result.state, "candle#4");

    if (
      phaseAtStart === 0 &&
      action === "left" &&
      ordered(result.events, [
        "light_brazier:10,3",
        "extinguish:candle#1:concealed",
        "roll_candle:candle#2:d2",
      ]) &&
      candle1 &&
      !candle1.lit &&
      candle2?.lit &&
      bodyKey(result.state, "candle#2") === "9,4;9,5;9,6"
    ) {
      phase = 1;
    }
    if (
      phaseAtStart === 1 &&
      ordered(result.events, [
        "countdown:1->5",
        "shrink:candle#2:len2",
        "shrink:candle#4:len1",
        "shrink_ignite:candle#1",
      ]) &&
      candle1?.lit &&
      candle1.bodyCells.length === 4 &&
      candle2?.lit &&
      candle2.bodyCells.length === 2 &&
      candle4?.lit &&
      candle4.bodyCells.length === 1
    ) {
      phase = 2;
    }
    if (
      phaseAtStart === 2 &&
      action === "left" &&
      result.events.includes("push_axis:candle#4") &&
      candle4?.lit &&
      candle4.bodyCells.length === 1
    ) {
      phase = 3;
    }
    if (
      phaseAtStart === 3 &&
      ordered(result.events, [
        "countdown:1->5",
        "shrink:candle#1:len3",
        "shrink:candle#2:len1",
        "burn_out:candle#4",
      ]) &&
      lockPushes >= 3 &&
      candle1?.lit &&
      candle1.bodyCells.length === 3 &&
      candle2?.lit &&
      candle2.bodyCells.length === 1 &&
      !candle4
    ) {
      phase = 4;
    }
    if (
      phaseAtStart === 4 &&
      action === "down" &&
      ordered(result.events, [
        "light_brazier:8,5",
        "ignite:candle#3",
        "extinguish:candle#1:concealed",
        "roll_candle:candle#1:d6",
        "countdown:1->5",
        "burn_out:candle#2",
        "shrink:candle#3:len2",
      ]) &&
      candle1 &&
      !candle1.lit &&
      !candle2 &&
      candle3?.lit &&
      candle3.bodyCells.length === 2
    ) {
      phase = 5;
    }
    if (
      phaseAtStart === 5 &&
      ordered(result.events, [
        "countdown:1->5",
        "shrink:candle#3:len1",
      ]) &&
      candle3?.lit &&
      candle3.bodyCells.length === 1
    ) {
      phase = 6;
    }
    if (
      phaseAtStart === 6 &&
      action === "right" &&
      result.events.includes("light_brazier:9,8") &&
      result.events.includes("win_all_braziers_lit")
    ) {
      phase = 7;
    }

    const next: Item = {
      state: result.state,
      phase,
      lockPushes,
      inputs: [...current.inputs, action],
    };
    if (runtime.isWin(result.state, pkg.mechanic.win) && phase < 7) {
      bypass = next;
      break;
    }
    const key = keyOf(next);
    if (seen.has(key)) continue;
    seen.add(key);
    queue.push(next);
  }
  if (bypass) break;
}

const complete = !bypass && cursor >= queue.length;
const report = {
  level_id: levelId,
  audit: "find a winning path that omits or reorders the phase-split chain",
  required_ordered_stages: [
    "forced left roll lights 10,3, then extinguishes candle#1, and leaves lit candle#2 at x=9,y=4..6",
    "the forced right-hand detour crosses the first boundary, shrinking candle#2 to len2 and candle#4 to len1 before shrink-igniting unchanged len4 candle#1",
    "at least three left axis pushes advance the still-lit singleton candle#4 far enough to cross the upper corridor",
    "the next boundary leaves lit candle#1 len3 and candle#2 len1 while burning out candle#4",
    "down roll lights 8,5, ignites candle#3, extinguishes candle#1, then the same boundary burns out candle#2 and shrinks candle#3 to len2",
    "next boundary shrinks candle#3 to len1",
    "right roll lights 9,8 and wins",
  ],
  bypass_found: Boolean(bypass),
  bypass_phase: bypass?.phase,
  bypass_inputs: bypass?.inputs ?? [],
  search_status: bypass ? "found" : complete ? "complete" : "exhausted",
  explored_state_phase_pairs: seen.size,
  max_states: maxStates,
  interpretation: bypass
    ? "A winning path omitted or reordered at least one claimed stage."
    : complete
      ? "Every winning path completes all seven stages in the declared order."
      : "The budget was insufficient for an all-solution ordered-chain claim.",
};
const json = `${JSON.stringify(report, null, 2)}\n`;
await writeFile(
  `${root}/reports/CANDLE_FRESH_05_ORDERED_CHAIN_AUDIT.json`,
  json,
  "utf8",
);
console.log(json);
