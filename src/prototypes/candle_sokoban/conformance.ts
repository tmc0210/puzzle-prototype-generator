import { existsSync } from "node:fs";
import path from "node:path";
import type { LevelDoc, PrototypePackage } from "../../core/types.js";
import { eventsMatchPattern } from "../../core/events.js";
import { analyzeGraphWithRuntime } from "../../core/graphAnalyzer.js";
import { solveWithRuntime } from "../../core/solver.js";
import { analyzeLevel } from "../../workflows/levelAnalyzer.js";
import { getRuntimeAdapter } from "../runtimeAdapter.js";
import { candleSokobanToolCapabilities } from "./tools.js";

export type CandleConformanceStatus = "pass" | "fail" | "unknown" | "unavailable";

export type CandleConformanceCheck = {
  id: string;
  status: CandleConformanceStatus;
  reason: string;
};

export type CandleSokobanConformanceReport = {
  mechanic: "candle_sokoban";
  generatedAt: string;
  status: "pass" | "fail" | "warning";
  checks: CandleConformanceCheck[];
};

export function checkCandleSokobanToolConformance(
  pkg: PrototypePackage,
): CandleSokobanConformanceReport {
  const checks = [
    checkAdapter(pkg),
    checkParseRender(pkg),
    checkExpectedTraceReplay(pkg),
    checkGlobalCountdownSemantics(pkg),
    checkSolverSmoke(pkg),
    checkGraphSmoke(pkg),
    checkLayoutAnalyzerSmoke(pkg),
    checkCapability("probe_seed_suite", candleSokobanToolCapabilities.probeSeedSuite),
    checkCapability("raw_sampler", candleSokobanToolCapabilities.rawSampler),
    checkCapability(
      "candidate_seed_factories",
      candleSokobanToolCapabilities.candidateSeedFactories,
    ),
    checkCapability("curated_miner", candleSokobanToolCapabilities.curatedMiner),
    checkCapability(
      "puzzlescript_exporter",
      candleSokobanToolCapabilities.puzzleScriptExporter,
    ),
    checkCapability(
      "puzzlescript_checker",
      candleSokobanToolCapabilities.puzzleScriptChecker,
    ),
    checkRuntimeBackedPlayable(pkg),
  ];

  const status = checks.some((check) => check.status === "fail")
    ? "fail"
    : checks.some(
          (check) => check.status === "unknown" || check.status === "unavailable",
        )
      ? "warning"
      : "pass";

  return {
    mechanic: "candle_sokoban",
    generatedAt: new Date().toISOString(),
    status,
    checks,
  };
}

export function formatCandleSokobanConformanceMarkdown(
  report: CandleSokobanConformanceReport,
): string {
  return [
    `# Tool Conformance: ${report.mechanic}`,
    "",
    `- Generated at: ${report.generatedAt}`,
    `- Status: ${report.status}`,
    "",
    "| Check | Status | Reason |",
    "| --- | --- | --- |",
    ...report.checks.map(
      (check) =>
        `| ${escapeCell(check.id)} | ${check.status} | ${escapeCell(check.reason)} |`,
    ),
    "",
  ].join("\n");
}

