# Candidate Packet: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1 review_1

candidate_version: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第七关 / 固定 B/S 黏块刚体引入

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第七关：箱黏锚点引入，固定箱黏锚点（用墙隔离或者无法推即可），无推拉锚点。简单教教黏块和箱子的区别的witness就行，不要求黏块箱子之间的转化、切割

## Candidate

```text
#######
#B#####
#S#####
#@M...#
##M.G.#
#######
```

## Intended / Shortest Witness

```text
right right
```

Returned shortest cost: 2.

Key events:

- step 1 `right`: `push_object:sticky#1`, `move_sticky_rigid`
- step 2 `right`: `push_object:sticky#1`, `move_sticky_rigid`

The player pushes the upper cell of a vertical sticky pair. The lower cell moves rigidly with it and covers the lower target.

## Key Snapshots

Start:

```text
#######
#B#####
#S#####
#@M...#
##M.G.#
#######
```

After step 1:

```text
#######
#B#####
#S#####
#.@M..#
##.MG.#
#######
```

Final:

```text
#######
#B#####
#S#####
#..@M.#
##..m.#
#######
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1.md`

- Shortest solution: found, cost 2.
- Graph: complete, 16 reachable states, 35 legal transitions, 5 winning states.
- Returned trace contains two `push_object:sticky#1` and two `move_sticky_rigid` events.

### Core event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_core.md`

Required groups:

- `sticky_push=push_object:sticky#1`
- `sticky_rigid=move_sticky_rigid`

Result:

- Combined probe: complete, found_bypass=false, explored_states=16.
- Each individual probe: complete, found_bypass=false.

### Fixed-anchor / no-material scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1.md`

- Complete, 16 reachable states, 35 legal transitions.
- Forbidden anchor/material hits: none.
- Event counts only include `move_sticky_rigid`, `push_object:sticky#1`, and `walk`.

This supports fixed B/S, no P/L, no material conversion, no sticky split/merge.

### Ordinary box analog

Artifact: `layout_analysis_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_box_analog.md`

Analog layout:

```text
#######
#@C...#
##C.G.#
#######
```

Result:

- Solver found no solution.
- Search status: complete.
- Reachable states: 35.
- Winning states: 0.

Interpretation: the lower target is not reachable by merely pushing an ordinary top box; it requires the lower cell to move with the upper cell as a sticky rigid body.

### Goal prune

Single target; `invalid_goal_prune` skipped. There is no extra target that can be removed.

## Claims Not Made

- 不声明箱黏转化、拼接或切割。
- 不声明高难或归档分数。
- 不声明唯一玩家路线之外的审美价值；这是一个 tiny intro witness。

## Reviewer Questions

Evidence reviewer:

- 证据是否支持固定 B/S、无 P/L、无材料转换？
- `move_sticky_rigid` 和普通箱对照是否足以支持“黏块不同于普通箱”的槽位主张？
- 单目标 goal prune skipped 是否符合流程？

Puzzle critic:

- 作为第七关固定 B/S 引入，这个 2 步 witness 是否足够清楚？
- 是否存在过度平凡但仍可待玩的 caveat？
- 是否需要接入前修改？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1.zh.md`
- `RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1.md`
- `event_probe_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_core.md`
- `reachable_scan_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1.md`
- `RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_box_analog_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_box_analog.md`
