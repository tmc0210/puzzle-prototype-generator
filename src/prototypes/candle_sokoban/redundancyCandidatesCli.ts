#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

import { discoverCandleRedundancyCandidates } from "./redundancyCandidates.js";

const [layoutRef, ...argv] = process.argv.slice(2);
if (!layoutRef) {
  throw new Error("用法：redundancyCandidatesCli.ts <layout-file|-> [--id LEVEL_ID] [--vacated-cells x,y;x,y] [--out report.json]");
}

const options = parseArgs(argv);
const levelId = options.id ?? "CANDLE_REDUNDANCY_CHECK";
const layout = layoutRef === "-"
  ? await readStdin()
  : await readFile(layoutRef, "utf8");
const report = discoverCandleRedundancyCandidates(layout, levelId, {
  vacatedObjectRegions: options.vacatedCells
    ? [{ id: "removed_object", cells: parseCells(options.vacatedCells) }]
    : [],
});
const output = `${JSON.stringify(report, null, 2)}\n`;

if (options.out) await writeFile(options.out, output, "utf8");
else process.stdout.write(output);

async function readStdin(): Promise<string> {
  process.stdin.setEncoding("utf8");
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return input;
}

function parseArgs(args: string[]): { id?: string; out?: string; vacatedCells?: string } {
  const result: { id?: string; out?: string; vacatedCells?: string } = {};
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    const value = args[index + 1];
    if ((key !== "--id" && key !== "--out" && key !== "--vacated-cells") || !value) {
      throw new Error(`无法解析参数：${args.slice(index).join(" ")}`);
    }
    if (key === "--id") result.id = value;
    if (key === "--out") result.out = value;
    if (key === "--vacated-cells") result.vacatedCells = value;
    index += 1;
  }
  return result;
}

function parseCells(value: string): Array<{ x: number; y: number }> {
  return value.split(";").map((entry) => {
    const [x, y, ...rest] = entry.split(",").map(Number);
    if (rest.length > 0 || !Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error(`无法解析腾空格：${entry}`);
    }
    return { x: x!, y: y! };
  });
}
