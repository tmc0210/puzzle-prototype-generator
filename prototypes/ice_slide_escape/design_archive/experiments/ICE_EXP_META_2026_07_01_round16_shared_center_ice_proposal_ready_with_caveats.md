# Experiment: ICE_EXP_META_2026_07_01_round16_shared_center_ice

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round16_shared_center_ice_proposal_ready_with_caveats
prototype: ice_slide_escape
terminal_state: proposal_ready_with_caveats
candidate_id: ICE_CAND_0032
review_integrity: independent_review
archive_eligibility: human_pending
human_final_status: pending
required_action: none
```

## Goal

Continue from the compact row4 d6 meta family and improve coupling. The human
request specifically attacked the remaining left/right split: only a few middle
targets and walls were shared, while much of the outside structure behaved like
simple locks. This run therefore prioritized stronger geometry / element reuse
over finding a wholly new family.

## Taste Context

Only human-comment-supported or human-corrected archive entries were used for
taste calibration:

```yaml
used:
  ICE_CAND_0020: "functional connector, not an acceptance floor"
  ICE_CAND_0022: "solid ecology case, still not the target lower bound"
  ICE_CAND_0024: "strong positive calibration for cross-visit lure and shared material"
  ICE_CAND_0029: "negative calibration against accepting weak compact meta"
not_reused:
  - layout
  - geometry
  - causal_chain
  - routes
  - object_placement
  - entrance_exit_relation
note: >
  ICE_CAND_0031 was used only as the current working seed explicitly continued
  in this conversation, not as archive taste calibration.
```

## Proposal: ICE_CAND_0032

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

Interfaces:

```yaml
A: [0, 7]
B: [0, 1]
C: [17, 7]
D: [17, 1]
base_instance: A -> B
meta_instance: C -> D
```

## Design Claim

```yaml
terminal_claim: >
  proposal_ready_with_caveats. v37 is a compact d6-first meta candidate with a
  real coupling upgrade over ICE_CAND_0031: the same middle ice at [5,4] is an
  active base fill piece and a meta no-chain stopper, while [6,4] is filled by
  different ice in the two visits.
player_insight: >
  Base reads the center as a d5+d4 application plus a local middle-ice target
  fill. Meta rereads that middle ice as the remote stopping object for a d6
  projectile, then uses a right-side staged ice and stopper relation to close
  the remaining target debt.
why_not_execution: >
  It is not just execution because the required probes show different core
  mechanisms in the two solve instances, and the cross-visit payoff is a real
  role flip of the same [5,4] ice. It is still compact and should not be claimed
  as high-end large-area spatial interweaving.
falsification:
  - "Downgrade if human review judges the left/right split still too strong."
  - "Downgrade if the [5,4] role flip reads as a small patch rather than a meaningful revisit payoff."
  - "Do not claim large shared activity space or top-tier endgame difficulty."
```

## Causal Chain

Base A -> B:

```yaml
claim_scope: "compact middle-late d5+d4 application"
returned_solution:
  - "[2,2]* right -> d5(len1) through the middle wall, restart, then d4 rebound to [11,2]."
  - "[2,5]* up -> d4 rebound refills [2,2]."
  - "[5,4] right -> [6,4], using the shared middle ice as a base target fill."
  - "[4,5] left -> [2,5], completing the left target debt before exiting at B."
required_core:
  - ice_pass_through_d5
  - ice_rebound_d4
caveat: "4 pushes, compact application; not a high-difficulty base challenge."
```

Meta C -> D:

```yaml
claim_scope: "compact d6+no-chain stopper meta application"
returned_solution:
  - "[15,4] left -> d6(len2) destroys row4 wall group, restarts, and is stopped by [5,4], filling [6,4]."
  - "[13,5] left -> [11,5], staging the later filler."
  - "[11,3]* up -> [11,2], filling the top target and creating a stopper."
  - "[11,5] up -> blocked by [11,2], stopping at [11,3]."
required_core:
  - ice_destroy_group_d6_plus
  - ice_blocks_ice_no_chain_push
caveat: "stable later-mechanic application; main insight is concentrated in the first d6/no-chain read."
```

## Mechanism Scope

```yaml
central:
  - "[5,4]: base active fill piece; meta remote no-chain stopper."
  - "[6,4]: base filled locally by [5,4]; meta filled remotely by [15,4] after d6 destruction."
  - "[11,2]: base d5+d4 landing target; meta landing target and final vertical stopper."
  - "[11,3]/[11,5]: meta source debt and staged refill relation."
support:
  - "row4 d6 gives meta a genuinely different first read"
  - "closing [6,3] removes branchy free space while preserving the shared-ice payoff"
  - "explicit A/B/C/D edge goals keep base and meta interfaces isolated"
incidental:
  - "remaining side corridors and locks are mostly routing support"
  - "graph/SCC facts support evidence completeness, not taste by themselves"
```

## Evidence

Base:

```yaml
layout_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_base.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_base.json
required_events:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_base_required_core.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_base_required_core.json
solver:
  found: true
  cost: 32
  pushes: 4
