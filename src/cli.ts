#!/usr/bin/env node
import { loadCurriculumV2Package, loadPrototypePackage } from "./core/io.js";
import { auditPrototype, formatAuditMarkdown } from "./workflows/audit.js";
import {
  analyzeCurriculumV2Package,
  formatCurriculumV2Markdown,
} from "./workflows/curriculumV2.js";
import {
  analyzeLevelSpecsV2Package,
  formatLevelSpecsV2Markdown,
} from "./workflows/levelSpecsV2.js";
import {
  evaluateLevelSpecsV2Package,
  formatEvaluationV2Markdown,
} from "./workflows/evaluatorV2.js";
import {
  generateCandidatesV2Package,
  summarizeCandidatesV2,
} from "./workflows/generatorV2.js";
import { formatCandidateGalleryV2Markdown } from "./workflows/candidateGalleryV2.js";
import { evaluatePackage, summarizeEvaluation } from "./workflows/evaluator.js";
import { analyzeLevel, formatLevelAnalysisMarkdown } from "./workflows/levelAnalyzer.js";
import { formatCalibrationReport } from "./workflows/calibrationReport.js";
import { formatMinerReportMarkdown, mineSeeds, type MinerObjective } from "./workflows/seedMiner.js";
import { solveWithRuntime } from "./core/solver.js";
import { getRuntimeAdapter } from "./prototypes/runtimeAdapter.js";
import {
  compareIceSlideStarts,
  formatIceSlideStartComparisonMarkdown,
} from "./prototypes/ice_slide_escape/tools/startComparison.js";
import {
  formatRemoveArchiveCandidateReport,
  removeArchiveCandidate,
} from "./archive/designArchiveMaintenance.js";
import {
  capabilityForMechanic,
  formatToolCapabilitiesMarkdown,
  unavailableToolMessage,
} from "./workflows/toolMaturity.js";
import type { LevelDoc, LevelRole, WinCondition } from "./core/types.js";
import { randomInt } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const [command, packagePath = "prototypes/pull_portal_fallback", maybeLevelId] = args;
  const writeReports = process.argv.includes("--write");
  const levelId = maybeLevelId === "--write" ? undefined : maybeLevelId;

  if (
    !command ||
    ![
      "inspect",
      "solve",
      "evaluate",
      "evaluate-v2",
      "generate-v2",
      "candidate-gallery-v2",
      "calibration-report",
      "explain-level",
      "explain-layout",
      "compare-starts-layout",
      "archive-remove-candidate",
      "coverage",
      "audit",
      "curriculum-v2",
      "level-specs-v2",
      "mine",
      "tool-maturity",
    ].includes(command)
  ) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (command === "curriculum-v2") {
    const pkg = await loadCurriculumV2Package(packagePath);
    const analysis = analyzeCurriculumV2Package(pkg);
    const report = formatCurriculumV2Markdown(analysis);
    console.log(report.trimEnd());
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "curriculum_v2.md");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(reportPath, report, "utf8");
      console.log(`\nWrote ${reportPath}`);
    }
    return;
  }

  if (command === "level-specs-v2") {
    const pkg = await loadCurriculumV2Package(packagePath);
    const analysis = analyzeLevelSpecsV2Package(pkg);
    const report = formatLevelSpecsV2Markdown(analysis);
    console.log(report.trimEnd());
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "level_specs_v2.md");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(reportPath, report, "utf8");
      console.log(`\nWrote ${reportPath}`);
    }
    return;
  }

  if (command === "evaluate-v2") {
    const pkg = await loadCurriculumV2Package(packagePath);
    const evaluation = evaluateLevelSpecsV2Package(pkg);
    const report = formatEvaluationV2Markdown(evaluation);
    console.log(report.trimEnd());
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "evaluation_v2.md");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(reportPath, report, "utf8");
      console.log(`\nWrote ${reportPath}`);
    }
    return;
  }

  if (command === "generate-v2") {
    const basePkg = await loadPrototypePackage(packagePath);
    if (capabilityForMechanic(basePkg.mechanic.id, "candidate_seed_factories").status === "unavailable") {
      throw new Error(unavailableToolMessage(basePkg.mechanic.id, "candidate_seed_factories"));
    }
    const pkg = await loadCurriculumV2Package(packagePath);
    const candidates = generateCandidatesV2Package(pkg);
    console.log(summarizeCandidatesV2(candidates));
    if (writeReports) {
      const outputPath = path.join(pkg.root, "candidates_v2.yml");
      await writeFile(outputPath, YAML.stringify(candidates, { lineWidth: 0 }), "utf8");
      console.log(`\nWrote ${outputPath}`);
    }
    return;
  }

  if (command === "candidate-gallery-v2") {
    const pkg = await loadCurriculumV2Package(packagePath);
    const report = formatCandidateGalleryV2Markdown(pkg);
    console.log(report.trimEnd());
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "candidate_gallery_v2.md");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(reportPath, report, "utf8");
      console.log(`\nWrote ${reportPath}`);
    }
    return;
  }

  const pkg = await loadPrototypePackage(packagePath);

  if (command === "calibration-report") {
    const report = await formatCalibrationReport(pkg);
    console.log(report.trimEnd());
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "calibration_report_01.md");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(reportPath, report, "utf8");
      console.log(`\nWrote ${reportPath}`);
    }
    return;
  }

  if (command === "inspect") {
    console.log(`Prototype: ${pkg.mechanic.id}`);
    console.log(`Rules: ${pkg.mechanic.rules.length}`);
    console.log(`Knowledge: ${pkg.knowledge.knowledge.length}`);
    if (pkg.playerModel) {
      console.log(
        `Player model: ${pkg.playerModel.facts.length} facts, ${pkg.playerModel.constraints.length} constraints, ${pkg.playerModel.interactions.length} interactions, ${pkg.playerModel.abilities.length} abilities, ${pkg.playerModel.patterns.length} patterns`,
      );
    } else {
      console.log("Player model: (none)");
    }
    console.log(`Curriculum tracks: ${pkg.curriculum.tracks.length}`);
    if (pkg.curriculumV2) {
      const goalCount = pkg.curriculumV2.units.reduce((sum, unit) => sum + unit.goals.length, 0);
      console.log(`Curriculum v2: ${pkg.curriculumV2.units.length} units, ${goalCount} goals`);
    } else {
      console.log("Curriculum v2: (none)");
    }
    console.log(`Target levels: ${pkg.curriculum.target_level_count ?? "(none)"}`);
    console.log(`Levels: ${pkg.levels.levels.length}`);
    return;
  }

  if (command === "tool-maturity") {
    console.log(formatToolCapabilitiesMarkdown(pkg.mechanic.id).trimEnd());
    return;
  }

  if (command === "archive-remove-candidate") {
    const candidateId = maybeLevelId;
    if (!candidateId || candidateId.startsWith("--")) {
      throw new Error("archive-remove-candidate requires a candidate id");
    }
    const optionArgs = args.slice(3);
    const report = await removeArchiveCandidate(pkg, candidateId, {
      apply: hasFlag(optionArgs, "--apply"),
      keepFile: hasFlag(optionArgs, "--keep-file"),
    });
    console.log(formatRemoveArchiveCandidateReport(report).trimEnd());
    return;
  }

  if (command === "mine") {
    const optionArgs = args.slice(2);
    const objective = await parseMineObjective(optionArgs);
    const seed = parseNumberOption(optionArgs, "--seed") ?? randomMineSeed();
    const report = mineSeeds(pkg, {
      seed,
      iterations: parseNumberOption(optionArgs, "--iterations"),
      maxFindings: parseNumberOption(optionArgs, "--max-findings"),
      width: parseNumberOption(optionArgs, "--width"),
      height: parseNumberOption(optionArgs, "--height"),
      crates: parseNumberOption(optionArgs, "--crates"),
      portalPairs: parseNumberOption(optionArgs, "--portal-pairs"),
      wallDensity: parseNumberOption(optionArgs, "--wall-density"),
      minScore: parseNumberOption(optionArgs, "--min-score"),
      maxStates: parseNumberOption(optionArgs, "--max-states"),
      maxDepth: parseNumberOption(optionArgs, "--max-depth"),
      graphMaxStates: parseNumberOption(optionArgs, "--graph-max-states"),
      objective,
    });
    const markdown = formatMinerReportMarkdown(report);
    console.log(markdown.trimEnd());
    if (writeReports) {
      const markdownPath = path.join(pkg.root, "reports", "temporary_seed_miner.md");
      const jsonPath = path.join(pkg.root, "reports", "temporary_seed_miner.json");
      await mkdir(path.dirname(markdownPath), { recursive: true });
      await writeFile(markdownPath, markdown, "utf8");
      await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
      console.log(`\nWrote ${markdownPath}`);
      console.log(`Wrote ${jsonPath}`);
    }
    return;
  }

  if (command === "solve") {
    const adapter = getRuntimeAdapter(pkg.mechanic);
    const runtime = adapter.createRuntime(pkg.mechanic);
    const levels = levelId
      ? pkg.levels.levels.filter((level) => level.id === levelId)
      : pkg.levels.levels;
    if (levels.length === 0) {
      throw new Error(`No level found for id '${levelId}'`);
    }

    for (const level of levels) {
      const initial = adapter.parseLevel(level);
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: level.win ?? pkg.mechanic.win,
      });
      console.log(`\n${level.id}: ${level.title}`);
      console.log(adapter.renderState(initial));
      if (!solution.found) {
        console.log(`UNSOLVED explored=${solution.exploredStates} reason=${solution.reason}`);
        continue;
      }
      console.log(`SOLVED cost=${solution.cost} explored=${solution.exploredStates}`);
      console.log(`inputs=${solution.inputs.join(" ")}`);
      console.log(`events=${solution.events.join(" ")}`);
    }
    return;
  }

  if (command === "explain-level") {
    if (!levelId) {
      throw new Error("explain-level requires a level id");
    }

    const level = pkg.levels.levels.find((candidate) => candidate.id === levelId);
    if (!level) {
      throw new Error(`No level found for id '${levelId}'`);
    }

    const analysis = analyzeLevel(pkg, level);
    const report = formatLevelAnalysisMarkdown(analysis);
    console.log(report.trimEnd());
    if (writeReports) {
      const safeLevelId = level.id.replace(/[^a-zA-Z0-9_-]/g, "_");
      const markdownPath = path.join(pkg.root, "reports", `level_analysis_${safeLevelId}.md`);
      const jsonPath = path.join(pkg.root, "reports", `level_analysis_${safeLevelId}.json`);
      await mkdir(path.dirname(markdownPath), { recursive: true });
      await writeFile(markdownPath, report, "utf8");
      await writeFile(jsonPath, `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
      console.log(`\nWrote ${markdownPath}`);
      console.log(`Wrote ${jsonPath}`);
    }
    return;
  }

  if (command === "explain-layout") {
    const layoutPath = maybeLevelId;
    if (!layoutPath || layoutPath.startsWith("--")) {
      throw new Error("explain-layout requires a layout file path, or '-' for stdin");
    }

    const optionArgs = args.slice(3);
    const positionalOptions = optionArgs.some((arg) => arg.startsWith("--")) ? [] : optionArgs;
    const targetsFromFlag = parseCsvOption(optionArgs, "--targets");
    const targets = targetsFromFlag.length > 0 ? targetsFromFlag : positionalOptions.slice(1);
    const id = getOption(optionArgs, "--id") ?? positionalOptions[0] ?? "scratch_layout";
    const title = getOption(optionArgs, "--title") ?? id;
    const role = parseRole(getOption(optionArgs, "--role") ?? "challenge");
    const supportLevel = parseSupportLevel(getOption(optionArgs, "--support") ?? "none");
    const winCondition = parseExplainLayoutWinCondition(
      pkg.mechanic.id,
      parseWinCondition(getOption(optionArgs, "--win"), pkg.mechanic.win),
      optionArgs,
    );
    const layout = await readLayoutInput(layoutPath);
    const level: LevelDoc = {
      id,
      title,
      role,
      status: "candidate",
      targets,
      known_before: [],
      target_learning: targets,
      support_level: supportLevel,
      expected_solver_evidence: ["solvable"],
      expected_llm_player_evidence: [],
      layout,
      win: winCondition,
    };

    const analysis = analyzeLevel(pkg, level);
    const report = formatLevelAnalysisMarkdown(analysis);
    console.log(report.trimEnd());
    if (writeReports) {
      const safeLevelId = level.id.replace(/[^a-zA-Z0-9_-]/g, "_");
      const markdownPath = path.join(pkg.root, "reports", `layout_analysis_${safeLevelId}.md`);
      const jsonPath = path.join(pkg.root, "reports", `layout_analysis_${safeLevelId}.json`);
      await mkdir(path.dirname(markdownPath), { recursive: true });
      await writeFile(markdownPath, report, "utf8");
      await writeFile(jsonPath, `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
      console.log(`\nWrote ${markdownPath}`);
      console.log(`Wrote ${jsonPath}`);
    }
    return;
  }

  if (command === "compare-starts-layout") {
    const layoutPath = maybeLevelId;
    if (!layoutPath || layoutPath.startsWith("--")) {
      throw new Error("compare-starts-layout requires a layout file path, or '-' for stdin");
    }

    const optionArgs = args.slice(3);
    const playerGoal = parsePointOption(optionArgs, "--player-goal") ?? parsePointOption(optionArgs, "--goal");
    if (!playerGoal) {
      throw new Error("compare-starts-layout requires --player-goal x,y");
    }
    const id = getOption(optionArgs, "--id") ?? "start_comparison";
    const title = getOption(optionArgs, "--title") ?? id;
    const role = parseRole(getOption(optionArgs, "--role") ?? "challenge");
    const supportLevel = parseSupportLevel(getOption(optionArgs, "--support") ?? "none");
    const targets = parseCsvOption(optionArgs, "--targets");
    const layout = await readLayoutInput(layoutPath);
    const report = compareIceSlideStarts(pkg, layout, {
      id,
      title,
      role,
      supportLevel,
      targets,
      playerGoal,
      starts: parsePointListOption(optionArgs, "--starts"),
      requiredEvents: parseCsvOption(optionArgs, "--required-events"),
      forbiddenEvents: parseCsvOption(optionArgs, "--forbidden-events"),
      reportEvents: parseCsvOption(optionArgs, "--report-events"),
      maxStates: parseNumberOption(optionArgs, "--max-states"),
      maxDepth: parseNumberOption(optionArgs, "--max-depth"),
      graphMaxStates: parseNumberOption(optionArgs, "--graph-max-states"),
    });
    const markdown = formatIceSlideStartComparisonMarkdown(report);
    console.log(markdown.trimEnd());
    if (writeReports) {
      const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "_");
      const markdownPath = path.join(pkg.root, "reports", `start_comparison_${safeId}.md`);
      const jsonPath = path.join(pkg.root, "reports", `start_comparison_${safeId}.json`);
      await mkdir(path.dirname(markdownPath), { recursive: true });
      await writeFile(markdownPath, markdown, "utf8");
      await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
      console.log(`\nWrote ${markdownPath}`);
      console.log(`Wrote ${jsonPath}`);
    }
    return;
  }

  if (command === "evaluate") {
    const results = evaluatePackage(pkg);
    console.log(summarizeEvaluation(results));
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "evaluation.json");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(
        reportPath,
        `${JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            prototype: pkg.mechanic.id,
            results,
          },
          null,
          2,
        )}\n`,
        "utf8",
      );
      console.log(`\nWrote ${reportPath}`);
    }
    return;
  }

  if (command === "coverage") {
    const results = evaluatePackage(pkg);
    const resultByLevel = new Map(results.map((result) => [result.levelId, result]));
    const playerWinStandard = pkg.mechanic.win.type;
    const isCertifiedLevel = (level: typeof pkg.levels.levels[number]): boolean =>
      level.status === "accepted" &&
      resultByLevel.get(level.id)?.status === "pass" &&
      (level.win ?? pkg.mechanic.win).type === playerWinStandard;
    console.log(`Prototype: ${pkg.mechanic.id}`);
    console.log(`Levels: ${pkg.levels.levels.length}`);
    console.log("Coverage basis: certified levels only (accepted + evaluator pass + player win standard)");
    for (const item of pkg.knowledge.knowledge) {
      const targetLevels = pkg.levels.levels.filter((level) => level.targets.includes(item.id));
      const certified = targetLevels.filter((level) => isCertifiedLevel(level));
      const status = certified.length > 0 ? "OK" : "GAP";
      const levels = targetLevels.length > 0 ? targetLevels.map((level) => level.id).join(", ") : "(none)";
      const certifiedLevels =
        certified.length > 0 ? certified.map((level) => level.id).join(", ") : "none";
      console.log(`${status} ${item.id}: targets=${levels} certified=${certifiedLevels}`);
    }
    return;
  }

  if (command === "audit") {
    const audit = auditPrototype(pkg);
    const report = formatAuditMarkdown(audit);
    console.log(report.trimEnd());
    if (writeReports) {
      const reportPath = path.join(pkg.root, "reports", "audit.md");
      await mkdir(path.dirname(reportPath), { recursive: true });
      await writeFile(reportPath, report, "utf8");
      console.log(`\nWrote ${reportPath}`);
    }
    if (!audit.complete) {
      process.exitCode = 1;
    }
  }
}

