import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type MacroEdge = { from:number; to:number; label:string; sourceEdge:Edge };

class Dsu {
  p:number[]; r:number[];
  constructor(n:number){this.p=Array.from({length:n},(_,i)=>i);this.r=new Array(n).fill(0);}
  find(x:number):number{while(this.p[x]!==x){this.p[x]=this.p[this.p[x]!]!;x=this.p[x]!;}return x;}
  union(a:number,b:number):void{a=this.find(a);b=this.find(b);if(a===b)return;if(this.r[a]!<this.r[b]!)[a,b]=[b,a];this.p[b]=a;if(this.r[a]===this.r[b])this.r[a]!+=1;}
}

const layoutPath=process.argv[2]??"prototypes/Reality_Anchor/reports/RA_STRICT_UNIQUE_ROLE_WEAVE_agent.layout.txt";
const id=process.argv[3]??"RA_STRICT_UNIQUE_ROLE_WEAVE_agent";
const maxStates=Number(process.argv[4]??120_000);
const outBase=path.join("prototypes/Reality_Anchor/reports",`${id}_strict_unique_audit_agent`);
const pkg=await loadPrototypePackage("prototypes/reality_anchor");
const adapter=getRuntimeAdapter(pkg.mechanic);
const runtime=adapter.createRuntime(pkg.mechanic);
const layoutRaw=await readFile(layoutPath);
const layoutFileSha256=createHash("sha256").update(layoutRaw).digest("hex");
const layout=layoutRaw.toString("utf8").replace(/\r/g,"").replace(/\n+$/g,"");
const level:LevelDoc={id,title:id,role:"challenge",status:"candidate",targets:[],known_before:["K_runtime_smoke"],target_learning:["K_runtime_smoke"],support_level:"none",expected_solver_evidence:["solvable"],expected_llm_player_evidence:[],layout};
const initial=adapter.parseLevel(level) as RealityAnchorState;
const solution=solveWithRuntime(runtime,initial,{winCondition:pkg.mechanic.win,maxStates,maxDepth:120});
if(!solution.found)throw new Error(`solver ${solution.status}`);
const graph=enumerateRuntimeGraph(runtime,initial,pkg.mechanic.win,{winCondition:pkg.mechanic.win},{maxStates,terminalizeWins:true}) as Graph;
if(graph.status!=="complete")throw new Error(`graph ${graph.status}: ${graph.reason??""}`);

const trace=replay(initial,solution.inputs);
const macro=analyzeMacro(graph);
const optimal=analyzeOptimal(graph);
const positions=[`${initial.player.x},${initial.player.y}`,...trace.map((step)=>`${step.state.player.x},${step.state.player.y}`)];
const counts=new Map<string,number>();for(const key of positions)counts.set(key,(counts.get(key)??0)+1);
const walkable=[...layout].filter((c)=>c!=="#"&&c!=="\n").length;
const traceMetrics={playerVisits:positions.length,uniquePlayerCells:counts.size,revisitRate:1-counts.size/positions.length,heavyReuseCells:[...counts.entries()].filter(([,n])=>n>=3).map(([cell,n])=>({cell,visits:n})),heavyReuseRatio:[...counts.values()].filter((n)=>n>=3).length/walkable};
const nonWalkSteps=trace.flatMap((step,index)=>{const events=substantive(step.events);return events.length?[{step:index+1,input:step.input,events,beforePlayer:step.beforePlayer,afterPlayer:step.state.player,afterLayout:adapter.renderState(step.state)}]:[];});

