# Explorer Notes: pl_anchor_mixed_force_chain_wall

## 本轮假设

crate 与 P/L anchor 进入同一 force chain 时，不能只把它记成普通箱链噪声。若同一步同时出现 `force_chain:n*` 与 `anchor_boundary_shift:push_pull`，并且后续墙位或边界侧别消费了这个移动结果，它可以成为 P/L anchor 的结构用途。

本 topic 只采纳两类强观察：

- 墙端容量：crate 与 P/L 同链会把原本 anchor-only 的位移余量缩短，尾墙在下一步消费整条链。
- 边界重写：混合链移动 P/L 后，旧 L 侧格被 P 边界覆盖，后续 crate 触碰从 pull front gate 变成 push chain。

## 有效比较

- `p_push_crate_into_anchor_tail_wall_after_one`：首步 `down` 合法，事件为 `push_object:crate#1, force_chain:n2, anchor_boundary_shift:push_pull`；第二个 `down` 因尾端撞墙 `force_blocked`。
- `p_push_anchor_into_crate_tail_wall_after_one`：链顺序换成 P/L -> crate 后，首步同样打出 `force_chain:n2` 与 `anchor_boundary_shift:push_pull`，第二步同样被尾墙 `force_blocked`。链顺序改变物体排布，但不改变“一格尾余量只能吃一次”的容量结论。
- `anchor_only_two_steps_capacity_control`：移除 crate 后，同样墙廊余量下两个 `down` 都合法，且没有 `force_chain:n2`。这说明 mixed crate 不是装饰，它把 P/L 的可动余量减少了一步。
- `mixed_downshift_rewrites_side_crate_to_push`：首步 P/L -> crate 混合链下移，随后玩家绕到侧边 crate 右侧，`left` 变成合法 push，并再次产生 `force_chain:n2, anchor_boundary_shift:push_pull`。
- `no_shift_side_crate_pull_front_gate`：不先下移 P/L 时，同一右侧站位执行 `left` 是 L 侧 pull，因前格被 crate 占据而 `pull_world_front_blocked`。这是边界重写的门控反例。
- `l_pull_anchor_carries_side_crate_open`：L 侧向上 pull 横向 P/L，非接触半格上方的 crate 被同链带走，事件为 `pull_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull`。
- `l_pull_anchor_front_wall_gate`：只关玩家前格，首步在 force chain 规划前以 `destination_blocked` 截断。
- `l_pull_anchor_crate_target_wall_gate`：玩家前格开放，但 crate 目标格为墙，首步以 `force_blocked` 截断整条混合 pull 链。

所有 case 的局部可达图均为 `complete`。两个正例的 return search 出现 `exhausted`，只记录为回返未知，不作为不可回返证据。

## 结论范围校准

已支撑：

- P 侧 push 中，crate -> P/L 与 P/L -> crate 两种链顺序都能在首步形成 mixed force chain，并移动 P/L anchor。
- 一格尾余量中，mixed chain 比 anchor-only 少一次可用位移；尾墙是实际 consumer。
- 混合链移动 P/L 后，旧 L 侧的一行格子可被新 P 边界重标，后续 crate 动作从 `pull_world_front_blocked` 变成 push chain。
- L 侧 pull 横向 P/L 时，玩家前格墙和 crate 目标墙是两个不同的截断点：前者给 `destination_blocked`，后者给 `force_blocked`。

未覆盖导致的收窄：

- 没有覆盖三箱或更长链；不能声称链长谱。
- 没有覆盖 B/S 或 sticky；本轮结论只限 crate + P/L anchor。
- 没有证明所有 mixed-chain 位移都能产生可用边界 rewrite；当前只证明垂直 P/L 下移一格能重标侧边 crate 的后续动作。
- 没有把目标覆盖作为 consumer；目标 `G` 只用于 runtime 合法解析。

被修正的解释：

- 一开始可能把“crate 与 P/L 同链”看成普通 force chain 事件，但 anchor-only 对照显示 crate 会改变 P/L 在墙廊中的容量。
- 链顺序本身不是新 family：crate -> P/L 和 P/L -> crate 在一格尾余量下给出同样的墙端截断，只适合作为变体。
- L 侧 pull 的失败不能混写：玩家前格墙是 `destination_blocked`，非接触 crate 目标墙才是 `force_blocked`。

不建议提交 curator 的弱结论：

- 不把 `returnToInitial.status=exhausted` 写成不可回返。
- 不把 `no_shift_side_crate_pull_front_gate` 单独升为 family；它只是边界重写的门控反例。
- 不把可达图事件计数中的其它 reachable `force_chain` 当作本轮 witness；正式证据只看脚本动作回放。
- 不把本轮写成普通多箱链、固定 P/L 边界交接或 anchor-only 墙廊。

## 下一轮建议

若 curator 认为 `pl_mixed_chain_boundary_rewrite` 足够新，可补一个目标口袋或单格门消费侧边 crate 的最终位置；若只作为 supplement，则并入 P/L 边界重写或横向把手门矩阵，不需要为同题材再开 backlog。
