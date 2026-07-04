# 提交：ICE_EXP_META_2026_07_02_round39_l_ladder_v2

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
status: rejected_candidate_after_human_review
review_integrity: independent_review
latest_evidence_review: { iteration: 2, required_action: none }
latest_puzzle_critic: { iteration: 2, required_action: none }
archive_eligibility: clean_archive
human_archive_result:
  archived_candidate_id: ICE_CAND_0037
  human_final_status: rejected_candidate
  aesthetic_score: 1
  difficulty_score: 2
  comment: "典型反例，将三个无洞见的重复步骤拼接声称为关卡和meta流程，无任何价值，并且有A->D外溢的致命问题"
base_instance: { start: [7, 0], goal: [19, 12] }
meta_instance: { start: [0, 3], goal: [9, 14] }
aesthetic_claim: "4 supported; not 5"
difficulty_claim:
  base: ">=2, likely around 3"
  meta: ">=3"
knowledge_claim:
  base: "d6-before window; complete scan has no d5/restart/d6/group-after-boundary reachable"
  meta: "full-knowledge allowance; returned solution uses d4 only"
```

## 人类归档结论

```yaml
candidate_record: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
experiment_ledger: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round39_l_ladder_rejected.md
human_final_status: rejected_candidate
aesthetic_score: 1
difficulty_score: 2
comment: >
  典型反例，将三个无洞见的重复步骤拼接声称为关卡和meta流程，无任何价值，
  并且有A->D外溢的致命问题
```

该结论覆盖本提交原先的 `proposal_ready_with_caveats` 强度。后续只能把它作为
负例和 critic/designer 校准材料引用，不能作为合格候选或正向 meta 参考。

## 布局

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

## 核心 Claim

三枚 target 初始全部由冰覆盖，且没有 off-target ice。候选的目标不是展示新规则，
而是把“已完成 target”重读成接口门锁：base 从顶部进入，先消费共享中央 target，
再消费右侧 target 到 B；meta 从左侧进入，先消费左侧 target，再用同一中央 target
作为收束门到 D。

claim 已按 review_1 收窄：逐 target 顺序只作为返回最短解事实；全解必经只声明
`ice_rebound_d4` 事件类别，不声明逐对象 all-solution necessity。

## 证据

- Candidate packet: `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round39_l_ladder_v2.zh.md`
- Designer action after review 1: `prototypes/ice_slide_escape/reports/designer_action_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md`
- Base analysis: `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base.md`
- Meta analysis: `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta.md`
- Base no d5/d6 scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base_no_d5d6.md`
- Meta required d4 scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta_required_d4.md`
- Interface summary: `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_edges.zh.md`
- Pre-human polish pass: `prototypes/ice_slide_escape/reports/pre_human_polish_pass_ICE_EXP_META_2026_07_02_round39_l_ladder_v2.md`

## 审查门

- Evidence review 2: `supports_with_caveats`, `proposal_ready_with_caveats`, `required_action: none`.
- Puzzle critic 2: `supports_with_noncore_caveats`, `proposal_ready_with_caveats`, `required_action: none`.

## 保留 Caveats

- A->D cost20 是剩余内部非目标 pair 风险；critic 将其降为 noncore caveat，而非核心失败。
- 三个 target 的局部门语法仍相似；候选按 4 提交，不声明 5。
- 返回解 key events 支持 central->right 与 left->central 的 route fact；不要升级为逐对象全胜解必然证明。
- base 可达扫描只证明无 d5/restart/d6/group-after-boundary 外溢；不要改写成 through-d4 clean cutoff。
