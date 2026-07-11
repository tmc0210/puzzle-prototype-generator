import { writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type Rng = () => number;
type Proof = { fullStates:number; fullEdges:number; macroStates:number; relevantMacroStates:number; path:number[]; labels:string[]; erasedBranches:number };
type Hit = { id:string; layout:string; cost:number; inputs:InputId[]; events:string[]; revisit:number; heavy:number; nonWalk:number; graphBase:number; proof:Proof; score:number };

class Dsu{p:number[];r:number[];constructor(n:number){this.p=Array.from({length:n},(_,i)=>i);this.r=new Array(n).fill(0);}find(x:number):number{while(this.p[x]!==x){this.p[x]=this.p[this.p[x]!]!;x=this.p[x]!;}return x;}union(a:number,b:number):void{a=this.find(a);b=this.find(b);if(a===b)return;if(this.r[a]!<this.r[b]!)[a,b]=[b,a];this.p[b]=a;if(this.r[a]===this.r[b])this.r[a]!+=1;}}

const seed = Number(process.argv[2] ?? 2026071061);
const iterations = Number(process.argv[3] ?? 1500);
const baseMaxStates = Number(process.argv[4] ?? 35_000);
const finalMaxStates = Number(process.argv[5] ?? 90_000);
const rng = mulberry32(seed);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const hits: Hit[] = [];
let completeBases = 0;
let synthesizedUniquePatterns = 0;
let eventQualifiedPatterns = 0;

for (let sample = 0; sample < iterations; sample += 1) {
  const sampled = sampleBase();
  if (!sampled) continue;
  const baseLevel = toLevel(`RA_STRICT_GOAL_BASE_${seed}_${sample}`, sampled.layout);
  let initial: RealityAnchorState;
  try { initial = adapter.parseLevel(baseLevel) as RealityAnchorState; } catch { continue; }
  const baseGraph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win,
    { winCondition: pkg.mechanic.win }, { maxStates: baseMaxStates, terminalizeWins: false }) as Graph;
  if (baseGraph.status !== "complete") continue;
  completeBases += 1;

  const counts = new Map<string, { count:number; state:number }>();
  for (let stateIndex = 0; stateIndex < baseGraph.states.length; stateIndex += 1) {
    const occupied = eligibleOccupancy(baseGraph.states[stateIndex]!, sampled.goalCells);
    for (const size of [2, 3]) {
      for (const combo of combinations(occupied, size)) {
        const key = combo.join(",");
        const prior = counts.get(key);
        if (!prior) counts.set(key, {count:1,state:stateIndex});
        else if (prior.count < 2) prior.count += 1;
      }
    }
  }
  const incoming = Array.from({length:baseGraph.keys.length},()=>[] as Edge[]);
  for (const edge of baseGraph.edges) incoming[edge.to]!.push(edge);
  const unique = [...counts.entries()]
    .filter(([,record]) => record.count === 1 && baseGraph.depthByIndex[record.state]! >= 18 && baseGraph.depthByIndex[record.state]! <= 34)
    .sort((a,b)=>baseGraph.depthByIndex[b[1].state]!-baseGraph.depthByIndex[a[1].state]!)
    .slice(0, 60);
  synthesizedUniquePatterns += unique.length;

  for (const [goalKey, record] of unique) {
    const route = shortestRoute(record.state, baseGraph, incoming);
    const allEvents = route.flatMap((edge)=>edge.events);
    if (!hasRequired(allEvents)) continue;
    eventQualifiedPatterns += 1;
    const goalIndexes = goalKey.split(",").map(Number);
    const finalLayout = setGoals(sampled.layout, sampled.goalCells, goalIndexes);
    const id = `RA_STRICT_GOAL_SYNTH_${seed}_${sample}_${goalKey.replaceAll(",","_")}`;
    const finalLevel = toLevel(id, finalLayout);
    let finalInitial: RealityAnchorState;
    try { finalInitial = adapter.parseLevel(finalLevel) as RealityAnchorState; } catch { continue; }
    const finalGraph = enumerateRuntimeGraph(runtime, finalInitial, pkg.mechanic.win,
      { winCondition: pkg.mechanic.win }, { maxStates: finalMaxStates, terminalizeWins:true }) as Graph;
    if (finalGraph.status !== "complete" || finalGraph.winStateIndexes.size !== 1) continue;
    const proof = prove(finalGraph);
    if (!proof || !hasRequired(proof.labels.flatMap((label)=>label.split("&")))) continue;
    const inputs = route.map((edge)=>edge.action);
    const trace = replay(finalInitial, inputs);
    if (!runtime.isWin(trace.at(-1)?.state ?? finalInitial, pkg.mechanic.win)) continue;
    const positions = [`${finalInitial.player.x},${finalInitial.player.y}`,...trace.map((step)=>`${step.state.player.x},${step.state.player.y}`)];
    const visits = new Map<string,number>(); for(const key of positions) visits.set(key,(visits.get(key)??0)+1);
    const revisit = 1-visits.size/positions.length;
    const heavy = [...visits.values()].filter((count)=>count>=3).length/countWalkable(finalLayout);
    const nonWalk = trace.filter((step)=>substantive(step.events).length>0).length;
    if (revisit < .30 || heavy < .08 || nonWalk < 10 || nonWalk / inputs.length < .35) continue;
    const richnessBonus=(allEvents.some((e)=>e.startsWith("push_object"))?25:0)+(allEvents.some((e)=>e.startsWith("force_chain"))?25:0)+(allEvents.some((e)=>e.startsWith("move_sticky_rigid"))?15:0);
    const score=nonWalk*14-(inputs.length-nonWalk)*4+revisit*100+heavy*160+richnessBonus-Math.log10(finalGraph.keys.length+1)*8;
    hits.push({id,layout:finalLayout,cost:inputs.length,inputs,events:allEvents,revisit,heavy,nonWalk,graphBase:baseGraph.keys.length,proof,score});
    hits.sort((a,b)=>b.score-a.score); hits.splice(20);
    if(hits.length>=20) break;
  }
  if((sample+1)%100===0) console.log(`progress=${sample+1} bases=${completeBases} patterns=${synthesizedUniquePatterns} qualified=${eventQualifiedPatterns} hits=${hits.length}`);
}

