# Candidate Packet: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2 review_1

candidate_version: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2
review_iteration: review_1
prototype: reality_anchor
slot: 第十关 / 可动 B/S 时机应用

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第十关：箱黏锚点应用，无推拉锚点。要求箱黏锚点可推，同样要求实际用到黏块和箱子之间的转化用于拼接或切割，并要求玩家考虑推动箱黏锚点的时机

## Human Feedback Context

旧候选 `RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1` 已按反馈打回：玩家开局没有其它有效事情可做，只能顺手推 B/S；触发切割后 B/S 不再参与。新版本必须避免这个问题。

## Candidate

Source layout:

```text
#########
#.....#.#
#..BS#G.#
##.M.MM.#
#M@#....#
#########
```

Runtime-normalized start:

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```

## Intended / Clear Witness

```text
up right up left up right down right down right down right up
```

Returned shortest cost: 13. The solver returned the same input sequence.

Key events:

- step 2 `right`: `push_object:crate#1`, `box_to_sticky:n1`, `sticky_merge:n1`
- step 3 `up`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`
- step 6 `right`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`, `sticky_to_box:n1`
- step 9 `down`: `push_object:crate#1`
- step 10 `right`: `push_object:sticky#1`, `move_sticky_rigid`
- step 13 `up`: `push_object:sticky#1`, `move_sticky_rigid`

## Key Snapshots

Start:

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```

After step 2, the player has created a sticky merge before any B/S movement:

```text
#########
#.....#.#
#..BS#G.#
##.@MMM.#
#C.#....#
#########
```

After step 3, B/S is first moved into the upper channel:

```text
#########
#..BS.#.#
#..@.#G.#
##..MMM.#
#C.#....#
#########
```

After step 6, B/S moves again and cuts one sticky cell back to a box:

```text
#########
#..@BS#.#
#....#G.#
##..CMM.#
#C.#....#
#########
```

After step 9, the cut box is pushed down, freeing the sticky pair route:

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#C...#
#########
```

Final:

```text
#########
#...BS#.#
#....#mM#
##....@.#
#C.#C...#
#########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2.md`

- Shortest solution: found, cost 13.
- Graph: complete, 221 reachable states, 546 legal transitions, 17 winning states.
- Returned trace contains `box_to_sticky`, `sticky_merge`, two B/S shifts, `sticky_to_box`, crate push, and sticky rigid movement.

### Core event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_core.md`

Required groups:

- `bs_shift=anchor_boundary_shift:box_sticky`
- `box_to_sticky=box_to_sticky`
- `sticky_merge=sticky_merge`
- `sticky_to_box=sticky_to_box`
- `sticky_rigid=move_sticky_rigid`
- `crate_push=push_object:crate#1`

Result:

- Combined probe: complete, found_bypass=false, explored_states=236.
- Each individual probe: complete, found_bypass=false.

### B/S timing and count

Artifacts:

- `order_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_order.md`
- `event_count_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`

Results:

- No winning path exists where B/S shifts before any `sticky_merge`.
- No winning path exists below two `anchor_boundary_shift:box_sticky` events.

This is the main evidence responding to the rejected v1: B/S is not an opening-only witness button.

### Reachable scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2.md`

- Complete, 221 reachable states, 546 legal transitions.
- Forbidden P/L hits: none.

### Goal prune

Single target; `invalid_goal_prune` skipped.

## Claims Not Made

- 不声明归档接受、数值化审美或难度。
- 不声明唯一输入序列。
- 不声明所有胜路事件顺序完全等同于返回 witness；只主张 “B/S before merge” 不存在、B/S shift 至少两次，以及核心事件组全胜路必要。

## Reviewer Questions

Evidence reviewer:

- 证据是否足以支持：无 P/L；所有胜路需要 B/S 位移、box_to_sticky、sticky_merge、sticky_to_box、move_sticky_rigid 和 crate push？
- order probe 和 count probe 是否足以支持“玩家必须先拼接，之后才可推动 B/S；且 B/S 至少使用两次”？
- 单目标 goal prune skipped 是否合规？

Puzzle critic:

- 这版是否真正修复旧 L10：不再是开局唯一动作、B/S 不再一用即退场？
- 它作为第十关是否可接受，还是过于像第十一关导致后续槽位压力？
- 线性和强制性是否只是 caveat，还是需要继续修改？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2.zh.md`
- `RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2.md`
- `event_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_core.md`
- `order_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_order.md`
- `event_count_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`
- `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2.md`
