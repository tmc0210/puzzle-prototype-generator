// Manual probe of the intended ax1 spine, step by step with renders.
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";

const protoRoot = "prototypes/reality_anchor";
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = `########
#BS#...#
#PLM...#
#G##...#
#..#GMM#
#..@#..#
#..#...#
########`;
const level = { id: "ax1", title: "ax1", layout, win: pkg.mechanic.win };
let state = adapter.parseLevel(level);
const inputs = "right,right,up,up,up,right,right,left,left,left,left,down,right,up,up,up,up,left,left,left,down".split(",");
function render(st) {
  const W = 8, H = 8;
  const walls = st.walls instanceof Set ? st.walls : new Set(st.walls.map((c) => `${c.x},${c.y}`));
  const cell = [];
  for (let y = 0; y < H; y++) { let row = ""; for (let x = 0; x < W; x++) row += walls.has(`${x},${y}`) ? "#" : "."; cell.push(row.split("")); }
  const goals = st.goals instanceof Set ? [...st.goals].map((k) => { const [x, y] = k.split(",").map(Number); return { x, y }; }) : st.goals;
  for (const g of goals) cell[g.y][g.x] = "G";
  for (const c of st.crates) cell[c.y][c.x] = cell[c.y][c.x] === "G" ? "+" : "C";
  for (const grp of st.stickyGroups) for (const m of grp) cell[m.y][m.x] = cell[m.y][m.x] === "G" ? "*" : "M";
  cell[state.player.y][state.player.x] = "@";
  return cell.map((r) => r.join("")).join("\n");
}
console.log(render(state));
for (let i = 0; i < inputs.length; i++) {
  const t = runtime.step(state, inputs[i], { winCondition: pkg.mechanic.win, maxStates: 10000 });
  if (!t.legal) { console.log(`\nstep${i + 1} ${inputs[i]}: ILLEGAL ${t.reason}`); break; }
  state = t.state;
  console.log(`\nstep${i + 1} ${inputs[i]}: ${(t.events ?? []).join("|") || "-"}`);
  console.log(render(state));
  if (t.won) { console.log("WON"); break; }
}