const strictPass=graph.winStateIndexes.size===1&&macro.pathEdgesAreBridges&&macro.forwardLabelsUnique&&optimal.nonWalkSignatures.length===1;
const report={
  id,
  sourceLayout:layoutPath.replace(/\\/g,"/"),
  exactLayoutFileSha256:layoutFileSha256,
  layout,
  criterion:{
    playerWalkDifferenceAllowed:true,
    completeReturnLoopAllowed:true,
    necessaryObjectActionReorderingAllowed:false,
    proofRule:"压缩纯 walk 连通分量后，初态到唯一胜态宏路径上的每条无向边均为桥；因此任何 loop-erased/simple 胜路必须经过同一宏节点序列。每条正向桥再要求唯一非 walk 事件标签。",
  },
  verdict:{status:strictPass?"PASS":"REJECT",reason:strictPass?"所有 loop-erased/simple 胜路共享同一必要对象宏序列；差异只能来自纯走位或完整返回同宏状态的环。":"至少一项严格唯一条件失败。"},
  graph:{status:graph.status,reachableStates:graph.keys.length,legalTransitions:graph.edges.length,winningStates:graph.winStateIndexes.size,shortestCost:solution.cost},
  macro,
  optimal,
  traceMetrics,
  canonicalTrace:{inputs:solution.inputs,events:solution.events,nonWalkSteps},
};
await writeFile(`${outBase}.json`,`${JSON.stringify(report,null,2)}\n`,"utf8");
await writeFile(`${outBase}.md`,formatMarkdown(report),"utf8");
console.log(JSON.stringify({verdict:report.verdict,graph:report.graph,macro:{macroStates:macro.macroStates,relevantMacroStates:macro.relevantMacroStates,pathLength:macro.canonicalPath.length,pathEdgesAreBridges:macro.pathEdgesAreBridges,forwardLabelsUnique:macro.forwardLabelsUnique,branchComponents:macro.branchComponents},optimal,traceMetrics},null,2));
console.log(`Wrote ${outBase}.{json,md}`);

function analyzeMacro(g:Graph){
  const dsu=new Dsu(g.keys.length);for(const edge of g.edges)if(substantive(edge.events).length===0)dsu.union(edge.from,edge.to);
  const roots=new Map<number,number>(),macroOf:number[]=[];for(let i=0;i<g.keys.length;i+=1){const r=dsu.find(i);if(!roots.has(r))roots.set(r,roots.size);macroOf[i]=roots.get(r)!;}
  const edges:MacroEdge[]=g.edges.flatMap((edge)=>{const e=substantive(edge.events);return e.length?[{from:macroOf[edge.from]!,to:macroOf[edge.to]!,label:e.join("&"),sourceEdge:edge}]:[];});
  const n=roots.size,start=macroOf[0]!,wins=new Set([...g.winStateIndexes].map((i)=>macroOf[i]!));
  const out=Array.from({length:n},()=>new Set<number>()),inc=Array.from({length:n},()=>new Set<number>());for(const e of edges)if(e.from!==e.to){out[e.from]!.add(e.to);inc[e.to]!.add(e.from);}
  const goal=[...wins][0]!,f=reach(start,out),b=reach(goal,inc),relevant=new Set([...f].filter((x)=>b.has(x))),canonicalPath=shortestPath(start,goal,out,relevant)??[];
  const und=Array.from({length:n},()=>new Set<number>());for(const e of edges)if(e.from!==e.to&&relevant.has(e.from)&&relevant.has(e.to)){und[e.from]!.add(e.to);und[e.to]!.add(e.from);}
  const bridgeChecks=[] as Array<{from:number;to:number;isBridge:boolean}>;const canonicalLabels:string[]=[];let forwardLabelsUnique=true;
  for(let i=0;i+1<canonicalPath.length;i+=1){const from=canonicalPath[i]!,to=canonicalPath[i+1]!;const isBridge=!connectedWithout(start,goal,und,from,to);bridgeChecks.push({from,to,isBridge});const labels=new Set(edges.filter((e)=>e.from===from&&e.to===to).map((e)=>e.label));if(labels.size!==1)forwardLabelsUnique=false;canonicalLabels.push([...labels].sort().join(" || "));}
  const pathSet=new Set(canonicalPath),off=[...relevant].filter((x)=>!pathSet.has(x)),offSet=new Set(off),seen=new Set<number>(),branchComponents=[] as Array<{nodes:number[];attachments:number[];edgeLabels:string[]}>;
  for(const node of off){if(seen.has(node))continue;const q=[node],nodes=[] as number[];seen.add(node);for(let c=0;c<q.length;c+=1){const x=q[c]!;nodes.push(x);for(const y of und[x]!)if(offSet.has(y)&&!seen.has(y)){seen.add(y);q.push(y);}}const nodeSet=new Set(nodes),attachments=new Set<number>(),labels=new Set<string>();for(const e of edges){if(nodeSet.has(e.from)||nodeSet.has(e.to)){if(pathSet.has(e.from))attachments.add(e.from);if(pathSet.has(e.to))attachments.add(e.to);labels.add(`${e.from}->${e.to}:${e.label}`);}}branchComponents.push({nodes:nodes.sort((a,b)=>a-b),attachments:[...attachments].sort((a,b)=>a-b),edgeLabels:[...labels].sort()});}
  return{macroStates:n,winningMacroStates:[...wins],initialMacro:start,winningMacro:goal,relevantMacroStates:relevant.size,canonicalPath,canonicalLabels,bridgeChecks,pathEdgesAreBridges:bridgeChecks.every((x)=>x.isBridge),forwardLabelsUnique,branchComponents,interpretation:"每个 branch component 只附着于一个 canonical 宏节点时，进入后必须回到同一宏节点，完整 loop erase 后不构成第二计划。"};
}

