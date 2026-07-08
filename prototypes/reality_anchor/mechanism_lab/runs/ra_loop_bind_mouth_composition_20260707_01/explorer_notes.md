# Explorer Notes: ra_loop_bind_mouth_composition_20260707_01

## 本轮假设

`B/S 绑定债` 的输出不应只停留在 “crate 变 sticky / sticky merge” 事件。若把绑定产出的 connected footprint 直接送入 `刚体黏块 + 墙口` 的目标口 consumer，同一墙齿应能区分：

- connected 竖向二连：下格想进目标时，上格前沿也必须开放。
- 单格输出：只需要下格目标口。
- 隔行输出：两个 sticky 部件不连接，下格部件可以绕过上沿墙齿。
- 口宽变化：打开上格口后，原本被拒绝的 connected footprint 应整体通过。

## 候选结构族筛选

1. `bs_pair_tooth_mouth`：竖向二连绑定产物接上沿墙齿目标口。执行。
2. `bs_bar_reverse_force_mouth`：水平 2/3/4 格绑定横条进入一格高墙廊后比较回返站位。暂不执行，和既有墙廊谱重复风险高。
3. `bs_l_corner_tooth_mouth`：L 形绑定产物的凸角接墙齿目标口。暂不执行，作为下一轮放大变量。
4. `bs_bridge_endpoint_mouth`：桥接既有端点后接单格目标口。暂不执行，lexicon 已有相邻补充，本轮不重复。
5. `bs_pair_two_goal_fill`：竖向二连同时覆盖上下两个目标。执行族中的开口变体已覆盖，不单列。
6. `bs_gap_parts_shortcut`：隔行非 connected 输出绕过同一 mouth。作为执行族反例。
7. `bs_pair_mouth_width_boundary`：墙齿改成双格口宽。作为执行族边界 case。
8. `bs_pair_disable_normalize_counterfactual`：禁用 normalize 验证差异消失。runtime 支持字段，但本轮成功标准优先跑近邻几何；留作后续补强。

## 有效比较

- `bs_pair_tooth_connected_block`：两枚 crate 先后跨过固定 B/S 边界，第二枚跨线后与第一枚正交邻接并触发 `sticky_merge:n1`；随后的 `right` 因上格目标位被墙齿关闭而 `force_blocked`。
- `bs_single_tooth_lower_pass`：去掉上方 crate 后，单格 sticky 在同一墙齿下能覆盖下格目标，最终 `isWin=true`，回返搜索 `found depth=10`。
- `bs_pair_open_two_cell_mouth_pass`：保持同样竖向 connected footprint，但把上方墙齿改成第二个目标开口，整体 push 通过并覆盖两个目标，最终 `isWin=true`。
- `bs_gap_parts_tooth_shortcut`：两个 crate 隔行跨线，保持两个 sticky 部件而不 merge；下格部件能覆盖同一目标，说明被拒绝的是 connected footprint 的完整前沿需求，不是 sticky 材质或右推动作。

## 被修正的解释

初始解释容易写成“竖向二连太大所以不能过”。`bs_pair_open_two_cell_mouth_pass` 修正为：二连不是必然失败，失败条件是目标口只开放下格时，connected footprint 的上格前沿撞墙。

另一个容易误写的解释是“两个 crate 进入 sticky 侧就一定形成门闩”。`bs_gap_parts_tooth_shortcut` 修正为：只有正交邻接并 merge 成同一 rigid group 时，墙齿才消费 connectedness；隔行输出仍是两个独立部件。

## 不建议提交 curator 的弱结论

- 不把 `box_to_sticky:n1` 或 `sticky_merge:n1` 本身写成成果；它们只是 producer 事件。
- 不把本轮提升为新顶层结构族；观察到的 consumer 是既有“刚体黏块 + 墙口”的前沿墙齿目标口补充。
- 不把 `returnToInitial.status=not_applicable` 当作不可回返证明；`bs_pair_tooth_connected_block` 的关键证据是动作回放中最后一步 `force_blocked`。
- 不使用状态图中的 `winStates` 证明唯一性；它只说明局部图里存在目标覆盖状态。

## 下一轮建议

若继续同一 gap，优先跑 `B/S 绑定横条 2/3/4 格 -> 同一反向施力格墙廊`，但要避免只重述既有墙口谱系。更有增量的方向是把本轮的竖向二连 tooth mouth 与 L 形绑定产物比较：验证 L 形凸角是否能借侧把手绕过同一上沿墙齿。
