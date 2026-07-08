# Explorer Notes: ra_loop_pl_piston_20260708_01

## 本轮意图

用户指定的题材不是“单箱 push 后 pull 是否可撤回”，而是 P/L 边界上可形成活塞的局部结构空间：活塞本体可以是单箱、箱链、二格 sticky 横条或 L 形 sticky；后续墙口、侧齿和行程墙必须消费这些本体差异。

本轮因此只比较一个设计空间：

```text
P 侧 push 跨 P/L 边界 -> 玩家落到 L 侧 -> 紧接 left pull 或首步伸出被墙消费
```

## 关键观察

- `c_single_reversible_degenerate`：单箱 `C` 在 `right,left` 后精确回到初态。它证明基本往复几何成立，但没有 consumer 时只是退化标尺。
- `cc_chain_pull_splits_debt`：箱链 `CC` 第一手 `right` 是 `push_object:crate#1,force_chain:n2`，第二手 `left` 只 `pull_object:crate#1`，最终变成 `C.C`。这说明 P/L 活塞对箱链不是精确回撤，而是“整链伸出 -> 近端抽回 -> 远端残余债”。
- `mm_bar_side_tooth_pass_reversible`：二格 sticky 横条 `MM` 在同一边界上 `right,left` 精确往复，且侧齿位于横条占格目标外时不消费横条。
- `l_shape_side_tooth_blocks_stroke`：把横条增加下凸格成 L 形后，同一侧齿落在下凸格目标位，首步 `right` 变为 `force_blocked`。
- `l_shape_wide_mouth_reversible`：移除侧齿后，同一 L 形 `right,left` 精确往复，说明失败点是侧齿消费下凸格，而不是 L 形本身不能活塞。
- `mm_bar_head_wall_blocks_stroke`：二格横条前沿目标格加墙时，首步 `right` 被 `force_blocked`。可撤回活塞仍需要伸出行程。

## 结论范围校准

已支撑：

- 同一 P/L 边界几何下，玩家可在 P 侧右推对象跨界并落到 L 侧，再用紧接 `left` pull 处理身后对象。
- 单箱和 sticky 刚体可精确回撤；箱链会被 pull 只抽近端，留下远端残余债。
- 墙口 / 侧齿会消费 sticky 活塞本体形状：横条通过，L 形下凸格撞侧齿，宽口恢复通过。
- 前沿行程墙会直接关闭二格横条的伸出 stroke。

结论收窄：

- 本轮没有证明所有方向、所有边界朝向或所有 P/L anchor 摆放都等价；只覆盖横向边界、右推跨界、左拉回撤。
- 本轮没有证明三箱链、2x2 sticky、竖条 sticky 或锚点本体活塞；它们仍是自然扩展，但不能写入本轮全称。
- `cc_chain_pull_splits_debt` 的 `returnToInitial` 在 depth 14 找到路径，说明残余债不是全局不可回返；只能写成“两步活塞输出残余债”，不能写成死锁。
- L 形侧齿 case 的关键观察点发生在首步 sticky 刚体目标格撞墙；P/L 边界提供 stroke driver，不应把这部分单独命名为 P/L 新规则。

不应入库的弱事实：

- 单箱 `right,left` 精确回初态没有最小 consumer，只能作为退化标尺。
- `move_sticky_rigid` 事件本身不是成果；必须绑定到 P/L stroke 和墙齿消费。
- 首步 illegal 的两个 case 不能声称“不可撤回”，只能说明伸出行程被墙消费。

是否打开新设计空间：

- 可打开后续组合空间：`P/L 活塞 -> B/S 移动边界刷线`，用活塞停位驱动刷产物。
- 可打开后续组合空间：`箱链活塞残余债 -> 第二目标袋 / 回返门`，验证远端残余箱是否能作为二段资源。
- 可打开后续结构谱：`2x2 / 竖条 / 三格条 sticky 活塞 -> 侧齿 / 目标口分类`。

## 建议收口

建议裁决为 `supplement`，补充到现有 `P/L 边界交接：推入、跨侧与抽取分配`，并交叉引用 `刚体黏块 + 墙口：反向施力格谱系`。原因：

- P/L 边界上的 push-cross / pull-back 语义已由现有边界交接条目覆盖。
- 本轮的新价值是把它语料化为“活塞本体谱”：单箱退化、箱链残余债、sticky 刚体精确往复、L 形侧齿分类。
- 侧齿 / 行程墙的 active consumer 是刚体占格目标格与墙，而不是 P/L anchor 本身。
