# Candidate Packet: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1 review_1

candidate_version: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第十一关 / 可动 B/S 复杂拼接切割

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第十一关：箱黏锚点应用，无推拉锚点。要求箱黏锚点可推，并需要使用比上一关更复杂的拼接切割，可以是拼接+切割的应用，要求玩家考虑推动箱黏锚点的时机

## Candidate

Source layout:

```text
#########
#G.M.#..#
##@BS..M#
#.G.M..M#
#########
```

Runtime-normalized start:

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

## Intended / Clear Witness

```text
down right right right up left up left left down
```

Returned shortest cost: 10. The solver returned the same input sequence.

Key events:

- step 3 `right`: `push_object:sticky#1`, `move_sticky_rigid`
- step 4 `right`: `push_object:sticky#1`, `move_sticky_rigid`, `sticky_merge:n1`
- step 6 `left`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`, `box_to_sticky:n1`
- step 8 `left`: `push_object:sticky#1`, `move_sticky_rigid`, `sticky_to_box:n1`
- step 10 `down`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`

## Key Snapshots

Start:

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

After step 4, the lower-right sticky pieces have been moved and merged before any B/S movement:

```text
#########
#G.C.#..#
##.BS..M#
#.G..@MM#
#########
```

After step 6, B/S has moved left and converted the upper crate into sticky:

```text
#########
#G.M.#..#
##BS@..M#
#.G...MM#
#########
```

After step 8, the upper-left sticky is moved left and cut back into a crate:

```text
#########
#GC@.#..#
##BS...M#
#.G...MM#
#########
```

Final:

```text
#########
#*...#..#
##@....M#
#.BS..MM#
#########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1.md`

- Shortest solution: found, cost 10.
- Graph: complete, 429 reachable states, 996 legal transitions, 25 winning states.
- Returned trace contains sticky movement, sticky_merge, two B/S shifts, box_to_sticky, sticky_to_box, and final B/S target coverage.

### Core event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_core_no_crate.md`

Required groups:

- `bs_shift=anchor_boundary_shift:box_sticky`
- `box_to_sticky=box_to_sticky`
- `sticky_merge=sticky_merge`
- `sticky_to_box=sticky_to_box`
- `sticky_rigid=move_sticky_rigid`

Result:

- Combined probe: complete, found_bypass=false, explored_states=665.
- Each individual probe: complete, found_bypass=false.

Important caveat: `push_object:crate#1` is not claimed necessary. A separate stricter probe found a no-crate-push winning bypass.

### B/S timing and count

Artifacts:

- `order_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_order.md`
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`

Results:

- No winning path exists where B/S shifts before any `sticky_merge`.
- No winning path exists below two `anchor_boundary_shift:box_sticky` events.

### Reachable scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1.md`

- Complete, 429 reachable states, 996 legal transitions.
- Forbidden P/L hits: none.

### Goal prune

Artifacts:

- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_top_goal_core_no_crate.md`
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_lower_goal_core_no_crate.md`

Results:

- Removing the upper goal releases a winning bypass missing `sticky_merge` and `sticky_to_box`.
- Removing the lower goal releases a 5-step winning bypass missing `box_to_sticky`, `sticky_merge`, and `move_sticky_rigid`.

Both goals are retained.

## Claims Not Made

- 不声明 ordinary crate push 为所有胜路必要。
- 不声明唯一输入序列、唯一事件顺序或对象实例链。
- 不声明归档接受、数值化审美或难度。

## Reviewer Questions

Evidence reviewer:

- 证据是否支持无 P/L、所有胜路需要 B/S shift、box_to_sticky、sticky_merge、sticky_to_box、move_sticky_rigid？
- order/count probes 是否支持 “B/S 不能在 merge 前先动，且至少需要两次 B/S shift”？
- goal prune 反事实是否支持两个目标都保留？

Puzzle critic:

- 相比 L10 v2，这个候选是否有足够不同的结构职责，而不是同一语法加长？
- 不把 crate push 作为所有胜路必要是否削弱玩家侧“切割后消费”的读法？
- 是否适合作为第十一关待玩候选？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1.zh.md`
- `RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1.md`
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_core_no_crate.md`
- `order_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_order.md`
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`
- `reachable_scan_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1.md`
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_top_goal_core_no_crate.md`
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_lower_goal_core_no_crate.md`
