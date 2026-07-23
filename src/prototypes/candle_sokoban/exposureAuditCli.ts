import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../core/io.js";
import type { LevelDoc } from "../../core/types.js";
import {
  auditCandleExposure,
  loadCandleExposureSequence,
} from "./exposureAudit.js";

type CliOptions = {
  layoutPath: string;
  allowedExposureThrough: string;
  id: string;
  exactVersion?: string;
  maxStates?: number;
  maxTransitions?: number;
  outPath?: string;
};

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const prototypeRoot = path.resolve("prototypes", "candle_sokoban");
  const pkg = await loadPrototypePackage(prototypeRoot);
  const sequencePath = path.join(prototypeRoot, "docs", "mechanic_exposure_sequence.yml");
  const { sequence, raw } = loadCandleExposureSequence(sequencePath);
  const layout = normalizeLayout(
    options.layoutPath === "-"
      ? await readStdin()
      : await readFile(path.resolve(options.layoutPath), "utf8"),
  );
  const level: LevelDoc = {
    id: options.id,
    title: options.id,
    global_burn_cycle: 5,
    layout,
  };
  const report = auditCandleExposure(pkg, level, sequence, raw, {
    allowedExposureThrough: options.allowedExposureThrough,
    ...(options.exactVersion ? { exactVersion: options.exactVersion } : {}),
    ...(options.maxStates === undefined ? {} : { maxStates: options.maxStates }),
    ...(options.maxTransitions === undefined
      ? {}
      : { maxTransitions: options.maxTransitions }),
  });
  const json = `${JSON.stringify(report, null, 2)}\n`;

  if (options.outPath) {
    const resolved = path.resolve(options.outPath);
    await mkdir(path.dirname(resolved), { recursive: true });
    await writeFile(resolved, json, "utf8");
    console.log(
      `exposure_audit verdict=${report.verdict} graph=${report.graph.status} states=${report.graph.reachable_state_count} edges=${report.graph.legal_transition_count} forbidden_hits=${report.forbidden_hits.length} out=${resolved}`,
    );
  } else {
    process.stdout.write(json);
  }

  process.exitCode = report.verdict === "pass" ? 0 : report.verdict === "fail" ? 2 : 3;
}

function parseArgs(args: string[]): CliOptions {
  const layoutPath = args[0];
  if (!layoutPath || layoutPath.startsWith("--")) {
    usage("缺少 layout 文件路径；使用 '-' 可从 stdin 读取。");
  }

  let allowedExposureThrough: string | undefined;
  let id = "CANDLE_EXPOSURE_AUDIT";
  let exactVersion: string | undefined;
  let maxStates: number | undefined;
  let maxTransitions: number | undefined;
  let outPath: string | undefined;

  for (let index = 1; index < args.length; index += 1) {
    const arg = args[index];
    const value = args[index + 1];
    switch (arg) {
      case "--allowed-exposure-through":
        allowedExposureThrough = requireValue(arg, value);
        index += 1;
        break;
      case "--id":
        id = requireValue(arg, value);
        index += 1;
        break;
      case "--exact-version":
        exactVersion = requireValue(arg, value);
        index += 1;
        break;
      case "--max-states":
        maxStates = positiveInteger(arg, value);
        index += 1;
        break;
      case "--max-transitions":
        maxTransitions = positiveInteger(arg, value);
        index += 1;
        break;
      case "--out":
        outPath = requireValue(arg, value);
        index += 1;
        break;
      default:
        usage(`未知参数 '${arg ?? ""}'。`);
    }
  }

  if (!allowedExposureThrough) {
    usage("缺少 --allowed-exposure-through。");
  }
  return {
    layoutPath,
    allowedExposureThrough,
    id,
    ...(exactVersion ? { exactVersion } : {}),
    ...(maxStates === undefined ? {} : { maxStates }),
    ...(maxTransitions === undefined ? {} : { maxTransitions }),
    ...(outPath ? { outPath } : {}),
  };
}

function requireValue(option: string, value: string | undefined): string {
  if (!value || value.startsWith("--")) {
    usage(`${option} 缺少值。`);
  }
  return value;
}

function positiveInteger(option: string, value: string | undefined): number {
  const parsed = Number(requireValue(option, value));
  if (!Number.isInteger(parsed) || parsed <= 0) {
    usage(`${option} 必须是正整数。`);
  }
  return parsed;
}

function normalizeLayout(layout: string): string {
  return layout.replace(/\r/g, "").trimEnd();
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  }
  return Buffer.concat(chunks).toString("utf8");
}

function usage(message: string): never {
  throw new Error(
    `${message}\n用法: npx tsx src/prototypes/candle_sokoban/exposureAuditCli.ts <layout-file|-> --allowed-exposure-through <branch> [--id <id>] [--exact-version <version>] [--max-states <n>] [--max-transitions <n>] [--out <report.json>]`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
