# Experiment: ICE_EXP_META_2026_07_01_round13_d5_len2_shared_wall

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round13_d5_len2_shared_wall_proposal_ready_with_caveats
prototype: ice_slide_escape
terminal_state: proposal_ready_with_caveats
candidate_id: ICE_CAND_0030
review_integrity: independent_review
archive_eligibility: human_pending
human_final_status: pending
required_action: none
```

## Goal

继续尝试更高档 meta 关：base 应接近中后期应用 / 挑战，meta 应接近更后期
回访挑战；两条流程必须分开评价，不能用 base-meta 跨时间复用倒灌提高各自难度。
本轮特别重视同一空间、target、ice 的不同职责复用，同时避免 0020 / 0022 型
功能性水关成为接受下界。

## Archive Taste Context

只使用带人类评语或人类修正的 archive candidate 做 taste calibration：

```yaml
used:
  ICE_CAND_0020:
    lesson: "可作为功能性 meta 拼图，但 base/meta 若各自只是 witness，不得拔高。"
  ICE_CAND_0022:
    lesson: "扎实 meta 有生态位，但不是本轮高档目标的接受下界。"
  ICE_CAND_0024:
    lesson: "强 meta 的核心是共享空间 / 要素复用、base-time 遮蔽、回访时的状态不兼容诱惑。"
  ICE_CAND_0029:
    lesson: "不得因为比低档功能关更强就接受；base 泄漏、meta 过短、几何交融不足应打回。"
not_reused:
  - layout
  - geometry
  - causal_chain
  - routes
  - object_placement
  - entrance_exit_relation
```

## Proposal: ICE_CAND_0030

```text
#################
.......########..
#.*...I.#..G.#..#
#....#G##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

Interfaces:

```yaml
A: [0, 7]
B: [0, 1]
C: [16, 7]
D: [16, 1]
base_instance: A -> B
meta_instance: C -> D
```

## Design Claim

```yaml
terminal_claim: >
  proposal_ready_with_caveats. This is a compact high-reuse meta proposal:
  base and meta are both four-push chains with complete graph evidence and
  required-event probes, and they reuse the same middle target network with
  different ice / target roles. It is not a top-tier d6 meta capstone.
player_insight: >
  Base first reads the middle as a left-to-right d5(len1)+d4 rebound route.
  Meta revisits the same middle targets from the right, first turning [11,2]
  into a stopper resource, then using d5(len2), d4, and ice-block stopping to
  refill a different target debt.
why_not_execution: >
  The solution is not just step execution because [6,3] and [11,2] change
  roles across visits: [6,3] is prefilled locally in base but remotely filled
  from the right in meta; [11,2] is a base landing target but a meta stopper.
  However each individual flow remains a compact four-push chain, so the claim
  must not inflate it into a large endgame capstone.
falsification:
  - "Reject if human review judges d5(len2) meta too close to the base d5+d4 family."
  - "Reject or hold if base/meta compactness reads as a four-push exercise rather than challenge."
  - "Downgrade if the high initial deadOut branches feel like trial-and-error rather than readable wrong turns."
  - "Do not claim d6; the final proposal intentionally no longer contains ice_destroy_group_d6_plus."
```

## Causal Chain

Base A -> B:

```yaml
core:
  - "[6,2] down -> [6,3], filling the central-left target."
  - "[2,2]* right -> d5(len1) through the middle wall, restart, d4 rebound to [11,2]."
  - "[2,5]* up -> d4 rebound refills [2,2]."
  - "[4,5] left -> refills [2,5] in the returned shortest solution."
caveat:
  - "The final refill method is not globally forced; a 44-cost winning path can replace the returned d2 refill with an ice-block / d1 variant."
forced_core:
  - ice_pass_through_d5
  - ice_rebound_d4
```

Meta C -> D:

```yaml
core:
  - "[11,3]* up -> [11,2], creating both target progress and a later stopper."
  - "[14,3]* left -> d5(len2) through the same middle wall group, stop at [6,3]."
  - "[14,6] up -> d4 rebound refills [14,3]."
  - "[11,5] up -> blocked by ice at [11,2], stops at [11,3]."
forced_core:
  - ice_pass_through_d5:len2
  - ice_rebound_d4
  - ice_blocks_ice_no_chain_push
```

## Mechanism Scope

```yaml
central:
  - "[6,3]: base local prefill target; meta remote d5(len2) landing target."
  - "[11,2]: base d5+d4 landing target; meta stopper for [11,5] -> [11,3]."
  - "[11,3]: meta source target becomes a later debt filled by a different ice."
  - "middle wall / restart line is read from opposite sides with different distances."
support:
  - "A/B and C/D are physically and target-state separated by the shared middle."
  - "Right side compaction makes the meta graph complete while preserving four pushes."
  - "Explicit edge goals make left and right visits separate solve instances."
incidental:
  - "Base returned final d2 refill is not unique."
  - "SCC branching indicates win-reaching alternatives; quality must be read from event necessity and role reuse, not from forced linearity."
  - "The earlier d6 version remains a structural seed but not this proposal."
```

## Evidence

Base report refs:

