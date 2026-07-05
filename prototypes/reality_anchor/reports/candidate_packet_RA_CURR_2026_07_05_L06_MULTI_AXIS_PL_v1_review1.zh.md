# Candidate Packet: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1 review_1

candidate_version: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第六关 / P/L 多方向应用

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第六关：另一个推拉锚点应用，要求用到推拉锚点的垂直和水平方向的推动拉动（也无需2*2组合，有其中之三即可），以及普通箱子

## Candidate

```text
##########
#PL@.#####
#..GG#...#
#.CG#.CG.#
#........#
##########
```

## Intended / Shortest Witness

```text
down left left down right up down left down right right up up right up left left left down right left down right down right right right right right up right
```

Returned shortest cost: 31.

Key events:

- step 5 `right`: `push_object:crate#1`，左箱先被推上左下目标。
- step 7 `down`: `pull_object:push_pull_anchor`，P/L 被垂直向下拉。
- step 8 `left`: `pull_object:crate#1`，左箱被临时拉回以重开通路。
- step 14 `right`: `pull_object:push_pull_anchor`，P/L 被水平向右拉。
- step 20 `right`: `push_object:push_pull_anchor`，P/L 被水平向右推，覆盖上方双目标。
- step 23 `right`: `push_object:crate#1`，左箱重新推回左下目标。
- step 31 `right`: `pull_object:crate#2`，右箱被拉到右下目标。

## Key Snapshots

Start:

```text
##########
#PL@.#####
#..GG#...#
#.CG#.CG.#
#........#
##########
```

After step 5, left crate is first pushed onto the lower-left target:

```text
##########
#PL..#####
#..GG#...#
#.@*#.CG.#
#........#
##########
```

After step 7, P/L has been pulled vertically down:

```text
##########
#....#####
#PLGG#...#
#.@*#.CG.#
#........#
##########
```

After step 8, the left crate is pulled back to reopen access:

```text
##########
#....#####
#PLGG#...#
#@CG#.CG.#
#........#
##########
```

After step 14, P/L has been pulled horizontally right:

```text
##########
#....#####
#.PL+#...#
#.CG#.CG.#
#........#
##########
```

After step 20, P/L has been pushed horizontally right and covers both upper targets:

```text
##########
#....#####
#.@PL#...#
#.CG#.CG.#
#........#
##########
```

After step 23, the left crate is pushed back onto its target:

```text
##########
#....#####
#..PL#...#
#.@*#.CG.#
#........#
##########
```

Final:

```text
##########
#....#####
#..PL#...#
#..*#..*@#
#........#
##########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1.md`

- Shortest solution: found, cost 31.
- Graph: complete, 9028 reachable states, 22844 legal transitions, 22 winning states.
- Returned trace contains all five claimed core groups.

### Instance-level event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_instance_core.md`

Required groups:

- `anchor_pull=pull_object:push_pull_anchor`
- `anchor_push=push_object:push_pull_anchor`
- `left_crate_push=push_object:crate#1`
- `right_crate_pull=pull_object:crate#2`

Result:

- Combined probe: complete, found_bypass=false, explored_states=15730.
- Each individual probe: complete, found_bypass=false.

### Direction-aware event probe

Artifact: `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_direction_core.md`

Required groups:

- `anchor_pull_down`: `pull_object:push_pull_anchor` and P-cell delta `dx=0, dy=+1`.
- `anchor_pull_right`: `pull_object:push_pull_anchor` and P-cell delta `dx=+1, dy=0`.
- `anchor_push_right`: `push_object:push_pull_anchor` and P-cell delta `dx=+1, dy=0`.
- `left_crate_push=push_object:crate#1`
- `right_crate_pull=pull_object:crate#2`

Result:

- Combined probe: complete, found_bypass=false, explored_states=16504.
- Each individual probe: complete, found_bypass=false.

This is the main evidence for the sixth-slot “three of four P/L direction/push-pull combinations” claim.

### Reachable scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1.md`

- Complete, 9028 reachable states, 22844 legal transitions.
- Forbidden material hits: none.
- Anchor shift directions in reachable graph: horizontal:right=260, vertical:down=150, vertical:up=174.

Interpretation: P/L vertical up is reachable, but the required winning-path groups are vertical pull down, horizontal pull right, and horizontal push right. Do not claim only these shifts are reachable.

### Goal prune check

Top-left upper target deletion:

- Analysis artifact: `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_left_goal.md`
- Cost drops from 31 to 21.
- Direction probe artifact: `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_left_goal_direction_core.md`
- Combined bypass found, missing group: `anchor_push_right`.
- Conclusion: retain top-left upper target.

Top-right upper target deletion:

- Analysis artifact: `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_right_goal.md`
- Cost drops from 31 to 29.
- Direction probe artifact: `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_right_goal_direction_core.md`
- Combined bypass found, missing group: `anchor_push_right`.
- Conclusion: retain top-right upper target.

Lower-left target deletion:

- Analysis artifact: `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_left_goal.md`
- Cost drops from 31 to 21.
- Direction probe artifact: `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_left_goal_direction_core.md`
- Combined bypass found, missing group: `right_crate_pull`.
- Conclusion: retain lower-left target because deletion lowers cost and releases a missing-core-event win.

Lower-right target deletion:

- Analysis artifact: `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_right_goal.md`
- Cost drops from 31 to 23.
- Direction probe artifact: `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_right_goal_direction_core.md`
- Combined bypass found, missing group: `right_crate_pull`.
- Conclusion: retain lower-right target.

## Claims Not Made

- 不声明唯一输入序列。
- 不声明所有可达 P/L 位移都属于三个 required direction groups。
- 不声明 `anchor_pull_down -> anchor_pull_right -> anchor_push_right` 是所有胜路的严格全序。
- 不声明归档分数或 clean archive acceptance。

## Reviewer Questions

Evidence reviewer:

- Direction-aware probe 是否足以支持第六槽位核心：所有胜路需要 P/L 垂直下拉、水平右拉、水平右推三类动作？
- Instance probe 是否支持普通箱 push/pull 必经？
- goal prune 证据是否足以保留四个目标？
- 是否存在 packet 主张超过证据？

Puzzle critic:

- 作为第六关待玩候选，31 步、左箱临时拉回再推回的结构是否可以接受？
- 这个结构是否比 L05 足够“另一个 P/L 应用”，而不是只是在 L05 上加步？
- 是否需要在接入待玩前修改，或仅保留 caveat 进入待玩？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1.zh.md`
- `RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1.md`
- `event_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_instance_core.md`
- `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_direction_core.md`
- `reachable_scan_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1.md`
- `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_left_goal.md`
- `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_left_goal_direction_core.md`
- `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_right_goal.md`
- `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_top_right_goal_direction_core.md`
- `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_left_goal.md`
- `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_left_goal_direction_core.md`
- `layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_right_goal.md`
- `direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_right_goal_direction_core.md`
