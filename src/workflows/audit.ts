import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { PrototypePackage } from "../core/types.js";
import { evaluatePackage } from "./evaluator.js";

export type PrototypeAudit = {
  prototype: string;
  levelCount: number;
  passedLevels: number;
  failedLevels: string[];
  warningLevels: string[];
  costCurve: Array<{
    id: string;
    cost?: number;
    exploredStates: number;
    graphStatus?: string;
    reachableStates?: number;
  }>;
  artifacts: Array<{ path: string; exists: boolean; label: string }>;
  webPlayableVersionedAssets: boolean;
  playerWinStandard: string;
  eventWinLevels: Array<{ levelId: string; event?: string }>;
  winOverrides: Array<{ levelId: string; winType: string }>;
  complete: boolean;
  notes: string[];
};

export function auditPrototype(pkg: PrototypePackage): PrototypeAudit {
  const results = evaluatePackage(pkg);
  const playerWinStandard = pkg.mechanic.win.type;
  const failedLevels = results
    .filter((result) => result.status === "fail")
    .map((result) => result.levelId);
  const warningLevels = results
    .filter((result) => result.status === "warning")
    .map((result) => result.levelId);
  const artifacts = [
    { label: "runtime report", path: "reports/evaluation.json" },
    { label: "web playable", path: "playable/index.html" },
    { label: "web playable data", path: "playable/data.json" },
    { label: "PuzzleScript Next export", path: "game.ps" },
  ].map((artifact) => ({
    ...artifact,
    exists: existsSync(path.join(pkg.root, artifact.path)),
  }));
  const eventWinLevels = pkg.levels.levels
    .filter((level) => (level.win ?? pkg.mechanic.win).type === "event_occurs")
    .map((level) => ({
      levelId: level.id,
      event: (level.win ?? pkg.mechanic.win).event,
    }));
  const winOverrides = pkg.levels.levels
    .filter((level) => (level.win ?? pkg.mechanic.win).type !== playerWinStandard)
    .map((level) => ({
      levelId: level.id,
      winType: (level.win ?? pkg.mechanic.win).type,
    }));
  const notes: string[] = [];
  if (winOverrides.length > 0) {
    notes.push(
      `${winOverrides.length} level(s) override the prototype win condition '${playerWinStandard}'.`,
    );
  }
  if (eventWinLevels.length > 0) {
    notes.push(`${eventWinLevels.length} level(s) use event_occurs win conditions.`);
  }

  return {
    prototype: pkg.mechanic.id,
    levelCount: pkg.levels.levels.length,
    passedLevels: results.filter((result) => result.status === "pass").length,
    failedLevels,
    warningLevels,
    costCurve: results.map((result) => ({
      id: result.levelId,
      cost: result.shortestCost,
      exploredStates: result.exploredStates,
      graphStatus: result.graphAnalysis?.status,
      reachableStates: result.graphAnalysis?.reachableStateCount,
    })),
    artifacts,
    webPlayableVersionedAssets: hasVersionedPlayableAssets(pkg.root),
    playerWinStandard,
    eventWinLevels,
    winOverrides,
    complete: failedLevels.length === 0 && warningLevels.length === 0,
    notes,
  };
}

function hasVersionedPlayableAssets(root: string): boolean {
  try {
    const indexHtml = readFileSync(path.join(root, "playable/index.html"), "utf8");
    const appJs = readFileSync(path.join(root, "playable/app.js"), "utf8");
    return (
      /style\.css\?v=/.test(indexHtml) &&
      /app\.js\?v=/.test(indexHtml) &&
      /data\.json\?v=/.test(appJs)
    );
  } catch {
    return false;
  }
}

export function formatAuditMarkdown(audit: PrototypeAudit): string {
  const lines: string[] = [
    `# Prototype Audit: ${audit.prototype}`,
    "",
    "## Summary",
    "",
    `- Runtime checks complete: ${audit.complete ? "yes" : "no"}`,
    `- Levels: ${audit.levelCount}`,
    `- Passing levels: ${audit.passedLevels} / ${audit.levelCount}`,
    `- Versioned web assets: ${audit.webPlayableVersionedAssets ? "yes" : "no"}`,
    `- Default win condition: ${audit.playerWinStandard}`,
    "",
    "## Cost Curve",
    "",
    "| Level | Cost | Solver Explored | Graph Status | Reachable States |",
    "| --- | ---: | ---: | --- | ---: |",
    ...audit.costCurve.map(
      (item) =>
        `| ${item.id} | ${item.cost ?? "n/a"} | ${item.exploredStates} | ${item.graphStatus ?? "n/a"} | ${item.reachableStates ?? "n/a"} |`,
    ),
    "",
    "## Win Conditions",
    "",
    `- Overrides: ${
      audit.winOverrides.length > 0
        ? audit.winOverrides.map((level) => `${level.levelId}:${level.winType}`).join(", ")
        : "none"
    }`,
    `- Event-occurs levels: ${
      audit.eventWinLevels.length > 0
        ? audit.eventWinLevels
            .map((level) => `${level.levelId}${level.event ? `:${level.event}` : ""}`)
            .join(", ")
        : "none"
    }`,
    "",
    "## Artifacts",
    "",
    ...audit.artifacts.map(
      (artifact) => `- ${artifact.exists ? "OK" : "MISSING"} ${artifact.label}: \`${artifact.path}\``,
    ),
    "",
    "## Notes",
    "",
    ...(audit.notes.length > 0 ? audit.notes.map((note) => `- ${note}`) : ["- No notes."]),
    "",
  ];

  if (audit.failedLevels.length > 0 || audit.warningLevels.length > 0) {
    lines.push("## Non-Pass Levels", "");
    if (audit.failedLevels.length > 0) lines.push(`- Failed: ${audit.failedLevels.join(", ")}`);
    if (audit.warningLevels.length > 0) lines.push(`- Warning: ${audit.warningLevels.join(", ")}`);
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}