function printUsage(): void {
  console.log("Usage:");
  console.log("  npm run inspect");
  console.log("  tsx src/cli.ts solve <prototype-path> [level-id]");
  console.log("  tsx src/cli.ts explain-level <prototype-path> <level-id> [--write]");
  console.log("  tsx src/cli.ts explain-layout <prototype-path> <layout-file|-> [--id id] [--targets K1,K2] [--win player_on_goal|event_occurs:event] [--player-start x,y] [--player-goal x,y] [--write]");
  console.log("  tsx src/cli.ts compare-starts-layout <prototype-path> <layout-file|-> --player-goal x,y [--starts x1,y1 x2,y2] [--required-events E1,E2] [--forbidden-events E1,E2] [--report-events E1,E2] [--write]");
  console.log("  tsx src/cli.ts archive-remove-candidate <prototype-path> <candidate-id> [--apply] [--keep-file]");
  console.log("  tsx src/cli.ts evaluate <prototype-path>");
  console.log("  tsx src/cli.ts coverage <prototype-path>");
  console.log("  tsx src/cli.ts audit <prototype-path> [--write]");
  console.log("  tsx src/cli.ts curriculum-v2 <prototype-path> [--write]");
  console.log("  tsx src/cli.ts level-specs-v2 <prototype-path> [--write]");
  console.log("  tsx src/cli.ts evaluate-v2 <prototype-path> [--write]");
  console.log("  tsx src/cli.ts generate-v2 <prototype-path> [--write]");
  console.log("  tsx src/cli.ts candidate-gallery-v2 <prototype-path> [--write]");
  console.log("  tsx src/cli.ts calibration-report <prototype-path> [--write]");
  console.log("  tsx src/cli.ts mine <prototype-path> [--seed n] [--iterations n] [--max-findings n] [--objective objective.yml] [--weight tag=number] [--write]");
  console.log("  tsx src/cli.ts tool-maturity <prototype-path>");
}

