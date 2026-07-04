# Experiment: ICE_EXP_META_2026_07_02_round39_l_ladder_rejected

```yaml
experiment_id: ICE_EXP_META_2026_07_02_round39_l_ladder_rejected
prototype: ice_slide_escape
terminal_state: rejected_candidate
candidate_id: ICE_CAND_0037
candidate_version: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
review_integrity: human_review
archive_eligibility: clean_archive
human_final_status: rejected_candidate
required_action: do_not_use_as_candidate
```

## 目标

本轮目标是 meta-first 设计并提交候选。base 流程要求在 d6 前或更早知识窗口内可用；
meta 默认允许全部知识；两条流程难度都不低于 2，至少一条不低于 3；审美目标是
4 分保底并追求 5 分。

## 候选

```yaml
candidate_version: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
candidate_record: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
base_instance:
  player_start: [7, 0]
  player_goal: [19, 12]
meta_instance:
  player_start: [0, 3]
  player_goal: [9, 14]
```

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

## LLM 提交结论

```yaml
submitted_status: proposal_ready_with_caveats
submitted_aesthetic_claim: "4 supported; not 5"
submitted_difficulty_claim:
  base: ">=2, likely around 3"
  meta: ">=3"
submitted_caveats:
  - "A->D cost20 was retained as a noncore caveat"
  - "returned target order was not claimed as all-solution object necessity"
  - "repeated d4 handfeel capped ceiling below 5"
```

LLM/critic 在 review_2 后把该候选提交为 `proposal_ready_with_caveats`。这次人类
归档结论推翻该提交强度：solver 和 review 证据只能证明可走与事件门成立，不能证明
该结构有足够审美或 meta 价值。

## 证据摘要

```yaml
base:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base.md
  solved: true
  cost: 34
  returned_events:
    - walk
    - push_ice
    - ice_rebound_d4
  no_d5_d6_scan: pass
meta:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta.md
  solved: true
  cost: 28
  returned_events:
    - walk
    - push_ice
    - ice_rebound_d4
  required_d4_scan: pass
interface_scan:
  ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_edges.zh.md
  critical_failure: "A->D cost20 solved"
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_EXP_META_2026_07_02_round39_l_ladder_v1
  evidence_review:
    verdict: does_not_support_claim
    required_action: downgrade_or_hold
  puzzle_critic:
    verdict: revise_required
    required_action: structural_revision
designer_action_after_review_1:
  action: revise_interface_pairing_and_lower_claim
  layout_changed: false
review_2:
  candidate_version_reviewed: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
  evidence_review:
    verdict: supports_with_caveats
    required_action: none
  puzzle_critic:
    verdict: supports_with_noncore_caveats
    required_action: none
human_archive_verdict:
  status: rejected_candidate
  aesthetic_score: 1
  difficulty_score: 2
  required_action: do_not_use_as_candidate
```

## Human Review

```yaml
human_comments:
  - id: HC_ICE_CAND_0037_001
    author: human_designer
    status: rejected_candidate
    aesthetic_score: 1
    difficulty_score: 2
    attached_to:
      - candidate
      - designer_claim
      - puzzle_critic_artifact
      - interface_scan
    text: >
      典型反例，将三个无洞见的重复步骤拼接声称为关卡和meta流程，
      无任何价值，并且有A->D外溢的致命问题
```

## 归档结论

```yaml
terminal_state: rejected_candidate
proposal_ready: false
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
  - human_taste_reference
key_lessons:
  - "不要把重复的 target-door d4 步骤拼接包装成 meta 洞见。"
  - "接口扫描里的 A->D 外溢对 meta-first 候选是核心失败，不是 noncore caveat。"
  - "完整图、required-event、独立 review 通过，都不能替代人类审美和真实重读价值。"
```
