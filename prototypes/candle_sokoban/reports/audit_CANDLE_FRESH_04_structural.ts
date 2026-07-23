import { loadPrototypePackage } from "../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { writeFile } from "node:fs/promises";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_04_SMOTHERED_REVERSE_RELAY";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const maxStates = 300_000;

type Item = {
  state: typeof initial;
  phase: number;
  crossedBurnBoundary: boolean;
  inputs: string[];
};

const mainCandle = (state: typeof initial) =>
  state.candles.find((candle) => candle.id === "candle#1");
const relayCandle = (state: typeof initial) =>
  state.candles.find((candle) => candle.id === "candle#2");
const mainCells = (state: typeof initial) => {
  const main = mainCandle(state);
  return main
    ? [...main.bodyCells]
        .sort((a, b) => a.y - b.y || a.x - b.x)
        .map((point) => `${point.x},${point.y}`)
        .join(";")
    : "missing";
};
const allMainCellsOnRow = (state: typeof initial, y: number) => {
  const main = mainCandle(state);
  return Boolean(main && main.bodyCells.every((cell) => cell.y === y));
};
const eventIndexAfter = (events: string[], event: string, after: number) =>
  events.findIndex((candidate, index) => index > after && candidate === event);
const keyOf = (item: Pick<Item, "state" | "phase" | "crossedBurnBoundary">) =>
  `${runtime.key(item.state)}|PH:${item.phase}|CB:${Number(item.crossedBurnBoundary)}`;
const initialItem: Item = {
  state: initial,
  phase: 0,
  crossedBurnBoundary: false,
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
    const cells = mainCells(result.state);
    const main = mainCandle(result.state);
    const relay = relayCandle(result.state);
    const crossedBurnBoundary =
      current.crossedBurnBoundary ||
      result.events.some((event) => event.startsWith("countdown:1->"));
    let phase = current.phase;

    if (phase === 0) {
      const firstTarget = eventIndexAfter(result.events, "light_brazier:12,5", -1);
      const smother = eventIndexAfter(
        result.events,
        "extinguish:candle#1:concealed",
        firstTarget,
      );
      if (
        firstTarget >= 0 &&
        smother > firstTarget &&
        main &&
        !main.lit &&
        allMainCellsOnRow(result.state, 2)
      ) {
        phase = 1;
      }
    }
    if (
      phase === 1 &&
      !current.crossedBurnBoundary &&
      result.events.some((event) => event.startsWith("countdown:1->")) &&
      result.events.includes("burn_out:candle#single1") &&
      result.events.includes("burn_out:candle#single4")
    ) {
      phase = 2;
    }
    if (
      phase === 2 &&
      action === "left" &&
      result.events.includes("push_axis:candle#1") &&
      cells === "2,2;3,2;4,2;5,2;6,2;7,2;8,2;9,2;10,2" &&
      main &&
      !main.lit
    ) {
      phase = 3;
    }
    if (
      phase === 3 &&
      result.events.includes("ignite:candle#1") &&
      cells.split(";").every((cell) => cell.endsWith(",8")) &&
      cells.startsWith("2,8") &&
      main?.lit
    ) {
      phase = 4;
    }
    if (
      phase === 4 &&
      result.events.includes("roll_candle:candle#1:d6") &&
      allMainCellsOnRow(result.state, 2) &&
      main?.lit
    ) {
      phase = 5;
    }
    if (
      phase === 5 &&
      result.events.includes("push_axis:candle#1") &&
      result.events.includes("ignite:candle#2") &&
      result.events.includes("light_brazier:13,2") &&
      relay?.lit
    ) {
      phase = 6;
    }
    if (phase === 6 && result.events.includes("shrink:candle#2:len3")) {
      phase = 7;
    }
    if (phase === 7 && result.events.includes("shrink:candle#2:len2")) {
      phase = 8;
    }
    if (phase === 8 && result.events.includes("light_brazier:14,4")) {
      phase = 9;
    }
    const next: Item = {
      state: result.state,
      phase,
      crossedBurnBoundary,
      inputs: [...current.inputs, action],
    };
    if (
      runtime.isWin(result.state, pkg.mechanic.win) &&
      phase < 9
    ) {
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
const stageOrder = [
  "first roll lights 12,5 before extinguishing candle#1; candle#1 ends unlit on y=2",
  "the first countdown boundary burns out candle#single1 and candle#single4 together",
  "an unlit left axis push leaves candle#1 exactly at x=2..10,y=2",
  "ignite:candle#1 leaves a lit candle#1 wholly on y=8 with left edge x=2",
  "lit candle#1 returns wholly to y=2 via roll_candle:candle#1:d6",
  "a right axis push ignites candle#2 and lights brazier 13,2 in the same action",
  "candle#2 shrinks to len3",
  "candle#2 then shrinks to len2",
  "brazier 14,4 lights only after all previous stages",
];
const report = {
  level_id: levelId,
  audit: "find a winning path that omits or reorders the claimed structural chain",
  required_ordered_stages: stageOrder,
  bypass_found: Boolean(bypass),
  bypass_phase: bypass?.phase,
  bypass_inputs: bypass?.inputs ?? [],
  search_status: bypass ? "found" : complete ? "complete" : "exhausted",
  explored_state_phase_pairs: seen.size,
  max_states: maxStates,
  interpretation: bypass
    ? "A winning path omitted or reordered at least one claimed structural stage."
    : complete
      ? "Every winning path completes all nine structural stages in the declared order."
      : "The budget was insufficient for an all-solution ordered-structure claim.",
};
const json = `${JSON.stringify(report, null, 2)}\n`;
await writeFile(
  `${root}/reports/CANDLE_FRESH_04_STRUCTURAL_AUDIT.json`,
  json,
  "utf8",
);
console.log(json);
