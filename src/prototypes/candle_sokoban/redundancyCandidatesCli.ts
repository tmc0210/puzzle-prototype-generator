#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

import { discoverCandleRedundancyCandidates } from "./redundancyCandidates.js";

const [layoutRef, ...argv] = process.argv.slice(2);
if (!layoutRef) {
  throw new Error("用法：redundancyCandidatesCli.ts <layout-file|-> [--id LEVEL_ID] [--out report.json]");
}

const options = parseArgs(argv);
const levelId = options.id ?? "CANDLE_REDUNDANCY_CHECK";
const layout = layoutRef === "-"
  ? await readStdin()
  : await readFile(layoutRef, "utf8");
const report = discoverCandleRedundancyCandidates(layout, levelId);
const output = `${JSON.stringify(report, null, 2)}\n`;

if (options.out) await writeFile(options.out, output, "utf8");
else process.stdout.write(output);

async function readStdin(): Promise<string> {
  process.stdin.setEncoding("utf8");
  let input = "";
  for await (const chunk of process.stdin) input += chunk;
  return input;
}

function parseArgs(args: string[]): { id?: string; out?: string } {
  const result: { id?: string; out?: string } = {};
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    const value = args[index + 1];
    if ((key !== "--id" && key !== "--out") || !value) {
      throw new Error(`无法解析参数：${args.slice(index).join(" ")}`);
    }
    if (key === "--id") result.id = value;
    if (key === "--out") result.out = value;
    index += 1;
  }
  return result;
}
