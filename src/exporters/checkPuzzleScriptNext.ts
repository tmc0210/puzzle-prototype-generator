import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../core/io.js";
import { unavailableToolMessage } from "../workflows/toolMaturity.js";

const packagePath = process.argv[2] ?? "prototypes/pull_portal_fallback";
const pkg = await loadPrototypePackage(packagePath);
if (pkg.mechanic.id !== "pull_portal_fallback") {
  throw new Error(unavailableToolMessage(pkg.mechanic.id, "puzzlescript_checker"));
}
const psPath = path.join(pkg.root, "game.ps");
const source = await readFile(psPath, "utf8");

const requiredSnippets = [
  "OBJECTS",
  "LEGEND",
  "COLLISIONLAYERS",
  "RULES",
  "WINCONDITIONS",
  "LEVELS",
  "@rule pull_single_crate",
  "@rule enter_portal.normal_teleport",
  "@rule enter_portal.blocked_exit_push_entrance",
  "Some Done",
];

const missing = requiredSnippets.filter((snippet) => !source.includes(snippet));
for (const level of pkg.levels.levels) {
  if (!source.includes(`// ${level.id}: ${level.title}`)) {
    missing.push(`level ${level.id}`);
  }
}

if (missing.length > 0) {
  throw new Error(`PuzzleScript export is missing:\n${missing.map((item) => `- ${item}`).join("\n")}`);
}

console.log(
  `PuzzleScript export check OK (${pkg.levels.levels.length} levels, ${requiredSnippets.length} required snippets)`,
);