function analyzeOptimal(g:Graph){
  const adj=Array.from({length:g.keys.length},()=>[] as Edge[]),rev=Array.from({length:g.keys.length},()=>[] as Edge[]);for(const e of g.edges){adj[e.from]!.push(e);rev[e.to]!.push(e);}
  const dist=new Array<number|null>(g.keys.length).fill(null),q=[...g.winStateIndexes];for(const w of q)dist[w]=0;for(let c=0;c<q.length;c+=1){const x=q[c]!;for(const e of rev[x]!)if(dist[e.from]===null){dist[e.from]=dist[x]!+1;q.push(e.from);}}
  const cost=dist[0];if(cost===null)throw new Error("no win distance");const by=Array.from({length:cost+1},()=>[] as number[]);for(let i=0;i<dist.length;i+=1){const d=dist[i];if(d!==null&&d<=cost)by[d]!.push(i);}
  const pathCount=new Array<bigint>(g.keys.length).fill(0n),sigs=Array.from({length:g.keys.length},()=>new Set<string>());for(const w of g.winStateIndexes){pathCount[w]=1n;sigs[w]!.add("");}
  const cap=100_000;let truncated=false;for(let d=1;d<=cost;d+=1)for(const from of by[d]!)for(const e of adj[from]!)if(dist[e.to]===d-1){pathCount[from]+=pathCount[e.to]!;const token=substantive(e.events).join("&");for(const suffix of sigs[e.to]!){const combined=token?(suffix?`${token} > ${suffix}`:token):suffix;sigs[from]!.add(combined);if(sigs[from]!.size>=cap){truncated=true;break;}}}
  const inputWitnesses=[] as Array<{inputs:InputId[];nonWalkSignature:string}>;
  const stack:Array<{state:number;inputs:InputId[];tokens:string[]}>= [{state:0,inputs:[],tokens:[]}];
  while(stack.length&&inputWitnesses.length<10){const current=stack.pop()!;if(g.winStateIndexes.has(current.state)){inputWitnesses.push({inputs:current.inputs,nonWalkSignature:current.tokens.join(" > ")});continue;}const d=dist[current.state];if(d===null)continue;for(const e of [...adj[current.state]!].reverse()){if(dist[e.to]!==d-1)continue;const token=substantive(e.events).join("&");stack.push({state:e.to,inputs:[...current.inputs,e.action],tokens:token?[...current.tokens,token]:current.tokens});}}
  return{shortestCost:cost,exactInputPathCount:pathCount[0]!.toString(),distinctNonWalkSignatureCount:sigs[0]!.size,nonWalkSignatures:[...sigs[0]!].sort(),inputWitnesses,signatureCap:cap,truncated};
}