function randomMineSeed(): number {
  return randomInt(1, 0x7fffffff);
}

function getOption(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value`);
  }
  return value;
}

function parseCsvOption(args: string[], name: string): string[] {
  const index = args.indexOf(name);
  if (index === -1) {
    return [];
  }
  const values: string[] = [];
  for (let cursor = index + 1; cursor < args.length; cursor += 1) {
    const value = args[cursor];
    if (!value || value.startsWith("--")) {
      break;
    }
    values.push(value);
  }
  if (values.length === 0) {
    throw new Error(`${name} requires a value`);
  }
  const raw = values.join(" ");
  return raw
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function parseNumberOption(args: string[], name: string): number | undefined {
  const raw = getOption(args, name);
  if (raw === undefined) {
    return undefined;
  }
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`${name} requires a finite number`);
  }
  return value;
}

async function parseMineObjective(args: string[]): Promise<MinerObjective | undefined> {
  const objectivePath = getOption(args, "--objective");
  const fileObjective = objectivePath
    ? parseObjectiveDoc(
        YAML.parse(await readFile(path.resolve(objectivePath), "utf8")),
        `--objective ${objectivePath}`,
      )
    : undefined;
  const inlineWeights = parseWeightOptions(args, "--weight");
  if (!fileObjective && Object.keys(inlineWeights).length === 0) {
    return undefined;
  }
  return {
    name: fileObjective?.name ?? (Object.keys(inlineWeights).length > 0 ? "cli_weights" : undefined),
    tagWeights: {
      ...(fileObjective?.tagWeights ?? {}),
      ...inlineWeights,
    },
    note: fileObjective?.note,
  };
}

function parseObjectiveDoc(raw: unknown, source: string): MinerObjective {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${source} must contain an object with tagWeights or weights.`);
  }
  const doc = raw as Record<string, unknown>;
  const weightsRaw = doc.tagWeights ?? doc.weights;
  if (!weightsRaw || typeof weightsRaw !== "object" || Array.isArray(weightsRaw)) {
    throw new Error(`${source} must contain tagWeights or weights as a mapping.`);
  }
  const tagWeights: Record<string, number> = {};
  for (const [tag, value] of Object.entries(weightsRaw as Record<string, unknown>)) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error(`${source} weight for '${tag}' must be a finite number.`);
    }
    tagWeights[tag] = value;
  }
  if (Object.keys(tagWeights).length === 0) {
    throw new Error(`${source} must contain at least one tag weight.`);
  }
  const name = typeof doc.name === "string" && doc.name.length > 0 ? doc.name : undefined;
  const note = typeof doc.note === "string" && doc.note.length > 0 ? doc.note : undefined;
  return { name, tagWeights, note };
}

