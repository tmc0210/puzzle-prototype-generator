# Review 请求单: ICE_EXP_META_2026_07_02_round21_v1

```yaml
candidate_id: ICE_EXP_META_2026_07_02_round21_v1
current_review_loop_state: held_proposal
current_review_integrity: self_review_only
current_archive_eligibility: raw_run_only
request_type:
  - independent_evidence_review
  - puzzle_critic_review
  - optional_human_review
```

## 输入材料

```text
- prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round21_v1.md
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round21_v1_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round21_v1_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round21_v1_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round21_v1_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round21_v1_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_base_required_d4.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_base_required_d4.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_meta_required.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_meta_required.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_pair_goal_B.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_pair_goal_B.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_pair_goal_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round21_v1_pair_goal_D.json
- prototypes/ice_slide_escape/reports/edge_goal_scan_ICE_EXP_META_2026_07_02_round21_v1.md
```

## Evidence Reviewer 重点

```yaml
must_check:
  - "A->B 与 C->D 是否分别有完整 solve / graph 证据。"
  - "base claim 是否已正确降级为 required d4，而没有继续声称 d2 all-solution。"
  - "meta required d6+d4 是否由完整搜索支持。"
  - "A->D 是否不可解；C->A 是否可按 ignored reverse pair 记录；C->B 是否只是 B=C 的同格回返。"
  - "是否存在没有证据支持的 early-stage、all-solution、object identity 或大地图 runtime claim。"
do_not_do:
  - "不要评价审美或难度。"
  - "不要把 analyzer pass 写成 quality pass。"
```

## Puzzle Critic 重点

```yaml
must_check:
  - "B=C shared re-entry 是优雅压缩还是接口贫弱。"
  - "base 是否达到难度 2，还是只是 witness。"
  - "meta 是否可算难度 3-，还是两推 forced route 只能算 2。"
  - "整体审美是否达到 4 下界；若未达，required_action 应为 downgrade_or_hold 或 structural_revision。"
  - "与 ICE_CAND_0024/0034/0004 的人类 anchor 对比是否合理。"
do_not_do:
  - "不要奖励证据干净本身。"
  - "不要把 B=C 的声明接口误读成未授权 archive variant。"
```
