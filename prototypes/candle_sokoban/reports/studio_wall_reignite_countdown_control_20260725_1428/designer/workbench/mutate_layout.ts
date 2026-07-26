import { readFile, writeFile } from "node:fs/promises";

const source = process.argv[2]!;
const output = process.argv[3]!;
const walls = process.argv.find((arg) => arg.startsWith("walls="))?.slice(6).split(" ").filter(Boolean) ?? [];
const floors = process.argv.find((arg) => arg.startsWith("floors="))?.slice(7).split(" ").filter(Boolean) ?? [];
function setCell(rows: string[], cell: string, glyph: string): void {
  const [x, y] = cell.split(",").map(Number);
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
}
const rows = (await readFile(source, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
for (const cell of walls) setCell(rows, cell, "#");
for (const cell of floors) setCell(rows, cell, ".");
await writeFile(output, `${rows.join("\n")}\n`, "utf8");
