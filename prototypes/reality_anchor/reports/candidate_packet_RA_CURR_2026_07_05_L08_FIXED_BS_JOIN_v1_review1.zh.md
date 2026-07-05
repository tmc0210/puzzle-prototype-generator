# Candidate Packet: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1 review_1

candidate_version: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第八关 / 固定 B/S 箱转黏拼接

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第八关：箱黏锚点应用，无推拉锚点，固定箱黏锚点，要求实际用到黏块和箱子之间的转化用于拼接。

## Candidate

```text
########
#..@...#
#B.C#..#
#S.....#
###M.G.#
########
```

## Intended / Shortest Witness

```text
down left down right right
```

Returned shortest cost: 5.

Key events:

- step 1 `down`: `push_object:crate#1`, `box_to_sticky:n1`, `sticky_merge:n1`
- step 4 `right`: `push_object:sticky#1`, `move_sticky_rigid`
- step 5 `right`: `push_object:sticky#1`, `move_sticky_rigid`

## Key Snapshots

Start:

```text
########
#..@...#
#B.C#..#
#S.....#
###M.G.#
########
```

After step 1, the crate crosses B/S into sticky side and merges with the lower M:

```text
########
#......#
#B.@#..#
#S.M...#
###M.G.#
########
```

Before step 4, the player stands left of the new upper sticky handle:

```text
########
#......#
#B..#..#
#S@M...#
###M.G.#
########
```

After step 4, the merged sticky body moves right:

```text
########
#......#
#B..#..#
#S.@M..#
###.MG.#
########
```

Final:

```text
########
#......#
#B..#..#
#S..@M.#
###..m.#
########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.md`

- Shortest solution: found, cost 5.
- Graph: complete, 186 reachable states, 488 legal transitions, 17 winning states.
- Returned trace contains `box_to_sticky`, `sticky_merge`, and `move_sticky_rigid`.

### Core event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1_core.md`

Required groups:

- `box_to_sticky=box_to_sticky`
- `sticky_merge=sticky_merge`
- `sticky_rigid=move_sticky_rigid`

Result:

- Combined probe: complete, found_bypass=false, explored_states=203.
- Each individual probe: complete, found_bypass=false.

This is the main evidence that conversion and joining are not incidental.

### Fixed-anchor / no-P/L scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.md`

- Complete, 186 reachable states, 488 legal transitions.
- Forbidden anchor/split hits: none.
- Event counts include only `box_to_sticky:n1`, `sticky_merge:n1`, `move_sticky_rigid`, `push_object:*`, and `walk`.

Interpretation: no P/L, no B/S shift, no sticky_to_box, no split.

### Goal prune

Single target; `invalid_goal_prune` skipped. There is no extra target that can be removed.

## Claims Not Made

- 不声明唯一输入序列。
- 不声明高难或归档分数。
- 不声明存在切割；本槽位只主张拼接。
- 不声明所有可达状态都必须立即拼接；只声明所有胜路需要核心事件。

## Reviewer Questions

Evidence reviewer:

- 核心事件探针是否足以支持 `box_to_sticky + sticky_merge` 为所有胜路必要？
- reachable scan 是否支持固定 B/S、无 P/L、无切割/反向材料事件？
- 单目标 goal prune skipped 是否合规？

Puzzle critic:

- 这个小关是否真正展示“箱转黏后作为把手拼接”，而不是只是事件出现？
- 作为第八关待玩候选是否过短，但仍可接受？
- 是否需要接入前修改？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.zh.md`
- `RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.md`
- `event_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1_core.md`
- `reachable_scan_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1.md`
