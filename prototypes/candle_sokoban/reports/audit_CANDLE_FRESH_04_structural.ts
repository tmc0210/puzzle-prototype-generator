import { loadPrototypePackage } from "../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

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

type Flags = {
  alignedReversePush: boolean;
  stableSourceIgnite: boolean;
};
type Item = {
  state: typeof initial;
  flags: Flags;
  inputs: string[];
};

const mainCells = (state: typeof initial) => {
  const main = state.candles.find((candle) => candle.id === "candle#1");
  return main
    ? [...main.bodyCells]
        .sort((a, b) => a.y - b.y || a.x - b.x)
        .map((point) => `${point.x},${point.y}`)
        .join(";")
    : "missing";
};
const keyOf = (item: Pick<Item, "state" | "flags">) =>
  `${runtime.key(item.state)}|AR:${Number(item.flags.alignedReversePush)}|SI:${Number(item.flags.stableSourceIgnite)}`;
const initialItem: Item = {
  state: initial,
  flags: { alignedReversePush: false, stableSourceIgnite: false },
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
    const flags = {
      alignedReversePush:
        current.flags.alignedReversePush ||
        (
          action === "left" &&
          result.events.includes("push_axis:candle#1") &&
          cells === "2,2;3,2;4,2;5,2;6,2;7,2;8,2;9,2;10,2"
        ),
      stableSourceIgnite:
        current.flags.stableSourceIgnite ||
        (
          result.events.includes("ignite:candle#1") &&
          cells.split(";").every((cell) => cell.endsWith(",8")) &&
          cells.startsWith("2,8")
        ),
    };
    const next: Item = {
      state: result.state,
      flags,
      inputs: [...current.inputs, action],
    };
    if (
      runtime.isWin(result.state, pkg.mechanic.win) &&
      (!flags.alignedReversePush || !flags.stableSourceIgnite)
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
console.log(JSON.stringify({
  level_id: levelId,
  audit: "find a winning path that omits exact reverse alignment or stable-source ignition",
  required_structural_facts: {
    aligned_reverse_push: "left axis push leaves unlit candle#1 at x=2..10,y=2",
    stable_source_ignite: "ignite:candle#1 ends with candle#1 wholly on y=8 and left edge x=2; same-action shortening is allowed",
  },
  bypass_found: Boolean(bypass),
  bypass_flags: bypass?.flags,
  bypass_inputs: bypass?.inputs ?? [],
  search_status: bypass ? "found" : complete ? "complete" : "exhausted",
  explored_state_flag_pairs: seen.size,
  max_states: maxStates,
  interpretation: bypass
    ? "A winning path omitted at least one claimed structural fact."
    : complete
      ? "Every winning path contains the exact reverse alignment and stable-source ignition."
      : "The budget was insufficient for an all-solution structural claim.",
}, null, 2));
