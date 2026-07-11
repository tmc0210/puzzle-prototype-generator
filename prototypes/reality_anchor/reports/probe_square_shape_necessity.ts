import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Point = { x: number; y: number };
type ShapeState = {
  crates: Point[];
  stickyGroups: Point[][];
};
type ShapeKind =
  | "crate_2x2"
  | "sticky_exact_2x2"
  | "split_single_plus_l_exact"
  | "rebound_offset_2x2_exact";
type ProbeResult = {
  foundBypass: boolean;
  status: SearchStatus;
  exploredStates: number;
  legalTransitions: number;
  reason: string;
  depth?: number;
  inputs?: InputId[];
  events?: string[];
};

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_SQUARE_SHAPE_NECESSITY";
const shapeKind = parseShapeKind(process.argv[4] ?? "sticky_exact_2x2");
const maxStates = Number(process.argv[5] ?? 500_000);
const exactOffsetX = Number(process.argv[6] ?? 0);
const exactOffsetY = Number(process.argv[7] ?? 0);

if (!layoutPath) {
  throw new Error(
    "Usage: probe_square_shape_necessity.ts <layout-file> <id> <crate_2x2|sticky_exact_2x2|split_single_plus_l_exact|rebound_offset_2x2_exact> [maxStates] [exactOffsetX] [exactOffsetY]",
  );
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level);
const result = findWinAvoidingShape(initial);
const report = {
  id,
  shapeKind,
  predicate: describePredicate(shapeKind),
  layout: adapter.renderState(initial as never),
  budget: { maxStates },
  exactCoordinateOffset: { x: exactOffsetX, y: exactOffsetY },
  result,
};

const outBase = path.join(prototypePath, "reports", `square_shape_probe_${id}_${shapeKind}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinAvoidingShape(initialState: unknown): ProbeResult {
  if (matchesShape(initialState as ShapeState, shapeKind)) {
    return {
      foundBypass: false,
      status: "complete",
      exploredStates: 0,
      legalTransitions: 0,
      reason: "initial state already satisfies required shape",
    };
  }
  const queue: Array<{
    state: unknown;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [{ state: initialState, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([runtime.key(initialState)]);
  let cursor = 0;
  let legalTransitions = 0;
  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return {
        foundBypass: false,
        status: "exhausted",
        exploredStates: visited.size,
        legalTransitions,
        reason: `state budget exceeded (${maxStates})`,
      };
    }
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win)) {
      return {
        foundBypass: true,
        status: "found",
        exploredStates: visited.size,
        legalTransitions,
        reason: "found winning path that never entered required shape",
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
      };
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      legalTransitions += 1;
      if (matchesShape(step.state as ShapeState, shapeKind)) continue;
      const key = runtime.key(step.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: step.state,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
        depth: current.depth + 1,
      });
    }
  }
  return {
    foundBypass: false,
    status: "complete",
    exploredStates: visited.size,
    legalTransitions,
    reason: "no winning path avoids the required shape",
  };
}

function matchesShape(state: ShapeState, kind: ShapeKind): boolean {
  if (kind === "crate_2x2") {
    return containsTwoByTwo(state.crates);
  }
  if (kind === "sticky_exact_2x2") {
    return state.stickyGroups.some((group) => group.length === 4 && containsTwoByTwo(group));
  }
  if (kind === "split_single_plus_l_exact") {
    return containsExactGroups(state.stickyGroups, [
      new Set([exactCell(6, 4)]),
      new Set([exactCell(8, 4), exactCell(7, 5), exactCell(8, 5)]),
    ]);
  }
  return state.stickyGroups.some((group) =>
    sameCellSet(group, new Set([exactCell(6, 4), exactCell(7, 4), exactCell(6, 5), exactCell(7, 5)])),
  );
}

function exactCell(x: number, y: number): string {
  return `${x + exactOffsetX},${y + exactOffsetY}`;
}

function containsTwoByTwo(points: Point[]): boolean {
  const cells = new Set(points.map((point) => `${point.x},${point.y}`));
  return points.some((point) =>
    cells.has(`${point.x + 1},${point.y}`) &&
    cells.has(`${point.x},${point.y + 1}`) &&
    cells.has(`${point.x + 1},${point.y + 1}`),
  );
}

function containsExactGroups(groups: Point[][], required: Set<string>[]): boolean {
  return required.every((cells) => groups.some((group) => sameCellSet(group, cells)));
}

function sameCellSet(points: Point[], expected: Set<string>): boolean {
  if (points.length !== expected.size) return false;
  return points.every((point) => expected.has(`${point.x},${point.y}`));
}

function parseShapeKind(value: string): ShapeKind {
  if (
    value === "crate_2x2" ||
    value === "sticky_exact_2x2" ||
    value === "split_single_plus_l_exact" ||
    value === "rebound_offset_2x2_exact"
  ) return value;
  throw new Error(`unsupported shape kind: ${value}`);
}

function describePredicate(kind: ShapeKind): string {
  if (kind === "crate_2x2") {
    return "state contains crates on all four cells of at least one axis-aligned 2x2 square";
  }
  if (kind === "sticky_exact_2x2") {
    return "state contains one sticky group with exactly four cells occupying an axis-aligned 2x2 square";
  }
  if (kind === "split_single_plus_l_exact") {
    return `state simultaneously contains sticky singleton {(${exactCell(6, 4)})} and sticky L group {(${exactCell(8, 4)}),(${exactCell(7, 5)}),(${exactCell(8, 5)})}`;
  }
  return `state contains one sticky group exactly on {(${exactCell(6, 4)}),(${exactCell(7, 4)}),(${exactCell(6, 5)}),(${exactCell(7, 5)})}`;
}

function formatMarkdown(input: typeof report): string {
  const result = input.result;
  const lines = [
    `# Square Shape Necessity Probe: ${input.id}`,
    "",
    `- Shape kind: ${input.shapeKind}`,
    `- Predicate: ${input.predicate}`,
    `- Budget: maxStates=${input.budget.maxStates}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
    "## Avoidance Search",
    "",
    `- Found winning bypass: ${result.foundBypass}`,
    `- Status: ${result.status}`,
    `- Explored states: ${result.exploredStates}`,
    `- Legal transitions: ${result.legalTransitions}`,
    `- Reason: ${result.reason}`,
    ...(result.depth !== undefined ? [`- Depth: ${result.depth}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
