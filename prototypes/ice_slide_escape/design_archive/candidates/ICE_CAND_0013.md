# Candidate: ICE_CAND_0013

```yaml
candidate_id: ICE_CAND_0013
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round6_mirrored_d5_d3_d6_proposal_ready_with_caveats
status: proposal_ready_with_caveats
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - d5_pass_through
  - d6_destroy_group
  - destroy_moving_ice_d3
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - all_knowledge_endgame
archive_use:
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round6_mirrored_d5_d3_d6_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0013_v10_mirrored_stand_gated.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0013_v10_mirrored_required_with_d3.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0013_v10_mirrored_all_edge_starts.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 8]
player_goal: [12, 0]
win_condition: ice_slide_escape_explicit_goal
```

```text
.#.....####..
.GG.#..I...I.
.#.....####..
.............
.............
.............
.............
.............
.I...........
.............
```

## Core Logic

```text
最终版本是镜像后的短尾 d5 -> d3 -> d6 链。

B 在 [1,8] 竖向上推，d5 穿过 [1,2] 墙后停在 [1,1] target。
这个冰不是只被 win condition 消费；final d6 会把它当 stopper 使用。

C 在 [7,1] 必须向右推，移动中的 C 撞到 [11,1] 的 A 后以 d3 消失，
同时 A 保留。这个动作清出 lane，并保留最后要被推的 A。

A 在 [11,1] 最后向左推，d6 破坏 [4,1]，restart 后撞到 [1,1] 的
stopper，停在 [2,1] target。玩家此时在右侧，两步到 [12,0]。
```

## Design Claim

```yaml
player_insight: >
  玩家需要读出三段状态责任：先用竖向 d5 制造 [1,1] stopper；再用
  d3 的 moving-ice-dies / stationary-ice-survives 规则清掉 C 且保留 A；
  最后把 A 反向向左推，用 d6 破墙并消费 [1,1] stopper，停在 [2,1]。
causal_chain: >
  从 [0,8] 到 [1,9] 推 B 上，B 以 d5+restart+d1 停在 [1,1]。
  到 [6,1] 推 C 右，C 以 d3 消失，A 留在 [11,1]。到 [12,1] 推
  A 左，A 以 d6+restart 撞 [1,1] stopper 后停在 [2,1]。随后走到
  [12,0]。
why_not_execution: >
  Required-event 和全边缘起点扫描都没有发现缺 d5/d3/d6/restart 的胜路；
  d5 后和 d3 后的 SCC 都只有一个可胜不可逆延续。最终 d6 方向与早期
  v2/v5 相反，解决了长 tail，并让 d3 保留 A 成为后续资源。
falsification: >
  若存在不经 d5/d3/d6/restart 的胜路，或 C 可用边界/短停替代 d3 清线，
  或 [1,1] 只作为 target 覆盖而不参与 final stop，claim 失败。若人类
  认为仍只是“看到冰往最远推”，则应降级为 held。
```

## Mechanism Scope

```yaml
central:
  - B up d5 creates the [1,1] stopper / target state.
  - C right d3 clears [7,1] while preserving A at [11,1].
  - A left d6 destroys [4,1], restarts, and uses [1,1] as stopper to fill [2,1].
  - slide_restart_after_group for both d5 and d6 landings.
support:
  - ice_stop_short:d1 and ice_stop_short:d2 determine exact landings.
  - ice_blocks_ice_no_chain_push marks the stopper interaction.
  - explicit edge goal [12,0].
incidental:
  - walking route between commitments
wording_constraints:
  - Do not claim instance-level object tracking; evidence is coordinate snapshots plus events.
  - Do not claim a unique first commitment; initial SCC has two win-reaching exits.
  - Do not claim all wins use len1; len1 is returned-solution evidence.
```

## Evidence Readings

```text
graph_fact -> complete graph has 2809 reachable states, 9672 legal transitions,
and exactly 1 winning state.
neutral_meaning -> the solve instance was fully enumerated within budget and
has one completion state.
player_facing_interpretation -> the candidate is not relying on a sampled trace
with an undiscovered alternate endpoint.
verdict_effect -> supports bypass exclusion, not a standalone quality verdict.
```

