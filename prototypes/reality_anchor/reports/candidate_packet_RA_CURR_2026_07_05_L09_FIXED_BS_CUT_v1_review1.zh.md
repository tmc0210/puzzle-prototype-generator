# Candidate Packet: RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1 review_1

candidate_version: RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第九关 / 固定 B/S 黏块切割

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第九关：箱黏锚点应用，无推拉锚点，固定箱黏锚点，要求实际用到黏块和箱子之间的转化用于切割黏块。

## Candidate

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

## Intended / Clear Witness

```text
up up left up up right
```

Returned shortest cost: 6. The solver's returned shortest uses the same input sequence.

Key events:

- step 1 `up`: `push_object:sticky#1`, `move_sticky_rigid`
- step 2 `up`: `push_object:sticky#1`, `move_sticky_rigid`, `sticky_to_box:n1`
- step 6 `right`: `push_object:crate#1`

## Key Snapshots

Start:

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

After step 1, the vertical sticky block has moved upward but remains sticky:

```text
########
########
##B..G##
##S.M###
###.M###
####@###
####.###
########
```

After step 2, the upper cell crosses into B side and becomes a box, while the lower cell remains sticky:

```text
########
########
##B.CG##
##S.M###
###.@###
####.###
####.###
########
```

Before step 6, the player has moved to the left of the newly cut-out box:

```text
########
########
##B@CG##
##S.M###
###..###
####.###
####.###
########
```

Final:

```text
########
########
##B.@*##
##S.M###
###..###
####.###
####.###
########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md`

- Shortest solution: found, cost 6.
- Graph: complete, 41 reachable states, 85 legal transitions, 32 winning states.
- Returned trace contains `sticky_to_box:n1`, `move_sticky_rigid`, and `push_object:crate#1`.

### Core event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_core.md`

Required groups:

- `sticky_to_box=sticky_to_box`
- `sticky_rigid=move_sticky_rigid`
- `crate_push=push_object:crate#1`

Result:

- Combined probe: complete, found_bypass=false, explored_states=41.
- Each individual probe: complete, found_bypass=false.

This is the main evidence that sticky-to-box cutting is required and that the cut-out box is later consumed by a push.

### Fixed-anchor / no-P/L scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md`

- Complete, 41 reachable states, 85 legal transitions.
- Forbidden anchor/join hits: none.
- Event counts include `sticky_to_box:n1`, `move_sticky_rigid`, `push_object:sticky#1`, `push_object:crate#1`, and `walk`.

Interpretation: no P/L, no B/S shift, no `box_to_sticky`, no `sticky_merge`.

### Goal prune

Single target; `invalid_goal_prune` skipped. There is no extra target that can be removed.

## Claims Not Made

- 不声明唯一输入序列之外的更强唯一性。
- 不声明 sticky_split 事件；当前 runtime 对“一个格转箱、剩余格留黏”记录为 `sticky_to_box`。
- 不声明拼接；本槽位只主张切割。
- 不声明高难或归档分数。

## Reviewer Questions

Evidence reviewer:

- 核心事件探针是否足以支持 `sticky_to_box` 切割和切割后箱子 push 为所有胜路必要？
- reachable scan 是否支持固定 B/S、无 P/L、无拼接/反向材料事件？
- 单目标 goal prune skipped 是否合规？

Puzzle critic:

- 这个小关是否真正展示“黏块被切成箱子并单独使用”，而不是只是 `sticky_to_box` 事件出现？
- 作为第九关待玩候选是否过短/过脚本，但仍可接受？
- 是否需要接入前修改？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.zh.md`
- `RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md`
- `event_probe_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_core.md`
- `reachable_scan_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md`
