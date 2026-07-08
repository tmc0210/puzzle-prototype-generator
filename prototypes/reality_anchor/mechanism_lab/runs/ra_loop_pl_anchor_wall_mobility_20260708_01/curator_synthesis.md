# Curator Synthesis: ra_loop_pl_anchor_wall_mobility_20260708_01

## topics_read

- `pl_anchor_long_axis_pull_push_wall_ratchet`
- `pl_anchor_transverse_wall_gate_matrix`
- `pl_anchor_boundary_rewrite_second_action`
- `pl_anchor_wall_latch_goal_plug`
- `pl_anchor_mixed_force_chain_wall`

所有 topic 都成功运行 `mechanism-lab-run --write` 并生成 `cases.json`、`results.json`、`report.md`。JSON 解析检查通过；各 topic 的局部可达图均为 `complete`。正例均移动 P/L anchor 本体并出现 `anchor_boundary_shift:push_pull`；失败例均标明是门控反例。

## cross_topic_duplicates

- `pl_anchor_long_axis_pull_push_wall_ratchet` 与 `pl_anchor_mixed_force_chain_wall` 的 mixed-chain wall capacity 都归入 `P/L 长轴墙廊` 的补谱，不单列新顶层。
- `pl_anchor_transverse_wall_gate_matrix` 与 `pl_anchor_mixed_force_chain_wall` 的 L 侧 pull carried crate gate 都归入 `P/L 横向把手` 的墙门矩阵补谱。
- `pl_anchor_boundary_rewrite_second_action` 与 `pl_anchor_mixed_force_chain_wall` 的 mixed downshift rewrite 共享同一核心接口：P/L anchor 本体移动后，旧格 / 旧侧对象被新边界重写并被第二动作消费。因此合并为一个新顶层结构族。

## reusable_findings

### P/L 长轴墙廊补谱

- L 侧 pull 的容量由玩家前格数量决定：0 格 `destination_blocked`，1 格一次停位，2 格两次 `anchor_boundary_shift:push_pull`。
- 首拉后，侧廊开放不是长轴恢复；回返门墙能消费首拉后的出口。
- crate + P/L mixed chain 在一格尾余量中比 anchor-only 少一次可动容量，尾墙实际消费 mixed chain。

### P/L 横向把手补谱

- P 侧 push 中，P 半格目标门与 L 半格目标门都返回 `force_blocked`，但 designer 放墙坐标不同，必须在语料中分开。
- L 侧 pull 中，玩家前格门是 `destination_blocked`；非接触半格 / carried crate 目标门是 `force_blocked`。
- 首步 anchor 已移动后，回返 pull 的玩家前格也可被墙消费。
- 竖放 `P/L` 的 P 侧左右 push 开放镜像通过，作为旋转补充。

### relabel/defer: P/L 墙口门闩物理 footprint

- 一格墙口可以把 P/L anchor 的二格 footprint 消费成物理门闩；push 或 pull 抽出后，通道从被堵变成可 walk。
- 过窄 footprint 目标墙给 `force_blocked`；二格旁 lane 给不移动 anchor 的 walk shortcut。
- pull 抽闩后，侧路开放 / 封死会改变最终动作集合。
- 这些 case 没有让玩家在新旧 P/L 边界两侧利用推拉差异完成后续动作，因此不进入正式 P/L 锚点边界语料。

### P/L 锚点边界重写

- P 侧 push 或 L 侧 pull 连续移动 P/L 两格后，旧 L 半格被释放并重写为 push 站位，能把 crate 推入目标。
- 只移动一次不是该结构；第二次 shift 被墙阻止也不成立。
- mixed chain 下移 P/L 后，旧 L 行侧边 crate 从 `pull_world_front_blocked` 变成 P 侧 push chain；不先移动 P/L 的同站位对照失败。

## weak_findings_to_keep_in_runs

- `pl_anchor_wall_latch_goal_plug` 只证明 P/L anchor 作为二格 movable footprint / 物理门闩能被墙口消费；没有证明边界变化被第二动作消费，停在 run 中。
- `goal_cover_stop_on_target` / `goal_cover_release_overtravel` 只证明 P/L anchor 可覆盖/释放目标，以及墙止位能稳定覆盖态。缺少非胜利条件 consumer，不进入正式 lexicon。
- 部分正例的 `returnToInitial.status=exhausted` 只记录为未知，不作为不可回返证据。
- mixed-chain 的链顺序差异不单独成族；它只是容量补谱的变体。

## claim_calibration_summary

- 已支撑：P/L anchor 本体在长轴、横向墙门、边界重写、mixed chain 中的可动性和墙 consumer。
- 未扩张：不声称所有旋转、所有旧半格、所有目标塞子都已覆盖；未跑项只收窄语料，不写成本轮 backlog 债。
- 不入库：只有 target-covering、只有 failure reason、只有一次 anchor shift 但没有后续消费的事实。
- 新结构用途：只有 `P/L 锚点边界重写` 足够新，且有正例、反例、边界修正和后续 consumption probe，进入正式语料。墙口门闩改为 relabel/defer。
