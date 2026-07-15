import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

type SearchMode =
  | "any_win"
  | "win_without_merge"
  | "win_without_box_to_sticky"
  | "sequential_goal_win"
  | "premerge_crate_force_chain"
  | "single_goal_reachable"
  | "single_goal_premerge";

type WalkEntry = {
  state: RealityAnchorState;
  inputs: InputId[];
};

type SearchNode = {
  state: RealityAnchorState;
  inputs: InputId[];
  events: string[];
  macroDepth: number;
  partialSeen: boolean;
  mergeSeen: boolean;
};

type SearchResult = {
  mode: SearchMode;
  found: boolean;
  status: "found" | "complete" | "exhausted";
  macroNodes: number;
  macroDepth?: number;
  inputDepth?: number;
  inputs?: InputId[];
  events?: string[];
  finalState?: string;
  reason?: string;
};

const actions: InputId[] = ["up", "down", "left", "right"];
const sourcePath = process.argv[2];
const id = process.argv[3] ?? "RA_RIGID_TRANSFER_MACRO_PROBE";
const maxNodes = Number(process.argv[4] ?? 30000);
const maxMacroDepth = Number(process.argv[5] ?? 24);
const outDir = process.argv[6] ?? path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?:[A-Za-z]:)/, (m) => m.slice(1)));
const requestedModes = process.argv[7]?.split(",").filter(Boolean) as SearchMode[] | undefined;

if (!sourcePath) {
  throw new Error("Usage: probe_macro_bypass.ts <layout> [id] [maxNodes] [maxMacroDepth] [outDir]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const layout = (await readFile(sourcePath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: [],
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: [],
  expected_llm_player_evidence: [],
  layout,
};
const initial = parseLevel(level);
const allModes: SearchMode[] = [
  "any_win",
  "win_without_merge",
  "win_without_box_to_sticky",
  "sequential_goal_win",
  "premerge_crate_force_chain",
  "single_goal_reachable",
  "single_goal_premerge",
];
const modes = requestedModes?.length ? requestedModes : allModes;
for (const mode of modes) {
  if (!allModes.includes(mode)) throw new Error(`Unknown search mode: ${mode}`);
}
const results: SearchResult[] = [];
const transitionCache = new Map<string, ReturnType<typeof step>>();

for (const mode of modes) {
  const result = search(mode);
  results.push(result);
  console.log(`${mode}: ${result.status}; found=${result.found}; nodes=${result.macroNodes}; depth=${result.inputDepth ?? "-"}`);
}

const report = {
  id,
  sourcePath: sourcePath.replace(/\\/g, "/"),
  budget: { maxNodes, maxMacroDepth },
  initial: renderState(initial),
  results,
  method: {
    node: "从每个状态展开纯走位可达的对象动作；只有移动或转换对象的动作计为宏边",
    caveat: "本探针用于寻找可执行见证；未找到只表示预算内未找到，不构成不存在性证明",
  },
};
const safeId = id.replace(/[^A-Za-z0-9_.-]+/g, "_");
const jsonPath = path.join(outDir, `${safeId}_macro_bypass.json`);
const mdPath = path.join(outDir, `${safeId}_macro_bypass.md`);
await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(mdPath, formatMarkdown(report), "utf8");
console.log(`Wrote ${mdPath}`);

function search(mode: SearchMode): SearchResult {
  const queue: SearchNode[] = [
    {
      state: initial,
      inputs: [],
      events: [],
      macroDepth: 0,
      partialSeen: coverageCount(initial) === 1,
      mergeSeen: false,
    },
  ];
  const visited = new Set<string>([
    visitKey(stateKey(initial), mode, false, coverageCount(initial) === 1),
  ]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < queue.length) {
    if (queue.length > maxNodes) {
      return {
        mode,
        found: false,
        status: "exhausted",
        macroNodes: queue.length,
        reason: `macro node budget exceeded (${maxNodes})`,
      };
    }
    const node = queue[cursor++]!;
    if (node.macroDepth >= maxMacroDepth) {
      depthHit = true;
      continue;
    }
    const closure = walkClosure(node.state);

    for (const reachable of closure.entries) {
      for (const action of actions) {
        const result = cachedStep(reachable.state, action);
        if (!result.legal || isPureWalk(result.events)) continue;
        const hasMerge = result.events.some((event) => event.startsWith("sticky_merge"));
        const hasBoxToSticky = result.events.some((event) => event.startsWith("box_to_sticky"));
        if (mode === "win_without_merge" && hasMerge) continue;
        if (mode === "win_without_box_to_sticky" && hasBoxToSticky) continue;

        const inputs = [...node.inputs, ...reachable.inputs, action];
        const events = [...node.events, ...result.events];
        const mergeSeen = node.mergeSeen || hasMerge;
        const partialSeen = node.partialSeen || coverageCount(result.state) === 1;
        const crateForceChain = result.events.some((event) => /^(push|pull)_object:crate#/.test(event))
          && result.events.some((event) => event.startsWith("force_chain:"));

        if (mode === "premerge_crate_force_chain" && !node.mergeSeen && crateForceChain) {
          return found(mode, queue.length, node.macroDepth + 1, inputs, events, result.state);
        }
        if (
          coverageCount(result.state) === 1
          && (mode === "single_goal_reachable" || (mode === "single_goal_premerge" && !mergeSeen))
        ) {
          return found(mode, queue.length, node.macroDepth + 1, inputs, events, result.state);
        }

        const won = isWin(result.state, pkg.mechanic.win);
        if (
          won
          && (mode === "any_win"
            || mode === "win_without_merge"
            || mode === "win_without_box_to_sticky"
            || (mode === "sequential_goal_win" && partialSeen))
        ) {
          return found(mode, queue.length, node.macroDepth + 1, inputs, events, result.state);
        }

        const key = visitKey(stateKey(result.state), mode, mergeSeen, partialSeen);
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push({
          state: result.state,
          inputs,
          events,
          macroDepth: node.macroDepth + 1,
          partialSeen,
          mergeSeen,
        });
      }
    }
  }

  return {
    mode,
    found: false,
    status: depthHit ? "exhausted" : "complete",
    macroNodes: queue.length,
    reason: depthHit ? `macro depth budget reached (${maxMacroDepth})` : "search frontier complete",
  };
}

function walkClosure(start: RealityAnchorState): { entries: WalkEntry[]; canonicalKey: string } {
  const startKey = stateKey(start);
  const queue: WalkEntry[] = [{ state: start, inputs: [] }];
  const seen = new Set<string>([startKey]);
  let canonicalKey = startKey;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    const currentKey = stateKey(current.state);
    if (currentKey < canonicalKey) canonicalKey = currentKey;
    for (const action of actions) {
      const result = cachedStep(current.state, action);
      if (!result.legal || !isPureWalk(result.events)) continue;
      const key = stateKey(result.state);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ state: result.state, inputs: [...current.inputs, action] });
    }
  }
  return { entries: queue, canonicalKey };
}

