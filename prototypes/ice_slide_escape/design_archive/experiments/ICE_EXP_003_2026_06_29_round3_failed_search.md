# Experiment Run: ICE_EXP_003 round3 failed search

```yaml
run_id: ICE_EXP_003_2026_06_29_round3_failed_search
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
terminal_state: failed_search
review_integrity: independent_review
proposal_ready_candidates: []
proposal_ready_with_caveats_candidates: []
held_candidates: []
rejected_candidates:
  - ICE_CAND_0008
  - ICE_CAND_0009
  - ICE_CAND_0010
failed_search_families:
  - reverse_d6_d5_d4_stopper_cascade
  - d5_temporary_group_extender_with_d3_route_gate
  - group_assembly_final_d6
  - miner_event_rich_but_non_capstone_material
written_candidate_records:
  - prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0008.md
  - prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0009.md
  - prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0010.md
written_reports:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0008_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0008_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0008_order_gates.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0009_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0009_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0009_order_gates.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0010_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0010_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0010_order_gates.md
```

## Archive Taste Context

Only candidate records with human comments were used for taste calibration.

```yaml
selected_examples:
  - candidate_id: ICE_CAND_0002
    calibration_use: >
      Human rejected visible push-what-you-see play even when local dead paths
      existed. Used to reject evidence-only claims where probes show dead
      prefixes but player insight may still be obvious execution.
  - candidate_id: ICE_CAND_0004
    calibration_use: >
      Human agreed that repeated clean required events and target coverage do
      not make a capstone. Used to avoid promoting mechanism count or repeated
      target covers.
  - candidate_id: ICE_CAND_0006
    calibration_use: >
      Human found the d4/d5/d6 stopper cascade solid but below final capstone
      because of route overhead and only moderate difficulty. Used as a high
      bar: new candidates had to exceed, not copy, this role.
```

No layout, geometry, causal chain, route, object placement, or entrance/exit
relation from these archive examples was intentionally reused. When independent
critic found 0008/0009/0010 too close to 0006-family, each was rejected rather
than defended as proposal material.

## Candidate Summary

```yaml
ICE_CAND_0008:
  status: rejected_candidate
  layout: |
    ##############
    ##############
    .I......##.G##
    @.....I..G.G##
    #####.########
    #####.#####.##
    #####.#####.##
    #####.#####.##
    #####.#####.##
    #####.#####.##
    #####.#####I##
    #####.........
  player_start: [0, 3]
  player_goal: [13, 11]
  design_claim: d6 creates d5 stopper; d5 creates d4 obstacle; reverse d6->d5->d4 stopper chain.
  critic_result: rejected as unauthorized ICE_CAND_0006-family sidegrade and route-tail candidate.

ICE_CAND_0009:
  status: rejected_candidate
  layout: |
    ###############
    #.#############
    #G#########G###
    #.##########...
    #..I.....##.###
    #I..###########
    @.#.###########
    #.#.#######.###
    #...I...###.###
    ####.######.###
    ####.######.###
    ####.######.###
    ####.######.###
    ####.######I###
    ####........###
  player_start: [0, 6]
  player_goal: [14, 3]
  design_claim: d5 creates a temporary d6 group extender; d3 route gate; final d6 opens upper exit.
  critic_result: rejected; only one strong d5->d6 interlock, d4/d3 underfit, still close to 0006 family.

ICE_CAND_0010:
  status: rejected_candidate
  layout: |
    ###............
    ###I.#########.
    ###..#########.
    ###..#########.
    ###..#########.
    ###.I##.######.
    ###..##.######.
    ####.##.######.
    #G#..##I.....I@
    ...#...........
    ...####........
    ##############.
    ##############.
    ##############.
    ##############.
  player_start: [14, 8]
  player_goal: [0, 9]
  design_claim: d3/d4/d5 all assemble or transform final d6 group; missing any setup makes final push dead.
  critic_result: rejected; evidence strong but still setup-collection plus final-d6, long route, many edge starts.
```

## Diagnostic Routing