function replay(state:RealityAnchorState,inputs:InputId[]){const out=[] as Array<{input:InputId;events:string[];beforePlayer:{x:number;y:number};state:RealityAnchorState}>;for(const input of inputs){const beforePlayer={...state.player};const step=runtime.step(state,input,{winCondition:pkg.mechanic.win});if(!step.legal)throw new Error(`illegal replay ${input}`);state=step.state;out.push({input,events:step.events,beforePlayer,state});}return out;}
function substantive(events:string[]):string[]{return events.filter((e)=>e!=="walk");}
function reach(start:number,g:Array<Set<number>>):Set<number>{const seen=new Set([start]),q=[start];for(let c=0;c<q.length;c+=1)for(const x of g[q[c]!]!)if(!seen.has(x)){seen.add(x);q.push(x);}return seen;}
function shortestPath(start:number,goal:number,g:Array<Set<number>>,allowed:Set<number>):number[]|null{const seen=new Set([start]),q=[start],prev=new Map<number,number>();for(let c=0;c<q.length;c+=1)for(const x of g[q[c]!]!)if(allowed.has(x)&&!seen.has(x)){seen.add(x);prev.set(x,q[c]!);q.push(x);}if(!seen.has(goal))return null;const path=[goal];while(path[0]!==start)path.unshift(prev.get(path[0]!)!);return path;}
function connectedWithout(start:number,goal:number,g:Array<Set<number>>,a:number,b:number):boolean{const seen=new Set([start]),q=[start];for(let c=0;c<q.length;c+=1){const n=q[c]!;if(n===goal)return true;for(const x of g[n]!)if(!((n===a&&x===b)||(n===b&&x===a))&&!seen.has(x)){seen.add(x);q.push(x);}}return false;}
function formatMarkdown(r:typeof report):string{const lines=[`# ${r.id} 严格唯一解审计`,"",`- 结论：${r.verdict.status}`,`- 理由：${r.verdict.reason}`,`- 口径：${r.criterion.proofRule}`,"", "## 完整图与最短解","",`- 状态/边/胜态：${r.graph.reachableStates}/${r.graph.legalTransitions}/${r.graph.winningStates}`,`- 最短成本：${r.graph.shortestCost}`,`- 最短输入串数量：${r.optimal.exactInputPathCount}`,`- 最短去走位对象序列数量：${r.optimal.distinctNonWalkSignatureCount}`,`- 枚举截断：${r.optimal.truncated}`,"","## 全部 loop-erased/simple 胜路","",`- walk 宏状态：${r.macro.macroStates}`,`- 可胜宏状态：${r.macro.relevantMacroStates}`,`- 规范宏路径节点数：${r.macro.canonicalPath.length}`,`- 路径边全为桥：${r.macro.pathEdgesAreBridges}`,`- 每条正向桥标签唯一：${r.macro.forwardLabelsUnique}`,`- 附着返回支路：${r.macro.branchComponents.length}`,"",...r.macro.canonicalLabels.map((label,i)=>`${i+1}. ${label}`),"","## Canonical 非 walk 步","",...r.canonicalTrace.nonWalkSteps.map((s)=>`- step ${s.step} ${s.input}: ${s.events.join("+")}`),"","## 玩家轨迹复用（raw）","",`- visits/unique：${r.traceMetrics.playerVisits}/${r.traceMetrics.uniquePlayerCells}`,`- revisitRate：${r.traceMetrics.revisitRate}`,`- heavyReuseRatio：${r.traceMetrics.heavyReuseRatio}`,"","## Layout","","```text",r.layout,"```",""];return`${lines.join("\n").trimEnd()}\n`;}