function cachedStep(state: RealityAnchorState, action: InputId): ReturnType<typeof step> {
  const key = `${stateKey(state)}|A:${action}`;
  const cached = transitionCache.get(key);
  if (cached) return cached;
  const result = step(pkg.mechanic, state, action, { winCondition: pkg.mechanic.win });
  transitionCache.set(key, result);
  return result;
}

function visitKey(canonicalKey: string, mode: SearchMode, mergeSeen: boolean, partialSeen: boolean): string {
  const flags = mode === "premerge_crate_force_chain"
    ? `|m${mergeSeen ? 1 : 0}`
    : mode === "sequential_goal_win"
      ? `|p${partialSeen ? 1 : 0}`
      : "";
  return `${canonicalKey.replace(/^Ply:[^|]+\|/, "")}${flags}`;
}

function coverageCount(state: RealityAnchorState): number {
  const occupied = new Set<string>();
  for (const point of state.crates) occupied.add(`${point.x},${point.y}`);
  for (const group of state.stickyGroups) {
    for (const point of group) occupied.add(`${point.x},${point.y}`);
  }
  if (state.pushPullAnchor) {
    occupied.add(`${state.pushPullAnchor.push.x},${state.pushPullAnchor.push.y}`);
    occupied.add(`${state.pushPullAnchor.pull.x},${state.pushPullAnchor.pull.y}`);
  }
  if (state.boxStickyAnchor) {
    occupied.add(`${state.boxStickyAnchor.box.x},${state.boxStickyAnchor.box.y}`);
    occupied.add(`${state.boxStickyAnchor.sticky.x},${state.boxStickyAnchor.sticky.y}`);
  }
  return [...state.goals].filter((goal) => occupied.has(goal)).length;
}

function isPureWalk(events: string[]): boolean {
  return events.length === 1 && events[0] === "walk";
}

function found(
  mode: SearchMode,
  macroNodes: number,
  macroDepth: number,
  inputs: InputId[],
  events: string[],
  state: RealityAnchorState,
): SearchResult {
  return {
    mode,
    found: true,
    status: "found",
    macroNodes,
    macroDepth,
    inputDepth: inputs.length,
    inputs,
    events,
    finalState: renderState(state),
  };
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# ${input.id} 宏动作旁路探针`,
    "",
    `- 来源：${input.sourcePath}`,
    `- 预算：maxNodes=${input.budget.maxNodes}；maxMacroDepth=${input.budget.maxMacroDepth}`,
    `- 方法：${input.method.node}`,
    `- 限制：${input.method.caveat}`,
    "",
    "## 结果",
    "",
  ];
  for (const result of input.results) {
    const statusText = result.status === "found"
      ? "已找到"
      : result.status === "complete"
        ? "前沿完整"
        : "预算耗尽";
    lines.push(`### ${result.mode}`);
    lines.push("");
    lines.push(`- 找到见证：${result.found ? "是" : "否"}`);
    lines.push(`- 状态：${statusText}`);
    lines.push(`- 宏节点数：${result.macroNodes}`);
    if (result.macroDepth !== undefined) lines.push(`- 宏深度：${result.macroDepth}`);
    if (result.inputDepth !== undefined) lines.push(`- 输入深度：${result.inputDepth}`);
    if (result.reason) lines.push(`- 原因：${result.reason}`);
    if (result.inputs) lines.push(`- 输入：${result.inputs.join(" ")}`);
    if (result.events) lines.push(`- 事件：${result.events.join(" ")}`);
    if (result.finalState) {
      lines.push("");
      lines.push("```text");
      lines.push(result.finalState);
      lines.push("```");
    }
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
