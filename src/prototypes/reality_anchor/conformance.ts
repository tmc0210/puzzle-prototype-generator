import type { LevelDoc, PrototypePackage } from "../../core/types.js";
import { existsSync } from "node:fs";
import path from "node:path";
import { eventsMatchPattern } from "../../core/events.js";
import { analyzeGraphWithRuntime } from "../../core/graphAnalyzer.js";
import { solveWithRuntime } from "../../core/solver.js";
import { analyzeLevel } from "../../workflows/levelAnalyzer.js";
import { getRuntimeAdapter } from "../runtimeAdapter.js";
import { mineRealityAnchorSeeds, realityAnchorToolCapabilities } from "./tools.js";

export type ToolConformanceStatus = "pass" | "fail" | "unknown" | "unavailable";

export type ToolConformanceCheck = {
  id: string;
  status: ToolConformanceStatus;
  reason: string;
};

export type RealityAnchorConformanceReport = {
  mechanic: string;
  generatedAt: string;
  status: Exclude<ToolConformanceStatus, "unknown"> | "warning";
  checks: ToolConformanceCheck[];
};

export function checkRealityAnchorToolConformance(
  pkg: PrototypePackage,
): RealityAnchorConformanceReport {
  const checks: ToolConformanceCheck[] = [];

  checks.push(checkAdapter(pkg));
  checks.push(checkParseRender(pkg));
  checks.push(checkExpectedTraceReplay(pkg));
  checks.push(checkAtomicCShapePushPull(pkg));
  checks.push(checkIllegalStickyBlocked(pkg));
  checks.push(checkSolverSmoke(pkg));
  checks.push(checkGraphSmoke(pkg));
  checks.push(checkLayoutAnalyzerSmoke(pkg));
  checks.push(checkCapability("probe_seed_suite", realityAnchorToolCapabilities.probeSeedSuite));
  checks.push(checkRawSampler(pkg));
  checks.push(
    checkCapability(
      "candidate_seed_factories",
      realityAnchorToolCapabilities.candidateSeedFactories,
    ),
  );
  checks.push(checkCapability("temporary_miner", realityAnchorToolCapabilities.temporaryMiner));
  checks.push(checkCapability("curated_miner", realityAnchorToolCapabilities.curatedMiner));
  checks.push(
    checkCapability("puzzlescript_exporter", realityAnchorToolCapabilities.puzzleScriptExporter),
  );
  checks.push(
    checkCapability("puzzlescript_checker", realityAnchorToolCapabilities.puzzleScriptChecker),
  );
  checks.push(
    checkRuntimeBackedPlayable(pkg),
  );

  const status = checks.some((check) => check.status === "fail")
    ? "fail"
    : checks.some((check) => check.status === "unavailable" || check.status === "unknown")
      ? "warning"
      : "pass";

  return {
    mechanic: pkg.mechanic.id,
    generatedAt: new Date().toISOString(),
    status,
    checks,
  };
}

function checkRuntimeBackedPlayable(pkg: PrototypePackage): ToolConformanceCheck {
  const files = ["index.html", "app.js", "data.json", "style.css"];
  const missing = files.filter((file) => !existsSync(path.join(pkg.root, "playable", file)));
  if (missing.length > 0) {
    return {
      id: "runtime_backed_playable",
      status: "unknown",
      reason: `Marked implemented, but build artifacts are missing: ${missing.join(", ")}.`,
    };
  }
  return {
    id: "runtime_backed_playable",
    status: "pass",
    reason: "playable/index.html, app.js, data.json, and style.css exist.",
  };
}

export function formatRealityAnchorConformanceMarkdown(
  report: RealityAnchorConformanceReport,
): string {
  const lines = [
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
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

function checkAdapter(pkg: PrototypePackage): ToolConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    return adapter.id === "reality_anchor"
      ? { id: "adapter_registered", status: "pass", reason: "Adapter 'reality_anchor' registered." }
      : {
          id: "adapter_registered",
          status: "fail",
          reason: `Adapter id '${adapter.id}' does not match reality_anchor.`,
        };
  } catch (error) {
    return fail("adapter_registered", error);
  }
}

function checkParseRender(pkg: PrototypePackage): ToolConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    for (const level of pkg.levels.levels) {
      const state = adapter.parseLevel(level);
      const rendered = adapter.renderState(state);
      if (rendered.length === 0) {
        return { id: "parse_render_smoke", status: "fail", reason: `${level.id} rendered empty.` };
      }
    }
    return {
      id: "parse_render_smoke",
      status: "pass",
      reason: `Parsed and rendered ${pkg.levels.levels.length} smoke levels.`,
    };
  } catch (error) {
    return fail("parse_render_smoke", error);
  }
}

