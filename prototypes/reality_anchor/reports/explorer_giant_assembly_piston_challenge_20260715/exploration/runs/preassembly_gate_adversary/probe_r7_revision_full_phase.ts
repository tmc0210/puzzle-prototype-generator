import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type MacroEdge = {
  previous: string;
  input: InputId;
  origin: Point;
  events: string[];
};
type MacroNode = {
  state: RealityAnchorState;
  key: string;
  region: Point[];
};

const adversaryRoot = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_adversary",
);
const sourceRoot = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7",
);
const layout = (await readFile(path.join(sourceRoot, "layouts/preassembly_gate_r7_v0.layout.txt"), "utf8")).trimEnd();
const intended = JSON.parse(await readFile(path.join(sourceRoot, "audit_v0.json"), "utf8")) as {
  intendedInputs: InputId[];
  summary: { fullMergeStep: number };
};
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const initial = parseLevel({ id: "r7_revision_full_phase", title: "r7_revision_full_phase", layout } satisfies LevelDoc);
const canonicalFull = stateAfter(initial, intended.intendedInputs.slice(0, intended.summary.fullMergeStep));
canonicalFull.walls = initial.walls;
canonicalFull.goals = initial.goals;
const maxMacroStates = Number(process.env.MAX_MACRO_STATES ?? 500);
const goals: Point[] = [{ x: 11, y: 4 }, { x: 11, y: 8 }];

const start = makeNode(canonicalFull);
const queue: MacroNode[] = [start];
const seen = new Set<string>([start.key]);
const parent = new Map<string, MacroEdge>();
const depth = new Map<string, number>([[start.key, 0]]);
let cursor = 0;
let forceEdges = 0;
let walkCellsScanned = 0;
type FindingBucket = { count: number; samples: Array<Record<string, unknown>> };
const findings = {
  wins: bucket(),
  partialBanks: bucket(),
  earlyHorizontalSticky: bucket(),
  downSticky: bucket(),
  pullSticky: bucket(),
  anchorMoves: bucket(),
  splitOrConversionBeforeWin: bucket(),
};
const winDepths = new Set<number>();
const stickyTopYs = new Set<number>();
const objectActionSignatures = new Set<string>();

while (cursor < queue.length && seen.size < maxMacroStates) {
  const node = queue[cursor++]!;
  if (cursor % 100 === 0) {
    process.stderr.write(`progress cursor=${cursor} seen=${seen.size} heapMB=${Math.round(process.memoryUsage().heapUsed / 1_048_576)}\n`);
  }
  walkCellsScanned += node.region.length;
  const occupied = occupiedKeys(node.state);
  for (const group of node.state.stickyGroups) {
    if (group.length === 20) stickyTopYs.add(Math.min(...group.map((cell) => cell.y)));
  }
  if (isWin(node.state)) continue;

  for (const origin of node.region) {
    const atOrigin = { ...node.state, player: { ...origin } };
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const vector = inputVector(input);
      const forceTarget = forceModeAt(node.state, origin) === "pull"
        ? { x: origin.x - vector.x, y: origin.y - vector.y }
        : { x: origin.x + vector.x, y: origin.y + vector.y };
      if (!occupied.has(pointKey(forceTarget))) continue;
      const result = step(pkg.mechanic, atOrigin, input);
      if (!result.legal || !movesObject(result.events)) continue;
      // 地形/目标在本图中不可变；去重共享静态 Set，避免每个 runtime clone 各存一份墙图。
      result.state.walls = initial.walls;
      result.state.goals = initial.goals;
      forceEdges += 1;
      objectActionSignatures.add(`${pointKey(origin)}:${input}:${result.events.join("+")}`);
      const next = makeNode(result.state);
      const nextDepth = (depth.get(node.key) ?? 0) + 1;
      let cachedEntry: Record<string, unknown> | undefined;
      const entry = (): Record<string, unknown> => cachedEntry ??= ({
        depth: nextDepth,
        origin,
        input,
        events: result.events,
        maskAfter: coveredMask(result.state),
        stickySizesAfter: sizes(result.state),
        trace: reconstruct(node.key).concat({ origin, input, events: result.events }),
      });

      const mask = coveredMask(result.state);
      if (mask === 1 || mask === 2) record(findings.partialBanks, entry);
      if (result.events.some((event) => event.startsWith("anchor_boundary_shift:"))) record(findings.anchorMoves, entry);
      if (input === "down" && movesSticky(result.events)) record(findings.downSticky, entry);
      if (result.events.some((event) => event.startsWith("pull_object:sticky#"))) record(findings.pullSticky, entry);
      if ((input === "left" || input === "right") && movesSticky(result.events)) {
        const full = atOrigin.stickyGroups.find((group) => group.length === 20);
        const topY = full ? Math.min(...full.map((cell) => cell.y)) : null;
        if (topY !== 4) record(findings.earlyHorizontalSticky, () => ({ ...entry(), topYBefore: topY }));
      }
      if (!isWin(result.state) && result.events.some((event) =>
        event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:")
        || event.startsWith("sticky_split:") || event.startsWith("anchor_boundary_shift:")
      )) record(findings.splitOrConversionBeforeWin, entry);
      if (isWin(result.state)) {
        record(findings.wins, entry);
        winDepths.add(nextDepth);
      }

      if (seen.has(next.key)) continue;
      seen.add(next.key);
      parent.set(next.key, { previous: node.key, input, origin: { ...origin }, events: [...result.events] });
      depth.set(next.key, nextDepth);
      queue.push(next);
    }
  }
}

