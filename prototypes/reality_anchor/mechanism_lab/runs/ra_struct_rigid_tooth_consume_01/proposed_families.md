# Proposed Families: ra_struct_rigid_tooth_consume_01

## rigid_tooth_mouth_consumption

family 名称：
`rigid_tooth_mouth_consumption`，中文名建议为“刚体 footprint 前沿墙齿目标口”。

局部问题：
当 B/S 归一化把两个竖向相邻对象合成 sticky 刚体时，一格目标口旁的上沿墙齿是否会消费整个 footprint，使下格无法单独进入目标？

结构旋钮：

- footprint 绑定状态：双格 sticky 刚体 / 两个独立 crate / 单格 sticky。
- 前沿口宽：下格目标口开放但上格前方是墙 / 上下两格前方都开放。
- B/S 边界位置：对象处在 sticky side 形成 merge，或处在 box side 保持 crate。
- 后续消费面：目标格 `G` 是否位于下格前方，墙齿是否阻挡同一 footprint 的另一格。

变体谱：

```text
双格 sticky + 上沿墙齿，目标口被拒绝：
#######
###M# #
##@MG #
#BS#  #
#######

同形两个 crate，下格可单独进目标：
#######
###C# #
##@CG #
### BS#
#######

双格 sticky + 双格开口，整体可进目标：
#######
###M  #
##@MG #
#BS#  #
#######

单格 sticky + 上沿墙齿，单格可进目标：
#######
####  #
##@MG #
#BS#  #
#######
```

共同解释：
这不是“sticky 不能进窄口”，也不是“墙齿挡住目标”。差异来自 footprint 前沿检查：双格 sticky 是一个刚体对象，推动下格时，上格的目标格也必须开放；独立 crate 或单格 sticky 没有这个连带目标格，因此能进入同一目标口。

输入条件：

- 至少两个对象在 sticky side 正交相邻，或有对照让它们保持 crate / 单格 sticky。
- 玩家位于默认 push world，正对 footprint 的下格。
- 下格前方是目标口，上格前方可在墙 / 空之间切换。
- B/S anchor 只用于决定对象 side，不需要参与本轮动作。

输出状态：

- 双格 sticky + 上沿墙齿输出 `force_blocked`，目标不被覆盖。
- 两个 crate 输出“下格对象可单独进入目标，另一个对象留在原位”。
- 双格 sticky + 双格开口输出“整个刚体向前移动并覆盖目标”。
- 单格 sticky 输出“单格对象进入目标”，说明墙齿本身不是阻断源。

自然消费方式：

- 接 B/S 绑定债：让玩家主动把两个 crate 绑定成竖向 footprint，再用目标口检验是否绑定过度。
- 接移动边界刷产物：刷出 `C+M`、`C+MM` 或竖向 sticky pair 后，用同一墙齿目标口消费产物差异。
- 接墙口回返谱系：前沿墙齿先决定能否入门，再由后续墙口决定是否能回返。

常见 shortcut：

- 上沿墙齿少一格时，双格 sticky 也能通过，结构退化为普通目标覆盖。
- 对象没有 merge 成同一 sticky group 时，下格可以独立通过。
- 如果目标口不消费下格进入，玩家只会看到 `force_blocked` 事件 witness。
- 如果空间太宽，玩家可能改从别的方向处理 footprint，削弱前沿口差异。

推荐 probe：

- 禁用 `box_sticky_normalize` 或把 B/S 边界移到 box side，确认阻断来自 sticky merge footprint。
- 把 3 格竖条和 L 形接入同一目标口，扩展前沿 footprint 谱。
- 用移动边界刷子生成同一 footprint，再接本目标口，形成 producer -> consumer 的 composition probe。

组合例句：
`B/S 绑定债 -> 竖向 sticky footprint -> 前沿墙齿目标口`：玩家需要决定是否把两个资源绑定成刚体；绑定后会被一格墙齿目标口拒绝，未绑定或切回单格资源才能覆盖目标。这里是 recipe 级链条，不是完整关卡设计。

建议 curator 决策：
`supplement`。本轮满足 `consumption_probe`，但不建议作为新顶层条目；它应补充现有 lexicon 的“刚体黏块 + 墙口”条目，作为“前沿 footprint 门 / 目标口消费”的证据切片，并交叉服务于“B/S 绑定债”的自然消费方式。

不应进入 lexicon 的 case：
没有单独剔除的 case；四个 case 都是同一结构族的必要近邻对照。但 `returnToInitial` 不是本轮主要证据，不能被写成不可回返结论。

证据标签：
`runtime_observed`, `bounded_graph`, `graph_complete`, `consumption_probe`。

证据来源：
`run=ra_struct_rigid_tooth_consume_01`, `cases=rigid_pair_tooth_block,crate_pair_tooth_lower_pass,rigid_pair_open_mouth_pass,single_sticky_tooth_pass`。
