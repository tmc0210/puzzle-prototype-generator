import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { LevelDoc, PrototypePackage } from "../../core/types.js";
import { eventsMatchPattern } from "../../core/events.js";
import { analyzeGraphWithRuntime } from "../../core/graphAnalyzer.js";
import { solveWithRuntime } from "../../core/solver.js";
import { analyzeLevel } from "../../workflows/levelAnalyzer.js";
import { getRuntimeAdapter } from "../runtimeAdapter.js";
import {
  auditCandleExposure,
  loadCandleExposureSequence,
} from "./exposureAudit.js";
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
    checkExposureAudit(pkg),
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

function checkExposureAudit(pkg: PrototypePackage): CandleConformanceCheck {
  try {
    const sequencePath = path.join(pkg.root, "docs", "mechanic_exposure_sequence.yml");
    const { sequence, raw } = loadCandleExposureSequence(sequencePath);
    const fixtureSpecs = [
      {
        levelId: "CANDLE_PROBE_02_SIDE_ROLL",
        branch: "basic_candle_manipulation",
        targetEvent: "roll_candle",
      },
      {
        levelId: "CANDLE_EXPOSURE_02_WALL_DOUSE",
        branch: "wall_dousing",
        previousBranch: "basic_candle_manipulation",
        targetEvent: "extinguish_by_wall",
      },
      {
        levelId: "CANDLE_PROBE_04_RECURSIVE_IGNITION",
        branch: "shared_fire_and_reignition",
        previousBranch: "wall_dousing",
        targetEvent: "ignite_from_wick",
      },
      {
        levelId: "CANDLE_PROBE_08_BODY_CONCEALMENT",
        branch: "body_concealment_and_reexposure",
        previousBranch: "shared_fire_and_reignition",
        targetEvent: "wick_reexposed_unlit",
      },
      {
        levelId: "CANDLE_PROBE_06_BURN_SHRINK",
        branch: "retreating_flame_transfer",
        previousBranch: "body_concealment_and_reexposure",
        targetEvent: "shrink_ignite",
      },
      {
        levelId: "CANDLE_PROBE_03_CONCEALED_FLAME",
        branch: "rolling_contact_chain",
        previousBranch: "retreating_flame_transfer",
        targetEvent: "roll_reignite_after_extinguish",
      },
    ] as const;

    for (const spec of fixtureSpecs) {
      const level = pkg.levels.levels.find((candidate) => candidate.id === spec.levelId);
      if (!level) {
        throw new Error(`Missing Candle exposure audit fixture '${spec.levelId}'.`);
      }
      const passing = auditCandleExposure(pkg, level, sequence, raw, {
        allowedExposureThrough: spec.branch,
        maxStates: 20_000,
      });
      if (
        passing.verdict !== "pass" ||
        passing.graph.status !== "complete" ||
        passing.raw_graph.edges.length === 0 ||
        (passing.reachable_event_counts[spec.targetEvent] ?? 0) === 0
      ) {
        throw new Error(
          `Exposure fixture '${spec.levelId}' did not produce a complete '${spec.branch}' pass with '${spec.targetEvent}'.`,
        );
      }

      if (!("previousBranch" in spec)) {
        continue;
      }
      const failing = auditCandleExposure(pkg, level, sequence, raw, {
        allowedExposureThrough: spec.previousBranch,
        maxStates: 20_000,
      });
      if (
        failing.verdict !== "fail" ||
        !failing.forbidden_hits.some((hit) => hit.pattern === spec.targetEvent)
      ) {
        throw new Error(
          `Exposure fixture '${spec.levelId}' did not fail the previous gate on '${spec.targetEvent}'.`,
        );
      }
    }

    const baseline = pkg.levels.levels.find(
      (level) => level.id === "CANDLE_PROBE_02_SIDE_ROLL",
    );
    if (!baseline) {
      throw new Error("Missing Candle basic exposure fixture.");
    }
    const incomplete = auditCandleExposure(pkg, baseline, sequence, raw, {
      allowedExposureThrough: "basic_candle_manipulation",
      maxStates: 1,
    });
    if (incomplete.verdict !== "unknown" || incomplete.graph.status !== "exhausted") {
      throw new Error("Incomplete exposure scan was not reported as unknown.");
    }

    return {
      id: "mechanic_exposure_hard_gate",
      status: "pass",
      reason:
        "Verified six adjacent family boundaries with complete pass/current-event reachability, previous-gate fail, incomplete-graph unknown, and raw edge events.",
    };
  } catch (error) {
    return fail("mechanic_exposure_hard_gate", error);
  }
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
    let rejectedNonFiveCycle = false;
    try {
      adapter.parseLevel({
        id: "CONFORMANCE_REJECT_NON_FIVE_CYCLE",
        title: "Conformance: reject non-five cycle",
        global_burn_cycle: 4,
        layout: "#####\n#@.o#\n#####",
      });
    } catch {
      rejectedNonFiveCycle = true;
    }
    if (!rejectedNonFiveCycle) {
      throw new Error("A candle level with global_burn_cycle other than 5 was accepted.");
    }

    const unlitLevel: LevelDoc = {
      id: "CONFORMANCE_UNLIT_COUNTDOWN",
      title: "Conformance: unlit countdown",
      global_burn_cycle: 5,
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
      global_burn_cycle: 5,
      layout: "############\n#@.........#\n#..111R.o..#\n#.......u..#\n#..........#\n############",
    };
    const extinctionLevel: LevelDoc = {
      id: "CONFORMANCE_BOUNDARY_EXTINCTION",
      title: "Conformance: boundary extinction",
      global_burn_cycle: 5,
      layout: "#########\n#.111R..#\n#@......#\n#o......#\n#########",
    };

    const unlitInitial = adapter.parseLevel(unlitLevel);
    const unlitStep = adapter.step(pkg.mechanic, unlitInitial, "right", {
      winCondition: unlitLevel.win ?? pkg.mechanic.win,
    });
    if (
      !unlitStep.legal ||
      unlitStep.state.globalBurnCountdown !== 4 ||
      unlitStep.state.candles.some((candle: { lit: boolean }) => candle.lit) ||
      !eventsMatchPattern(unlitStep.events, "countdown_without_lit_candle")
    ) {
      throw new Error(
        "Countdown did not advance from 5 to 4 with a no-fire exposure event.",
      );
    }

    let simultaneousState = adapter.parseLevel(simultaneousLevel);
    let simultaneousEvents: string[] = [];
    for (const input of ["right", "left", "right", "left", "right"]) {
      const result = adapter.step(pkg.mechanic, simultaneousState, input, {
        winCondition: simultaneousLevel.win ?? pkg.mechanic.win,
      });
      if (!result.legal) {
        throw new Error(`Simultaneous burn probe rejected '${input}'.`);
      }
      simultaneousState = result.state;
      simultaneousEvents = result.events;
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
    if (!eventsMatchPattern(simultaneousEvents, "simultaneous_burn")) {
      throw new Error("Simultaneous burn settlement omitted its exposure event.");
    }

    let ignitionState = adapter.parseLevel(ignitionLevel);
    let ignitionEvents: string[] = [];
    for (const input of ["right", "left", "down", "right", "right"]) {
      const ignitionStep = adapter.step(pkg.mechanic, ignitionState, input, {
        winCondition: ignitionLevel.win ?? pkg.mechanic.win,
      });
      if (!ignitionStep.legal) {
        throw new Error(`Ignition boundary probe rejected '${input}'.`);
      }
      ignitionState = ignitionStep.state;
      ignitionEvents = ignitionStep.events;
    }
    const ignitionLengths = Object.fromEntries(
      ignitionState.candles.map(
        (candle: { id: string; bodyCells: unknown[] }) => [candle.id, candle.bodyCells.length],
      ),
    );
    if (
      ignitionLengths["candle#1"] !== 3 ||
      "candle#single2" in ignitionLengths
    ) {
      throw new Error("A candle ignited at countdown 1 did not join the same global burn settlement.");
    }
    if (
      !eventsMatchPattern(ignitionEvents, "ignite_from_wick") ||
      !eventsMatchPattern(ignitionEvents, "boundary_ignite_participates") ||
      !eventsMatchPattern(ignitionEvents, "burn_out")
    ) {
      throw new Error(
        "Boundary ignition omitted its source, participation, or singleton burnout event.",
      );
    }

    let extinctionState = adapter.parseLevel(extinctionLevel);
    let extinctionEvents: string[] = [];
    for (const input of ["right", "left", "up", "right", "right"]) {
      const result = adapter.step(pkg.mechanic, extinctionState, input, {
        winCondition: extinctionLevel.win ?? pkg.mechanic.win,
      });
      if (!result.legal) {
        throw new Error(`Extinction boundary probe rejected '${input}'.`);
      }
      extinctionState = result.state;
      extinctionEvents = result.events;
    }
    const extinguished = extinctionState.candles[0];
    if (
      extinctionState.globalBurnCountdown !== 5 ||
      extinguished?.lit !== false ||
      extinguished?.bodyCells.length !== 4
    ) {
      throw new Error("A candle extinguished at countdown 1 incorrectly shortened.");
    }
    if (
      !eventsMatchPattern(extinctionEvents, "extinguish_by_wall") ||
      !eventsMatchPattern(extinctionEvents, "boundary_extinguish_avoids_burn")
    ) {
      throw new Error("Boundary wall extinction omitted its cause or timing event.");
    }

    return {
      id: "global_countdown_semantics",
      status: "pass",
      reason:
        "Verified no-fire ticking, simultaneous burn, boundary ignition, and boundary wall extinction with dedicated exposure events.",
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
  if (missing.length > 0) {
    return {
      id: "runtime_backed_playable",
      status: "unknown",
      reason: `Build artifacts missing: ${missing.join(", ")}.`,
    };
  }

  const bundledRuntime = readFileSync(path.join(pkg.root, "playable", "app.js"), "utf8");
  const requiredExposureMarkers = [
    "extinguish_by_wall",
    "countdown_without_lit_candle",
    "roll_last_brazier_before_endpoint",
  ];
  const staleMarkers = requiredExposureMarkers.filter(
    (marker) => !bundledRuntime.includes(marker),
  );
  return staleMarkers.length === 0
    ? {
        id: "runtime_backed_playable",
        status: "pass",
        reason: "Playable artifacts exist and bundle the current exposure runtime markers.",
      }
    : {
        id: "runtime_backed_playable",
        status: "fail",
        reason: `Playable runtime bundle is stale; missing ${staleMarkers.join(", ")}.`,
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
