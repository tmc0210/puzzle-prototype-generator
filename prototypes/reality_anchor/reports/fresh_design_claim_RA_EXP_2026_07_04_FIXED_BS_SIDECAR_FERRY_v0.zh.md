# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v0

## 本轮目标

- role: mid_game_fixed_anchor_transition
- 机制范围：两个锚点同时出现；B/S 固定在墙腔中，只作为稳定材料边界；P/L 可移动并提供 push / pull 施力切换。
- 难度目标：中期偏低到中等，不追求终局高难，但必须满足用户新判据：黏箱变化不能只是省步数。
- 审美目标：无分数声称；当前 clean archive 只有正向人评锚点，缺少 clean negative / lower-bound anchor。
- archive_lineage_policy: fresh_required。本轮不以任何归档关或旧失败候选作为布局、对象角色或解法骨架。

## Player Insight

玩家需要读出“侧挂影子格没有自己的施力面”：一个目标/材料格位于侧向凹槽中，普通箱即使能变成多个可推动箱，也不能通过多推几步把该格横向带走；只有当它与可接触把手格合并为 sticky 刚体后，玩家才能从把手格施力，把侧挂格一起 ferry 到目标。

## Causal Chain

1. 固定 B/S 把地图分成 box side 与 sticky side；B/S 本身不可移动，避免把材料边界移动当作主谜题。
2. P/L 可移动，玩家必须调整或利用 push/pull 分区，才能在正确一侧对把手格施力。
3. C 从 box side 进入 sticky side 后触发 `box_to_sticky`，与等待的 M `sticky_merge`，形成至少二格的侧挂 sticky 结构。
4. 侧挂格位于普通箱不可直接推/拉的凹槽关系中；普通箱替代不是“多推几步”，而应完整无解或缺少同等目标覆盖。
5. 最后通过 `move_sticky_rigid` 把侧挂格随把手一起搬运到目标，完成覆盖。

## Why Not Execution

上一轮失败在于：搜索最优解包含黏箱事件，但玩家指出普通箱替代只是多操作。因此本轮必须把普通箱替代的可操作性作为硬门槛。若拆成普通箱后仍能通过直接推/拉或 force chain 分别覆盖目标，本 family 直接打回。

## Required Events

- `anchor_boundary_shift:push_pull`
- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`

## Forbidden / Negative Evidence

- `anchor_boundary_shift:box_sticky` 在可达图中出现：reject。固定 B/S 必须真正固定。
- 存在不经 `box_to_sticky` / `sticky_merge` / `move_sticky_rigid` 的胜路：reject。
- 普通箱替代版可解：reject。
- 人类侧普通箱等价路线只多推几步：即使工具 analog 通过，也 downgrade/revise，不送合格。

## 工具要回答的问题

- 原布局是否可解，解法是否包含可解释的 key snapshots。
- 固定 B/S 是否在完整可达扫描中没有 `anchor_boundary_shift:box_sticky`。
- 所有胜路是否都包含 movable P/L 位移、box_to_sticky、sticky_merge、sticky rigid move。
- 至少一个贴近人类质疑的 ordinary-box analog 是否完整无解：去掉 B/S 与 sticky，保留侧挂格/把手格为普通箱，检查是否能通过额外推拉完成。