function parseWeightOptions(args: string[], name: string): Record<string, number> {
  const weights: Record<string, number> = {};
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] !== name) {
      continue;
    }
    const raw = args[index + 1];
    if (!raw || raw.startsWith("--")) {
      throw new Error(`${name} requires a value formatted as tag=number`);
    }
    const [tag, valueRaw] = raw.split("=");
    if (!tag || valueRaw === undefined) {
      throw new Error(`${name} value '${raw}' must be formatted as tag=number`);
    }
    const value = Number(valueRaw);
    if (!Number.isFinite(value)) {
      throw new Error(`${name} value '${raw}' must use a finite number`);
    }
    weights[tag] = value;
  }
  return weights;
}

function parsePointListOption(
  args: string[],
  name: string,
): Array<[number, number]> | undefined {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  const values: string[] = [];
  for (let cursor = index + 1; cursor < args.length; cursor += 1) {
    const value = args[cursor];
    if (!value || value.startsWith("--")) {
      break;
    }
    values.push(value);
  }
  if (values.length === 0) {
    throw new Error(`${name} requires at least one point formatted as x,y`);
  }

  return values.flatMap((value) =>
    value
      .split(/[;\s]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map(parsePointToken),
  );
}

function parsePointToken(raw: string): [number, number] {
  const [xRaw, yRaw] = raw.split(",");
  if (!xRaw || !yRaw) {
    throw new Error(`Point '${raw}' must be formatted as x,y`);
  }
  const x = Number(xRaw);
  const y = Number(yRaw);
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error(`Point '${raw}' must use integer coordinates`);
  }
  return [x, y];
}

