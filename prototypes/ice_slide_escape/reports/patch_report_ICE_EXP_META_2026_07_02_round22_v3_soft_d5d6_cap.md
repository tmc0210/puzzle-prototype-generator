# Patch Report: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap

```yaml
prototype: ice_slide_escape
patch_target: ICE_EXP_META_2026_07_02_round22_v1
archive_candidate: ICE_CAND_0035
patch_status: human_accepted_soft_patch
intent: "温和修复 base 可达 d5/d6 外溢，不强行清掉 boundary。"
```

## Layout

v1:

```text
###########
#.........#
#....#....#
#.G..I.####
#I..I....##
#.#####.###
```

v3 soft d5/d6 cap:

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#I..I....##
#.#####.###
```

Wall additions:

```yaml
added_walls:
  - [5, 1]   # 切断顶层长直道，压掉搬冰上顶层后的 d6/d5 外溢
  - [2, 2]   # 阻止 target 冰被拆成底部 d5 发射冰
unchanged_interfaces:
  A: [1, 5]
  B: [7, 5]
  C: [7, 5]
  D: [10, 4]
```

## Evidence Summary

```yaml
base_A_to_B:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_required_full.md
  solved: true
  cost: 12
  pushes: 4
  graph: "complete, states=496, wins=1"
  all_winning_required:
    - ice_destroyed_d3
    - ice_rebound_d4
    - ice_stop_short
  status: pass
base_no_d5_d6:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_no_d5d6.md
  forbidden_reachable:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  forbidden_reachable_hits: []
  status: pass
base_strict_no_late:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_strict_no_late.md
  forbidden_reachable_hits:
    - ice_boundary_disappear:d2
  status: fail_boundary_only
meta_C_to_D:
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta_required_full.md
  solved: true
  cost: 22
  pushes: 4
  graph: "complete, states=1804, wins=1"
  all_winning_required:
    - ice_rebound_d4
    - ice_stop_short
    - ice_boundary_disappear
    - ice_destroy_group_d6_plus
  scc: "branching_win_dag, forcedWinPrefix=0/3"
  status: pass
full_edge_scan:
  report: prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_ABCD.md
  edge_goals_checked: 30
  legal_start_goal_instances_checked: 60
  complete: "60/60"
  interface_to_non_interface_solved: []
  status: pass
```

## Design Read

This is a softer patch than `round22_v2_patch`. It does not try to make base
fully clean against every late event; it only removes the severe d5/d6/restart
knowledge leak. That keeps the meta graph much closer to v1: the returned C->D
analysis remains `branching_win_dag` with `forcedWinPrefix=0/3`, instead of v2's
fully forced `3/3`.

Open caveat: base can still reach `ice_boundary_disappear:d2` through a non-winning
wander. If the archive policy requires zero boundary exposure as well, this proposal
is insufficient; if the practical policy is "do not leak d5/d6 before the re-entry
read", this is the better-feeling patch candidate.
