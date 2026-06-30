# Candidate: ICE_CAND_0015

```yaml
candidate_id: ICE_CAND_0015
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round8_target_eject_gated_pocket
status: structural_redesign_needed
llm_candidate_strength: held_proposal
human_final_status: structural_redesign_needed
archive_eligibility: human_pending
review_integrity: human_review
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - destroy_moving_ice_d3
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - all_knowledge_endgame
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
  - human_taste_reference
strengths:
  - coupled_state_change
  - compact_causal_chain
failure_modes:
  - forced_linearity
  - claim_underfit
human_comment_ids:
  - HC_ICE_CAND_0015_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round8_target_eject_gated_pocket.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0015_v2_target_eject_gated_pocket.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0015_v2_target_eject_gated_pocket.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_precise_required_probe.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_all_edge_starts.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 1]
player_goal: [14, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
###############
..*G.#..I...I..
###..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
#......########
###############
```

## Core Logic

```text
本候选回应人类关于“不要只堆 B->C->D 前置 stopper 链”的批评，改为紧凑的
角色转换链。

第一块冰初始已经在 [2,1] target 上，但这不是最终状态；它挡住进入结构的口，
且若不把它推出去，后续 B 无法补位。玩家必须先把这个看似正确的 target ice
向右推出到 [4,1]。推出后它不再是目标填充，而成为 final d6 的 obstacle group
一部分。

B 从 [2,8] 上推，d5 穿过 [2,2] 后落回 [2,1]，同时补目标和制造 final stopper。
C 从 [8,1] 右推，以 d3 消失并保留 A，同时打开通往 A 右侧口袋的唯一路线。
最后 A 从 [12,1] 左推，d6 销毁 [5,1] wall + [4,1] 被推出的旧 target ice，
restart 后用 [2,1] 的 B 停在 [3,1]，完成两个 target。
```

## Design Claim

```yaml
player_insight: >
  玩家需要意识到“已经正确的 target ice 现在太早了”：它必须先离开目标，
  转化成 final d6 的可销毁组成员；随后另一块冰补回该目标并成为 stopper。
  C 的 d3 不是单纯清障，而是保留 A 并解锁 A 右侧站位。
causal_chain: >
  target ice [2,1] -> pushed right to [4,1] as future destructible group;
  B up -> [2,1] as target refill and final stopper; C right d3 -> clear C,
  preserve A, open right pocket; A left d6 len2 -> destroy wall+ejected ice,
  consume B stopper, land on [3,1].
why_not_execution_only: >
  Complete graph has one winning state. Precise required-event probe fully
  searched the declared start and found no winning path missing d2, d5:len1,
  restart, d3, or d6:len2. SCC evidence makes the first target-eject commitment
  forced and the C/final handoffs forced once reached.
falsification: >
  If a win exists without ejecting the initial target ice, without C d3, or
  without final d6 len2 consuming the ejected ice group, the claim fails. If
  human review values only longer chains, this should remain held rather than
  proposal-ready.
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0015_001
    author: human_designer
    text: >
      这里的“先破坏正确 target 状态，再把它变成最终销毁材料”的洞见实际上
      是不存在的，因为玩家根本不需要知道“这里有一个已经在目标位置的冰块，
      我一直忽略了它的作用，结果竟然需要我思维反转先把它推走”，而是只需要
      从起点走唯一通路就能自然触发。上方中间冰块看起来是一个简单的开门步骤，
      虽然能够作为右上冰块左推的思维轻度干扰项，但是还是过于刻意。这关本身
      的逻辑链扎实成立，运用了多种机制，但是因为上述问题，仍然只是一般性的
      开锁、线性结构，缺乏洞见、实际有效的误导。需要大改结构才有可能被接受
      为高难关候选。
status: structural_redesign_needed
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0015_v2_target_eject_gated_pocket
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: keep_endpoint_pair_caveat
    summary: >
      Evidence supports the stated start/goal claim. The layout analysis is
      complete with 3072 reachable states and 1 winning state. The precise
      required-event probe is complete and found no win missing the declared
      event families. The all-edge scan finds only [0,1] and [14,1] as
      standable edge starts; the [14,1]->[14,1] endpoint pair is a shorter
      non-target solve and must be disclosed as interface caveat.
  design_critic:
    verdict: held_proposal
    review_loop_state: held_proposal
    required_action: expand_or_accept_as_compact_reference
    summary: >
      The target-eject role flip is materially better than a pure stopper
      cascade: the first ice is correct-looking, then becomes a destructible
      group member, while B replaces it as target/stopper and C unlocks the
      A pocket by d3. The blocking caveat is scale: this is still a 4-push
      compact puzzle, and the first commitment is forced by corridor shape.
      It should be held as a strong direction/reference, not claimed as the
      requested no-ceiling high-difficulty capstone.
  loop_result: held_proposal
human_review_1:
  reviewer: human_designer
  verdict: structural_redesign_needed
  review_loop_state: structural_redesign_needed
  required_action: major_structural_redesign
  summary: >
    The machine-supported causal chain exists, but the claimed player-facing
    target-eject insight does not. Because the start corridor forces the first
    push, the player naturally triggers the target ejection without needing to
    notice or reinterpret the initial target ice. The upper-middle ice reads as
    a simple key/door step and only lightly distracts from the final right-side
    push. The result is a valid multi-mechanic linear unlocking structure, not
    an effective high-difficulty insight puzzle.
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0015_v2_target_eject_gated_pocket.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0015_v2_target_eject_gated_pocket.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0015_v2_target_eject_gated_pocket.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_precise_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_precise_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_all_edge_starts.json
```

## Retrieval Summary

```text
Human-reviewed structural-redesign-needed example after the "logic-chain
quality, not mere length" redirect. Machine evidence is strong for the declared
[0,1]->[14,1] instance and the four-step causal chain, but human review rejects
the central design claim: the alleged target-eject role flip is not actually
experienced as player insight because the unique corridor naturally triggers
it. The upper-middle ice reads as a simple key/door step, and the whole puzzle
remains a general linear unlocking structure with weak effective misdirection.
```
