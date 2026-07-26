import { readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";
import type { MechanicDoc, LevelDoc } from "../../../../../../../src/core/types.js";
import {
  isCandleSearchTerminal,
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleSokobanState,
} from "../../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = process.argv[2];
const outPath = process.argv[3];
if (!layoutPath || !outPath) {
  throw new Error("usage: tsx solution_family_audit.ts <layout> <out.json>");
}

const mechanic = YAML.parse(
  await readFile("prototypes/candle_sokoban/mechanic.yml", "utf8"),
) as MechanicDoc;
const layout = (await readFile(layoutPath, "utf8")).trimEnd();
const level: LevelDoc = {
  id: "REV002_FAMILY_AUDIT",
  title: "REV002_FAMILY_AUDIT",
  layout,
  win: { type: "all_braziers_lit" },
};
const initial = parseLevel(level);
const inputs = ["up", "down", "left", "right"] as const;

type Edge = {
  input: (typeof inputs)[number];
  to: string;
  events: string[];
  before: CandleSokobanState;
  after: CandleSokobanState;
};

const states = new Map<string, CandleSokobanState>();
const edges = new Map<string, Edge[]>();
const initialKey = stateKey(initial);
states.set(initialKey, initial);
const queue = [initialKey];
for (let index = 0; index < queue.length; index += 1) {
  const key = queue[index]!;
  const before = states.get(key)!;
  const outgoing: Edge[] = [];
  if (!isCandleSearchTerminal(before, level.win)) {
    for (const input of inputs) {
      const result = step(mechanic, before, input, { winCondition: level.win });
      if (!result.legal) continue;
      const to = stateKey(result.state);
      outgoing.push({ input, to, events: result.events, before, after: result.state });
      if (!states.has(to)) {
        states.set(to, result.state);
        queue.push(to);
      }
    }
  }
  edges.set(key, outgoing);
}

const flagNames = [
  "receiver_shrink_ignited",
  "a_lit_by_receiver_roll",
  "a_lit_by_worker_push",
  "b_lit_by_receiver_roll",
  "b_lit_by_worker",
  "receiver_rolled_len3",
  "receiver_rolled_len2",
  "receiver_rolled_left",
  "receiver_rolled_right",
] as const;

function candleLength(state: CandleSokobanState, id: string): number {
  return state.candles.find((candle) => candle.id === id)?.bodyCells.length ?? 0;
}

function applyFlags(mask: number, edge: Edge): number {
  let next = mask;
  const has = (prefix: string) => edge.events.some((event) => event.startsWith(prefix));
  if (has("shrink_ignite:candle#2")) next |= 1 << 0;
  const receiverRoll = has("roll_candle:candle#2");
  const workerPush = has("push_axis:candle#3");
  if (has("light_brazier:9,1")) {
    if (receiverRoll) next |= 1 << 1;
    if (workerPush) next |= 1 << 2;
  }
  if (has("light_brazier:4,2")) {
    if (receiverRoll) next |= 1 << 3;
    if (workerPush || has("roll_candle:candle#3")) next |= 1 << 4;
  }
  if (receiverRoll) {
    const length = candleLength(edge.before, "candle#2");
    if (length === 3) next |= 1 << 5;
    if (length === 2) next |= 1 << 6;
    if (edge.input === "left") next |= 1 << 7;
    if (edge.input === "right") next |= 1 << 8;
  }
  return next;
}

const masksByState = new Map<string, Set<number>>([[initialKey, new Set([0])]]);
const witness = new Map<string, { prev: string; prevMask: number; input: string; events: string[] }>();
const work: Array<{ key: string; mask: number }> = [{ key: initialKey, mask: 0 }];
for (let index = 0; index < work.length; index += 1) {
  const current = work[index]!;
  for (const edge of edges.get(current.key) ?? []) {
    const nextMask = applyFlags(current.mask, edge);
    let set = masksByState.get(edge.to);
    if (!set) {
      set = new Set();
      masksByState.set(edge.to, set);
    }
    if (set.has(nextMask)) continue;
    set.add(nextMask);
    witness.set(`${edge.to}|${nextMask}`, {
      prev: current.key,
      prevMask: current.mask,
      input: edge.input,
      events: edge.events,
    });
    work.push({ key: edge.to, mask: nextMask });
  }
}

function decode(mask: number): string[] {
  return flagNames.filter((_, index) => (mask & (1 << index)) !== 0);
}

function reconstruct(key: string, mask: number) {
  const inputsOut: string[] = [];
  const eventSteps: Array<{ input: string; events: string[] }> = [];
  while (key !== initialKey || mask !== 0) {
    const item = witness.get(`${key}|${mask}`);
    if (!item) throw new Error(`missing witness for ${key}|${mask}`);
    inputsOut.push(item.input);
    if (item.events.some((event) => !event.startsWith("walk") && !event.startsWith("countdown"))) {
      eventSteps.push({ input: item.input, events: item.events });
    }
    key = item.prev;
    mask = item.prevMask;
  }
  inputsOut.reverse();
  eventSteps.reverse();
  return { cost: inputsOut.length, inputs: inputsOut, event_steps: eventSteps };
}

const signatureMap = new Map<number, { winning_state_count: number; witness: ReturnType<typeof reconstruct> }>();
for (const [key, state] of states) {
  if (!isWin(state, level.win)) continue;
  for (const mask of masksByState.get(key) ?? []) {
    const previous = signatureMap.get(mask);
    if (previous) {
      previous.winning_state_count += 1;
    } else {
      signatureMap.set(mask, { winning_state_count: 1, witness: reconstruct(key, mask) });
    }
  }
}

const reverse = new Map<string, string[]>();
for (const [from, outgoing] of edges) {
  for (const edge of outgoing) {
    const incoming = reverse.get(edge.to) ?? [];
    incoming.push(from);
    reverse.set(edge.to, incoming);
  }
}
const winReachable = new Set<string>();
const reverseQueue = [...states.entries()]
  .filter(([, state]) => isWin(state, level.win))
  .map(([key]) => key);
for (const key of reverseQueue) winReachable.add(key);
for (let index = 0; index < reverseQueue.length; index += 1) {
  for (const previous of reverse.get(reverseQueue[index]!) ?? []) {
    if (winReachable.has(previous)) continue;
    winReachable.add(previous);
    reverseQueue.push(previous);
  }
}

function runProbe(id: string, probeInputs: Array<(typeof inputs)[number]>) {
  let state = initial;
  const eventSteps: Array<{ step: number; input: string; events: string[] }> = [];
  let legal = true;
  for (const [index, input] of probeInputs.entries()) {
    const result = step(mechanic, state, input, { winCondition: level.win });
    if (!result.legal) {
      legal = false;
      eventSteps.push({ step: index + 1, input, events: [`illegal:${result.reason}`] });
      break;
    }
    state = result.state;
    eventSteps.push({ step: index + 1, input, events: result.events });
  }
  const finalKey = stateKey(state);
  return {
    id,
    inputs: probeInputs,
    legal,
    final_win: isWin(state, level.win),
    final_state_can_reach_win: winReachable.has(finalKey),
    final_layout: renderState(state),
    event_steps: eventSteps,
  };
}

const report = {
  schema_version: "candle_solution_family_audit.v1",
  layout,
  reachable_states: states.size,
  legal_edges: [...edges.values()].reduce((sum, list) => sum + list.length, 0),
  winning_states: [...states.values()].filter((state) => isWin(state, level.win)).length,
  propagated_state_signatures: [...masksByState.values()].reduce((sum, set) => sum + set.size, 0),
  probes: [
    runProbe("wrong_role_receiver_takes_right_brazier", [
      "left", "left", "up", "up", "up", "right",
    ]),
  ],
  winning_signatures: [...signatureMap.entries()]
    .sort(([left], [right]) => left - right)
    .map(([mask, value]) => ({ mask, flags: decode(mask), ...value })),
};
await writeFile(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  reachable_states: report.reachable_states,
  winning_states: report.winning_states,
  winning_signature_count: report.winning_signatures.length,
  winning_signatures: report.winning_signatures.map(({ mask, flags, winning_state_count, witness }) => ({
    mask,
    flags,
    winning_state_count,
    witness_cost: witness.cost,
  })),
}, null, 2));
