# Reality_Anchor

状态：v0 runtime bring-up package。

这个包用于验证 `reality_anchor` 的 runtime adapter、solver、graph、agency、
layout analyzer、runtime-backed playable 和第一阶段 raw sampler 能否通过同一套
可执行语义工作。正式 knowledge、player model、curriculum、candidate generator、
curated miner 和 PuzzleScript 导出仍不在当前范围内。

## 已确认的玩家胜利标准

移动、箱/黏归一化和黏块合并全部结算后，所有目标都必须被箱子、黏块或任意锚点
箱格覆盖。主角站在目标上不算覆盖。

## 已确认的核心规则

- `P/L` 是推拉锚点，`P` 侧为推世界，`L` 侧为拉世界；没有 `P/L` 时全图默认为推世界。
- `B/S` 是箱黏锚点，`B` 侧为箱世界，`S` 侧为黏世界；没有 `B/S` 时全图默认为箱世界，关卡作者不能放独立 `M`。
- 同类型锚点每关最多一个；两种锚点可以同关共存，并独立判定。
- 锚点是 1x2 或 2x1 可移动刚体，只平移不旋转。
- 推和拉都对一个物体实例施力；力可以沿运动方向传递到其他可推动物体。
- 玩家和本次受力对象闭包同时平移：玩家旧格会在动作中腾空，允许刚体或被拉对象进入。
- 拉世界中，主角只直接拉身后一格相邻的物体实例；主角目标格按整个受力闭包移动后的占用判断。动作前占住该格的同一刚体或入链对象若会同时移开，不会阻止拉动。
- 黏块是四邻接刚体；相邻黏块自动合并，跨入箱世界的格子变成独立箱子，剩余黏格按连通块分裂。
- 任意刚体的任一部分被墙、边界或不可移动结构挡住时，整个动作失败且状态不变。

## Tool Status

```text
runtime adapter: implemented
solver smoke: implemented through generic runtime interface
layout analyzer smoke: implemented through generic runtime interface
graph / agency analysis: implemented through generic runtime interface
probe seed suite: implemented as v0 smoke levels
raw sampler / temporary miner: implemented as raw discovery evidence
runtime-backed playable: implemented as generic adapter-backed scaffold
PuzzleScript exporter/checker: unavailable in v0
curated miner: unavailable in v0
seed factories / candidate generator: unavailable in v0
```

## 边界

`src/prototypes/reality_anchor/` 是本机制的唯一规则实现位置。`src/core/*`、
solver、graph、agency 和 layout analyzer 只通过 runtime adapter 接口调用，不
包含 Reality Anchor 专有对象或规则。共享层只登记 adapter、工具成熟度和
conformance 分发入口。

## Smoke Commands

```text
npm run check
npx tsx --test src/prototypes/reality_anchor/runtime.test.ts
npx tsx src/cli.ts solve prototypes/reality_anchor RA_SMOKE_01_PUSH_CHAIN
npx tsx src/cli.ts mine prototypes/reality_anchor --preset quick --iterations 16 --max-findings 4
npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_SMOKE_04_BOX_TO_STICKY_MERGE
npx tsx src/playable/exportPlayable.ts prototypes/reality_anchor
npx tsx src/cli.ts tool-conformance prototypes/reality_anchor --write
```
