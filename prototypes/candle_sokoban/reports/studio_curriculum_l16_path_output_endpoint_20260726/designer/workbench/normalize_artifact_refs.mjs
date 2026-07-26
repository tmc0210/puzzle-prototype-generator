import fs from "node:fs";
import path from "node:path";

const [root, oldRef, newRef] = process.argv.slice(2);
if (!root || !oldRef || !newRef) {
  throw new Error("usage: node normalize_artifact_refs.mjs <root> <old-ref> <new-ref>");
}

function visit(current) {
  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    const fullPath = path.join(current, entry.name);
    if (entry.isDirectory()) {
      visit(fullPath);
      continue;
    }
    if (!/\.(?:md|json|ya?ml|txt)$/i.test(entry.name)) continue;
    const source = fs.readFileSync(fullPath, "utf8");
    const normalized = source.replaceAll(oldRef, newRef).replaceAll(oldRef.replaceAll("/", "\\"), newRef);
    if (normalized !== source) fs.writeFileSync(fullPath, normalized, "utf8");
  }
}

visit(root);