```yaml
hard_evidence:
  status: complete_for_serious_candidates
  refs:
    - layout_analysis_ICE_CAND_0008_base
    - layout_analysis_ICE_CAND_0009_base
    - layout_analysis_ICE_CAND_0010_base
mechanism_scope:
  status: complete
claim_hygiene:
  status: enforced_by_review
  notes: >
    Evidence-level claims were accepted by evidence reviewers, but critic
    required_action prevented proposal promotion.
scc_graph:
  status: triggered_for_all_serious_candidates
  rule: graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect
variant_family:
  status: triggered_full
  reason: archive taste context included ICE_CAND_0006 with human comment
start_position:
  status: triggered
  result: 0008 and 0010 had weak/many equivalent starts; 0009 had stronger start but weaker role.
prototype_specific_meta:
  status: skipped_no_proposal_base
  reason: no candidate passed critic as a promising base for meta redesign.
```

## SCC Readings

ICE_CAND_0008:

```text
graph_fact -> one_win_continuation_per_scc, forcedWinPrefix=3/3.
neutral_meaning -> topology metadata for the checked winning route.
player_facing_interpretation -> the order gate is real, but the candidate is too close to the 0006-family route structure.
verdict_effect -> lineage caveat; with the edge-goal tail it becomes rejection.
```

ICE_CAND_0009:

```text
graph_fact -> branching_win_dag, forcedWinPrefix=0/4.
neutral_meaning -> there is setup-order freedom and non-single-chain topology.
player_facing_interpretation -> the freedom mostly concerns d3/d5 preparation, not multiple meaningful plans.
verdict_effect -> evidence merit, but role-fit remains rejected.
```

ICE_CAND_0010:

```text
graph_fact -> branching_win_dag, forcedWinPrefix=0/4, initial winOut=3, 26 edge starts pass.
neutral_meaning -> multiple win-reaching continuations and many equivalent entry interfaces exist.
player_facing_interpretation -> the internal group assembly is real, but the branching/start data can read as setup/entry noise.
verdict_effect -> evidence merit, but critic treats route overhead and entry noise as core failure.
```

## Review Loop State

```yaml
review_1:
  candidate: ICE_CAND_0008
  evidence_reviewer_required_action: none
  critic_required_action: reject_or_change_family
  terminal: rejected_candidate
review_2:
  candidate: ICE_CAND_0009
  evidence_reviewer_required_action: none
  critic_required_action: reject_or_change_family
  terminal: rejected_candidate
review_3:
  candidate: ICE_CAND_0010
  evidence_reviewer_required_action: none
  critic_required_action: reject_or_change_family
  terminal: rejected_candidate
```

No `designer_action_N` closed any review loop. No evidence disagreement was used
as final answer to the critic. The final terminal state is `failed_search`
because every serious candidate with hard evidence received a non-none critic
required_action.

## Exploration Log

Representative families:

```yaml
families:
  - family: miner_event_rich_material
    attempts: many
    result: failed_search_material
    failure_distribution:
      event_witness_without_later_consumption: common
      d5_row_probe_or_boundary_trophy: common
      branching_without_capstone_role: observed
  - family: reverse_d6_d5_d4_stopper_cascade
    candidate: ICE_CAND_0008
    result: rejected_candidate
    failure_distribution:
      0006_family_lineage: high
      route_family_sidegrade: high
      edge_goal_tail: high
  - family: d5_temporary_group_extender
    candidate: ICE_CAND_0009
    result: rejected_candidate
    failure_distribution:
      only_one_strong_interlock: high
      d3_route_gate: high
      d4_target_gate: high
  - family: group_assembly_final_d6
    candidate: ICE_CAND_0010
    result: rejected_candidate
    failure_distribution:
      strong_mechanism_evidence: high
      route_overhead: high
      equivalent_edge_starts: high
      setup_collection_feel: high
```

## Terminal State

```yaml
terminal_state: failed_search
proposal_count: 0
none_reason: >
  The run produced three serious, evidence-supported candidates, but each
  received independent critic required_action=reject_or_change_family. Under
  the review-loop rules, none may be promoted to proposal_ready or
  proposal_ready_with_caveats.
human_priority_if_reviewing_failures:
  - ICE_CAND_0010
  - ICE_CAND_0009
  - ICE_CAND_0008
```