```yaml
layout_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_base.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_base.json
required_events:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_base_required_core.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_base_required_core.json
solver:
  found: true
  cost: 42
  pushes: 4
graph:
  status: complete
  reachable_states: 262265
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 4
  forcedWinPrefix: "0/4"
required_event_probe:
  required: [ice_pass_through_d5, ice_rebound_d4]
  missing_required_win_path: none
  search: complete
  explored: 377390
```

Meta report refs:

```yaml
layout_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_meta.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_meta.json
required_events:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_meta_required_core.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_meta_required_core.json
solver:
  found: true
  cost: 38
  pushes: 4
graph:
  status: complete
  reachable_states: 137520
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 3
  forcedWinPrefix: "0/3"
required_event_probe:
  required: [ice_pass_through_d5:len2, ice_rebound_d4, ice_blocks_ice_no_chain_push]
  missing_required_win_path: none
  search: complete
  explored: 182204
```

Routing result:

```yaml
method: "per-start complete reachable graph; collect edge cells where all targets are occupied"
A_start_[0,7]:
  status: complete
  states: 262265
  selected_hits: [[0,1], [0,7]]
  non_selected_hits: []
  AB_to_CD_bad: []
B_start_[0,1]:
  status: complete
  states: 262265
  selected_hits: [[0,1], [0,7]]
  non_selected_hits: []
  AB_to_CD_bad: []
C_start_[16,7]:
  status: complete
  states: 137520
  selected_hits: [[16,1], [16,7]]
  non_selected_hits: []
D_start_[16,1]:
  status: complete
  states: 137520
  selected_hits: [[16,1], [16,7]]
  non_selected_hits: []
verdict: "passes hard routing gate; no ABCD -> non-ABCD edge win, no A/B -> C/D win"
```

Graph readings:

```yaml
base_scc:
  graph_fact: "complete graph; winSubgraphShape=branching_win_dag, irreversible steps=4, forcedWinPrefix=0/4"
  neutral_meaning: "there are win-reaching branches and merges; the returned irreversible path is not a forced linear script"
  player_facing_interpretation: "the base puzzle should be sold as a d5+d4 role read, not as a unique forced execution sequence"
  verdict_effect: "supports proposal with caveat; blocks claims of forced-linearity or single-solution elegance"
meta_scc:
  graph_fact: "complete graph; winSubgraphShape=branching_win_dag, irreversible steps=3, forcedWinPrefix=0/3"
  neutral_meaning: "meta has multiple win-reaching continuations even though required events are unavoidable"
  player_facing_interpretation: "the player may have several recoverable order/position choices, but still must use the d5(len2)+d4+block chain"
  verdict_effect: "supports compact challenge status; do not overclaim top-tier depth"
routing:
  graph_fact: "all four ABCD start graphs complete and only reach their own side's selected edge pair after target completion"
  neutral_meaning: "edge-goal routing is separated by target-state and geometry"
  player_facing_interpretation: "base visit and meta visit remain distinct map interfaces rather than leaking into arbitrary exits"
  verdict_effect: "passes the user-specified hard reachability gate"
```

## Exploration Log Summary

```yaml
v18:
  result: held_seed
  note: "base/meta both 4 pushes; meta solver found, but right-side graph / routing exhausted past 1.2M states."
v19:
  change: "sealed right row5 x12-x14"
  result: partial_improvement
  note: "meta solver explored states dropped, but C/D graph still exhausted."
v20:
  change: "compressed width to 16 and moved right source to x13"
  result: rejected
  note: "meta complete unsolved; vertical refill line conflicted with base rebound wall."
v21:
  change: "opened one vertical point for x13 refill"
  result: rejected
  note: "meta still complete unsolved because source column conflicted with base horizontal stopper semantics."
v22:
  change: "width 17, right source x14, right edge x16"
  result: proposal_ready_with_caveats
  note: "base/meta complete, routing complete, required probes pass; caveat is d5(len2) rather than d6."
```

## Review Loop

```yaml
review_1:
  reviewer: Lagrange
  review_integrity: independent_review
  recommendation: proposal_ready_with_caveats
  required_action: none
  major_attacks:
    - "Do not claim base/meta logic chains are completely different; they share a d5+d4/refill family resemblance."
    - "Meta has no d6, so later-game claim must be caveated as compact challenge, not d6-grade transformation."
    - "Base final d2 refill is not forced; only d5+d4 core is required."
    - "Graph size and branching are not quality proof."
    - "High initial deadOut may be readable wrong turns or trial-and-error; current evidence does not prove elegance."
    - "Still below ICE_CAND_0024-grade strong meta because it lacks d6 masking and state-incompatibility lure."
designer_action_1:
  action: "accepted caveats and downgraded claims in ledger / candidate record"
  closes_review_loop: false
  required_action_after_action: none
review_loop_state_after_review_1: proposal_ready_with_caveats
```

## Verdict

`ICE_CAND_0030` should be shown to the human designer as the priority proposal
from this round. It is a clean, compact, evidence-backed high-reuse meta candidate,
but its caveat is substantial: the successful compressed version is d5(len2), not d6.
