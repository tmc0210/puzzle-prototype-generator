# single_crate_pull_mobility explorer notes

## 读取与运行边界

- 已读取：本 topic 的 `brief.md`、本轮 `round_manifest.md`、Reality Anchor `README.md` / `mechanic.yml`、`src/prototypes/reality_anchor/mechanics.ts`、`src/prototypes/reality_anchor/runtime.ts`、`src/workflows/localExperimentRunner.ts` 中与 cases schema、动作表、回返搜索相关的部分，以及本 topic 的 runner 产物。
- 未读取：`design_archive/`、候选关卡、人类评价、critic / sampler profile。
- 运行命令成功：

```text
npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/single_crate_pull_mobility/cases.yml --run-id ra_loop_pull_boundary_mobility_20260708_01_single_crate_pull_mobility --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/single_crate_pull_mobility --write
```

runner 写出 `cases.json`、`results.json`、`report.md`。6 个 case 的局部可达图均为 `complete`；本轮没有 `returnToInitial.status=exhausted`，因此没有需要降级为 unknown 的回返结论。

## 有效比较

| case | 关键输入 | replay 结果 | 最终动作表摘要 | 回返 |
| --- | --- | --- | --- | --- |
| `pull_open_crosses_to_push_undo` | 前格空、身后 crate、pull 后站位跨到 push 侧 | `right` legal，`pull_object:crate#1` | `left` legal 且 `push_object:crate#1`，`up` 为 `force_blocked` | `found depth=1` |
| `pull_open_stays_pull_side` | 前格空、身后 crate、pull 后仍在 pull 侧 | `right` legal，`pull_object:crate#1` | `left` illegal: `pull_world_front_blocked`，`right` 可继续 pull 同一 crate | `found depth=11` |
| `pull_front_wall_block` | 身后 crate、前格墙 | `right` illegal: `destination_blocked` | `right` illegal: `destination_blocked`，`left` illegal: `pull_world_front_blocked` | replay illegal，return `not_applicable` |
| `pull_front_anchor_blocks_target_vacate` | 身后 crate、前格为 P/L anchor 物体 | `right` illegal: `pull_world_front_blocked` | `right` / `left` 都是 `pull_world_front_blocked` | replay illegal，return `not_applicable` |
| `pull_no_rear_crate_walk` | 前格空、身后无 crate | `right` legal，事件为 `walk` | `up/down/left/right` 全 legal walk | `found depth=1` |
| `pull_single_cell_pocket_no_return` | 前格空、身后 crate、pull 后进入单格口袋 | `right` legal，`pull_object:crate#1` | 四方向全 illegal：上下右为 `destination_blocked`，左为 `pull_world_front_blocked` | `complete no` |

核心观察：

- `active_rule=pull_force + player front cell requirement`。pull 世界中，玩家必须先能进入前格；若前格是墙，失败原因是 `destination_blocked`；若前格是物体，失败原因是 `pull_world_front_blocked`。
- 身后一格有 crate 时，合法 pull 把 crate 拉入玩家腾出的当前格，并发出 `pull_object:crate#1`。身后无物体时，同一输入只是 `walk`，不触发 pull。
- 单箱 pull 的 crate 目标格在 v0 runtime 中就是玩家当前格；只有玩家前格可进入时，这个格才会被腾出。因此本轮无法独立制造“单 crate 目标格被墙或物体占据”的 `force_blocked` 反例；可观察到的近邻反例是前格物体阻止玩家腾出该目标格。
- 同一局部 pull 后，如果最终站位落在 push 侧，反向 `left` 可以立即 `push_object:crate#1` 回到初始，回返深度为 1；如果最终站位仍在 pull 侧，反向 `left` 被 crate 占据的前格阻断，只能绕路回返。
- 单格口袋是有效 consumer：pull 本身合法，但 pull 后玩家没有任何 legal action，局部图仅 2 个状态、1 条 transition，`returnToInitial.status=complete` 且未找到回返。

## 无效或不应上升的结论

- 不把前格门写成新的全图 pull 规则成果；它只是 README / runtime 已确认的基础语法，本轮价值在近邻动作表与 consumer 差异。
- 不把 `pull_front_anchor_blocks_target_vacate` 写成“crate 目标格独立阻塞”证明。它只能说明单箱 pull 中前格物体会阻止玩家腾出 crate 将要进入的当前格。
- `pull_front_wall_block` 与 `pull_front_anchor_blocks_target_vacate` 的 return 是 `not_applicable`，因为 replay 在非法动作处停止；不能把它们当作不可回返证明。
- 本 topic 不研究 P/L 真边界。`pull_open_crosses_to_push_undo` 中的 P/L 只作为制造 pull 侧和 pull 后 push 侧站位的局部 setup，不作为 P/L 边界 family 的证据。

## 回返范围

- `pull_single_cell_pocket_no_return` 是完整搜索下的 no：`status=complete`、`reachableStates=2`、`returnToInitial.status=complete`。
- `pull_open_crosses_to_push_undo`、`pull_open_stays_pull_side`、`pull_no_rear_crate_walk` 都是 found；其中 open control 的深度 11 说明开放地面存在绕行 shortcut，不能当作局部口袋消费。
- 本轮没有 `exhausted`。后续若复跑出现 `returnToInitial.status=exhausted`，只能写 unknown，不能写 no。
