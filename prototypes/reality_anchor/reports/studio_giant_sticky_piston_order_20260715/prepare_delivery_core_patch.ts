import { readFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const draftPath = path.join(import.meta.dirname, "delivery_integration_draft.yml");
const levelsPath = path.join(repoRoot, "prototypes/reality_anchor/levels.yml");
const queuePath = path.join(repoRoot, "prototypes/reality_anchor/playable_queue.yml");

const draft = YAML.parse(await readFile(draftPath, "utf8"));
const levelsText = await readFile(levelsPath, "utf8");
const queueText = await readFile(queuePath, "utf8");

for (const proposal of draft.levels_yml_proposals) {
  if (levelsText.includes(`id: ${proposal.level_doc.id}`)) {
    throw new Error(`Level id already exists: ${proposal.level_doc.id}`);
  }
}
if (!/^entries:\s*\[\]\s*$/m.test(queueText)) {
  throw new Error("playable_queue.yml is no longer empty; stop for a merge-aware edit");
}

function asListItem(value: unknown): string[] {
  const lines = YAML.stringify(value, { lineWidth: 0 }).trimEnd().split("\n");
  return [`  - ${lines[0]}`, ...lines.slice(1).map((line) => `    ${line}`)];
}

const levelLines = draft.levels_yml_proposals.flatMap((proposal: any) => asListItem(proposal.level_doc));
const queueLines = draft.playable_queue_entry_proposals.flatMap((entry: any) => asListItem(entry));
const existingLines = levelsText.replace(/\r\n/g, "\n").trimEnd().split("\n");
const context = existingLines.slice(-4);

const patch = [
  "*** Begin Patch",
  `*** Update File: ${levelsPath}`,
  "@@",
  ...context.map((line) => ` ${line}`),
  ...levelLines.map((line) => `+${line}`),
  `*** Update File: ${queuePath}`,
  "@@",
  "-entries: []",
  "+entries:",
  ...queueLines.map((line) => `+${line}`),
  "*** End Patch",
].join("\n");

process.stdout.write(patch);