const status = cursor === queue.length ? "complete" : "exhausted";
const report = {
  schema: "ra_r7_revision_full_phase_adversary_v0",
  status,
  maxMacroStates,
  macroStates: seen.size,
  expanded: cursor,
  forceEdges,
  walkCellsScanned,
  canonicalFullRender: renderState(canonicalFull),
  stickyTopYs: [...stickyTopYs].sort((a, b) => a - b),
  objectActionSignatureCount: objectActionSignatures.size,
  findings: {
    wins: findings.wins.count,
    winDepths: [...winDepths].sort((a, b) => a - b),
    partialBanks: findings.partialBanks.count,
    earlyHorizontalSticky: findings.earlyHorizontalSticky.count,
    downSticky: findings.downSticky.count,
    pullSticky: findings.pullSticky.count,
    anchorMoves: findings.anchorMoves.count,
    splitOrConversionBeforeWin: findings.splitOrConversionBeforeWin.count,
  },
  samples: {
    wins: findings.wins.samples,
    partialBanks: findings.partialBanks.samples,
    earlyHorizontalSticky: findings.earlyHorizontalSticky.samples,
    downSticky: findings.downSticky.samples,
    pullSticky: findings.pullSticky.samples,
    anchorMoves: findings.anchorMoves.samples,
    splitOrConversionBeforeWin: findings.splitOrConversionBeforeWin.samples,
  },
  evidenceBoundary: "从 intended 首次完整合体的实际 runtime 状态出发，将每个物件配置内的纯走闭包折叠后穷举所有真实 push/pull；不覆盖其他非标准 full-merge 入口，需与 preassembly 审计合取。",
};

await writeFile(path.join(adversaryRoot, "r7_revision_full_phase_audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  status,
  macroStates: report.macroStates,
  expanded: report.expanded,
  forceEdges,
  stickyTopYs: report.stickyTopYs,
  findings: report.findings,
}, null, 2)}\n`);

function makeNode(state: RealityAnchorState): MacroNode {
  const region = walkRegion(state);
  const representative = region[0]!;
  const normalized = { ...state, player: { ...representative } };
  return {
    state: normalized,
    region,
    key: `${objectGeometry(normalized)}@${pointKey(representative)}`,
  };
}

function walkRegion(state: RealityAnchorState): Point[] {
  const occupied = occupiedKeys(state);
  const points: Point[] = [{ ...state.player }];
  const seenPoints = new Set<string>([pointKey(state.player)]);
  for (let cursor = 0; cursor < points.length; cursor += 1) {
    const player = points[cursor]!;
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const vector = inputVector(input);
      const destination = { x: player.x + vector.x, y: player.y + vector.y };
      const destinationKey = pointKey(destination);
      if (
        destination.x < 0 || destination.y < 0
        || destination.x >= state.width || destination.y >= state.height
        || state.walls.has(destinationKey) || occupied.has(destinationKey)
      ) continue;
      if (forceModeAt(state, player) === "pull") {
        const behind = { x: player.x - vector.x, y: player.y - vector.y };
        if (occupied.has(pointKey(behind))) continue;
      }
      const key = destinationKey;
      if (seenPoints.has(key)) continue;
      seenPoints.add(key);
      points.push(destination);
    }
  }
  return points.sort((left, right) => left.y - right.y || left.x - right.x);
}

function reconstruct(key: string): Array<Record<string, unknown>> {
  const edges: Array<Record<string, unknown>> = [];
  let cursorKey = key;
  while (cursorKey !== start.key) {
    const edge = parent.get(cursorKey);
    if (!edge) break;
    edges.push({ origin: edge.origin, input: edge.input, events: edge.events });
    cursorKey = edge.previous;
  }
  return edges.reverse();
}

function stateAfter(startState: RealityAnchorState, inputs: InputId[]): RealityAnchorState {
  let state = startState;
  for (const input of inputs) {
    const result = step(pkg.mechanic, state, input);
    if (!result.legal) throw new Error(`canonical prefix illegal: ${input} / ${result.reason ?? "unknown"}`);
    state = result.state;
  }
  return state;
}

function objectGeometry(state: RealityAnchorState): string {
  return JSON.stringify({
    crates: state.crates.map(pointKey).sort(),
    sticky: state.stickyGroups.map((group) => group.map(pointKey).sort()).sort((a, b) => a.join("|").localeCompare(b.join("|"))),
    pushPull: state.pushPullAnchor ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)] : null,
    boxSticky: state.boxStickyAnchor ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)] : null,
  });
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return goals.reduce((mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask, 0);
}

function movesObject(events: string[]): boolean {
  return events.some((event) => event.startsWith("push_object:") || event.startsWith("pull_object:"));
}

function movesSticky(events: string[]): boolean {
  return events.some((event) => event.startsWith("push_object:sticky#") || event.startsWith("pull_object:sticky#"));
}

function sizes(state: RealityAnchorState): number[] {
  return state.stickyGroups.map((group) => group.length).sort((left, right) => left - right);
}

function occupiedKeys(state: RealityAnchorState): Set<string> {
  return new Set<string>([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flatMap((group) => group.map(pointKey)),
    ...(state.pushPullAnchor ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)] : []),
    ...(state.boxStickyAnchor ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)] : []),
  ]);
}

function inputVector(input: InputId): Point {
  switch (input) {
    case "up": return { x: 0, y: -1 };
    case "down": return { x: 0, y: 1 };
    case "left": return { x: -1, y: 0 };
    case "right": return { x: 1, y: 0 };
  }
  throw new Error(`unsupported input: ${input}`);
}

function bucket(): FindingBucket {
  return { count: 0, samples: [] };
}

function record(finding: FindingBucket, makeSample: () => Record<string, unknown>): void {
  finding.count += 1;
  if (finding.samples.length < 5) finding.samples.push(makeSample());
}
