import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import {
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = path.resolve(process.argv[2] ?? "candidate_v58.layout");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level = { id: "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001_V4_DIAG", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" as const } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const start = parseLevel(level);
const queue: CandleSokobanState[] = [start];
const seen = new Set([stateKey(start)]);
const counts = new Map<string, number>();
const examples = new Map<string, { events: string[]; state: string }>();
const exactEvents = new Map<string, number>();
const winning: Array<{ depth: number; state: string }> = [];
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (isWin(current, level.win)) {
    winning.push({ depth: 0, state: renderState(current) });
    continue;
  }
  for (const action of actions) {
    const transition = step(pkg.mechanic, current, action, { winCondition: level.win });
    if (!transition.legal) continue;
    const depth = current.globalBurnCountdown === 0 ? 0 : 0;
    for (const event of transition.events) {
      const prefix = event.split(":", 1)[0]!;
      counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
      if (!examples.has(prefix)) examples.set(prefix, { events: transition.events, state: renderState(transition.state) });
      if (prefix === "light_brazier") exactEvents.set(event, (exactEvents.get(event) ?? 0) + 1);
    }
    if (isWin(transition.state, level.win)) winning.push({ depth, state: renderState(transition.state) });
    const key = stateKey(transition.state);
    if (!seen.has(key)) {
      seen.add(key);
      queue.push(transition.state);
    }
  }
}
console.log(JSON.stringify({ layoutPath, states: queue.length, winStates: winning.length, eventCounts: Object.fromEntries(counts), lightBrazierEvents: Object.fromEntries(exactEvents), eventExamples: Object.fromEntries(examples) }, null, 2));
