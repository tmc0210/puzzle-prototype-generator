import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { before, test } from "node:test";
import { eventsMatchPattern } from "../../core/events.js";
import { loadPrototypePackage } from "../../core/io.js";
import { enumerateRuntimeGraph } from "../../core/runtimeGraph.js";
import { solveWithRuntime } from "../../core/solver.js";
import type {
  InputId,
  LevelDoc,
  PrototypePackage,
  WinCondition,
} from "../../core/types.js";
import type { CandleSokobanState } from "./mechanics.js";
import { candleSokobanAdapter } from "./runtime.js";

const prototypeRoot = fileURLToPath(
  new URL("../../../prototypes/candle_sokoban/", import.meta.url),
);

const normalWin: WinCondition = { type: "all_braziers_lit" };
const burnoutInputs: InputId[] = ["right", "left", "right", "left", "right"];

let pkg: PrototypePackage;

before(async () => {
  pkg = await loadPrototypePackage(prototypeRoot);
});

test("标准胜利条件下零蜡烛未胜是搜索终局，但底层 step 仍可显式诊断", () => {
  const runtime = candleSokobanAdapter.createRuntime(pkg.mechanic);
  let state = parseBurnoutFixture();
  let lastEvents: string[] = [];

  for (const input of burnoutInputs) {
    const result = candleSokobanAdapter.step(pkg.mechanic, state, input, {
      winCondition: normalWin,
    });
    assert.equal(result.legal, true);
    state = result.state;
    lastEvents = result.events;
  }

  assert.equal(state.candles.length, 0);
  assert.equal(candleSokobanAdapter.isWin(state, normalWin), false);
  assert.ok(eventsMatchPattern(lastEvents, "burn_out"));
  assert.deepEqual(runtime.actions(state, { winCondition: normalWin }), []);

  const diagnosticStep = candleSokobanAdapter.step(pkg.mechanic, state, "right", {
    winCondition: normalWin,
  });
  assert.equal(diagnosticStep.legal, true);
  assert.deepEqual(diagnosticStep.events, ["walk", "countdown:5->4"]);
});

test("零蜡烛终局让完整图保留失败入口状态但不扩展尾部边", () => {
  const runtime = candleSokobanAdapter.createRuntime(pkg.mechanic);
  let state = parseBurnoutFixture();

  for (const input of burnoutInputs) {
    const result = candleSokobanAdapter.step(pkg.mechanic, state, input, {
      winCondition: normalWin,
    });
    assert.equal(result.legal, true);
    state = result.state;
  }

  const graph = enumerateRuntimeGraph(
    runtime,
    state,
    normalWin,
    { winCondition: normalWin },
    { maxStates: 100, terminalizeWins: true },
  );

  assert.equal(graph.status, "complete");
  assert.equal(graph.keys.length, 1);
  assert.equal(graph.edges.length, 0);
  assert.equal(graph.winStateIndexes.size, 0);
});

test("event_occurs 诊断条件不启用零蜡烛失败终局", () => {
  const runtime = candleSokobanAdapter.createRuntime(pkg.mechanic);
  let state = parseBurnoutFixture();

  for (const input of burnoutInputs) {
    const result = candleSokobanAdapter.step(pkg.mechanic, state, input, {
      winCondition: normalWin,
    });
    assert.equal(result.legal, true);
    state = result.state;
  }

  const eventWin: WinCondition = { type: "event_occurs", event: "countdown" };
  assert.ok(runtime.actions(state, { winCondition: eventWin }).length > 0);

  const solution = solveWithRuntime(runtime, state, {
    winCondition: eventWin,
    maxStates: 100,
    maxDepth: 5,
  });
  assert.equal(solution.found, true);
  assert.equal(solution.cost, 1);
  assert.ok(eventsMatchPattern(solution.events, "countdown"));
});

test("最后一根蜡烛燃尽的同拍胜利优先于零蜡烛失败终局", () => {
  const level = pkg.levels.levels.find(
    (candidate) => candidate.id === "CANDLE_PROBE_05_FIRE_DEATH",
  );
  assert.ok(level);

  const runtime = candleSokobanAdapter.createRuntime(pkg.mechanic);
  const initial = candleSokobanAdapter.parseLevel(level);
  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    normalWin,
    { winCondition: normalWin },
    { maxStates: 20_000, terminalizeWins: true },
  );
  assert.equal(graph.status, "complete");

  const zeroCandleWinIndex = [...graph.winStateIndexes].find(
    (index) => graph.states[index]?.candles.length === 0,
  );
  assert.notEqual(zeroCandleWinIndex, undefined);
  const zeroCandleWin = graph.states[zeroCandleWinIndex!];
  assert.ok(zeroCandleWin);
  assert.equal(candleSokobanAdapter.isWin(zeroCandleWin, normalWin), true);
  assert.deepEqual(runtime.actions(zeroCandleWin, { winCondition: normalWin }), []);

  const winningEntry = graph.edges.find(
    (edge) =>
      edge.to === zeroCandleWinIndex &&
      eventsMatchPattern(edge.events, "burn_out") &&
      eventsMatchPattern(edge.events, "win_all_braziers_lit"),
  );
  assert.ok(winningEntry);
});

test("仍有未燃蜡烛时继续产生 countdown_without_lit_candle", () => {
  const state = candleSokobanAdapter.parseLevel({
    id: "CANDLE_UNLIT_COUNTDOWN_TEST",
    title: "Candle unlit countdown test",
    global_burn_cycle: 5,
    layout: [
      "########",
      "#@....o#",
      "#..11r.#",
      "########",
    ].join("\n"),
  });

  const result = candleSokobanAdapter.step(pkg.mechanic, state, "right", {
    winCondition: normalWin,
  });
  assert.equal(result.legal, true);
  assert.ok(eventsMatchPattern(result.events, "countdown_without_lit_candle"));
});

function parseBurnoutFixture(): CandleSokobanState {
  const level: LevelDoc = {
    id: "CANDLE_ZERO_CANDLE_TERMINAL_TEST",
    title: "Candle zero candle terminal test",
    global_burn_cycle: 5,
    layout: [
      "########",
      "#@.....#",
      "#R....o#",
      "########",
    ].join("\n"),
  };
  return candleSokobanAdapter.parseLevel(level);
}
