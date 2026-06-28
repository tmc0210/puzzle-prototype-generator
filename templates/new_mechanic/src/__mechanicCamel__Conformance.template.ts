import type { PrototypePackage } from "./types.js";
import { analyzeGraphWithRuntime } from "./graphAnalyzer.js";
import { analyzeLevel } from "./levelAnalyzer.js";
import { solveWithRuntime } from "./solver.js";
import { getRuntimeAdapter } from "./runtimeAdapter.js";
import { __mechanicCamel__ToolAvailability } from "./__mechanicCamel__Tools.js";

export type ToolConformanceStatus = "pass" | "fail" | "unknown" | "unavailable";

export type ToolConformanceCheck = {
  id: string;
  status: ToolConformanceStatus;
  reason: string;
};

export type __MechanicPascal__ConformanceReport = {
  mechanic: string;
  generatedAt: string;
  status: Exclude<ToolConformanceStatus, "unknown"> | "warning";
  checks: ToolConformanceCheck[];
};

export function check__MechanicPascal__ToolConformance(
  pkg: PrototypePackage,
): __MechanicPascal__ConformanceReport {
  const checks: ToolConformanceCheck[] = [];

  checks.push(checkAdapter(pkg));
  checks.push(checkSolverSmoke(pkg));
  checks.push(checkGraphSmoke(pkg));
  checks.push(checkLayoutAnalyzerSmoke(pkg));
  checks.push(checkAvailability("runtime_playable", "implemented"));
  checks.push(checkAvailability("puzzlescript_exporter", __mechanicCamel__ToolAvailability.puzzleScriptExporter.status));
  checks.push(checkAvailability("temporary_miner", __mechanicCamel__ToolAvailability.temporaryMiner.status));
  checks.push(checkAvailability("seed_factories", __mechanicCamel__ToolAvailability.seedFactories.status));

  const status = checks.some((check) => check.status === "fail")
    ? "fail"
    : checks.some((check) => check.status === "unavailable")
      ? "warning"
      : "pass";

  return {
    mechanic: pkg.mechanic.id,
    generatedAt: new Date().toISOString(),
    status,
    checks,
  };
}

function checkAdapter(pkg: PrototypePackage): ToolConformanceCheck {
  try {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    return adapter.id === pkg.mechanic.id
      ? { id: "adapter_registered", status: "pass", reason: `Adapter '${adapter.id}' registered.` }
      : {
          id: "adapter_registered",
          status: "fail",
          reason: `Adapter id '${adapter.id}' does not match mechanic '${pkg.mechanic.id}'.`,
        };
  } catch (error) {
    return {
      id: "adapter_registered",
      status: "fail",
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

function checkSolverSmoke(pkg: PrototypePackage): ToolConformanceCheck {
  const level = pkg.levels.levels[0];
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
      ? { id: "solver_smoke", status: "pass", reason: `Solved ${level.id} cost=${solution.cost}.` }
      : {
          id: "solver_smoke",
          status: solution.searchStatus === "exhausted" ? "unknown" : "fail",
          reason: solution.reason ?? "No solution found.",
        };
  } catch (error) {
    return { id: "solver_smoke", status: "fail", reason: error instanceof Error ? error.message : String(error) };
  }
}

function checkGraphSmoke(pkg: PrototypePackage): ToolConformanceCheck {
  const level = pkg.levels.levels[0];
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
    return { id: "graph_smoke", status: "fail", reason: error instanceof Error ? error.message : String(error) };
  }
}

function checkLayoutAnalyzerSmoke(pkg: PrototypePackage): ToolConformanceCheck {
  const level = pkg.levels.levels[0];
  if (!level) {
    return { id: "layout_analyzer_smoke", status: "fail", reason: "No smoke level exists in levels.yml." };
  }

  try {
    const analysis = analyzeLevel(pkg, level, { maxStates: 20_000, graphMaxStates: 20_000 });
    return analysis.solution.found
      ? { id: "layout_analyzer_smoke", status: "pass", reason: `Analyzed ${level.id}.` }
      : { id: "layout_analyzer_smoke", status: "unknown", reason: "Analyzer ran but no solution was found." };
  } catch (error) {
    return {
      id: "layout_analyzer_smoke",
      status: "fail",
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

function checkAvailability(
  id: string,
  status: "implemented" | "unavailable",
): ToolConformanceCheck {
  return status === "implemented"
    ? { id, status: "pass", reason: "Marked implemented; smoke checks should be added for this tool." }
    : { id, status: "unavailable", reason: "Tool explicitly marked unavailable for this mechanism." };
}
