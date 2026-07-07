# 探索笔记：移动边界刷子与 pull 抽取把手

## 本轮假设

本轮不验证 B/S 或 P/L 基础规则。B/S anchor 可移动、B/S 边界决定 box/sticky 侧、P/L pull 需要前格可进入、刚体 footprint 需要所有目标格可用，这些都视为 runtime 公理。

目标是产出两组设计语料：

- **移动边界刷子**：移动 B/S anchor 的同时，让边界线扫过远处对象，从而不移动对象本身也能重写资源拓扑。
- **pull 抽取把手**：在 P/L pull 侧，玩家前格、对象 footprint、侧向目标格共同决定一次抽取是单格抽取、二格抽取、封门还是扫带。

## 有效比较

### bs_moving_boundary_brush

有效旋钮是 **边界运动方向 + 被扫对象 footprint**，不是“B/S anchor 会移动”。

- `brush_down_bar_full_release`：边界下刷完整覆盖 2 格横条所在行，最终得到两个 crate；对象没有被推走，资源身份被边界线改写。
- `brush_down_vertical_partial`：同样下刷一格，但对象是竖条；只释放上半格，留下 sticky 尾部。
- `brush_down_l_tail`：L 形只切上颈，释放一个 crate，同时保留横向 sticky 尾。
- `brush_parallel_preserve_bar`：沿边界方向平移 anchor，不跨过对象行，横条仍保持 sticky 债。
- `brush_up_bind_square`：边界上刷把上行 crate 纳入 sticky 侧并与下行 sticky 合并，形成 2x2 刚体。
- `brush_up_gap_keeps_columns`：同样上刷，但列间隙保留两个独立柱状工具，不形成单个大块。

### pl_pull_extraction_footprint

有效旋钮是 **pull 前格 + 对象 footprint 的所有目标格 + 可移动侧向 blocker**，不是“pull 能拉身后物体”。

- `pull_crate_pocket_extract`：单 crate 可被抽入玩家旧格；最终 `right` 反向被 `pull_world_front_blocked`，形成一个局部方向偏置。
- `pull_crate_front_wall`：身后有 crate，但玩家前格是墙，抽取把手关闭。
- `pull_bs_horizontal_axis`：沿抽取轴排列的二格 B/S anchor 可用一格前进空间整体抽出。
- `pull_bs_vertical_side_open`：垂直 footprint 也能抽出，但需要下半格的侧向目标位开放。
- `pull_bs_vertical_side_wall`：玩家前格开放，侧向目标位被墙堵住时，抽取失败为 `force_blocked`；这和前格墙是不同门。
- `pull_bs_vertical_side_sweep_crate`：侧向目标位放可移动 crate 时，抽取动作变成同步扫走侧箱的 force-chain。

## 被修正的解释

- “边界移动会改变材质”不是成果；可用解释是“边界线作为刷子，按运动方向切割或绑定远处 footprint”。
- “pull 需要前格空”不是成果；可用解释是“pull 抽取的 footprint 目标格可以被拆成玩家前格门、物体侧向目标门、可移动扫带资源”。
- `pull_crate_front_wall` 和 `pull_bs_vertical_side_wall` 都是首步非法，但非法原因不同：前者是玩家移动门，后者是对象 footprint 门。它们是两个不同的设计旋钮。
- `brush_up_gap_keeps_columns` 纠正了“上刷绑定两行就会形成一个大块”的宽泛解释；列间隙会保留多个刚体工具。

## 不建议提交 curator 的弱结论

- 不收录“B/S anchor 可移动”。
- 不收录“B/S 边界移动会触发 box/sticky 转换”。
- 不收录“pull 可以拉身后对象”。
- 不把首步非法 case 写成不可回返；它们只说明该局部把手被墙格关闭。
- 不把所有边界刷子都写成锁或承诺点；本轮所有边界刷子 case 都可回返，价值主要是资源拓扑改写。

## 下一轮建议

- 把 `brush_down_l_tail` 释放出的 `crate + sticky tail` 接入小门或目标口，验证它是否比纯 `CC` 更适合制造顺序压力。
- 把 `pull_bs_vertical_side_sweep_crate` 的侧箱换成 sticky 部件或目标覆盖物，比较扫带动作是否能承担“顺便移交资源”的局部任务。
- 若要和完整关卡候选连接，应只摘用这里的结构族，不把这些小图直接扩成候选。

