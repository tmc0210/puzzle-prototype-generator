import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const [outputPath, separator, executable, ...args] = process.argv.slice(2);
if (!outputPath || separator !== "--" || !executable) {
  throw new Error("usage: node capture_command.mjs <output> -- <executable> [args...]");
}

const result = spawnSync(executable, args, {
  cwd: process.cwd(),
  encoding: "utf8",
  shell: false,
});
const body = [result.stdout, result.stderr].filter(Boolean).join("\n");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, body, "utf8");
if (result.error) throw result.error;
if (result.status !== 0) {
  process.stderr.write(body);
  process.exit(result.status ?? 1);
}
