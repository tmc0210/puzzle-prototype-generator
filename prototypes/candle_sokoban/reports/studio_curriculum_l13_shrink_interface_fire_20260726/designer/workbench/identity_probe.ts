import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";

type Node = {
  state: any;
  seenPreparation: boolean;
  seenTransfer: boolean;
  seenConsumer: boolean;
  violated: boolean;
  inputs: string[];
  eventSteps: string[][];
};

const layoutPath = process.argv[2];
const receiverId = process.argv[3] ?? "candle#2";
const goalCell = process.argv[4] ?? "4,1";
const requiredPreparationEvent =
  process.argv[5] ?? "extinguish_by_wall:candle#single2";
if (!layoutPath) {
  throw new Error(
    "usage: npx tsx identity_probe.ts <layout> [receiver-id] [goal-x,y] [required-preparation-event]",
  );
}
const pkg = await loadPrototypePackage(path.resolve("prototypes", "candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = {
  id: "CANDLE_CURRICULUM_L13_IDENTITY_PROBE",
  title: "CANDLE_CURRICULUM_L13_IDENTITY_PROBE",
  global_burn_cycle: 5,
  layout: (await readFile(path.resolve(layoutPath), "utf8")).replace(/\r/g, "").trimEnd(),
};
const winCondition = level.win ?? pkg.mechanic.win;
const initial = adapter.parseLevel(level);
const initialNode: Node = {
  state: initial,
  seenPreparation: false,
  seenTransfer: false,
  seenConsumer: false,
  violated: false,
  inputs: [],
  eventSteps: [],
};
const queue: Node[] = [initialNode];
const visited = new Set<string>([key(initialNode)]);
let cursor = 0;
let winningStates = 0;
let violationWitness: Node | undefined;
const skeletons = new Map<string, { count: number; witness: string[] }>();

while (cursor < queue.length) {
  const current = queue[cursor++]!;
  if (runtime.isWin(current.state, winCondition)) continue;
  for (const action of runtime.actions(current.state, { winCondition })) {
    const result = runtime.step(current.state, action, { winCondition });
    if (!result.legal) continue;
    const objectEvents = result.events.filter((event: string) =>
      event.startsWith("push_axis:") || event.startsWith("roll_candle:"),
    );
    const transferNow = result.events.includes(`shrink_ignite:${receiverId}`);
    const consumerNow =
      result.events.includes(`push_axis:${receiverId}`) &&
      result.events.includes(`light_brazier:${goalCell}`);
    const afterTransferBeforeConsumer = current.seenTransfer && !current.seenConsumer;
    const wrongObjectAfterTransfer =
      afterTransferBeforeConsumer &&
      objectEvents.some((event: string) => event !== `push_axis:${receiverId}`);
    const bPushWithoutOutputAfterTransfer =
      afterTransferBeforeConsumer &&
      objectEvents.includes(`push_axis:${receiverId}`) &&
      !consumerNow;
    const next: Node = {
      state: result.state,
      seenPreparation:
        current.seenPreparation || result.events.includes(requiredPreparationEvent),
      seenTransfer: current.seenTransfer || transferNow,
      seenConsumer: current.seenConsumer || consumerNow,
      violated: current.violated || wrongObjectAfterTransfer || bPushWithoutOutputAfterTransfer,
      inputs: [...current.inputs, action],
      eventSteps: [...current.eventSteps, result.events],
    };
    if (runtime.isWin(result.state, winCondition)) {
      winningStates += 1;
      const skeleton = next.eventSteps
        .flat()
        .filter((event) =>
          event.startsWith("push_axis:") ||
          event.startsWith("roll_candle:") ||
          event.startsWith("extinguish_by_wall:") ||
          event.startsWith("shrink_ignite:") ||
          event.startsWith("light_brazier:"),
        )
        .join(" -> ");
      const row = skeletons.get(skeleton);
      skeletons.set(skeleton, row ? { ...row, count: row.count + 1 } : { count: 1, witness: next.inputs });
      if (
        (!next.seenPreparation || !next.seenTransfer || !next.seenConsumer || next.violated) &&
        !violationWitness
      ) {
        violationWitness = next;
      }
      continue;
    }
    const nextKey = key(next);
    if (visited.has(nextKey)) continue;
    visited.add(nextKey);
    queue.push(next);
  }
}

process.stdout.write(`${JSON.stringify({
  status: "complete",
  augmented_states: visited.size,
  winning_transitions: winningStates,
  object_skeletons: [...skeletons.entries()].map(([skeleton, value]) => ({ skeleton, ...value })),
  violation_witness: violationWitness
    ? { inputs: violationWitness.inputs, event_steps: violationWitness.eventSteps }
    : null,
}, null, 2)}\n`);

function key(node: Node): string {
  return [
    runtime.key(node.state),
    node.seenPreparation ? "p1" : "p0",
    node.seenTransfer ? "t1" : "t0",
    node.seenConsumer ? "c1" : "c0",
    node.violated ? "v1" : "v0",
  ].join("|");
}
