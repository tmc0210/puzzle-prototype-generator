# Candidate Packet: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3 review_2

candidate_version: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3
review_iteration: review_2
prototype: reality_anchor
slot: 第十关 / 可动 B/S 时机应用

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

```text
第十关：箱黏锚点应用，无推拉锚点。要求箱黏锚点可推，同样要求实际用到黏块和箱子之间的转化用于拼接或切割，并要求玩家考虑推动箱黏锚点的时机
```

## Human Feedback Context

`RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2` 被人类反馈指出：大量冗余空间，左侧一大片区域和箱子冗余，右上角空地冗余。v3 只做空间去噪，不改变 v2 已经成立的 “先 merge，后推 B/S，两次 B/S shift” 核心。

## Candidate

Source layout:

```text
#########
##....###
##.BS#G.#
##.M.MM.#
##@#...##
#########
```

Runtime-normalized start:

```text
#########
##....###
##.BS#G.#
##.C.MM.#
##@#...##
#########
```

## Intended / Clear Witness

```text
up right up left up right down right down right down right up
```

Returned shortest cost: 13. The solver returned the same input sequence as v2.

Key events:

- step 2 `right`: `push_object:crate#1`, `box_to_sticky:n1`, `sticky_merge:n1`
- step 3 `up`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`
- step 6 `right`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`, `sticky_to_box:n1`
- step 9 `down`: `push_object:crate#1`
- step 10 `right`: `push_object:sticky#1`, `move_sticky_rigid`
- step 13 `up`: `push_object:sticky#1`, `move_sticky_rigid`

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md`

- Shortest solution: found, cost 13.
- Graph: complete, 178 reachable states, 423 legal transitions, 14 winning states.
- Returned trace contains `box_to_sticky`, `sticky_merge`, two B/S shifts, `sticky_to_box`, crate push, and sticky rigid movement.
- v2 comparison: 221 reachable states, 546 legal transitions, 17 winning states. v3 reduces state space while keeping the same core shortest witness.

### Core event probe

Artifact: `direction_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_core.md`

Required groups:

- `bs_shift=anchor_boundary_shift:box_sticky`
- `box_to_sticky=box_to_sticky`
- `sticky_merge=sticky_merge`
- `sticky_to_box=sticky_to_box`
- `sticky_rigid=move_sticky_rigid`
- `crate_push=push_object:crate#1`

Result:

- Combined probe: complete, found_bypass=false, explored_states=190.
- Each individual probe: complete, found_bypass=false.

### B/S timing and count

Artifacts:

- `order_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_order.md`
- `event_count_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`

Results:

- No winning path exists where B/S shifts before any `sticky_merge`.
- No winning path exists below two `anchor_boundary_shift:box_sticky` events.

### Reachable scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md`

- Complete, 178 reachable states, 423 legal transitions.
- Forbidden P/L hits: none.

### Goal prune

Single target; `invalid_goal_prune` skipped.

## Claims Not Made

- 不声明归档接受、数值化审美或难度。
- 不声明唯一输入序列、唯一胜利终局或严格唯一事件顺序。
- 不声明所有胜路恰好两次 B/S shift；只声明至少两次。
- 不声明 v3 增加谜题深度；它只删除冗余空间和无用箱。

## Reviewer Questions

Evidence reviewer:

- 证据是否足以支持：无 P/L；所有胜路需要 B/S 位移、box_to_sticky、sticky_merge、sticky_to_box、move_sticky_rigid 和 crate push？
- order/count probes 是否仍支持“先 merge 后 B/S，且 B/S 至少使用两次”？
- v3 对 v2 的空间去噪 claim 是否由布局和状态数变化支持，且没有 overclaim？

Puzzle critic:

- v3 是否充分回应人类指出的左侧大区域/箱子和右上空地冗余？
- 它是否保持第十关可动 B/S 时机应用，而不是退回开局按钮或越界到第十一关？
- 强制线性是否只是 caveat，还是仍需结构修改？

## Evidence Artifacts

- `prototypes/reality_anchor/docs/关卡规划.md`
- `prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_human_playtest.zh.md`
- `prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.zh.md`
- `prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_layout.txt`
- `prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md`
- `prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_core.md`
- `prototypes/reality_anchor/reports/order_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_order.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`
- `prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md`
