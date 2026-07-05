# Candidate Packet: RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1 review_1

candidate_version: RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第十关 / 可动 B/S 切割回黏

## Slot Requirement

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

> 第十关：箱黏锚点应用，无推拉锚点。要求箱黏锚点可推，同样要求实际用到黏块和箱子之间的转化用于拼接或切割，并要求玩家考虑推动箱黏锚点的时机

## Candidate

```text
#########
#@BS.#..#
#..C..G.#
#..M#####
#########
```

Runtime-normalized start:

```text
#########
#@BS.#..#
#..M..G.#
#..M#####
#########
```

## Intended / Clear Witness

```text
right down right right right
```

Returned shortest cost: 5. Solver returned the same input sequence.

Key events:

- step 1 `right`: `push_object:box_sticky_anchor`, `anchor_boundary_shift:box_sticky`, `sticky_to_box:n2`
- step 3 `right`: `push_object:crate#1`, `box_to_sticky:n1`
- step 4 `right`: `push_object:sticky#1`, `move_sticky_rigid`
- step 5 `right`: `push_object:sticky#1`, `move_sticky_rigid`

## Key Snapshots

Start:

```text
#########
#@BS.#..#
#..M..G.#
#..M#####
#########
```

After step 1, B/S has moved right once and the vertical sticky pair has been cut into two boxes:

```text
#########
#.@BS#..#
#..C..G.#
#..C#####
#########
```

Before step 3, the player is left of the cut-out upper box:

```text
#########
#..BS#..#
#.@C..G.#
#..C#####
#########
```

After step 3, the upper box has been pushed back into S side and becomes sticky:

```text
#########
#..BS#..#
#..@M.G.#
#..C#####
#########
```

Final:

```text
#########
#..BS#..#
#....@m.#
#..C#####
#########
```

## Evidence Summary

### Complete analysis

Artifact: `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.md`

- Shortest solution: found, cost 5.
- Graph: complete, 47 reachable states, 109 legal transitions, 9 winning states.
- Returned trace contains B/S shift, `sticky_to_box:n2`, `box_to_sticky:n1`, and `move_sticky_rigid`.

### Core event probe

Artifact: `event_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1_core.md`

Required groups:

- `bs_shift=anchor_boundary_shift:box_sticky`
- `sticky_to_box=sticky_to_box`
- `box_to_sticky=box_to_sticky`
- `sticky_rigid=move_sticky_rigid`
- `crate_push=push_object:crate#1`

Result:

- Combined probe: complete, found_bypass=false, explored_states=47.
- Each individual probe: complete, found_bypass=false.

This is the main evidence that all wins require B/S movement, cut, push-back material conversion, and sticky movement.

### Reachable scan

Artifact: `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.md`

- Complete, 47 reachable states, 109 legal transitions.
- Forbidden P/L hits: none.
- Event counts include exactly one `anchor_boundary_shift:box_sticky`, one `sticky_to_box:n2`, one `box_to_sticky:n1`, and sticky movement / push / walk events.

### Goal prune

Single target; `invalid_goal_prune` skipped.

## Claims Not Made

- 不声明归档接受、数值化审美或数值化难度。
- 不声明高复杂度；本候选是短可动 B/S witness。
- 不声明普通箱 analog 无解。
- 不声明拼接；本候选是切割 + 回黏 + 黏块移动。

## Reviewer Questions

Evidence reviewer:

- 证据是否足以支持：无 P/L；B/S 可动且所有胜路需要 `anchor_boundary_shift:box_sticky`？
- 证据是否足以支持：所有胜路需要 `sticky_to_box`、`box_to_sticky`、`move_sticky_rigid` 和 `push_object:crate#1`？
- 单目标 goal prune skipped 是否合规？

Puzzle critic:

- 这个短关是否真正使用了“移动 B/S 切开黏块，再把上箱推回 S 侧使用”的差异？
- “B/S 在第一步被推且关卡脚本化”是 caveat 还是接入前退回理由？
- 是否适合作为第十关待玩候选，而把更复杂拼接/切割留给第十一关？

## Evidence Artifacts

- `fresh_design_claim_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.zh.md`
- `RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1_layout.txt`
- `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.md`
- `event_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1_core.md`
- `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.md`
