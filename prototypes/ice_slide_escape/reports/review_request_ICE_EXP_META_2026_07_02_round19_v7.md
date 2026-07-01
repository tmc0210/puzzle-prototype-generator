# 下一轮 Review 请求单：ICE_EXP_META_2026_07_02_round19_v7

本文件是给独立 evidence reviewer / puzzle critic 或人工复审使用的请求单。
它不是 review 结果，也不改变当前 `held_proposal` 状态。

```yaml
candidate_id: ICE_EXP_META_2026_07_02_round19_v7
current_review_loop_state: held_proposal
current_review_integrity: self_review_only
current_archive_eligibility: raw_run_only
request_type:
  - independent_evidence_review
  - puzzle_critic_review
  - optional_human_archive_review
```

## 输入材料

```text
主 packet:
- prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round19_v7.md

控制器与审计:
- prototypes/ice_slide_escape/reports/review_loop_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/review_readiness_audit_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/archive_candidate_deferral_ICE_EXP_META_2026_07_02_round19_v7.md

布局与机器证据:
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/ice_identity_trace_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/evidence_integrity_check_ICE_EXP_META_2026_07_02_round19_v7.md
```

## Evidence Reviewer 请求

请按 `skills/sokoban-design-review-loop/references/evidence-reviewer-template.md`
输出。只判断证据是否支持 packet 中的 `design_claim`，不要判断审美、趣味、
难度目标或归档地位。

重点检查：

```yaml
must_check:
  - "A->B 与 C->D 是否分别有完整 solve / graph 证据。"
  - "base d5 cap 是否由完整可达扫描支持，尤其 forbidden reachable d6 是否为 none。"
  - "meta required-core 是否证明没有缺少 d3 或 d4 的胜利路径。"
  - "A/B->C/D 是否全部不可解，且 C->A/B 是否只作为 ignored reverse pair 记录。"
  - "全边界 goal 扫描是否覆盖初始墙 goal，并证明接口外 edge goal 与墙 edge goal 均无可解命中。"
  - "身份回放与身份覆盖探针是否足以支持同一核心冰三次 d4 的硬证据；是否明确记录该探针为自写身份模拟器。"
  - "是否存在任何没有证据支持的 all-solution、object instance 或大地图 runtime claim。"
do_not_do:
  - "不要评价 aesthetic_score / difficulty_score。"
  - "不要把 analyzer pass 写成 quality pass。"
  - "不要把 C->A/B 的 cost、短路或自然度写成 caveat。"
```

期望输出字段：

```yaml
review_iteration: review_ICE_EXP_META_2026_07_02_round19_v7_evidence
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round19_v7
review_input_type: candidate_version
verdict:
review_loop_state:
required_action:
supported_claims:
unsupported_or_overclaimed:
evidence_limits:
questions_for_designer:
```

## Puzzle Critic 请求

请按 `skills/sokoban-design-review-loop/references/puzzle-critic-template.md`
输出。critic 可以攻击设计、角色适配、玩家侧读法、重复、拼接感和目标分数适配，
但不能补证据或做最终 archive pass。

必须使用 packet 中提供的 human archive anchors：

```yaml
positive_high_taste_anchor: ICE_CAND_0024
lower_bound_accepted_anchor: ICE_CAND_0022
negative_repeated_d4_anchor: ICE_CAND_0004
score_claim_allowed: true
```

重点攻击：

```yaml
must_check:
  - "v7 的三次 d4 是否真由回访目标和 D 路由重读支撑，还是仍像 ICE_CAND_0004 的平铺三次 d4。"
  - "base 一推 d4 是否虽轻但合理，还是薄到不能承担 meta-first 的 base。"
  - "meta 是否达到目标中的阶段挑战感，还是只是较长执行路线。"
  - "与 ICE_CAND_0024 相比，v7 是否缺少足够空间/要素交融复用。"
  - "与 ICE_CAND_0022 相比，v7 是否至少达到可用下界，并是否有更明确的回访趣味。"
  - "AB 已不相邻后，接口观感是否仍有边缘压缩或同侧限制风险。"
  - "SCC / graph 事实是否有明确玩家侧解释；没有则 verdict_effect 必须为 none。"
do_not_do:
  - "不要把 C->A/B 作为 caveat 或 core attack。"
  - "不要奖励证据干净本身；必须评价玩家侧洞见和重读价值。"
  - "不要把 clean archive anchor 当成可复用设计素材。"
```

期望输出字段：

```yaml
review_iteration: review_ICE_EXP_META_2026_07_02_round19_v7_critic
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round19_v7
review_input_type: candidate_version
verdict:
review_loop_state:
required_action:
strongest_merits:
archive_taste_context_used:
score_calibration:
  human_archive_anchors_present:
  score_claim_allowed:
  positive_anchors:
  lower_bound_or_negative_anchors:
  missing_anchor_effect:
aesthetic_target_fit:
difficulty_target_fit:
core_attacks:
scc_graph_interpretations:
noncore_caveats:
questions_for_designer:
```

## 当前 controller 边界

```text
在收到独立 evidence review / puzzle critic 或人工复审前，controller 只能保持
held_proposal + raw_run_only。若 review 的 required_action 不是 none，则下一步
必须按模板进入 revise_structure / revise_claim / downgrade_or_hold /
reject_or_change_family，不能直接关闭为 proposal_ready。
```