function hasFlag(args: string[], name: string): boolean {
  return args.includes(name);
}

function parseWinCondition(raw: string | undefined, fallback: WinCondition): WinCondition {
  if (!raw) {
    return fallback;
  }
  if (raw.startsWith("event_occurs:")) {
    const event = raw.slice("event_occurs:".length);
    if (!event) {
      throw new Error("--win event_occurs:<event> requires an event id");
    }
    return { type: "event_occurs", event };
  }
  return { type: raw };
}

function parseExplainLayoutWinCondition(
  mechanicId: string,
  base: WinCondition,
  args: string[],
): WinCondition {
  const playerStart = parsePointOption(args, "--player-start") ?? parsePointOption(args, "--start");
  const playerGoal = parsePointOption(args, "--player-goal") ?? parsePointOption(args, "--goal");

  if (mechanicId === "ice_slide_escape") {
    if (!playerStart || !playerGoal) {
      throw new Error(
        "ice_slide_escape explain-layout requires explicit --player-start x,y and --player-goal x,y. " +
          "Each start/goal pair is a separate solve instance.",
      );
    }
    return {
      ...base,
      type: base.type === "event_occurs" ? base.type : "ice_slide_escape_explicit_goal",
      player_start: playerStart,
      player_goal: playerGoal,
    };
  }

  if (playerStart || playerGoal) {
    return {
      ...base,
      ...(playerStart ? { player_start: playerStart } : {}),
      ...(playerGoal ? { player_goal: playerGoal } : {}),
    };
  }

  return base;
}

