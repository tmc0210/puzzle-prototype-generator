# Candidate Packet: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1 / review1

## Prototype Context

```yaml
prototype_context:
  confirmed_rules: Reality Anchor runtime adapter; fixed anchors may affect objects without moving.
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    P/L: push_pull anchor; fixed vertical wall pocket in this candidate.
    B/S: box_sticky anchor; fixed vertical wall pocket in this candidate.
    C: ordinary crate; M: sticky block; G: target.
  tool_boundary: solver/analyzer/probes are hard evidence, not quality verdicts.
```

## Slot Brief

```yaml
slot: 第十二关
intended_role: 双锚点应用，双锚点互相平行，都用墙隔离。
known_before: L01-L11 curriculum mechanics, including fixed P/L, fixed B/S, sticky merge/cut, and movable B/S timing.
target: both fixed parallel anchors must be effective; this is a transition into dual-anchor use, not a high-difficulty challenge.
```

## Layout

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

## Returned Solution

```text
down right down right right
```

5 步。

## Key Snapshots

Step 1：箱子进入 S 侧，触发 `box_to_sticky + sticky_merge`，生成竖向二连黏块。

```text
###########
##.....####
#P#.@..#B##
#L#.M.G.S##
##..M.G.###
###########
```

Step 4：在 P/L pull 区拉动二连黏块，开始覆盖目标。

```text
###########
##.....####
#P#....#B##
#L#..M+.S##
##...MG.###
###########
```

Step 5：第二次 pull，二连黏块覆盖两个目标。

```text
###########
##.....####
#P#....#B##
#L#...m@S##
##....m.###
###########
```

## Mechanism Scope

```yaml
central:
  - fixed_box_sticky_material_effect
  - box_to_sticky
  - sticky_merge
  - fixed_push_pull_pull_effect
  - sticky_rigid_movement
allowed_support:
  - ordinary walk/repositioning
  - ordinary crate push in returned trace
incidental_allowed:
  - extra reachable push/pull variants that still preserve required winning-path gates
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
  两个锚点都是竖向、互相平行、墙隔离的固定锚点。玩家需要先用 B/S 的材料边界
  把普通箱变成黏块并拼成竖向二连，再用 P/L 的 pull 区把这个二连黏块横向拉到
  双目标上。
causal_chain:
  - 下推 C，使其越过 B/S 材料边界，触发 box_to_sticky 与 sticky_merge。
  - 走到拼接后二连黏块右侧。
  - 在 P/L pull 区连续右拉二连黏块，使上下两个目标被同一结构覆盖。
why_not_execution: >
  这不是两个并排 witness：B/S 先改变材料并制造可被整体 pull 的二连结构，P/L
  随后消费这个结构。删上目标会释放缺 box_to_sticky / sticky_merge 的胜路；
  删下目标会释放缺 pull / sticky_merge / sticky_rigid 的胜路。
falsification: >
  若存在不使用 pull_object、box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，
  或任一锚点可达地发生 anchor_boundary_shift，则 claim 失败。push_object 不作为
  全胜路必要主张。
```

## Evidence

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/reality_anchor <layout> --id RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
  - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts <layout> RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1 300000 80
  - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts <layout> RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1 box_sticky 300000 80 strong_material
  - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts <layout> RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1 push_pull 300000 80
solver_result:
  shortest: 5
  complete_graph: true
  reachable_states: 887
  legal_transitions: 2256
trace_summary:
  - Step 1: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1
  - Step 4: pull_object:sticky#1, move_sticky_rigid
  - Step 5: pull_object:sticky#1, move_sticky_rigid, win
winning_path_event_checks:
  event_probe_core: pull_object, box_to_sticky, sticky_merge, move_sticky_rigid all complete/no bypass.
  fixedPL_probe: fixed_push_pull_effect complete/no bypass; reachable scan complete with no anchor_boundary_shift:push_pull.
  fixedBS_probe: fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move complete/no bypass; reachable scan complete with no anchor_boundary_shift:box_sticky.
graph_or_counterfactual_evidence:
  no_top_goal: releases wins missing box_to_sticky/sticky_merge, so top target preserves material conversion/merge requirement.
  no_lower_goal: releases wins missing pull/sticky_merge/sticky_rigid, so lower target preserves pull and rigid movement requirement.
evidence_limits:
  - The fixed-anchor probe combined rows report missing movable anchor shift; this is expected and not a failure for this fixed-anchor slot.
  - No instance-level object participation is reported.
  - Do not claim push_object is all-solution required.
  - Do not claim high difficulty; shortest solution is 5.
```

## Diagnostic Routing

```yaml
hard_evidence:
  - Review event gates and fixed-anchor reachable scans.
mechanism_scope:
  - Check whether both fixed anchors are effective without anchor movement.
claim_hygiene:
  - Avoid claiming push necessity, uniqueness, or high difficulty.
taste_probes:
  - Attack whether this is only two adjacent witnesses or a legitimate fixed dual-anchor transition.
scc_graph:
  - Complete graph 887 states; shortest 5; opening has multiple viable commitments.
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
  Uses a fresh fixed-parallel dual-anchor layout for the L12 curriculum slot; archive examples are only taste anchors.
```
