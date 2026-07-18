import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.ts";

const layoutPath = process.argv[2] ?? new URL("./s_probe_01.txt", import.meta.url).pathname;
const maxProductStates = Number(process.argv[3] ?? 500000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "v12_bind_mouth_audit", title: "v12 bind mouth audit", layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const opts = { winCondition: pkg.mechanic.win, maxStates: maxProductStates };

function shapeKey(cells: Array<{x:number,y:number}>): string {
  const minX = Math.min(...cells.map(c => c.x));
  const minY = Math.min(...cells.map(c => c.y));
  return cells.map(c => `${c.x-minX},${c.y-minY}`).sort().join(";");
}
function fourShapes(state: any): string[] {
  return state.stickyGroups.filter((g:any) => g.length === 4).map((g:any) => shapeKey(g)).sort();
}
const S = "0,1;1,0;1,1;2,0";
const SQ = "0,0;0,1;1,0;1,1";
type Flags = { seenS:boolean; seenSquare:boolean; consumed:boolean };
function updateFlags(state:any, flags:Flags):Flags {
  const shapes = fourShapes(state);
  const seenS = flags.seenS || shapes.includes(S);
  const seenSquare = flags.seenSquare || shapes.includes(SQ);
  // Consumer state: the correct S has crossed the tooth once; its normalized
  // shape is unchanged and its leftmost cell reaches x=2.
  const consumedNow = state.stickyGroups.some((g:any) =>
    g.length === 4 && shapeKey(g) === S && Math.min(...g.map((c:any)=>c.x)) <= 2
  );
  return { seenS, seenSquare, consumed: flags.consumed || consumedNow };
}
function flagKey(f:Flags){ return `${f.seenS?1:0}${f.seenSquare?1:0}${f.consumed?1:0}`; }
type Node = {state:any; flags:Flags; path:string[]};
const initialFlags = updateFlags(initial,{seenS:false,seenSquare:false,consumed:false});
const queue:Node[] = [{state:initial, flags:initialFlags, path:[]}];
const seenProduct = new Set([`${runtime.key(initial)}|${flagKey(initialFlags)}`]);
const physical = new Set([runtime.key(initial)]);
const wins:Node[]=[];
const firstFour = new Map<string,string[]>();
let transitions=0, cursor=0;
while(cursor < queue.length && seenProduct.size < maxProductStates){
  const node=queue[cursor++];
  if(runtime.isWin(node.state,pkg.mechanic.win)) wins.push(node);
  for(const input of runtime.actions(node.state,opts)){
    const t=runtime.step(node.state,input,opts); transitions++;
    if(!t.legal) continue;
    const nextFlags=updateFlags(t.state,node.flags);
    const nextPath=[...node.path,input];
    for(const s of fourShapes(t.state)) if(!firstFour.has(s)) firstFour.set(s,nextPath);
    const pk=`${runtime.key(t.state)}|${flagKey(nextFlags)}`;
    physical.add(runtime.key(t.state));
    if(seenProduct.has(pk)) continue;
    seenProduct.add(pk); queue.push({state:t.state,flags:nextFlags,path:nextPath});
  }
}
const winClasses=new Map<string,{count:number,shortest:string[]}>();
for(const w of wins){
  const k=flagKey(w.flags); const old=winClasses.get(k);
  if(!old) winClasses.set(k,{count:1,shortest:w.path});
  else {old.count++; if(w.path.length<old.shortest.length) old.shortest=w.path;}
}
console.log(JSON.stringify({
  graph_status: cursor===queue.length?"complete":"budget_exhausted",
  physical_states: physical.size,
  product_states: seenProduct.size,
  transitions,
  win_product_nodes:wins.length,
  win_classes:Object.fromEntries([...winClasses].map(([k,v])=>[k,{...v,shortest:v.shortest.join(",")} ])),
  every_win_history_seen_S:wins.length>0 && wins.every(w=>w.flags.seenS),
  any_win_history_seen_square:wins.some(w=>w.flags.seenSquare),
  every_win_history_consumed:wins.length>0 && wins.every(w=>w.flags.consumed),
  first_four_cell_shapes:Object.fromEntries([...firstFour].map(([k,p])=>[k,p.join(",")]))
},null,2));