function checkGlobalCountdownSemantics(pkg: PrototypePackage): CandleConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const unlitLevel: LevelDoc = {
      id: "CONFORMANCE_UNLIT_COUNTDOWN",
      title: "Conformance: unlit countdown",
      global_burn_cycle: 2,
      layout: "########\n#@....o#\n#..11r.#\n########",
    };
    const simultaneousLevel: LevelDoc = {
      id: "CONFORMANCE_SIMULTANEOUS_BURN",
      title: "Conformance: simultaneous burn",
      global_burn_cycle: 5,
      layout: "############\n#@.........#\n#..111R....#\n#..2.......#\n#..D.......#\n#o.........#\n############",
    };
    const ignitionLevel: LevelDoc = {
      id: "CONFORMANCE_BOUNDARY_IGNITION",
      title: "Conformance: boundary ignition",
      global_burn_cycle: 1,
      layout: "##########\n#@111R.o.#\n#......u.#\n#........#\n##########",
    };
    const extinctionLevel: LevelDoc = {
      id: "CONFORMANCE_BOUNDARY_EXTINCTION",
      title: "Conformance: boundary extinction",
      global_burn_cycle: 2,
      layout: "#########\n#@111R..#\n#o......#\n#########",
    };

    const unlitInitial = adapter.parseLevel(unlitLevel);
    const unlitStep = adapter.step(pkg.mechanic, unlitInitial, "right", {
      winCondition: unlitLevel.win ?? pkg.mechanic.win,
    });
    if (
      !unlitStep.legal ||
      unlitStep.state.globalBurnCountdown !== 1 ||
      unlitStep.state.candles.some((candle: { lit: boolean }) => candle.lit)
    ) {
      throw new Error("Countdown did not advance from 2 to 1 without a lit candle.");
    }

    let simultaneousState = adapter.parseLevel(simultaneousLevel);
    for (const input of ["right", "left", "right", "left", "right"]) {
      const result = adapter.step(pkg.mechanic, simultaneousState, input, {
        winCondition: simultaneousLevel.win ?? pkg.mechanic.win,
      });
      if (!result.legal) {
        throw new Error(`Simultaneous burn probe rejected '${input}'.`);
      }
      simultaneousState = result.state;
    }
    const lengths = Object.fromEntries(
      simultaneousState.candles.map(
        (candle: { id: string; bodyCells: unknown[] }) => [candle.id, candle.bodyCells.length],
      ),
    );
    if (
      simultaneousState.globalBurnCountdown !== 5 ||
      lengths["candle#1"] !== 3 ||
      lengths["candle#2"] !== 1
    ) {
      throw new Error(
        `Expected countdown=5 and lengths candle#1=3,candle#2=1; got countdown=${simultaneousState.globalBurnCountdown}, lengths=${JSON.stringify(lengths)}.`,
      );
    }

    const ignitionInitial = adapter.parseLevel(ignitionLevel);
    const ignitionStep = adapter.step(pkg.mechanic, ignitionInitial, "right", {
      winCondition: ignitionLevel.win ?? pkg.mechanic.win,
    });
    const ignitionLengths = Object.fromEntries(
      ignitionStep.state.candles.map(
        (candle: { id: string; bodyCells: unknown[] }) => [candle.id, candle.bodyCells.length],
      ),
    );
    if (
      !ignitionStep.legal ||
      ignitionLengths["candle#1"] !== 3 ||
      "candle#single2" in ignitionLengths
    ) {
      throw new Error("A candle ignited at countdown 1 did not join the same global burn settlement.");
    }

    let extinctionState = adapter.parseLevel(extinctionLevel);
    for (const input of ["right", "right"]) {
      const result = adapter.step(pkg.mechanic, extinctionState, input, {
        winCondition: extinctionLevel.win ?? pkg.mechanic.win,
      });
      if (!result.legal) {
        throw new Error(`Extinction boundary probe rejected '${input}'.`);
      }
      extinctionState = result.state;
    }
    const extinguished = extinctionState.candles[0];
    if (
      extinctionState.globalBurnCountdown !== 2 ||
      extinguished?.lit !== false ||
      extinguished?.bodyCells.length !== 4
    ) {
      throw new Error("A candle extinguished at countdown 1 incorrectly shortened.");
    }

    return {
      id: "global_countdown_semantics",
      status: "pass",
      reason: "Verified no-fire ticking, simultaneous burn, boundary ignition, and boundary extinction.",
    };
  } catch (error) {
    return fail("global_countdown_semantics", error);
  }
}

function checkAdapter(pkg: PrototypePackage): CandleConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    return adapter.id === "candle_sokoban"
      ? {
          id: "adapter_registered",
          status: "pass",
          reason: "Adapter 'candle_sokoban' registered.",
        }
      : {
          id: "adapter_registered",
          status: "fail",
          reason: `Unexpected adapter '${adapter.id}'.`,
        };
  } catch (error) {
    return fail("adapter_registered", error);
  }
}

function checkParseRender(pkg: PrototypePackage): CandleConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    for (const level of pkg.levels.levels) {
      const rendered = adapter.renderState(adapter.parseLevel(level));
      if (!rendered.trim()) {
        return {
          id: "parse_render_smoke",
          status: "fail",
          reason: `${level.id} rendered empty.`,
        };
      }
    }
    return {
      id: "parse_render_smoke",
      status: "pass",
      reason: `Parsed and rendered ${pkg.levels.levels.length} probe levels.`,
    };
  } catch (error) {
    return fail("parse_render_smoke", error);
  }
}

