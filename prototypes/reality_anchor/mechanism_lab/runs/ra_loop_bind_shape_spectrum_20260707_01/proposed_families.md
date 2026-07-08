# Proposed Families: ra_loop_bind_shape_spectrum_20260707_01

## family 名称

`bs_bind_shape_spectrum_mouth`

建议中文名：B/S 绑定 footprint + 墙口前沿形状谱。

## 局部问题

多个箱子跨过 B/S 线后变成 connected sticky footprint，并立刻遇到同一个右推墙口。问题不是“能不能变成 sticky”，而是这个整块 footprint 继续向右进入墙口时，前沿每一格是否都有路。

## 结构旋钮

- footprint 形状：1 格、2 格竖条、3 格竖条、L 形、分离部件。
- 口宽/缺口：只开下格、开 2 格、开 3 格、补 L 形前凸角缺口。
- connectedness：正交相连时是一整块；隔一行时是两个独立部件。
- driver 位置：尽量保持从左侧右推，避免把差异变成 push driver 差异。
- anchor 边界：B/S 固定在墙槽，不让 anchor 移动成为 shortcut。

## 变体谱

| 变体 | case | 结果 | 在 family 中的角色 |
| --- | --- | --- | --- |
| 单格下行口 | `bs_shape_single_cell_lower_lane_pass` | pass | baseline |
| 2 格竖条 + 单格口 | `bs_shape_two_bar_single_mouth_block` | block | 最小 connected footprint 拒绝例 |
| 2 格竖条 + 两格口 | `bs_shape_two_bar_two_mouth_pass` | pass | 口宽修正 |
| 3 格竖条 + 两格口 | `bs_shape_three_bar_two_mouth_block` | block | 形状谱补强 |
| 3 格竖条 + 三格口 | `bs_shape_three_bar_three_mouth_pass` | pass | 3 格口宽修正 |
| L 形 + 缺前凸角 | `bs_shape_l_notch_block` | block | 非直条前沿例 |
| L 形 + 补前凸角 | `bs_shape_l_notch_pass` | pass | L 形缺口修正 |
| 分离上下部件 | `bs_shape_separated_lower_shortcut_pass` | pass | disconnected shortcut |

## 共同解释

过 B/S 线后粘成一整块，门口要看整块前面有没有路。向右推时，connected footprint 的每个格子都尝试右移一格；如果某个前沿目标格是墙或越界，整块都不能动。若目标格只是同一 footprint 的内部格，不构成额外口宽需求。

因此，竖条需要对应高度的口，L 形需要自己的前凸角缺口；分离部件没有正交连接时，不共享同一个前沿债。

## 输入条件

- B/S anchor 存在且固定，箱子从 B 侧被推入 S 侧。
- 参与消费的 sticky cells 必须在 S 侧正交相连，才形成一个 connected footprint。
- 玩家需要站在 footprint 左侧的可用把手格上，并执行右推。
- 目标消费者是右侧墙口/走廊，不引入 P/L pull、移动 anchor、外部 force chain 作为主要变量。

## 输出状态

- pass：footprint 整体右移，目标口中对应格被 sticky footprint 覆盖。
- block：动作回放停在 final `right`，原因是 `force_blocked`。
- shortcut：分离部件可以只移动下方 footprint，绕开上方部件本来会制造的口宽需求。

## 自然消费方式

适合接“墙口目标”“窄走廊入口”“齿状缺口”“目标格口宽修正”等消费者。最自然的谜题表达是：先让箱子过 B/S 线形成某个 footprint，再要求玩家把这整块推进一个看似只对局部开放的口。

## 常见 shortcut

- 部件隔开一行或一列，不形成 connected footprint，于是只移动其中一个部件。
- 把墙口多开出缺失前沿格，blocked 立即变成 pass；这是修正，不是漏洞。
- 若 B/S anchor 可移动，边界可能改变哪些格属于 S 侧；本轮用墙槽固定，避免混入这个变量。
- 若玩家把手通道太宽，可能出现额外绕推路径；本轮没有把它当独立结论。

## 推荐 probe

建议 curator 把这组作为一个 family 接到已有“刚体黏块 + 墙口”条目下，而不是拆成多个族。最小推荐 probe：

1. `bs_shape_two_bar_single_mouth_block`
2. `bs_shape_two_bar_two_mouth_pass`
3. `bs_shape_three_bar_two_mouth_block`
4. `bs_shape_three_bar_three_mouth_pass`
5. `bs_shape_l_notch_block`
6. `bs_shape_l_notch_pass`
7. `bs_shape_separated_lower_shortcut_pass`

`bs_shape_single_cell_lower_lane_pass` 可作为 baseline 附表，不一定需要进入 lexicon 主 probe。

## 组合例句

- “先把两个箱子过 B/S 线粘成竖条，再推向一格下口；下格有目标也不够，因为整块上格前面撞墙。”
- “三格条不是二格条的镜像重复；两格口能吃二格条，但吃不下三格条。”
- “L 形要看前凸角，补下排口不够，前凸角前方也要开。”
- “如果上下两块没有粘在一起，下方那块可以自己走窄口，这只是 disconnected shortcut。”

## 建议 curator 决策

建议接纳为同一近邻 family，用来扩展“刚体黏块 + 墙口：反向施力格谱系”的形状谱说明。核心文本建议保留 plain language：过 B/S 线后粘成一整块，门口要看整块前面有没有路。

建议不要新建“2 格条 family”“3 格条 family”“L 形 family”。这些更像同一前沿检查规则在不同 footprint 上的代表点。

如果 curator 需要“把手宽度”作为独立机制，再开下一轮短跑；本轮证据主要支持口宽/前沿缺口，不足以定义把手宽度 family。

## 哪些 case 不应进入 lexicon

- `bs_shape_single_cell_lower_lane_pass`：只作为 baseline，不建议单独进 lexicon。
- `bs_shape_two_bar_two_mouth_pass`、`bs_shape_three_bar_three_mouth_pass`、`bs_shape_l_notch_pass`：建议作为 counterexample/fix 附在同一 family，不单独成条。
- `bs_shape_separated_lower_shortcut_pass`：建议作为常见 shortcut/caveat，不单独成 family。
- 不要把 state budget exhausted、return depth、事件计数写进 lexicon 正文。