```text
graph_fact -> required-event probes found no win missing d5, d6, restart, or d3;
the selected-start probe explored 5281 augmented states completely.
neutral_meaning -> all checked winning paths include the declared event families.
player_facing_interpretation -> d3 clear, d5 stopper creation, and final d6 are
stable responsibilities rather than optional decoration.
verdict_effect -> supports central scope.
```

```text
graph_fact -> after the d5 SCC, winOut=1 and deadOut=3; after the d3 SCC,
winOut=1 and deadOut=3.
neutral_meaning -> once each setup state is reached, only one irreversible
continuation remains win-viable.
player_facing_interpretation -> the middle and final handoffs are not loose
independent mini-puzzles.
verdict_effect -> resolves the v2/v5 checklist attack enough for submission.
```

```text
graph_fact -> endgame tail is 2 after first entering a winning region.
neutral_meaning -> final d6 is followed by only a short walk to the explicit goal.
player_facing_interpretation -> the core resolution is not diluted by a long
post-solution route.
verdict_effect -> resolves the prior tail9/tail11 blocking criticism.
```

```text
graph_fact -> initial SCC has out=4, winOut=2, deadOut=2, forcedWinPrefix=0/3.
neutral_meaning -> the first winning commitment is not unique from the initial
reversible region.
player_facing_interpretation -> the opening has some freedom / wrong attempts,
but the designer must not claim a strict forced first move.
verdict_effect -> caveat.
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0013_v1_false_filled_target
  design_critic:
    verdict: revise_required
    required_action: structural_revision
  loop_result: open
designer_action_1:
  action: replace with cross-axis d5 product consumed by horizontal d6
review_2:
  target: ICE_CAND_0013_v2_cross_axis
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: revise_required
    required_action: claim_revision_or_coordinate_counterevidence
  design_critic:
    verdict: revise_required
    required_action: structural_revision
  loop_result: open
designer_action_2:
  action: move main row upward and gate C so d3 becomes required
review_3:
  target: ICE_CAND_0013_v4_d3_gated
  evidence_reviewer:
    verdict: supports_with_caveats
    required_action: none
  design_critic:
    verdict: revise_required
    required_action: structural_revision
  loop_result: open
designer_action_3:
  action: selected-start refinement to [12,8]
review_4:
  target: ICE_CAND_0013_v5_start12_8
  evidence_reviewer:
    verdict: supports_with_caveats
    required_action: none
  design_critic:
    verdict: revise_required
    required_action: structural_revision
  loop_result: open
designer_action_4:
  action: mirror final push and gate C stand positions to remove bypasses
review_5:
  target: ICE_CAND_0013_v10_mirrored_stand_gated
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
  design_critic:
    verdict: proposal_ready_with_caveats
    required_action: none
  loop_result: closed_as_proposal_ready_with_caveats
```

## Archive Taste Context Used

Only human-commented candidates were used for taste calibration.

```yaml
used:
  - candidate_id: ICE_CAND_0002
    human_signal: rejected; "看到啥推啥" and reachable d5 were fatal.
  - candidate_id: ICE_CAND_0004
    human_signal: rejected repeated d4 stacking and same start/goal.
  - candidate_id: ICE_CAND_0006
    human_signal: proposal_ready_with_caveats; order reasoning worked but was not final capstone.
  - candidate_id: ICE_CAND_0011
    human_signal: held for redundancy, removable opener, multi-solve disclosure, and archive-family risk.
  - candidate_id: ICE_CAND_0012
    human_signal: accepted but flawed; strong reuse, but natural far-push weakness.
```

No archive layout, geometry, causal chain, route, object placement, or
entrance/exit relation was intentionally reused.

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0013_v10_mirrored_stand_gated.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0013_v10_mirrored_stand_gated.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0013_v10_mirrored_required_with_d3.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0013_v10_mirrored_required_with_d3.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0013_v10_mirrored_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0013_v10_mirrored_all_edge_starts.json
```

## Retrieval Summary

```text
Human-pending proposal-ready-with-caveats all-knowledge candidate. The final
version is a mirrored short-tail d5 -> d3 -> d6 chain: B d5 creates [1,1]
stopper, C d3 clears while preserving A, and A left d6 consumes the stopper to
cover [2,1]. Evidence is strong for event necessity and no edge-start bypass.
Human review should focus on whether the remaining natural-far-push feel keeps
it below true endgame difficulty.
```
