# Design Claim: RA_EXP_2026_07_04_SOFT_HANDOFF_v2

```yaml
prototype: reality_anchor
candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v2
family: soft_handoff
role: challenge
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  why_not_archive_variant: >
    只使用 RA_CAND_0001 的人类评语作口味参照，不继承其三目标正交锁、封闭
    上目标、下方把手机制或长程对象链。本候选是横向短链：B/S 先把箱子转成
    黏块并送上目标，P/L 最后作为目标覆盖锚。
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_claim_allowed: false
```

## Layout

```text
#########
#...G.@.#
#C.GLP.##
#BS#.#..#
#########
```

## Player Insight

玩家需要把同一条横向走廊读成两段换相：先站到左侧拉动 `B/S`，让左侧箱子被带上来并跨过箱/黏边界变成可拉动的黏块；再把这块黏块拉到上目标，最后用 `P/L` 的平移覆盖下目标。两个锚点的角色清楚分工：`B/S` 负责材料和上目标，`P/L` 负责推拉区与最终目标覆盖。

## Causal Chain

1. 初始下目标旁有 `L/P`，但直接推/拉不能立刻结束；上目标需要一个可覆盖对象进入。
2. 玩家从右侧走到左侧入口，向上拉 `B/S`，同时把左边的 `C` 带上来，打开材料转换位置。
3. 玩家向右拉箱，触发 `box_to_sticky`，产生可继续拉动的黏块。
4. 黏块被拉到上目标；玩家随后站到 `P/L` 右侧并向左推，使 `P/L` 覆盖下目标完成胜利。

## Why Not Execution

这不是长程 ferry 题：最短解只有 12 步，核心动作是短链 handoff。它的后期性来自两种锚点同时被必要化，而不是来自大图搜索或多次往返。玩家必须看出“先 B/S 材料换相，再 P/L 收束”的顺序；若直接处理 `P/L` 或只搬箱子，无法覆盖两个目标。

## Mechanism Scope

```yaml
central:
  - push_pull_anchor_shift
  - box_sticky_anchor_shift
  - pull_event
  - material_normalization
  - sticky_rigid_move
allowed_support:
  - anchor_target_cover
  - short repositioning walks
incidental_allowed:
  - force_chain
not_claimed:
  - unique_solution
  - object_instance_identity_across_all_wins
  - sticky_merge
required_winning_path_events:
  - anchor_boundary_shift:push_pull
  - anchor_boundary_shift:box_sticky
  - pull_object
  - box_to_sticky|sticky_to_box
  - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere:
  - runtime_error
```

## Falsification

- 若完整胜路 probe 找到不移动任一锚点的胜路，claim 失败。
- 若找到无 pull、无材料归一化或无 sticky rigid move 的胜路，claim 失败。
- 若 critic 认为开头横向走位只是 padding 且机制链不足以补偿，应降级为 `proposal_ready_with_caveats` 或要求重构。
- 不声明分数化审美/难度；当前 clean human archive 只有一个正向锚点，无低分/失败人评锚。
