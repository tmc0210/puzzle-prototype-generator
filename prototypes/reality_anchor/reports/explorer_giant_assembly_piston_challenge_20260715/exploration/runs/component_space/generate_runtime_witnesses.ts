import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Cell = "#" | "." | "@" | "M" | "C" | "G" | "P" | "L" | "B" | "S";
type Point = readonly [number, number];

const here = dirname(fileURLToPath(import.meta.url));

function board(width: number, height: number): Cell[][] {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : "."),
  );
}

function put(grid: Cell[][], [x, y]: Point, cell: Cell): void {
  grid[y]![x] = cell;
}

function write(name: string, grid: Cell[][]): void {
  writeFileSync(join(here, name), `${grid.map((row) => row.join("")).join("\n")}\n`, "utf8");
}

function translated(cells: Point[], dx: number, dy: number): Point[] {
  return cells.map(([x, y]) => [x + dx, y + dy] as const);
}

const handleT: Point[] = [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]];
const relayS: Point[] = [[0, 0], [1, 0], [2, 0], [3, 0], [1, -1], [2, 1]];
const crown: Point[] = [
  [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3],
  [1, -2], [1, 0], [1, 2],
];
const rearHook: Point[] = [[0, 0], [1, 0], [1, -1], [2, -1]];
const lowerKey: Point[] = [[0, 0], [1, 0], [1, 1], [2, 1]];
const upperKey: Point[] = [[0, 0], [1, 0], [1, -1], [2, -1], [2, 0]];

// 组件预先处于正确朝向，但彼此间各隔一格。连续两次 right 分别完成
// handle_T + relay_S、(handle_T + relay_S) + crown_head 的黏合。
{
  const grid = board(24, 13);
  put(grid, [20, 1], "S");
  put(grid, [21, 1], "B");
  put(grid, [20, 2], "P");
  put(grid, [21, 2], "L");
  put(grid, [2, 10], "G");
  put(grid, [4, 6], "@");
  for (const cell of translated(handleT, 5, 6)) put(grid, cell, "M");
  for (const cell of translated(relayS, 9, 6)) put(grid, cell, "M");
  for (const cell of translated(crown, 14, 6)) put(grid, cell, "M");
  write("serial_crown_two_step_assembly.layout.txt", grid);
}

// 四件串联面具的同类 reachability witness：三个连续 right 逐件黏合。
{
  const grid = board(24, 13);
  put(grid, [20, 1], "S");
  put(grid, [21, 1], "B");
  put(grid, [20, 2], "P");
  put(grid, [21, 2], "L");
  put(grid, [2, 10], "G");
  put(grid, [3, 6], "@");
  for (const cell of translated(rearHook, 4, 6)) put(grid, cell, "M");
  for (const cell of translated(lowerKey, 8, 5)) put(grid, cell, "M");
  for (const cell of translated(upperKey, 12, 6)) put(grid, cell, "M");
  for (const cell of translated(crown, 16, 6)) put(grid, cell, "M");
  write("serial_mask_three_step_assembly.layout.txt", grid);
}

// 反事实：若王冠头后方存在可站立施力格，它本身就是一个非长条远程执行器；
// 不需要 handle_T / relay_S 即可一次推动三个 piston crate 覆盖目标。
{
  const grid = Array.from({ length: 12 }, () => Array.from({ length: 18 }, () => "#" as Cell));
  put(grid, [13, 1], "S");
  put(grid, [14, 1], "B");
  put(grid, [13, 2], "P");
  put(grid, [14, 2], "L");
  for (const cell of translated(crown, 12, 6)) put(grid, cell, "M");
  put(grid, [11, 6], "@");
  for (const y of [4, 6, 8]) {
    put(grid, [14, y], "C");
    put(grid, [15, y], "G");
  }
  for (const [x, y] of translated(crown, 13, 6)) {
    if (grid[y]![x] === "#") put(grid, [x, y], ".");
  }
  write("crown_head_direct_access_counterfactual.layout.txt", grid);
}
