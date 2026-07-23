# Candle Sokoban

状态：runtime、严格机制暴露硬门和设计交接已就绪；当前没有正式课程或待玩关卡。

## 原型问题

本原型研究多格刚体蜡烛在轴推、侧滚、烛芯投影、火焰传递和统一五回合燃烧
倒计时下能否形成可验证的类推箱关卡。实际 runtime 是机械事实权威。

`levels.yml` 仅包含诊断探针，不是候选关卡、课程或设计模板；正式通过工作室流程
的唯一 delivery version 写入 `studio/levels.yml`，再进入 `playable_queue.yml`。

## ASCII

```text
111r  candle#1，长度 4，烛芯向右，未点燃
L222  candle#2，长度 4，烛芯向左，已点燃
```

cap 是蜡烛最后一个实体格。逻辑烛芯投影位于 cap 方向的相邻格，不单独画出。
数字 `1` 到 `9` 区分不同的多格蜡烛。

全局燃烧周期固定为 `5`。每次合法行动都会推进唯一的
`globalBurnCountdown`，即使当前没有蜡烛点燃。从 `1` 进入燃烧边界时，移动与
接触结算后仍点燃的全部蜡烛同时从烛芯端缩短，然后倒计时复位。点燃、熄灭或
重新点燃不会重置倒计时。

完整规则、来源边界和正式关卡要求见 `docs/designer_contract.md`；线性机制暴露
硬门见 `docs/mechanic_exposure_sequence.yml`；工作室入口见
`docs/design_handoff.yml`。

`knowledge.yml` 与 `curriculum.yml` 仅为通用包 schema 兼容占位，禁止作为设计或
审查输入。

## 命令

```text
npm run candle:solve
npm run candle:conformance
npx tsx src/prototypes/candle_sokoban/exposureAuditCli.ts <layout-file|-> --allowed-exposure-through <branch>
npm run candle:playable:build
npm run candle:playable:serve
```

## 工具状态

已实现：runtime adapter、ASCII parser/renderer、solver、完整图枚举、layout
analyzer、诊断探针、严格 exposure audit 和 runtime-backed playable。

未实现：Candle 专属 sampler、miner、candidate factory 与 PuzzleScript
exporter/checker；这些缺口不阻塞人工单关设计。
