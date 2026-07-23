import { loadPrototypePackage } from "../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/candle_sokoban";
const levelId = "CANDLE_FRESH_01_BURNED_GATE_RETURN";
const pkg = await loadPrototypePackage(root);
const level = pkg.levels.levels.find((item) => item.id === levelId);
if (!level) throw new Error(`missing level ${levelId}`);

const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };

type Item = {
  state: typeof initial;
  depth: number;
  signature: string;
  example: string[];
  count: bigint;
};

const eventSignature = (events: string[]) =>
  events
    .filter((event) => !event.startsWith("walk") && !event.startsWith("countdown:"))
    .join("|");
const keyOf = (state: typeof initial, signature: string) =>
  `${runtime.key(state)}\n${signature}`;

const queue: Item[] = [
  { state: initial, depth: 0, signature: "", example: [], count: 1n },
];
const seen = new Map<string, Item>([[keyOf(initial, ""), queue[0]!]]);
let cursor = 0;
let shortestDepth: number | undefined;
const wins = new Map<string, { count: bigint; example: string[] }>();

while (cursor < queue.length) {
  const current = queue[cursor++]!;
  if (shortestDepth !== undefined && current.depth >= shortestDepth) continue;
  for (const action of runtime.actions(current.state, options)) {
    const result = runtime.step(current.state, action, options);
    if (!result.legal) continue;
    const depth = current.depth + 1;
    const stepEvents = eventSignature(result.events);
    const signature = [current.signature, stepEvents].filter(Boolean).join(">");
    const example = [...current.example, action];
    if (runtime.isWin(result.state, pkg.mechanic.win)) {
      shortestDepth ??= depth;
      if (depth !== shortestDepth) continue;
      const prior = wins.get(signature);
      wins.set(signature, {
        count: (prior?.count ?? 0n) + current.count,
        example: prior?.example ?? example,
      });
      continue;
    }
    if (shortestDepth !== undefined && depth >= shortestDepth) continue;
    const key = keyOf(result.state, signature);
    const prior = seen.get(key);
    if (prior && prior.depth === depth) {
      prior.count += current.count;
      continue;
    }
    if (prior) continue;
    const item: Item = {
      state: result.state,
      depth,
      signature,
      example,
      count: current.count,
    };
    seen.set(key, item);
    queue.push(item);
  }
}

const total = [...wins.values()].reduce((sum, win) => sum + win.count, 0n);
console.log(JSON.stringify({
  level_id: levelId,
  search_status: "complete_through_shortest_depth",
  shortest_depth: shortestDepth,
  shortest_input_sequences: total.toString(),
  distinct_non_walk_event_signatures: wins.size,
  signatures: [...wins.entries()].map(([signature, win]) => ({
    count: win.count.toString(),
    example_inputs: win.example,
    signature,
  })),
  visited_state_signature_pairs: seen.size,
}, null, 2));
