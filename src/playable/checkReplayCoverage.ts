import { readFile } from "node:fs/promises";
import path from "node:path";

type InputId = "up" | "down" | "left" | "right";

type PlayableLevel = {
  id: string;
  expected_trace?: Array<{ input?: string }>;
};

type PlayableData = {
  levels?: {
    levels?: PlayableLevel[];
  };
  evaluation?: {
    results?: Array<{
      levelId?: string;
      solutionInputs?: string[];
    }>;
  };
};

const packagePath = process.argv[2] ?? "prototypes/reality_anchor";
const dataPath = path.resolve(packagePath, "playable", "data.json");
const data = JSON.parse(await readFile(dataPath, "utf8")) as PlayableData;
const levels = data.levels?.levels ?? [];
const evaluations = new Map(
  (data.evaluation?.results ?? []).map((result) => [
    result.levelId,
    (result.solutionInputs ?? []).filter(isInputId),
  ]),
);

const missing = levels
  .filter((level) => {
    const embedded = (level.expected_trace ?? [])
      .map((step) => step.input)
      .filter(isInputId);
    return embedded.length === 0 && (evaluations.get(level.id)?.length ?? 0) === 0;
  })
  .map((level) => level.id);

if (missing.length > 0) {
  console.error(`Missing replay data for ${missing.length} playable level(s):`);
  for (const levelId of missing) {
    console.error(`- ${levelId}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Replay coverage complete for ${levels.length} playable level(s).`);
}

function isInputId(value: unknown): value is InputId {
  return value === "up" || value === "down" || value === "left" || value === "right";
}
