import type {
  TraceMetricCalibrationConfig,
  TraceMetricCalibrationScope,
  TraceMetricComponent,
} from "../core/types.js";

export type RawSolutionTraceMetrics = {
  status: "complete" | "unavailable";
  reason?: string;
  solutionCost?: number;
  nonWalkEventCount?: number;
  revisitRate?: number;
  heavyReuseRatio?: number;
};

export type CalibratedTraceMetricScope = {
  status: "enabled" | "unavailable";
  reason?: string;
  components?: Partial<Record<TraceMetricComponent, { raw: number; band: number; weight: number }>>;
  aggregateBand?: number;
};

export type CalibratedTraceMetrics = {
  calibration: string;
  status: "pilot" | "active" | "unavailable";
  reason?: string;
  solution_execution_pressure?: CalibratedTraceMetricScope;
  solution_space_reuse?: CalibratedTraceMetricScope;
};

export function calibrateTraceMetrics(
  raw: RawSolutionTraceMetrics,
  config: TraceMetricCalibrationConfig,
): CalibratedTraceMetrics {
  if (config.status === "unavailable") {
    return unavailable(config, config.reason ?? "calibration_unavailable");
  }
  if (raw.status !== "complete") {
    return unavailable(config, raw.reason ?? "trace_metrics_unavailable");
  }

  return {
    calibration: config.calibrationId,
    status: config.status,
    solution_execution_pressure: calibrateScope(raw, config.solutionExecutionPressure),
    solution_space_reuse: calibrateScope(raw, config.solutionSpaceReuse),
  };
}

function unavailable(
  config: TraceMetricCalibrationConfig,
  reason: string,
): CalibratedTraceMetrics {
  return {
    calibration: config.calibrationId,
    status: "unavailable",
    reason,
  };
}

function calibrateScope(
  raw: RawSolutionTraceMetrics,
  config: TraceMetricCalibrationScope | undefined,
): CalibratedTraceMetricScope {
  if (!config) return { status: "unavailable", reason: "scope_not_configured" };

  const components: NonNullable<CalibratedTraceMetricScope["components"]> = {};
  let weightedSum = 0;
  let totalWeight = 0;
  for (const [metric, weight] of Object.entries(config.weights) as Array<[TraceMetricComponent, number]>) {
    const thresholds = config.percentileThresholds[metric];
    const value = raw[metric];
    if (!thresholds || value === undefined || !Number.isFinite(weight) || weight <= 0) continue;
    const band = bandFor(value, thresholds);
    components[metric] = { raw: value, band, weight };
    weightedSum += band * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return { status: "unavailable", reason: "no_configured_trace_components" };
  return {
    status: "enabled",
    components,
    aggregateBand: clampBand(Math.round(weightedSum / totalWeight)),
  };
}

function bandFor(value: number, thresholds: [number, number, number, number]): number {
  if (value <= thresholds[0]) return 1;
  if (value <= thresholds[1]) return 2;
  if (value <= thresholds[2]) return 3;
  if (value <= thresholds[3]) return 4;
  return 5;
}

function clampBand(value: number): number {
  return Math.min(5, Math.max(1, value));
}