function parsePointOption(
  args: string[],
  name: string,
): [number, number] | undefined {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  const first = args[index + 1];
  if (!first || first.startsWith("--")) {
    throw new Error(`${name} requires a point formatted as x,y or x y`);
  }
  const parts = first.includes(",")
    ? first.split(",").map((part) => part.trim())
    : [first, args[index + 2]];
  if (parts.length !== 2 || !parts[0] || !parts[1] || parts[1].startsWith("--")) {
    throw new Error(`${name} requires a point formatted as x,y or x y`);
  }
  const x = Number(parts[0]);
  const y = Number(parts[1]);
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new Error(`${name} requires integer coordinates formatted as x,y or x y`);
  }
  return [x, y];
}

function parseRole(raw: string): LevelRole {
  const roles: LevelRole[] = [
    "diagnostic",
    "discovery",
    "boundary",
    "guided_application",
    "independent_application",
    "variation_transfer",
    "combination",
    "challenge",
    "review",
    "mechanic_witness",
  ];
  if (!roles.includes(raw as LevelRole)) {
    throw new Error(`Unknown role '${raw}'`);
  }
  return raw as LevelRole;
}

function parseSupportLevel(raw: string): LevelDoc["support_level"] {
  const values: Array<LevelDoc["support_level"]> = ["none", "low", "medium", "high"];
  if (!values.includes(raw as LevelDoc["support_level"])) {
    throw new Error(`Unknown support level '${raw}'`);
  }
  return raw as LevelDoc["support_level"];
}

async function readLayoutInput(layoutPath: string): Promise<string> {
  const raw =
    layoutPath === "-"
      ? await readStdin()
      : await readFile(path.resolve(layoutPath), "utf8");
  return raw.replace(/\r/g, "").replace(/\n+$/g, "");
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
