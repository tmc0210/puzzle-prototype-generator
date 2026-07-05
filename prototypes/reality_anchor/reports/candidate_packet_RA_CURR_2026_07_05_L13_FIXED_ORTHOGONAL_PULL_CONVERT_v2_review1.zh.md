# Candidate Packet: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2 / review1

## Prototype Context

```yaml
prototype_context:
  confirmed_rules: Reality Anchor runtime adapter; fixed anchors may affect objects without moving.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    P/L: push_pull anchor; fixed vertical wall pocket in this candidate.
    B/S: box_sticky anchor; fixed horizontal wall pocket in this candidate.
    C: ordinary crate; M: sticky block; G: target.
  tool_boundary: solver/analyzer/probes are hard evidence, not quality verdicts.
```

## Slot Brief

```yaml
slot: 第十三关
intended_role: 双锚点应用，双锚点互相垂直，都用墙隔离。
known_before: L01-L12 curriculum mechanics, including fixed P/L, fixed B/S, sticky merge/cut, movable B/S timing, and fixed parallel dual-anchor handoff.
target: both fixed orthogonal anchors must be effective; transition/application candidate, not a high-density challenge.
```

## Layout

```text
###########
####BS#####
#P#......##
#L#.C.G..##
###..MG..##
###...@..##
###########
```

## Returned Solution

```text
up up left right right
```

5 步。

## Key Snapshots

Step 4：P/L pull 将 C 向右拉过 B/S 边界，同时触发 `box_to_sticky + sticky_merge`。

```text
###########
####BS#####
#P#......##
#L#..M+..##
###..MG..##
###......##
```

Step 5：继续 P/L pull，竖向二连黏块覆盖两个目标。

```text
###########
####BS#####
#P#......##
#L#...m@.##
###...m..##
###......##
```

## Mechanism Scope

```yaml
central:
  - fixed_push_pull_pull_effect
  - fixed_box_sticky_material_effect
  - pull_object
  - box_to_sticky
  - sticky_merge
  - sticky_rigid_movement
allowed_support:
  - ordinary walk/repositioning
incidental_allowed:
  - reachable non-winning push variants
required_winning_path_events:
  - pull_object
  - box_to_sticky
  - sticky_merge
  - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere:
  - anchor_boundary_shift:push_pull
  - anchor_boundary_shift:box_sticky
```

## Design Claim

```yaml
player_insight: >
  P/L 是竖向固定锚点，B/S 是横向固定锚点，二者正交且都墙隔离。玩家需要站在 C
  的右侧，在 P/L 的 pull 区把 C 向右拉过 B/S 的材料边界；这个 pull 同时触发
  box_to_sticky 并与下方 M sticky_merge 成竖向二连。之后继续用 P/L pull 消费
  这个二连结构覆盖双目标。
causal_chain:
  - 绕到 C 右侧。
  - 第一次向右移动在 P/L pull 区拉 C，使 C 跨过 B/S 边界并转黏合体。
  - 第二次向右 pull 竖向二连黏块，使上下两个目标被同一结构覆盖。
why_not_execution: >
  两个锚点不是并排 witness：P/L 的 pull 是触发 B/S 材料转换的运输动作，B/S
  产生的二连黏块又被 P/L 后续继续消费。若玩家不能理解从右侧拉 C 过材料边界，
  就无法得到可覆盖双目标的二连结构。
falsification: >
  若存在缺 pull_object、box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，
  或任一固定锚点发生 anchor_boundary_shift，则 claim 失败。不声明唯一解、
  实例级对象身份或高难。
```

## Evidence

```yaml
solver_result:
  shortest: 5
  complete_graph: true
  reachable_states: 1239
  legal_transitions: 3506
trace_summary:
  - Step 4: pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1
  - Step 5: pull_object:sticky#1, move_sticky_rigid, win
winning_path_event_checks:
  fixedBS_probe:
    file: fixed_anchor_probe_RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_fixedBS.md
    supported: fixed_box_sticky_effect, pull_event, box_to_sticky, sticky_merge, sticky_rigid_move all complete/no bypass.
    forbidden_reachable: anchor_boundary_shift:box_sticky none, scan complete.
  fixedPL_probe:
    file: fixed_anchor_probe_RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_fixedPL.md
    supported: fixed_push_pull_effect and material_normalization complete/no bypass.
    forbidden_reachable: anchor_boundary_shift:push_pull none, scan complete.
graph_or_counterfactual_evidence:
  no_top_goal:
    files:
      - layout_analysis_RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_no_top_goal.md
      - fixed_anchor_probe_RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_no_top_goal_fixedBS.md
    result: deleting top goal releases a 2-step win missing fixed_box_sticky_effect, box_to_sticky, sticky_merge.
  no_lower_goal:
    files:
      - layout_analysis_RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_no_lower_goal.md
      - fixed_anchor_probe_RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_no_lower_goal_fixedBS.md
    result: deleting lower goal releases wins missing fixed_box_sticky_effect, box_to_sticky, sticky_merge; lower target is not a removable side-effect goal.
evidence_limits:
  - Fixed-anchor probe combined rows report missing movable anchor shift; this is expected and not a failure for this fixed-anchor slot.
  - No instance-level object participation is reported.
  - Do not claim unique solution, high difficulty, or push_object necessity.
```

## Diagnostic Routing

```yaml
hard_evidence:
  - Review fixed-anchor event gates and reachable scans.
mechanism_scope:
  - Check whether both fixed orthogonal anchors are effective without anchor movement.
claim_hygiene:
  - Avoid uniqueness, instance identity, high difficulty, or push necessity overclaims.
taste_probes:
  - Attack whether the 5-step structure is too witness-like, and whether the P/L pull truly reads through B/S conversion.
scc_graph:
  - Complete graph 1239 states; shortest 5; one SCC with many reversible states, so graph facts should not be turned into difficulty praise.
prototype_specific_work:
  invalid_goal_prune:
    status: checked
    targets_checked: [top_goal, lower_goal]
    removed_targets: []
    retained_targets: [top_goal, lower_goal]
```

## Archive Taste Context

```yaml
examples:
  - RA_CAND_0004: human_reviewed, aesthetic 4 / difficulty 3; human liked lower push/pull + sticky property shuffling but noted weak coupling.
  - RA_CAND_0005: human_reviewed, aesthetic 4 / difficulty 4; human liked clear conflict and high mechanism utilization.
  - RA_CAND_0012: human_reviewed, aesthetic 2 / difficulty 1; compact sticky join witness.
  - RA_CAND_0013: human_reviewed, aesthetic 2 / difficulty 1; simple sticky cut witness.
  - RA_CAND_0006: human_reviewed negative, aesthetic 2 / difficulty 5; complexity inflated by goal hardening, mechanism beauty weakened.
```

## Archive Lineage Policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
candidate_relation: fresh
why_not_archive_variant: >
  Fresh fixed-orthogonal dual-anchor layout for L13; archive examples are only taste anchors.
```
