import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  puzzleScript16Sprites,
  requiredRealityAnchorSpriteKeys,
} from "./manifest.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const pngDir = path.join(here, "png");
const errors: string[] = [];
const seenFiles = new Set<string>();

for (const key of requiredRealityAnchorSpriteKeys) {
  if (!puzzleScript16Sprites[key]) {
    errors.push(`Missing Reality Anchor sprite key: ${key}`);
  }
}

for (const [visualKey, sprite] of Object.entries(puzzleScript16Sprites)) {
  if (!sprite.file.endsWith(".png")) {
    errors.push(`${visualKey} must reference a .png file`);
  }
  seenFiles.add(sprite.file);
}

for (const file of seenFiles) {
  const filePath = path.join(pngDir, file);
  try {
    await access(filePath);
    const size = await pngSize(filePath);
    if (size.width !== 16 || size.height !== 16) {
      errors.push(`${file} must be 16x16, got ${size.width}x${size.height}`);
    }
  } catch (error) {
    errors.push(`${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (errors.length > 0) {
  throw new Error(`Invalid puzzlescript16 sprites:\n${errors.join("\n")}`);
}

console.log(`Checked ${seenFiles.size} puzzlescript16 PNG sprites`);

async function pngSize(filePath: string): Promise<{ width: number; height: number }> {
  const bytes = await readFile(filePath);
  const signature = "89504e470d0a1a0a";
  if (bytes.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("not a PNG file");
  }
  if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") {
    throw new Error("missing IHDR chunk");
  }
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}