const out=`prototypes/Reality_Anchor/reports/search_strict_unique_goal_synthesis_agent_${seed}.md`;
await writeFile(out,format(),"utf8");
console.log(format()); console.log(`Wrote ${out}`);

function prove(graph:Graph): Proof|null {
  const dsu=new Dsu(graph.keys.length);
  for(const edge of graph.edges) if(substantive(edge.events).length===0) dsu.union(edge.from,edge.to);
  const rootIds=new Map<number,number>(); const macroOf:number[]=[];
  for(let i=0;i<graph.keys.length;i+=1){const root=dsu.find(i);if(!rootIds.has(root))rootIds.set(root,rootIds.size);macroOf[i]=rootIds.get(root)!;}
  const count=rootIds.size; const edges=graph.edges.flatMap((edge)=>{const e=substantive(edge.events);return e.length?[{from:macroOf[edge.from]!,to:macroOf[edge.to]!,label:e.join("&")}]:[];});
  const wins=new Set([...graph.winStateIndexes].map((index)=>macroOf[index]!)); if(wins.size!==1)return null;
  const start=macroOf[0]!, goal=[...wins][0]!;
  const out=Array.from({length:count},()=>new Set<number>()), inc=Array.from({length:count},()=>new Set<number>());
  for(const edge of edges)if(edge.from!==edge.to){out[edge.from]!.add(edge.to);inc[edge.to]!.add(edge.from);}
  const f=reach(start,out), b=reach(goal,inc), relevant=new Set([...f].filter((n)=>b.has(n))); const path=shortestMacro(start,goal,out,relevant);if(!path)return null;
  const und=Array.from({length:count},()=>new Set<number>());for(const edge of edges)if(edge.from!==edge.to&&relevant.has(edge.from)&&relevant.has(edge.to)){und[edge.from]!.add(edge.to);und[edge.to]!.add(edge.from);}
  for(let i=0;i+1<path.length;i+=1)if(connectedWithout(start,goal,und,path[i]!,path[i+1]!))return null;
  const labels:string[]=[];for(let i=0;i+1<path.length;i+=1){const set=new Set(edges.filter((edge)=>edge.from===path[i]&&edge.to===path[i+1]).map((edge)=>edge.label));if(set.size!==1)return null;labels.push([...set][0]!);}
  return{fullStates:graph.keys.length,fullEdges:graph.edges.length,macroStates:count,relevantMacroStates:relevant.size,path,labels,erasedBranches:relevant.size-path.length};
}

