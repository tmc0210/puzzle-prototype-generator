# Explorer Notes: ra_loop_pl_l_shape_lateral_handle_20260708_01

## 本轮意图

本轮不是继续证明 L 形 sticky 能被推拉，而是把 P/L 横向活塞 stroke 后的 L 形读成“正交把手生成器”。关键变量是 L 形朝向：同一墙位在不同 L 形中会变成第一手行程墙、侧向 pull 目标墙，或可移动邻物的扫带位。

设计空间：

```text
P/L 横向 stroke 推出 L 形 -> L 形凸脚产生正交把手 / 侧向目标格 -> 墙位、站位门或可移动邻物消费
```

## 关键观察

- `dl_foot_side_wall_blocks_lateral_only`：下凸在左时，`right` 横向 stroke 成功；同一墙位在后续 `down pull` 中成为 L 形右臂目标墙，给 `force_blocked`。
- `dr_foot_same_wall_blocks_first_stroke`：下凸在右时，同一墙位变成下凸格第一手 `right` 的目标墙，活塞伸出前即 `force_blocked`。
- `ul_foot_up_pull_right_target_wall`：上凸在左时，`right` 横向 stroke 成功；同一墙位在后续 `up pull` 中成为右臂目标墙，给 `force_blocked`。
- `ur_foot_same_wall_blocks_first_stroke`：上凸在右时，同一墙位变成上凸格第一手 `right` 的目标墙，活塞伸出前即失败。
- `dl_piston_shift_opens_lateral_handle`：初始下方把手格被墙封住；先 `right` 推出横向活塞后，下凸把手移到开放列，玩家能绕到新把手并 `down pull` 侧拉。该终态 bounded return depth 13 可回初态。
- `dl_lateral_sweeps_bs_anchor_to_goal`：把侧向目标墙换成可移动 B/S anchor 后，`down pull` 产生 `pull_object:sticky#1,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid`，B/S anchor 下移并覆盖目标。

## 结构差异

同一墙位的三种读法：

- 第一手行程墙：右脚 L 形中，凸脚本身的横向目标格撞墙。
- 侧向目标墙：左脚 L 形中，横向 stroke 后右臂在正交 pull 中撞墙。
- 可移动邻物：把侧向目标墙换成 B/S anchor，失败格变成扫带资源，产出 anchor 位移与目标覆盖。

正交把手的关键条件：

- L 形必须先完成横向 stroke，否则初始把手可以被墙封住。
- 横向 stroke 后凸脚移动到开放列，玩家才有站位触发正交 pull。
- 这使它不同于开放房间中普通 L 形可动性。

## 结论范围校准

已支撑：

- 横向 P/L 边界，第一手为 `right` push，后续为 `down pull` 或 `up pull`。
- 四个 L 形朝向：下凸左、下凸右、上凸左、上凸右。
- 同一墙位在不同朝向中切换消费阶段。
- 横向 stroke 可把原本封闭的侧向把手移到开放列。
- 侧向 pull 可扫带一个可移动 B/S anchor 并覆盖目标。

结论收窄：

- 本轮没有覆盖竖向 P/L 边界、反向 push/pull、2x2 sticky、T 形 / 三格条。
- 扫带 consumer 只用 B/S anchor 证明了可移动二格对象；没有覆盖 crate、P/L anchor、sticky blocker。
- `dl_lateral_sweeps_bs_anchor_to_goal` 的 return search exhausted 是预算不足 / 状态空间大，不写成不可回返。

不应入库：

- “L 形能被侧拉”作为孤立事实。
- “B/S anchor 移动”作为本轮主标题。
- 没有横向 stroke 生成把手的开放房间普通刚体可动性。

是否打开新设计空间：

- 是。`P/L L形活塞正交把手` 是一个可独立探索的设计空间：输入是 L 形朝向与 P/L 横向 stroke，输出是正交把手 / 侧向目标格 / 可扫带邻物，最小 consumer 已经由墙位、把手门和 B/S anchor 扫带证明。

## 建议收口

建议裁决为 `promote`，作为新的顶层结构族进入 lexicon，名称建议：

```text
P/L L形活塞正交把手：朝向、侧拉与扫带
```

理由：

- 它不是现有 `P/L 边界交接` 的普通补变体；横向 stroke 本身制造新的正交把手和消费关系。
- 它也不是普通 `刚体黏块 + 墙口`，因为关键输入是 P/L stroke 改变把手可达性和消费阶段。
- 它已有正例、反例、边界修正和最小 consumer。