function checkExpectedTraceReplay(pkg: PrototypePackage): ToolConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    let checked = 0;
    for (const level of pkg.levels.levels) {
      if (!level.expected_trace || level.expected_trace.length === 0) {
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
            reason: `${level.id} step ${index + 1} '${traceStep.input}' illegal: ${
              result.reason ?? "unknown"
            }.`,
          };
        }
        for (const event of traceStep.events ?? []) {
          if (!eventsMatchPattern(result.events, event)) {
            return {
              id: "expected_trace_replay",
              status: "fail",
              reason: `${level.id} step ${index + 1} missing event '${event}', got ${
                result.events.join(",") || "none"
              }.`,
            };
          }
        }
        state = result.state;
      }
    }
    return {
      id: "expected_trace_replay",
      status: checked > 0 ? "pass" : "unknown",
      reason: checked > 0 ? `Replayed ${checked} expected traces.` : "No expected traces declared.",
    };
  } catch (error) {
    return fail("expected_trace_replay", error);
  }
}

function checkAtomicCShapePushPull(pkg: PrototypePackage): ToolConformanceCheck {
  const fixtures: Array<{
    id: string;
    mode: "push" | "pull";
    layout: string;
    expectedEvent: string;
  }> = [
    {
      id: "RA_CONFORMANCE_C_SHAPE_PUSH_UP",
      mode: "push",
      layout: [
        "#########",
        "#BS.....#",
        "#G......#",
        "#..MMM..#",
        "#..M@...#",
        "#..MMM..#",
        "#.......#",
        "#########",
      ].join("\n"),
      expectedEvent: "push_object",
    },
    {
      id: "RA_CONFORMANCE_C_SHAPE_PULL_UP",
      mode: "pull",
      layout: [
        "###########",
        "#BS.PL....#",
        "#G........#",
        "#...MMM...#",
        "#...M@....#",
        "#...MMM...#",
        "#.........#",
        "###########",
      ].join("\n"),
      expectedEvent: "pull_object",
    },
  ];

  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    for (const fixture of fixtures) {
      const level: LevelDoc = {
        id: fixture.id,
        title: fixture.id,
        layout: fixture.layout,
      };
      const state = adapter.parseLevel(level);
      const result = adapter.step(pkg.mechanic, state, "up", {});
      if (
        !result.legal ||
        !eventsMatchPattern(result.events, fixture.expectedEvent) ||
        !eventsMatchPattern(result.events, "move_sticky_rigid")
      ) {
        return {
          id: "c_shape_atomic_push_pull",
          status: "fail",
          reason: `${fixture.mode} C 形整体上移失败：legal=${result.legal} reason=${
            result.reason ?? "none"
          } events=${result.events.join(",") || "none"}。`,
        };
      }
    }
    return {
      id: "c_shape_atomic_push_pull",
      status: "pass",
      reason: "C 形黏块的 push 与 pull 均按玩家和刚体同时平移的语义成立。",
    };
  } catch (error) {
    return fail("c_shape_atomic_push_pull", error);
  }
}

function checkIllegalStickyBlocked(pkg: PrototypePackage): ToolConformanceCheck {
  const level = pkg.levels.levels.find((candidate) => candidate.id === "RA_SMOKE_06_STICKY_BLOCKED");
  if (!level) {
    return {
      id: "sticky_partial_block_illegal",
      status: "fail",
      reason: "RA_SMOKE_06_STICKY_BLOCKED fixture is missing.",
    };
  }

  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const state = adapter.parseLevel(level);
    const result = adapter.step(pkg.mechanic, state, "right", {
      winCondition: level.win ?? pkg.mechanic.win,
    });
    return !result.legal && result.reason === "force_blocked"
      ? {
          id: "sticky_partial_block_illegal",
          status: "pass",
          reason: "Partial sticky block rejected with state unchanged.",
        }
      : {
          id: "sticky_partial_block_illegal",
          status: "fail",
          reason: `Expected illegal force_blocked, got legal=${result.legal} reason=${
            result.reason ?? "none"
          }.`,
        };
  } catch (error) {
    return fail("sticky_partial_block_illegal", error);
  }
}

