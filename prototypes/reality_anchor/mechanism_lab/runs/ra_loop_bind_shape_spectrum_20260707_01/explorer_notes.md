# Explorer Notes: ra_loop_bind_shape_spectrum_20260707_01

## 本轮假设

本轮把 B/S anchor 固定在上方墙槽，所有 case 都用右推把箱子从 B 侧推过 B/S 线。箱子过线后成为黏性 footprint；只要这些格子正交相连，后续就按一个刚体整体移动。

核心假设用 plain language 表达为：过 B/S 线后粘成一整块，门口要看整块前面有没有路。这里的“前面”不是只看玩家正在推的那一格，而是看整个 connected footprint 在推动方向上的前沿格。

## 候选形状表

| case | 候选形状 / 旋钮 | 同一消费者变化 | 回放结果 | 备注 |
| --- | --- | --- | --- | --- |
| `bs_shape_single_cell_lower_lane_pass` | 1 格基线 | 下行一格口 | pass | 单格 sticky 能进下行目标口 |
| `bs_shape_two_bar_single_mouth_block` | 2 格竖条 | 只给下格口，上格前方是墙 | block | final `right` 为 `force_blocked` |
| `bs_shape_two_bar_two_mouth_pass` | 2 格竖条 | 上下两格都开口 | pass | 口宽修正后同一 2 格条可整体进入 |
| `bs_shape_three_bar_two_mouth_block` | 3 格竖条 | 只给下两格口，最上格前方是墙 | block | 证明两格口不等于“够所有条形” |
| `bs_shape_three_bar_three_mouth_pass` | 3 格竖条 | 三格前沿都开口 | pass | 回放成立；局部图因 state budget exhausted，不把图完备性当结论 |
| `bs_shape_l_notch_block` | L 形 | 下排有口，上排前凸角前方是墙 | block | final `right` 为 `force_blocked` |
| `bs_shape_l_notch_pass` | L 形 | 补上上排前凸角缺口 | pass | 回放成立；局部图因 state budget exhausted |
| `bs_shape_separated_lower_shortcut_pass` | 分离部件 | 上下隔一行，不合成一整块 | pass | 下方部件能单独绕过窄口；return search depth 不足，不当作负面 |

## 有效比较

`bs_shape_single_cell_lower_lane_pass` 对 `bs_shape_two_bar_single_mouth_block`：同一窄口允许单格进入，但拒绝 2 格 connected 竖条，说明堵点来自整块 footprint 的上格前沿，而不是来自目标口本身。

`bs_shape_two_bar_single_mouth_block` 对 `bs_shape_two_bar_two_mouth_pass`：保持生成动作和 2 格条不变，只打开上格前方，结果从 blocked 变为 pass；这是本轮最干净的口宽修正。

`bs_shape_two_bar_two_mouth_pass` 对 `bs_shape_three_bar_two_mouth_block`：同一个两格高口能消费 2 格竖条，但不能消费 3 格竖条；形状谱不能只停在竖向二连。

`bs_shape_three_bar_two_mouth_block` 对 `bs_shape_three_bar_three_mouth_pass`：把最上格前方也打开后，3 格条可整体进入，支持“前沿覆盖多少格，口就要给多少格”的解释。

`bs_shape_l_notch_block` 对 `bs_shape_l_notch_pass`：L 形不是简单的高度计数；它需要前凸角那一格也有路。补上对应缺口后，同一 L 形从 blocked 变为 pass。

`bs_shape_two_bar_single_mouth_block` 对 `bs_shape_separated_lower_shortcut_pass`：上方 sticky 与下方 sticky 隔一行时，下方不再背负上方前沿债，可以作为单独 footprint 通过窄口。

## 被修正的解释

不应把结论写成“箱子变 sticky”或“发生合并事件”。这只是生成过程，不是消费侧的局部问题。

更稳的解释是：过 B/S 线后粘成一整块，门口要看整块前面有没有路。对 2/3 格竖条，前沿是对应高度的多格；对 L 形，前沿是形状在推动方向上真正露出的那几格；对分离部件，每个 disconnected footprint 单独结算。

“口宽”也要避免只按矩形高度说死。L 形 case 显示，关键是 footprint 推动方向的前沿投影：缺哪一个前沿格，哪一个格就会成为墙口拒绝点。

## 不建议提交 curator 的弱结论

- 不建议把 `sticky_merge`、事件计数、return depth 写成机制结论。
- 不建议把 `bs_shape_three_bar_three_mouth_pass` 和 `bs_shape_l_notch_pass` 的局部图完备性作为证据；两者回放有效，但可达图触到 state budget。
- 不建议把 `bs_shape_separated_lower_shortcut_pass` 的 return search unknown 当作不可逆或失败；它的目标比较只需要下方部件能否独立穿过窄口。
- 不建议泛化到 P/L pull 世界、可移动 anchor 边界、镜像/旋转拆分族；本轮只覆盖固定 B/S 线后的右推消费者。
- 不建议把单格基线、开口修正、分离 shortcut 分别做成独立 lexicon family；它们更像同一 family 的 probe 和 caveat。

## 下一轮建议

如果 curator 想补“把手宽度”而不是“口宽”，下一轮可以保持同一 footprint 和同一口，专门收窄玩家站位/回位通道，看是否出现“整块前方可过，但人没有可用把手”的不同局部问题。

如果要进一步压缩 lexicon 证据，推荐保留 2 格堵/开、3 格堵/开、L 形堵/开、分离 shortcut；单格基线只作为表内 baseline。

如果要继续横向形状谱，可以补一轮“水平条沿推动方向”的 probe，用来说明沿推动方向变长时，消费口读的是 leading front，而不是整个包围盒。
