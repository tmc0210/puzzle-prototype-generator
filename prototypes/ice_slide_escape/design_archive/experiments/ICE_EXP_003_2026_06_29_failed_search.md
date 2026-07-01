# Experiment Run: ICE_EXP_003 2026-06-29 failed search

```yaml
run_id: ICE_EXP_003_2026_06_29_failed_search
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
terminal_state: failed_search
proposal_ready_candidates: []
held_candidates:
  - ICE_CAND_0005
review_integrity: independent_review
archive_pass_executor: llm_controller
```

## Brief

Run `ICE_EXP_003_all_knowledge_endgame_capstone` once as lead designer /
controller. The goal was to test whether all confirmed `ice_slide_escape`
knowledge can produce a final-or-near-final all-knowledge capstone. No
mechanism was forbidden. Serious candidates had to name central/support/
incidental mechanisms, show later consumption of any central state change, run
diagnostic routing, and receive independent evidence reviewer and puzzle critic
review if possible.

## Archive Taste Context Used

```yaml
examples:
  - candidate_id: ICE_CAND_0002
    used_for:
      - human_taste_calibration
      - negative_failure_pattern
      - critic_calibration
    lesson: >
      Dead paths and local commitment probes do not prove thinking burden when
      players can push the visible route and win.
  - candidate_id: ICE_CAND_0004
    used_for:
      - human_taste_calibration
      - negative_failure_pattern
      - designer_claim_calibration
    lesson: >
      Clean graph evidence, repeated target covers, and event counts do not make
      a capstone when the actions are forced or isomorphic.
```

These examples were used only for taste and failure-mode calibration. Their
layout, geometry, causal chain, solution route, object placement, and
entrance/exit relation were not copied.

## Tool Work Summary

Commands and probes used:

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 96 --max-findings 16 --weight pass_through_d5=24 --weight restart_after_group=18 --weight destroy_group_d6_plus=24 --weight boundary_disappear=12 --weight rebound_d4=10 --weight destroy_moving_ice_d3=8 --weight short_stop_d1_d2=4 --graph-max-states 200000
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 96 --max-findings 16 --weight destroy_group_d6_plus=30 --weight restart_after_group=24 --weight pass_through_d5=16 --weight boundary_disappear=18 --weight rebound_d4=10 --weight destroy_moving_ice_d3=8 --weight short_stop_d1_d2=4 --graph-max-states 200000
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 512 --max-findings 40 --weight destroy_group_d6_plus=32 --weight restart_after_group=24 --weight pass_through_d5=24 --weight boundary_disappear=16 --weight rebound_d4=12 --weight destroy_moving_ice_d3=10 --weight short_stop_d1_d2=6 --graph-max-states 200000
npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id ICE_CAND_0005_base --player-start "0,2" --player-goal "9,0" --write
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id ICE_CAND_0005_start_refine --player-goal "9,0" --required-winning-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_blocks_ice_no_chain_push,ice_stop_short --max-states 200000 --graph-max-states 200000 --write
runtime prefix probe for ICE_CAND_0005 first input right
meta reinterpretation probes for ICE_CAND_0005 top/bottom edge pairs
scratch explain-layout / compare-starts-layout checks for MF0058-derived and route-blocker variants
```

The 512-iteration miner command timed out before producing usable output. It is
recorded as exploration pressure only, not evidence for or against a candidate.

## Candidate Outcomes

### ICE_CAND_0005

```yaml
status: held_proposal
review_loop_state: held_proposal
required_action: structural_redesign_needed_for_capstone
candidate_record: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0005.md
```

Why it entered review:

```text
It had the clearest consumed-state chain found this run: d5 setup places ice on
[12,2], and that ice is later consumed as the obstacle for the d6 restart push.
The same d6 push destroys the wall group that opens the explicit edge goal
route. Complete graph and required-event probes supported the event-level
mechanism claim.
```

Why it did not become proposal_ready:

```text
Independent critic attacked final-game role fit. The solved instance has only
two pushes and 53 walks, and start refinement found equivalent left-edge starts
with the same causal chain.
The designer accepted these core attacks and held the candidate rather than
submitting it as a final-game proposal.
```

## Exploration Log

```yaml
attempts:
  - attempt_id: E3_A01
    family: mined_d5_d6_boundary_examples
    outcome: abandon
    reason: >
      Miner surfaced useful event examples, but most high-scoring examples were
      one-dimensional witnesses, same-start/goal rooms, optional d5/d6 routes,
      or independent d4 stacks.
  - attempt_id: E3_A02
    family: d5_setup_as_future_obstacle_for_d6
    outcome: held
    candidate: ICE_CAND_0005
    reason: >
      Strong mechanism interlock but weak final-game player-side structure.
  - attempt_id: E3_A03
    family: route_clear_boundary_commitment
    outcome: abandon
    reason: >
      Added a third push and boundary/d6 event, but only as forced route
      clearing; it did not change the core planning problem.
  - attempt_id: E3_A04
    family: two_d4_targets_plus_d6_exit
    outcome: abandon
    reason: >
      More branching and a d6 explicit exit, but it remained two d4 target-cover
      applications plus an independent exit step. Required-event bypass search
      also exhausted under budget.
```

## Failure Distribution

```yaml
failure_distribution:
  mechanism_showcase_without_consumed_chain:
    count: 2
    examples:
      - one-dimensional d5/d6/restart row probes
      - boundary disappearance row probes
  long_execution_or_forced_chain:
    count: 3
    examples:
      - ICE_CAND_0005
      - route-blocker variant
      - MF0047-style d6/d4 chain
  independent_subproblem_chain:
    count: 2
    examples:
      - MF0058-derived two d4 covers plus d6 exit
      - route clear before setup variant
  advanced_event_not_necessary_or_bypassed:
    count: 1
    examples:
      - MF0058 original had d5 in returned solution but d5-free wins existed
  role_depth_or_route_thinness:
    count: 2
    examples:
      - ICE_CAND_0005 had only two meaningful push commitments
      - route-blocker variant added route structure without enough new role depth
  meta_reinterpretation_missing:
    count: 1
    examples:
      - ICE_CAND_0005 top starts unsolved / bottom-left same-chain clone
```

## Review Integrity

```yaml
evidence_reviewer:
  artifact_status: present
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
puzzle_critic:
  artifact_status: present
  verdict: hold_or_reject
  review_loop_state: held_proposal
  required_action: downgrade_or_hold
designer_response:
  status: present
  result: held_proposal
```

The critic attacked player insight, why-not-execution, and role fit. Those are
core attacks under `docs/21`, so the candidate could not enter
`proposal_ready` without structural revision and new evidence. The attempted
route-blocker revision did not answer the attack and was abandoned before
rereview.

## Terminal State

```yaml
terminal_state: failed_search
reason: >
  No candidate reached proposal_ready or proposal_ready_with_caveats for the
  requested all-knowledge final-game capstone role. ICE_CAND_0005 is held as a
  useful mechanism-interlock motif but not submitted as a proposal-ready level.
```

## Written Artifacts

```text
prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0005.md
prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_29_failed_search.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0005_base.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0005_base.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_start_refine.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_start_refine.json
prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0005_d6_first_dead.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_left.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_left.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_bottom_left.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_bottom_left.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_bottom_to_top.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_bottom_to_top.json
```
