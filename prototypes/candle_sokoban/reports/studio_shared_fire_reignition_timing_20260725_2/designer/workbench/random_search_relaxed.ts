import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { isWin, parseLevel, renderState, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const W = 15; const H = 9;
type Node = { state: CandleSokobanState; inputs: CandleAction[]; events: string[]; flags: number; depth: number };
const D1 = 1 << 0; const T1 = 1 << 1; const T2 = 1 << 2; const SIM = 1 << 3;
let seed = 0x71;
function rand(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; }
function pick<T>(items: T[]): T { return items[Math.floor(rand() * items.length)]!; }
function k(x:number,y:number):string{return `${x},${y}`;}
function make(): {layout:string;goals:string[]}|undefined {
  const b=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>x===0||y===0||x===W-1||y===H-1?"#":"."));
  const place=(x:number,y:number,g:string)=>{if(b[y]![x]!==".")return false;b[y]![x]=g;return true;};
  for(let i=0;i<8+Math.floor(rand()*8);i++){const x=2+Math.floor(rand()*(W-4)),y=2+Math.floor(rand()*(H-4));if(b[y]![x]===".")b[y]![x]="#";}
  const c1=pick([[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2]] as [number,number][]); if(!place(c1[0],c1[1],"1")||!place(c1[0],c1[1]+1,"D"))return undefined;
  const c2=pick([[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5]] as [number,number][]); if(!place(c2[0],c2[1],"2")||!place(c2[0]+1,c2[1],"R"))return undefined;
  const free:[number,number][]=[];for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(b[y]![x]===".")free.push([x,y]);
  if(free.length<5)return undefined;const p=pick(free);place(p[0],p[1],"@");
  const bs=free.filter(([x,y])=>b[y]![x]===".");for(const g of ["O","O","o","o"]){const q=pick(bs.filter(([x,y])=>b[y]![x]==="."));place(q[0],q[1],g);}
  return {layout:b.map(r=>r.join("")).join("\n"),goals:[]};
}
function flags(es:string[],f:number):number{let n=f;if(es.some(e=>e.startsWith("extinguish_by_wall:candle#1")))n|=D1;if((n&D1)&&es.includes("ignite_midcycle:candle#1:t1"))n|=T1;if((n&T1)&&es.includes("ignite_midcycle:candle#2:t2"))n|=T2;if((n&T1)&&es.includes("simultaneous_burn:candle#1+candle#2"))n|=SIM;return n;}
function search(layout:string):Node|undefined{const level:LevelDoc={id:"r",title:"r",global_burn_cycle:5,layout,win:{type:"all_braziers_lit"}};let init:CandleSokobanState;try{init=parseLevel(level);}catch{return undefined;}const q:Node[]=[{state:init,inputs:[],events:[],flags:0,depth:0}],v=new Set([`${stateKey(init)}|0`]);for(let i=0;i<q.length;i++){const c=q[i]!;if(isWin(c.state,level.win)&&(c.flags&(D1|T1|T2|SIM))===(D1|T1|T2|SIM))return c;if(c.depth>=36||v.size>22000)continue;for(const a of actions){const r=step(pkg.mechanic,c.state,a,{winCondition:level.win});if(!r.legal)continue;const f=flags(r.events,c.flags),n={state:r.state,inputs:[...c.inputs,a],events:[...c.events,...r.events],flags:f,depth:c.depth+1},key=`${stateKey(r.state)}|${f}`;if(!v.has(key)){v.add(key);q.push(n);}}}return undefined;}
for(let i=0;i<8000;i++){const c=make();if(!c)continue;const h=search(c.layout);if(h){console.log(JSON.stringify({trial:i,inputs:h.inputs,flags:h.flags,events:h.events,final:renderState(h.state),layout:c.layout},null,2));break;}if(i%500===0)console.error(`trial ${i}`);}
