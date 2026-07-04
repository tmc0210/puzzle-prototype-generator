import type { PrototypePackage } from "../core/types.js";
import {
  checkRealityAnchorToolConformance,
  formatRealityAnchorConformanceMarkdown,
  type RealityAnchorConformanceReport,
} from "../prototypes/reality_anchor/conformance.js";

export type ToolConformanceReport = RealityAnchorConformanceReport;

export function checkToolConformance(pkg: PrototypePackage): ToolConformanceReport {
  if (pkg.mechanic.id === "reality_anchor") {
    return checkRealityAnchorToolConformance(pkg);
  }
  throw new Error(`No tool-conformance runner registered for mechanic '${pkg.mechanic.id}'`);
}

export function formatToolConformanceMarkdown(report: ToolConformanceReport): string {
  if (report.mechanic === "reality_anchor") {
    return formatRealityAnchorConformanceMarkdown(report);
  }
  throw new Error(`No tool-conformance formatter registered for mechanic '${report.mechanic}'`);
}
