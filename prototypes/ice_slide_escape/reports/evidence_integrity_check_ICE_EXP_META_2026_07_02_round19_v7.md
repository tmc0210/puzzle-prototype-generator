# 证据完整性校验：ICE_EXP_META_2026_07_02_round19_v7

本报告校验 v7 归档前证据文件之间是否自洽。它不判断审美、难度或是否可归档。

## 输入文件

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/ice_identity_trace_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round19_v7.md
```

## 校验结果

```yaml
overall: pass
checks:
  layout_rectangular_9x8:
    pass: true
    detail: "9x8"
  packet_references_layout:
    pass: true
    detail: "layout ref present"
  base_solution:
    pass: true
    detail: "cost=5, walk=4, push_ice=1, ice_rebound_d4=1"
  base_graph_complete:
    pass: true
    detail: "complete, states=651, wins=4"
  meta_solution:
    pass: true
    detail: "cost=31, walk=26, push_ice=5, ice_destroyed_d3=1, ice_rebound_d4=3, ice_stop_short:d1=1"
  meta_graph_complete:
    pass: true
    detail: "complete, states=1070, wins=2"
  base_cap_rows_pass:
    pass: true
    detail: "A=[1,0] and B=[0,2] pass; forbidden reachable d6 hits=none"
  meta_required_core_pass:
    pass: true
    detail: "machine gate pass; no winning path missing required d3+d4 found in complete search"
  edge_ab_to_cd_clear:
    pass: true
    detail: "AB_to_CD_solved=[] and risky_internal_non_target_pairs_requiring_revision=[]"
  all_edge_goal_scan_clear:
    pass: true
    detail: "30 perimeter goals checked; interface_to_non_interface_solved=[]; wall_edge_goals_solved=[]"
  edge_ab_not_adjacent:
    pass: true
    detail: "Manhattan(A,B)=3"
  identity_same_core_ice:
    pass: true
    detail: "meta_three_d4_same_ice=true and base_and_meta_core_d4_same_initial_ice=true"
  identity_coverage_counterexample_search:
    pass: true
    detail: "base complete: 4/4 winning paths covered; meta complete: 2/2 winning paths covered"
  packet_no_goal_completion_overclaim:
    pass: true
    detail: "held_proposal + raw_run_only + controller_score_claim none"
```

## 解释

```text
当前 v7 证据链在文件层面自洽：packet 中的 base/meta 数字、接口策略、
AB 不相邻、全边界 goal 扫描、base 暴露窗口、meta required-core、同冰回放、
身份覆盖反例搜索和未完成状态都能回到当前报告文件或 JSON 字段。

该校验仍不替代 independent evidence review 或 puzzle critic。它只证明 controller
送审材料没有明显引用漂移或字段矛盾。
```
