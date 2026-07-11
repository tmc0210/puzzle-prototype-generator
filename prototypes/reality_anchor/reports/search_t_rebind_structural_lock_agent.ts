import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const mode = process.argv[3] ?? "single-wall";
const maxProductStates = Number(process.argv[4] ?? 400_000);
if (!layoutPath) {
  throw new Error("Usage: search_t_rebind_structural_lock_agent.ts <layout-file> [single-wall] [max-product-states]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const baseLayout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const rows = baseLayout.split("\n").map((row) => [...row]);

const mutations: Array<{ id: string; layout: string }> = [];
const floorCells: Array<[number, number]> = [];
for (let y = 1; y < rows.length - 1; y += 1) {
  for (let x = 1; x < rows[y]!.length - 1; x += 1) {
    if (rows[y]![x] === ".") floorCells.push([x, y]);
  }
}
if (mode === "single-wall") {
  for (const [x, y] of floorCells) {
    const next = rows.map((row) => [...row]);
    next[y]![x] = "#";
    mutations.push({ id: `wall_${x}_${y}`, layout: next.map((row) => row.join("")).join("\n") });
  }
} else if (mode === "pair-wall") {
  for (let a = 0; a < floorCells.length - 1; a += 1) {
    for (let b = a + 1; b < floorCells.length; b += 1) {
      const [ax, ay] = floorCells[a]!;
      const [bx, by] = floorCells[b]!;
      const next = rows.map((row) => [...row]);
      next[ay]![ax] = "#";
      next[by]![bx] = "#";
      mutations.push({
        id: `walls_${ax}_${ay}__${bx}_${by}`,
        layout: next.map((row) => row.join("")).join("\n"),
      });
    }
  }
} else {
  throw new Error(`Unknown mode: ${mode}`);
}

for (const mutation of mutations) {
  const result = evaluate(mutation.layout);
  console.log([
    mutation.id,
    `status=${result.status}`,
    `raw=${result.rawStates}`,
    `product=${result.productStates}`,
    `wins=${result.winKeys}`,
    `shortest=${result.shortest ?? "-"}`,
    `masks=${result.winMasks.join(",") || "-"}`,
  ].join(" "));
}

function evaluate(layout: string): {
  status: "complete" | "exhausted";
  rawStates: number;
  productStates: number;
  winKeys: number;
  shortest?: number;
  winMasks: number[];
} {
  const level: LevelDoc = {
    id: "RA_T_REBIND_STRUCTURAL_LOCK_SEARCH",
    title: "RA_T_REBIND_STRUCTURAL_LOCK_SEARCH",
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
  const initial = adapter.parseLevel(level);
  const initialRawKey = runtime.key(initial);
  const queue: Array<{ state: typeof initial; mask: number; depth: number }> = [
    { state: initial, mask: 0, depth: 0 },
  ];
  const seenProduct = new Set<string>([`${initialRawKey}|0`]);
  const seenRaw = new Set<string>([initialRawKey]);
  const winKeys = new Set<string>();
  const winMasks = new Set<number>();
  let shortest: number | undefined;
  let cursor = 0;
  while (cursor < queue.length && seenProduct.size <= maxProductStates) {
    const current = queue[cursor++]!;
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      let mask = current.mask;
      if (step.events.some((event) => eventMatchesPattern(event, "sticky_to_box:n3"))) mask |= 1;
      if (step.events.some((event) => eventMatchesPattern(event, "push_object:sticky#2"))) mask |= 2;
      const hasCrate3 = step.events.some((event) => eventMatchesPattern(event, "push_object:crate#3"));
      const hasCrate1 = step.events.some((event) => eventMatchesPattern(event, "push_object:crate#1"));
      if (hasCrate1 && (mask & 4) === 0 && !hasCrate3) mask |= 8;
      if (hasCrate3) mask |= 4;
      const rawKey = runtime.key(step.state);
      const productKey = `${rawKey}|${mask}`;
      if (seenProduct.has(productKey)) continue;
      seenProduct.add(productKey);
      seenRaw.add(rawKey);
      const depth = current.depth + 1;
      if (runtime.isWin(step.state, pkg.mechanic.win)) {
        winKeys.add(rawKey);
        winMasks.add(mask);
        shortest ??= depth;
      } else {
        queue.push({ state: step.state, mask, depth });
      }
    }
  }
  return {
    status: seenProduct.size > maxProductStates ? "exhausted" : "complete",
    rawStates: seenRaw.size,
    productStates: seenProduct.size,
    winKeys: winKeys.size,
    ...(shortest === undefined ? {} : { shortest }),
    winMasks: [...winMasks].sort(),
  };
}