function checkExpectedTraceReplay(pkg: PrototypePackage): CandleConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    let checked = 0;
    for (const level of pkg.levels.levels) {
      if (!level.expected_trace?.length) {
        continue;
      }
      checked += 1;
      let state = adapter.parseLevel(level);
      for (const [index, traceStep] of level.expected_trace.entries()) {
        const result = adapter.step(pkg.mechanic, state, traceStep.input, {
          winCondition: level.win ?? pkg.mechanic.win,
        });
        if (!result.legal) {
          return {
            id: "expected_trace_replay",
            status: "fail",
            reason: `${level.id} step ${index + 1} illegal: ${result.reason ?? "unknown"}.`,
          };
        }
        for (const event of traceStep.events ?? []) {
          if (!eventsMatchPattern(result.events, event)) {
            return {
              id: "expected_trace_replay",
              status: "fail",
              reason: `${level.id} step ${index + 1} missing '${event}', got ${result.events.join(",")}.`,
            };
          }
        }
        state = result.state;
      }
    }
    return {
      id: "expected_trace_replay",
      status: checked > 0 ? "pass" : "unknown",
      reason: checked > 0 ? `Replayed ${checked} declared traces.` : "No traces declared.",
    };
  } catch (error) {
    return fail("expected_trace_replay", error);
  }
}

function checkSolverSmoke(pkg: PrototypePackage): CandleConformanceCheck {
  const level = smokeLevel(pkg);
  if (!level) {
    return fail("solver_smoke", new Error("Missing smoke level."));
  }
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const solution = solveWithRuntime(
      adapter.createRuntime(pkg.mechanic),
      adapter.parseLevel(level),
      {
        winCondition: level.win ?? pkg.mechanic.win,
        maxStates: 20_000,
        maxDepth: 80,
      },
    );
    return solution.found
      ? {
          id: "solver_smoke",
          status: "pass",
          reason: `Solved ${level.id} cost=${solution.cost}.`,
        }
      : {
          id: "solver_smoke",
          status: solution.searchStatus === "exhausted" ? "unknown" : "fail",
          reason: solution.reason ?? "No solution found.",
        };
  } catch (error) {
    return fail("solver_smoke", error);
  }
}

function checkGraphSmoke(pkg: PrototypePackage): CandleConformanceCheck {
  const level = smokeLevel(pkg);
  if (!level) {
    return fail("graph_smoke", new Error("Missing smoke level."));
  }
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const graph = analyzeGraphWithRuntime(
      adapter.createRuntime(pkg.mechanic),
      adapter.parseLevel(level),
      {
        winCondition: level.win ?? pkg.mechanic.win,
        maxStates: 20_000,
      },
    );
    return {
      id: "graph_smoke",
      status: graph.status === "complete" ? "pass" : "unknown",
      reason: `Graph ${graph.status}; states=${graph.reachableStateCount}.`,
    };
  } catch (error) {
    return fail("graph_smoke", error);
  }
}

function checkLayoutAnalyzerSmoke(pkg: PrototypePackage): CandleConformanceCheck {
  const level = smokeLevel(pkg);
  if (!level) {
    return fail("layout_analyzer_smoke", new Error("Missing smoke level."));
  }
  try {
    const analysis = analyzeLevel(pkg, level, {
      maxStates: 20_000,
      graphMaxStates: 20_000,
    });
    return analysis.solution.found
      ? {
          id: "layout_analyzer_smoke",
          status: "pass",
          reason: `Analyzed ${level.id}; graph=${analysis.graph.status}.`,
        }
      : {
          id: "layout_analyzer_smoke",
          status: "unknown",
          reason: "Analyzer ran but found no solution.",
        };
  } catch (error) {
    return fail("layout_analyzer_smoke", error);
  }
}

function checkRuntimeBackedPlayable(pkg: PrototypePackage): CandleConformanceCheck {
  const required = ["index.html", "app.js", "data.json", "style.css"];
  const missing = required.filter(
    (file) => !existsSync(path.join(pkg.root, "playable", file)),
  );
  return missing.length === 0
    ? {
        id: "runtime_backed_playable",
        status: "pass",
        reason: "Playable build artifacts exist.",
      }
    : {
        id: "runtime_backed_playable",
        status: "unknown",
        reason: `Build artifacts missing: ${missing.join(", ")}.`,
      };
}

function checkCapability(
  id: string,
  capability: { status: "implemented" | "unavailable"; maturity: string; reason: string },
): CandleConformanceCheck {
  return capability.status === "implemented"
    ? {
        id,
        status: capability.maturity === "scaffold" ? "unknown" : "pass",
        reason: `${capability.maturity}: ${capability.reason}`,
      }
    : {
        id,
        status: "unavailable",
        reason: capability.reason,
      };
}

function smokeLevel(pkg: PrototypePackage): LevelDoc | undefined {
  return (
    pkg.levels.levels.find((level) => level.id === "CANDLE_SMOKE_01_LIGHT_BRAZIER") ??
    pkg.levels.levels[0]
  );
}

function fail(id: string, error: unknown): CandleConformanceCheck {
  return {
    id,
    status: "fail",
    reason: error instanceof Error ? error.message : String(error),
  };
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|");
}
