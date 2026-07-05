# Candidate Packet: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1 review_1

candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第五关 / P/L 长边同向推拉应用

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第五关：推拉锚点应用，要求用到推拉锚点的长边同向推动和拉动（建议通过墙或其他方式禁止垂直方向的推拉），以及普通箱子的推动和拉动

## Candidate

```text
##########
#PL@G#####
#........#
#.CG#.CG.#
##########
```

## Intended / Shortest Witness

```text
right down left left left up right down left down right up right right right right right down right
```

Returned shortest cost: 19.

Key events:

- step 1 `right`: `pull_object:push_pull_anchor`，P/L 水平向右拉一步。
- step 7 `right`: `push_object:push_pull_anchor`，P/L 水平向右推一步，覆盖顶部目标。
- step 11 `right`: `push_object:crate#1`，左下箱被推入左下目标。
- step 19 `right`: `pull_object:crate#2`，右下箱被拉入右下目标。

## Key Snapshots

Start:

```text
##########
#PL@G#####
#........#
#.CG#.CG.#
##########
```

After step 1, P/L has been pulled right onto the top target approach:

```text
##########
#.PL+#####
#........#
#.CG#.CG.#
##########
```

Before step 7, the player has gone around to the P side:

```text
##########
#@PLG#####
#........#
#.CG#.CG.#
##########
```

After step 7, P/L has been pushed right and the top target is covered:

```text
##########
#.@PL#####
#........#
#.CG#.CG.#
##########
```

After step 11, the left lower target is covered by a pushed crate:

```text
##########
#..PL#####
#........#
#.@*#.CG.#
##########
```

Final:

```text
##########
#..PL#####
#........#
#..*#..*@#
##########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1.md`

- Shortest solution: found, cost 19.
- Graph: complete, 243 reachable states, 516 legal transitions, 15 winning states.
- Returned trace contains the four slot events listed above.

### Instance-level event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_instance_core.md`

Required groups:

- `anchor_pull=pull_object:push_pull_anchor`
- `anchor_push=push_object:push_pull_anchor`
- `left_crate_push=push_object:crate#1`
- `right_crate_pull=pull_object:crate#2`

Result:

- Combined probe: complete, found_bypass=false, explored_states=722.
- Each individual probe: complete, found_bypass=false.

### Direction-aware event probe

Artifact: `direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_direction_core.md`

Required groups:

- `anchor_pull_right`: transition contains `pull_object:push_pull_anchor` and P/L push cell moves `dx=+1, dy=0`.
- `anchor_push_right`: transition contains `push_object:push_pull_anchor` and P/L push cell moves `dx=+1, dy=0`.
- `left_crate_push=push_object:crate#1`
- `right_crate_pull=pull_object:crate#2`

Result:

- Combined probe: complete, found_bypass=false, explored_states=496.
- Each individual probe: complete, found_bypass=false.

This is the main evidence for “长边同向” in winning paths.

### Reachable scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1.md`

- Complete, 243 reachable states, 516 legal transitions.
- Forbidden material hits: none.
- Anchor shift directions observed in all reachable states: horizontal:right=10, vertical:down=4, vertical:up=2.

Interpretation: vertical P/L motion is reachable in non-winning exploration, so do not claim the level fully forbids vertical P/L interactions. The direction-aware probe is needed for the slot claim.

### Goal prune check

Top target deletion:

- Layout artifact: `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_top_goal_layout.txt`
- Analysis: cost drops from 19 to 13.
- Probe artifact: `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_top_goal_instance_core.md`
- Missing groups in bypass: `anchor_pull`, `anchor_push`.
- Conclusion: retain top target.

Left lower target deletion:

- Layout artifact: `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_left_goal_layout.txt`
- Analysis: cost drops from 19 to 15.
- Probe artifact: `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_left_goal_instance_core.md`
- Missing group in bypass: `left_crate_push`.
- Conclusion: retain left lower target.

Right lower target deletion:

- Layout artifact: `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_right_goal_layout.txt`
- Analysis: cost drops from 19 to 11.
- Probe artifact: `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_right_goal_instance_core.md`
- Missing group in bypass: `right_crate_pull`.
- Conclusion: retain right lower target.

## Claims Not Made

- 不声明唯一输入序列。
- 不声明所有可达 P/L 位移都是水平位移。
- 不声明所有胜路具有相同目标处理顺序。
- 不声明归档分数或 clean archive acceptance。

## Reviewer Questions

Evidence reviewer:

- 方向感知探针是否足以支持“所有胜路需要 P/L 长边同向拉和推”？
- 实例级探针是否足以支持普通箱 push 与 pull 的必要性？
- goal prune 证据是否足以保留三个目标？
- 是否存在本包主张超过工具证据的地方？

Puzzle critic:

- 作为第五关槽位，是否接受“非胜路中可达竖向 P/L 位移，但所有胜路需要水平同向 P/L 拉推”的 caveat？
- 是否认为结构过于拆分为三个 witness，还是可作为中期应用关候选？
- 是否需要在接入待玩前修改墙形或降级表述？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1.zh.md`
- `RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1.md`
- `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_instance_core.md`
- `direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_direction_core.md`
- `reachable_scan_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1.md`
- `layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_top_goal.md`
- `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_top_goal_instance_core.md`
- `layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_left_goal.md`
- `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_left_goal_instance_core.md`
- `layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_right_goal.md`
- `event_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_right_goal_instance_core.md`
