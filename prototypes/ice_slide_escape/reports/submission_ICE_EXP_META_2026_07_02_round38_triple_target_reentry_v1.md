# Submission: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1
status: proposal_ready_with_caveats
latest_evidence_review: { iteration: 2, required_action: none }
latest_puzzle_critic: { iteration: 2, required_action: none }
base_instance: { start: [0, 3], goal: [26, 5] }
meta_instance: { start: [11, 0], goal: [26, 5] }
aesthetic_claim: "4 supported; not 5"
difficulty_claim:
  base: ">=3"
  meta: ">=2 / borderline 3"
knowledge_claim:
  base: "through d4; no d5/restart/d6/boundary reachable in complete scan"
  meta: "d4 required; full-knowledge allowance unused by returned shortest solution"
```

## Layout

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.*....##
####.....###.#.....###.....
###########################
```

## Core Claim

三枚初始冰全部在 target 上，且没有额外 off-target ice。初始完成状态同时封锁 A/C 到右侧出口的通路；玩家侧命题是“已完成 target 是锁”，必须通过 d4 rebound 形成 target debt，再恢复最终目标覆盖。

修订后的 claim 明确降格：三段/base、两段/meta 的 target debt 是 returned shortest solution 展示的事实，不声称逐对象顺序或每个 target 的参与是所有胜解中的 per-object 必然性。

## Evidence

- Candidate packet: `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1.zh.md`
- Interface/static scan: `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_edges.zh.md`
- Base analysis: `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base.md`
- Meta analysis: `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta.md`
- Base required/latest scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base_required_latest.md`
- Meta required d4 scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta_required_d4.md`
- Interface goal B/D scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_goal_B.md`
- Interface goal C scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_goal_C.md`

## Review Gate

- Evidence review 2: `supports_with_caveats`, `proposal_ready_with_caveats`, `required_action: none`.
- Puzzle critic 2: `supports_with_noncore_caveats`, `proposal_ready_with_caveats`, `required_action: none`.

## Caveats To Preserve

- C->D 是 reentry reread / base 后缀复用，不是强角色反转。
- B 与 D 同格；self-pair 零步只作接口事实。
- A->C 可解，cost 20，是已披露的 internal non-target pair。
- 审美按 4 提交，不声明 5；meta 难度按 >=2 / borderline 3 提交，不声明稳 3。