function shortestRoute(target:number,graph:Graph,incoming:Edge[][]):Edge[]{const result:Edge[]=[];let current=target;while(current!==0){const depth=graph.depthByIndex[current]!;const edge=incoming[current]!.find((candidate)=>graph.depthByIndex[candidate.from]===depth-1);if(!edge)throw new Error("missing BFS predecessor");result.push(edge);current=edge.from;}return result.reverse();}
function shortestMacro(start:number,goal:number,out:Array<Set<number>>,allowed:Set<number>):number[]|null{const q=[start],seen=new Set([start]),prev=new Map<number,number>();for(let c=0;c<q.length;c+=1){const n=q[c]!;for(const x of out[n]!)if(allowed.has(x)&&!seen.has(x)){seen.add(x);prev.set(x,n);q.push(x);}}if(!seen.has(goal))return null;const p=[goal];while(p[0]!==start)p.unshift(prev.get(p[0]!)!);return p;}
function connectedWithout(start:number,goal:number,g:Array<Set<number>>,a:number,b:number):boolean{const q=[start],seen=new Set([start]);for(let c=0;c<q.length;c+=1){const n=q[c]!;if(n===goal)return true;for(const x of g[n]!)if(!((n===a&&x===b)||(n===b&&x===a))&&!seen.has(x)){seen.add(x);q.push(x);}}return false;}
function reach(start:number,g:Array<Set<number>>):Set<number>{const seen=new Set([start]),q=[start];for(let c=0;c<q.length;c+=1)for(const x of g[q[c]!]!)if(!seen.has(x)){seen.add(x);q.push(x);}return seen;}
function eligibleOccupancy(state:RealityAnchorState,cells:Point[]):number[]{const index=new Map(cells.map((p,i)=>[`${p.x},${p.y}`,i]));const points=[...state.crates,...state.stickyGroups.flat(),...(state.pushPullAnchor?[state.pushPullAnchor.push,state.pushPullAnchor.pull]:[]),...(state.boxStickyAnchor?[state.boxStickyAnchor.box,state.boxStickyAnchor.sticky]:[])];return [...new Set(points.map((p)=>index.get(`${p.x},${p.y}`)).filter((v):v is number=>v!==undefined))].sort((a,b)=>a-b);}
function combinations(values:number[],size:number):number[][]{const out:number[][]=[];function visit(start:number,prefix:number[]):void{if(prefix.length===size){out.push(prefix);return;}for(let i=start;i<=values.length-(size-prefix.length);i+=1)visit(i+1,[...prefix,values[i]!]);}visit(0,[]);return out;}
function setGoals(layout:string,cells:Point[],indexes:number[]):string{const grid=layout.split("\n").map((row)=>[...row]);for(const row of grid)for(let x=0;x<row.length;x+=1)if(row[x]==="G")row[x]=".";for(const index of indexes){const p=cells[index]!;if(grid[p.y]![p.x]!==".")throw new Error("goal synthesis tried occupied start cell");grid[p.y]![p.x]="G";}return grid.map((row)=>row.join("")).join("\n");}
function hasRequired(events:string[]):boolean{return ["anchor_boundary_shift:push_pull","anchor_boundary_shift:box_sticky","pull_object"].every((p)=>events.some((e)=>e.startsWith(p)))&&events.some((e)=>e.startsWith("box_to_sticky")||e.startsWith("sticky_to_box"));}
function replay(initial:RealityAnchorState,inputs:InputId[]):Array<{state:RealityAnchorState;events:string[]}>{let state=initial;const out=[] as Array<{state:RealityAnchorState;events:string[]}>;for(const input of inputs){const step=runtime.step(state,input,{winCondition:pkg.mechanic.win});if(!step.legal)break;state=step.state;out.push({state,events:step.events});}return out;}
function substantive(events:string[]):string[]{return events.filter((event)=>event!=="walk");}
function countWalkable(layout:string):number{return[...layout].filter((c)=>c!=="#"&&c!=="\n").length;}

