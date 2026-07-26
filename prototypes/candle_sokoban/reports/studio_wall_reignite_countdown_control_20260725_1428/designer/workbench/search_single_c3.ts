import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const source=(await readFile(process.argv[2]!,'utf8')).replace(/\r/g,'').trimEnd();
const pkg=await loadPrototypePackage('prototypes/candle_sokoban'); const a=getRuntimeAdapter(pkg.mechanic); const rt=a.createRuntime(pkg.mechanic); const opt={winCondition:pkg.mechanic.win};
function set(l:string,x:number,y:number,g:string){const r=l.split('\n');const s=r[y]!;r[y]=s.slice(0,x)+g+s.slice(x+1);return r.join('\n');}
function sig(k:string){return k.split('|C:')[1]?.split('|B:')[0]??k;}
function test(layout:string){let ini;try{ini=a.parseLevel({id:'single-c3',title:'single-c3',layout:layout+'\n',global_burn_cycle:5,win:pkg.mechanic.win} as LevelDoc);}catch{return null;}const sol=solveWithRuntime(rt,ini,{...opt,maxStates:30000,maxDepth:120});if(!sol.found)return null;const rep=replayInputSequence(a,rt,ini,sol.inputs,opt,pkg.mechanic.win);const ev=rep.steps.flatMap(s=>s.events);if(!rep.final.isWin||!ev.some(e=>e.startsWith('extinguish_by_wall'))||!ev.some(e=>e.startsWith('ignite_from_brazier')))return null;const g=enumerateRuntimeGraph(rt,ini,pkg.mechanic.win,opt,{maxStates:30000,terminalizeWins:true});if(g.status!=='complete')return null;const bad=g.edges.flatMap(e=>e.events.filter(x=>/^(roll_intermediate_|roll_reignite_after_extinguish|wick_reexposed_unlit|shrink_ignite)/.test(x)));if(bad.length)return null;const signatures=[...new Set([...g.winStateIndexes].map(i=>sig(g.keys[i]!)))];return{depth:sol.inputs.length,states:g.keys.length,edges:g.edges.length,wins:g.winStateIndexes.size,signatures,inputs:sol.inputs,events:ev,layout:layout+'\n'};}
const targets=[[5,3],[6,3],[7,3],[9,3],[10,3],[11,3],[5,4],[6,4],[7,4],[9,4],[10,4],[11,4],[5,5],[6,5],[7,5],[9,5],[10,5],[11,5],[5,6],[6,6],[7,6],[9,6],[10,6],[11,6],[5,7],[6,7],[7,7],[9,7],[10,7],[11,7]] as const;
for(const [x,y] of targets){let l=source;l=set(l,8,5,'.');l=set(l,8,6,'.');if(l.split('\n')[y]![x]!=='.')continue;l=set(l,x,y,'o');const r=test(l);if(!r)continue;console.error(`target=${x},${y} sigs=${r.signatures.length}`);if(r.signatures.length<=2)console.log(JSON.stringify({target:[x,y],...r},null,2));if(r.signatures.length===1)process.exit(0);}
console.log('NO_UNIQUE');