function checkSolverSmoke(pkg: PrototypePackage): ToolConformanceCheck {
  const level = smokeLevel(pkg);
  if (!level) {
    return { id: "solver_smoke", status: "fail", reason: "No smoke level exists in levels.yml." };
  }

  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const runtime = adapter.createRuntime(pkg.mechanic);
    const initial = adapter.parseLevel(level);
    const solution = solveWithRuntime(runtime, initial, {
      winCondition: level.win ?? pkg.mechanic.win,
      maxStates: 20_000,
      maxDepth: 80,
    });
    return solution.found
      ? {
          id: "solver_smoke",
          status: "pass",
          reason: `Solved ${level.id} cost=${solution.cost}, inputs=${solution.inputs.join(" ")}.`,
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

function checkGraphSmoke(pkg: PrototypePackage): ToolConformanceCheck {
  const level = smokeLevel(pkg);
  if (!level) {
    return { id: "graph_smoke", status: "fail", reason: "No smoke level exists in levels.yml." };
  }

  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const runtime = adapter.createRuntime(pkg.mechanic);
    const initial = adapter.parseLevel(level);
    const graph = analyzeGraphWithRuntime(runtime, initial, {
      winCondition: level.win ?? pkg.mechanic.win,
      maxStates: 20_000,
    });
    return {
      id: "graph_smoke",
      status: graph.status === "complete" ? "pass" : "unknown",
      reason: `Graph ${graph.status}; states=${graph.reachableStateCount}.`,
    };
  } catch (error) {
    return fail("graph_smoke", error);
  }
}

function checkLayoutAnalyzerSmoke(pkg: PrototypePackage): ToolConformanceCheck {
  const level = smokeLevel(pkg);
  if (!level) {
    return {
      id: "layout_analyzer_smoke",
      status: "fail",
      reason: "No smoke level exists in levels.yml.",
    };
  }

  try {
    const analysis = analyzeLevel(pkg, level, { maxStates: 20_000, graphMaxStates: 20_000 });
    return analysis.solution.found
      ? {
          id: "layout_analyzer_smoke",
          status: "pass",
          reason: `Analyzed ${level.id}; graph=${analysis.graph.status}.`,
        }
      : {
          id: "layout_analyzer_smoke",
          status: "unknown",
          reason: "Analyzer ran but no solution was found.",
        };
  } catch (error) {
    return fail("layout_analyzer_smoke", error);
  }
}

function checkRawSampler(pkg: PrototypePackage): ToolConformanceCheck {
  try {
    const report = mineRealityAnchorSeeds(pkg, {
      preset: "quick",
      seed: 271828,
      iterations: 12,
      maxFindings: 2,
      maxInstances: 24,
      maxStates: 4_000,
      maxDepth: 90,
      graphMaxStates: 4_000,
      minScore: 1,
    });
    if (report.findings.length === 0) {
      return {
        id: "raw_sampler",
        status: "fail",
        reason: "Reality Anchor raw sampler ran but kept no findings.",
      };
    }
    const badFinding = report.findings.find(
      (finding) =>
        finding.graph.status !== "complete" ||
        finding.solution.events.every((event) => event === "walk") ||
        !finding.notes.some((note) => note.includes("Raw sampler finding")),
    );
    if (badFinding) {
      return {
        id: "raw_sampler",
        status: "fail",
        reason: `${badFinding.id} did not satisfy replayable raw-finding gates.`,
      };
    }
    return {
      id: "raw_sampler",
      status: "pass",
      reason: `reality_anchor_raw_sampler_v1 kept ${report.findings.length} replayable finding(s).`,
    };
  } catch (error) {
    return fail("raw_sampler", error);
  }
}

function checkCapability(
  id: string,
  capability: { status: "implemented" | "unavailable"; maturity: string; reason?: string },
): ToolConformanceCheck {
  return capability.status === "implemented"
    ? {
        id,
        status: capability.maturity === "scaffold" ? "unknown" : "pass",
        reason: `Marked ${capability.status} at maturity '${capability.maturity}'. ${
          capability.reason ?? ""
        }`.trim(),
      }
    : {
        id,
        status: "unavailable",
        reason: `Maturity '${capability.maturity}'. ${capability.reason ?? ""}`.trim(),
      };
}

function smokeLevel(pkg: PrototypePackage): LevelDoc | undefined {
  return pkg.levels.levels.find((level) => level.id === "RA_SMOKE_01_PUSH_CHAIN") ?? pkg.levels.levels[0];
}

function fail(id: string, error: unknown): ToolConformanceCheck {
  return { id, status: "fail", reason: error instanceof Error ? error.message : String(error) };
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|");
}