function sampleBase():{layout:string;goalCells:Point[]}|null{const width=choice([7,8,8,9]),height=choice([5,6,6]);const rate=.16+rng()*.16;const g=Array.from({length:height},(_,y)=>Array.from({length:width},(_,x)=>x===0||y===0||x===width-1||y===height-1||rng()<rate?"#":"."));if(!placePair(g,"P","L")||!placePair(g,"B","S")||!place(g,"@"))return null;for(let i=0;i<choice([1,1,2]);i+=1)if(!place(g,"C"))return null;for(let i=0;i<choice([0,1,1]);i+=1)if(!place(g,"M"))return null;const goalCells=empty(g);if(goalCells.length<3)return null;g[goalCells[0]!.y]![goalCells[0]!.x]="G";return{layout:g.map((row)=>row.join("")).join("\n"),goalCells};}
function placePair(g:string[][],a:string,b:string):boolean{const points=empty(g);shuffle(points);for(const p of points){const ds=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];shuffle(ds);for(const d of ds){const q={x:p.x+d.x,y:p.y+d.y};if(g[q.y]?.[q.x]!==".")continue;const flip=rng()<.5;g[p.y]![p.x]=flip?b:a;g[q.y]![q.x]=flip?a:b;return true;}}return false;}
function place(g:string[][],glyph:string):boolean{const points=empty(g);if(!points.length)return false;const p=points[Math.floor(rng()*points.length)]!;g[p.y]![p.x]=glyph;return true;}
function empty(g:string[][]):Point[]{const out:Point[]=[];for(let y=1;y<g.length-1;y+=1)for(let x=1;x<g[y]!.length-1;x+=1)if(g[y]![x]===".")out.push({x,y});return out;}
function toLevel(id:string,layout:string):LevelDoc{return{id,title:id,role:"challenge",status:"candidate",targets:[],known_before:["K_runtime_smoke"],target_learning:["K_runtime_smoke"],support_level:"none",expected_solver_evidence:["solvable"],expected_llm_player_evidence:[],layout};}
function choice<T>(v:T[]):T{return v[Math.floor(rng()*v.length)]!;}function shuffle<T>(v:T[]):void{for(let i=v.length-1;i>0;i-=1){const j=Math.floor(rng()*(i+1));[v[i],v[j]]=[v[j]!,v[i]!];}}
function mulberry32(value:number):Rng{let state=value>>>0;return()=>{state+=0x6d2b79f5;let n=state;n=Math.imul(n^(n>>>15),n|1);n^=n+Math.imul(n^(n>>>7),n|61);return((n^(n>>>14))>>>0)/4294967296;};}
function format():string{const lines=["# Strict Unique Goal Synthesis Search","",`- seed: ${seed}`,`- iterations: ${iterations}`,`- completeBases: ${completeBases}`,`- synthesizedUniquePatterns: ${synthesizedUniquePatterns}`,`- eventQualifiedPatterns: ${eventQualifiedPatterns}`,`- strictHits: ${hits.length}`,"- proof: 目标先由完整非终止对象图合成出唯一状态，再在正式终止胜态图上压缩纯 walk；规范宏路径每条无向边均为桥且正向标签唯一。"," "];for(const [i,h]of hits.entries())lines.push(`## ${i+1}. ${h.id}`,"",`- score=${h.score.toFixed(2)} cost=${h.cost} nonWalk=${h.nonWalk} revisit=${h.revisit.toFixed(4)} heavy=${h.heavy.toFixed(4)}`,`- baseGraph=${h.graphBase} finalGraph=${h.proof.fullStates}/${h.proof.fullEdges}/1 macro=${h.proof.macroStates} relevant=${h.proof.relevantMacroStates} path=${h.proof.path.length} erasedBranches=${h.proof.erasedBranches}`,`- inputs=${h.inputs.join(" ")}`,`- canonicalEvents=${h.proof.labels.join(" > ")}`,"","```text",h.layout,"```","");return`${lines.join("\n").trimEnd()}\n`;}
