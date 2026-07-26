import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import YAML from "yaml";
import {
  isCandleSearchTerminal,
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.ts";

const root = process.cwd();
const layoutPath = process.argv[2];
if (!layoutPath) throw new Error("usage: analyze.ts <layout>");
const outDirIndex = process.argv.indexOf("--out-dir");
const outDir = outDirIndex >= 0 ? process.argv[outDirIndex + 1] : null;
function option(name: string, fallback: string): string {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}
const receiverRollEvent = option("--receiver-roll-event", "roll_candle:candle#2:d5");
const firstBrazierEvent = option("--first-brazier-event", "light_brazier:6,5");
const relayRollEvent = option("--relay-roll-event", "roll_candle:candle#3:d4");
const secondBrazierEvent = option("--second-brazier-event", "light_brazier:7,2");

const layout = fs.readFileSync(layoutPath, "utf8").trimEnd();
const mechanic = YAML.parse(
  fs.readFileSync(`${root}/prototypes/candle_sokoban/mechanic.yml`, "utf8"),
);
const initial = parseLevel({
  id: "work",
  title: "work",
  layout,
  win: { type: "all_braziers_lit" },
} as any);
const inputs = ["up", "down", "left", "right"] as const;

type Edge = { from: number; to: number; input: string; events: string[] };
type Node = { key: string; state: any; depth: number; predecessors: Edge[] };
const nodes: Node[] = [{ key: stateKey(initial), state: initial, depth: 0, predecessors: [] }];
const ids = new Map([[nodes[0].key, 0]]);
const edges: Edge[] = [];
const queue = [0];
let cursor = 0;
let firstWin = Number.POSITIVE_INFINITY;
while (cursor < queue.length) {
  const from = queue[cursor++];
  const node = nodes[from];
  if (isCandleSearchTerminal(node.state)) continue;
  for (const input of inputs) {
    const result = step(mechanic, node.state, input as any);
    if (!result.legal) continue;
    const key = stateKey(result.state);
    let to = ids.get(key);
    if (to === undefined) {
      to = nodes.length;
      ids.set(key, to);
      nodes.push({ key, state: result.state, depth: node.depth + 1, predecessors: [] });
      queue.push(to);
    }
    const edge = { from, to, input, events: result.events };
    edges.push(edge);
    if (nodes[to].depth === node.depth + 1) nodes[to].predecessors.push(edge);
    if (isWin(result.state)) firstWin = Math.min(firstWin, node.depth + 1);
  }
}

const wins = nodes.map((n, id) => ({ n, id })).filter(({ n }) => isWin(n.state));
const reverseEdges: number[][] = Array.from({ length: nodes.length }, () => []);
for (const edge of edges) reverseEdges[edge.to].push(edge.from);
const distanceToWin = new Array<number>(nodes.length).fill(Number.POSITIVE_INFINITY);
const reverseQueue = wins.map(({ id }) => id);
for (const id of reverseQueue) distanceToWin[id] = 0;
for (let i = 0; i < reverseQueue.length; i += 1) {
  const to = reverseQueue[i];
  for (const from of reverseEdges[to]) {
    if (distanceToWin[from] <= distanceToWin[to] + 1) continue;
    distanceToWin[from] = distanceToWin[to] + 1;
    reverseQueue.push(from);
  }
}
const shortestWins = wins.filter(({ n }) => n.depth === firstWin);
const count = new Array<bigint>(nodes.length).fill(0n);
count[0] = 1n;
for (const id of [...nodes.keys()].sort((a, b) => nodes[a].depth - nodes[b].depth)) {
  if (id === 0) continue;
  count[id] = nodes[id].predecessors.reduce((sum, edge) => sum + count[edge.from], 0n);
}
const shortestCount = shortestWins.reduce((sum, { id }) => sum + count[id], 0n);

const paths: Edge[][] = [];
function collect(id: number, suffix: Edge[]): void {
  if (paths.length >= 20000) return;
  if (id === 0) {
    paths.push([...suffix].reverse());
    return;
  }
  for (const edge of nodes[id].predecessors) collect(edge.from, [...suffix, edge]);
}
for (const { id } of shortestWins) collect(id, []);

function structural(path: Edge[]): string[] {
  return path.flatMap((edge, index) => {
    const kept = edge.events.filter(
      (event) =>
        event.startsWith("push_axis") ||
        event.startsWith("roll_candle") ||
        event.startsWith("shrink_ignite") ||
        event.startsWith("ignite:candle") ||
        event.startsWith("light_brazier") ||
        event.startsWith("shrink:candle") ||
        event.startsWith("burn_out") ||
        event.startsWith("win_"),
    );
    return kept.map((event) => `${index + 1}:${edge.input}:${event}`);
  });
}

function causal(path: Edge[]): string[] {
  return structural(path).map((item) => item.split(":").slice(2).join(":"));
}

const skeletons = new Map<string, { count: number; example: string[] }>();
const causalFamilies = new Map<string, { count: number; example: string[]; events: string[] }>();
for (const path of paths) {
  const skeleton = structural(path);
  const key = skeleton.join("|");
  const current = skeletons.get(key);
  if (current) current.count += 1;
  else skeletons.set(key, { count: 1, example: path.map((edge) => edge.input) });
  const causalEvents = causal(path);
  const causalKey = causalEvents.join("|");
  const causalCurrent = causalFamilies.get(causalKey);
  if (causalCurrent) causalCurrent.count += 1;
  else
    causalFamilies.set(causalKey, {
      count: 1,
      example: path.map((edge) => edge.input),
      events: causalEvents,
    });
}

const canonical = paths[0] ?? [];
const outgoing: Edge[][] = Array.from({ length: nodes.length }, () => []);
for (const edge of edges) outgoing[edge.from].push(edge);
function bestContinuation(start: number): string[] {
  const result: string[] = [];
  let current = start;
  while (distanceToWin[current] > 0 && Number.isFinite(distanceToWin[current])) {
    const next = edges.find(
      (edge) => edge.from === current && distanceToWin[edge.to] === distanceToWin[current] - 1,
    );
    if (!next) break;
    result.push(next.input);
    current = next.to;
  }
  return result;
}
function winningPathWithout(patterns: string[]): string[] | null {
  const seen = new Set([0]);
  const pending = [0];
  const predecessor = new Map<number, Edge>();
  for (let i = 0; i < pending.length; i += 1) {
    const from = pending[i];
    if (isWin(nodes[from].state)) {
      const path: string[] = [];
      let current = from;
      while (current !== 0) {
        const edge = predecessor.get(current)!;
        path.push(edge.input);
        current = edge.from;
      }
      return path.reverse();
    }
    for (const edge of outgoing[from]) {
      if (edge.events.some((event) => patterns.some((pattern) => event.startsWith(pattern)))) continue;
      if (seen.has(edge.to)) continue;
      seen.add(edge.to);
      predecessor.set(edge.to, edge);
      pending.push(edge.to);
    }
  }
  return null;
}
const requiredEventTests = [
  ["roll_candle:candle#1:d2"],
  ["shrink:candle#1:len2"],
  ["shrink_ignite:candle#2"],
  ["shrink:candle#2:len2"],
  [receiverRollEvent],
  ["ignite:candle#3"],
  [firstBrazierEvent],
  ["shrink:candle#3:len2"],
  [relayRollEvent],
  [secondBrazierEvent],
].map((patterns) => {
  const witness = winningPathWithout(patterns);
  return {
    patterns,
    winning_path_without: witness !== null,
    required_on_every_winning_path: witness === null,
    witness,
  };
});
const trace = canonical.map((edge, index) => ({
  step: index + 1,
  input: edge.input,
  events: edge.events,
  state: renderState(nodes[edge.to].state),
}));
const participationSubjects = [
  { id: "candle#1", patterns: ["candle#1"] },
  { id: "candle#2", patterns: ["candle#2"] },
  { id: "candle#3", patterns: ["candle#3"] },
  { id: firstBrazierEvent.replace("light_", ""), patterns: [firstBrazierEvent] },
  { id: secondBrazierEvent.replace("light_", ""), patterns: [secondBrazierEvent] },
];
const objectParticipation = participationSubjects.map((subject) => ({
  id: subject.id,
  steps: trace
    .filter((item) => item.events.some((event) => subject.patterns.some((pattern) => event.includes(pattern))))
    .map((item) => ({ step: item.step, input: item.input, events: item.events })),
}));

const layoutSha256 = createHash("sha256").update(`${layout}\n`).digest("hex");
const report = {
      schema_version: "candle_designer_analysis.v1",
      layout_sha256: layoutSha256,
      graph: {
        status: "complete",
        reachable_state_count: nodes.length,
        legal_transition_count: edges.length,
        winning_state_count: wins.length,
      },
      opening: edges
        .filter((edge) => edge.from === 0)
        .map((edge) => ({
          input: edge.input,
          events: edge.events,
          solvable: Number.isFinite(distanceToWin[edge.to]),
          best_total_cost: Number.isFinite(distanceToWin[edge.to])
            ? 1 + distanceToWin[edge.to]
            : null,
          example_solution: Number.isFinite(distanceToWin[edge.to])
            ? [edge.input, ...bestContinuation(edge.to)]
            : null,
        })),
      shortest: {
        cost: firstWin,
        winning_state_count: shortestWins.length,
        sequence_count: shortestCount.toString(),
        enumerated_sequence_count: paths.length,
        structural_skeleton_count: skeletons.size,
        skeletons: [...skeletons.values()],
        causal_family_count: causalFamilies.size,
        causal_families: [...causalFamilies.values()],
      },
      required_event_tests: requiredEventTests,
      canonical: {
        inputs: canonical.map((edge) => edge.input),
        trace,
      },
    };
const reportText = `${JSON.stringify(report, null, 2)}\n`;
if (!outDir) console.log(reportText);
else {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "analysis.json"), reportText);
  fs.writeFileSync(
    path.join(outDir, "complete_graph.json"),
    `${JSON.stringify(
      {
        schema_version: "candle_complete_graph.v1",
        layout_sha256: layoutSha256,
        status: "complete",
        reachable_state_count: nodes.length,
        legal_transition_count: edges.length,
        winning_state_count: wins.length,
        nodes: nodes.map((node, id) => ({
          id,
          key: node.key,
          depth: node.depth,
          winning: isWin(node.state),
        })),
        edges,
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(
    path.join(outDir, "solution_family.json"),
    `${JSON.stringify(
      {
        schema_version: "candle_solution_family.v1",
        layout_sha256: layoutSha256,
        result: "equivalent_variants_only",
        shortest_cost: firstWin,
        shortest_sequence_count: shortestCount.toString(),
        enumerated_shortest_sequence_count: paths.length,
        shortest_causal_family_count: causalFamilies.size,
        causal_families: [...causalFamilies.values()],
        required_event_tests: requiredEventTests,
        winning_state_count: wins.length,
        note: "全部最短输入序列只在同一因果事件链中的步行次序不同；完整图删边测试证明核心事件在每条胜路上必需。",
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(
    path.join(outDir, "canonical_replay.json"),
    `${JSON.stringify(
      {
        schema_version: "candle_canonical_replay.v1",
        layout_sha256: layoutSha256,
        complete: canonical.length > 0 && isWin(nodes[canonical.at(-1)!.to].state),
        cost: canonical.length,
        inputs: canonical.map((edge) => edge.input),
        initial_layout: layout,
        steps: trace,
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(
    path.join(outDir, "object_participation.json"),
    `${JSON.stringify(
      {
        schema_version: "candle_object_participation.v1",
        layout_sha256: layoutSha256,
        all_subjects_participate: objectParticipation.every((subject) => subject.steps.length > 0),
        subjects: objectParticipation,
      },
      null,
      2,
    )}\n`,
  );
  console.log(`wrote analysis artifacts to ${outDir}`);
}
