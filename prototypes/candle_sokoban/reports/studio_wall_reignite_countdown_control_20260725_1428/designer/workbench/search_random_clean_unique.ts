import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const source = (await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage("prototypes/candle_sokoban"); const adapter = getRuntimeAdapter(pkg.mechanic); const runtime = adapter.createRuntime(pkg.mechanic);
function setCell(layout: string, cell: string): string { const [x,y]=cell.split(",").map(Number); const rows=layout.split("\n"); const row=rows[y]!; rows[y]=`${row.slice(0,x)}#${row.slice(x+1)}`; return rows.join("\n"); }
const rows=source.split("\n"); const candidates:string[]=[];
for(let y=8;y<=18;y++)for(let x=5;x<=12;x++){const g=rows[y]?.[x]; if(g===".") candidates.push(`${x},${y}`);}
let seed=2026072519; function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/0x100000000;}
const options={winCondition:pkg.mechanic.win};
for(let iter=0;iter<1200;iter++){
  let layout=source; const chosen=new Set<string>(); const count=1+Math.floor(rand()*5); while(chosen.size<count) chosen.add(candidates[Math.floor(rand()*candidates.length)]!);
  try{
    for(const c of chosen) layout=setCell(layout,c);
    const level:LevelDoc={id:"random-clean-unique",title:"random-clean-unique",layout:`${layout}\n`,global_burn_cycle:5,win:pkg.mechanic.win}; const initial=adapter.parseLevel(level);
    const solution=solveWithRuntime(runtime,initial,{...options,maxStates:50000,maxDepth:180}); if(!solution.found)continue;
    const replay=replayInputSequence(adapter,runtime,initial,solution.inputs,options,pkg.mechanic.win); const events=replay.steps.flatMap(s=>s.events);
    if(!replay.final.isWin||!events.some(e=>e.startsWith("extinguish_by_wall"))||!events.some(e=>e.startsWith("ignite_from_brazier")))continue;
    const graph=enumerateRuntimeGraph(runtime,initial,pkg.mechanic.win,options,{maxStates:50000,terminalizeWins:true}); if(graph.status!=="complete")continue;
    const forbidden=graph.edges.flatMap(edge=>edge.events.filter(e=>/^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(e))); if(forbidden.length)continue;
    const wins=[...graph.winStateIndexes].map(i=>graph.keys[i]!); const signatures=[...new Set(wins.map(k=>k.split("|C:")[1]?.split("|B:")[0]??k))];
    console.log(JSON.stringify({iter,walls:[...chosen],depth:solution.inputs.length,states:graph.keys.length,edges:graph.edges.length,wins:wins.length,signatures,inputs:solution.inputs,layout:`${layout}\n`},null,2));
    if(signatures.length===1)process.exit(0);
  }catch{}
}