graph:
  status: complete
  reachable_states: 214594
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 4
  forcedWinPrefix: "0/4"
required_event_probe:
  required: [ice_pass_through_d5, ice_rebound_d4]
  missing_required_win_path: none
  search: complete
  explored: 301035
```

Meta:

```yaml
layout_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_meta.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_meta.json
required_events:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_meta_required_core.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_meta_required_core.json
solver:
  found: true
  cost: 36
  pushes: 4
graph:
  status: complete
  reachable_states: 15515
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 4
  forcedWinPrefix: "0/4"
required_event_probe:
  required: [ice_destroy_group_d6_plus, ice_blocks_ice_no_chain_push]
  missing_required_win_path: none
  search: complete
  explored: 17069
```

Routing:

```yaml
report:
  md: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_01_round16_v37_ABCD.md
  json: prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_01_round16_v37_ABCD.json
method: "per-start complete reachable graph; collect edge cells where all targets are occupied"
A_start_[0,7]:
  status: complete
  states: 214594
  selected_hits: [[0,1], [0,7]]
  non_selected_hits: []
  AB_to_CD_bad: []
B_start_[0,1]:
  status: complete
  states: 214594
  selected_hits: [[0,1], [0,7]]
  non_selected_hits: []
  AB_to_CD_bad: []
C_start_[17,7]:
  status: complete
  states: 15515
  selected_hits: [[17,1], [17,7]]
  non_selected_hits: []
D_start_[17,1]:
  status: complete
  states: 15515
  selected_hits: [[17,1], [17,7]]
  non_selected_hits: []
verdict: "passes hard routing gate; no ABCD -> non-ABCD edge win, no A/B -> C/D win"
```

## Graph Readings

```yaml
base_scc:
  graph_fact: "base graph complete, reachable_states=214594, winning_states=1, winSubgraphShape=branching_win_dag"
  neutral_meaning: "the full state space was enumerated; there is one winning state, with some win-reaching branching before it"
  player_facing_interpretation: "base has a stable compact application read, but not a forced-linear or high-difficulty challenge structure"
  verdict_effect: "supports proposal with caveat"
meta_scc:
  graph_fact: "meta graph complete, reachable_states=15515, winning_states=1, winSubgraphShape=branching_win_dag"
  neutral_meaning: "the meta instance is complete and stable, but its state space and chain are small"
  player_facing_interpretation: "the revisit route is clean and readable, with limited complexity ceiling"
  verdict_effect: "supports proposal_ready_with_caveats, blocks overclaiming meta depth"
required_events:
  graph_fact: "complete probes found no winning path missing base d5/d4 or meta d6/no-chain"
  neutral_meaning: "the two solve instances depend on different event families"
  player_facing_interpretation: "players read different logic chains on the two visits"
  verdict_effect: "supports meaningful meta reinterpretation"
routing:
  graph_fact: "all four ABCD start graphs complete and only reach their own side's selected edge pair after target completion"
  neutral_meaning: "edge-goal routing is separated"
  player_facing_interpretation: "no unintended edge exit or A/B -> C/D leakage should steal the intended interface read"
  verdict_effect: "passes the user-specified hard routing gate"
```

## Exploration Log Summary

```yaml
v34:
  change: "removed [6,2], opened [4,4], and made [5,4] an ice shared by base/meta"
  result: "base/meta solved and graph-complete at high budget; base graph grew to 1483191 states"
  lesson: "aesthetic idea is strong, but uncontrolled upper-center access creates too much branching"
v35:
  change: "opened lower central passage to let meta enter more shared space"
  result: "base solved but meta/search graph exploded at 500001 states"
  lesson: "more physical connectivity alone makes the layout noisier rather than better"
v37:
  change: "close [6,3] while preserving [5,4] shared ice role flip"
  result: "base graph complete at 214594 states, meta graph complete at 15515 states, required probes and routing pass"
  lesson: "controlled key-element reuse is currently stronger than opening large shared corridors in this family"
```

## Review Loop

```yaml
review_1:
  reviewer: Beauvoir
  review_integrity: independent_review
  recommendation: proposal_ready_with_caveats
  required_action: none
  major_attacks:
    - "still has left/right split residue"
    - "base/meta must be evaluated separately and neither is high-difficulty"
    - "reuse upgrade is key-element reuse, not global structure reread"
  positive_findings:
    - "[5,4] is a real cross-visit role flip: base active fill piece, meta remote no-chain stopper"
    - "[6,4] is filled by different ice in the two visits"
    - "base and meta required events prove different logic chains"
designer_action_1:
  closes_review_loop: false
  action: "not needed because review_1 required_action is none; archive wording keeps critic caveats"
```

## Verdict

`ICE_CAND_0032` should be shown before `ICE_CAND_0031` if the human wants the
strongest variant in this family. It is still compact and not the hoped-for
large shared-space meta capstone, but it materially improves the earlier
candidate by making the same middle ice a base object and a meta stopper.
