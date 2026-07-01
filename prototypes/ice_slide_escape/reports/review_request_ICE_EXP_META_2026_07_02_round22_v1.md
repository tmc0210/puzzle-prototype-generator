# Review 请求单: ICE_EXP_META_2026_07_02_round22_v1

```yaml
candidate_id: ICE_EXP_META_2026_07_02_round22_v1
current_review_loop_state: held_proposal
current_review_integrity: self_review_only
current_archive_eligibility: human_pending
request_type:
  - independent_evidence_review
  - puzzle_critic_review
  - optional_human_review
```

## 输入材料

```text
- prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round22_v1.md
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_core.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_full.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_full.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_core.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_full.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_full.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_no_late_exposure.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_no_late_exposure.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_A.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_A.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_B.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_B.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_D.json
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v1_ABCD.md
```

## Evidence Reviewer 重点

```yaml
must_check:
  - "A->B 与 C->D 是否分别有完整 solve / graph 证据。"
  - "base claim 是否已正确降级为 all-known + required d3+d4；不能继续声称 early cutoff 或 short-stop all-solution。"
  - "meta required d4 + short-stop + boundary disappear + d6 是否由完整搜索支持。"
  - "D 初始为墙但作为 player_goal 是否合法，且 C->D 是否确实由 d6+ 打开。"
  - "full edge scan 是否覆盖 30 个 edge goals、60 个合法 start/goal instances，并支持 no external edge escape。"
  - "B=C same-cell re-entry 是否被清楚披露；C->A/C->B 是否只按 ignored reverse / same-cell return 记录。"
  - "是否存在没有证据支持的 object identity、future world-map runtime 或 accepted/proposal_ready claim。"
do_not_do:
  - "不要评价审美或难度。"
  - "不要把 analyzer pass 写成 quality pass。"
  - "不要把 C->A / C->B 当作 caveat；它们属于已声明 ignored class。"
```

## Puzzle Critic 重点

```yaml
must_check:
  - "B=C shared re-entry 是优雅压缩还是接口贫弱。"
  - "base 的 4 push d3+d4+d4 是否达到难度 >=2；是否可接近 3。"
  - "meta 的 4 push d4+short+boundary+d6 是否达到难度 >=3，还是因路线过窄只算功能连接。"
  - "整体审美是否达到 4 下界；若未达，required_action 应为 downgrade_or_hold 或 structural_revision。"
  - "与 ICE_CAND_0024/0033/0034 的人类 anchor 对比是否合理。"
  - "若认为 round22 太接近 0034 compact D-wall family，应作为 originality / family caveat 说明。"
do_not_do:
  - "不要奖励证据干净本身。"
  - "不要把 B=C 的声明接口误读成未授权 archive variant。"
  - "不要使用没有 human archive anchor 支撑的分数化结论。"
```

## Requested Output Shape

Evidence reviewer 应使用 `skills/sokoban-design-review-loop/references/evidence-reviewer-template.md` 的枚举；critic 应使用 `skills/sokoban-design-review-loop/references/puzzle-critic-template.md` 的枚举。

若任一 reviewer 的 `required_action` 不是 `none`，controller 必须保留 `held_proposal` / `revise_required`，不能升级为 `proposal_ready`。
