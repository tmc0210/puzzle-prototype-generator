# Experiment Run: ICE_EXP_002 round3 miner fix and failed search

```yaml
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
run_id: ICE_EXP_002_2026_06_29_round3_miner_fix_failed_search
prototype: ice_slide_escape
date: 2026-06-29
controller: llm_controller
terminal_state: failed_search
search_budget_policy: no_hard_budget
quality_guard: tool_evidence_plus_independent_review_loop
review_integrity: independent_review_for_serious_candidate
proposal_ready_candidates: []
held_candidates: []
rejected_candidates:
  - ICE_CAND_0004
code_changes:
  - src/prototypes/ice_slide_escape/samplerProfile.ts
  - prototypes/ice_slide_escape/docs/miner_probe_prior_v1.md
  - src/workflows/toolMaturity.ts
```

## Scope

This run followed `ICE_EXP_002_d4_pre_d5_capstone`: base flow must remain
pre-d5, with d4 rebound as the central responsibility and d1-d3 only allowed as
support. Winning solutions and reachable diagnostics must not trigger
d5_pass_through, d6_plus_destroy_group, slide_restart_after_group, or boundary
disappearance.

The user explicitly requested a miner repair before continuing design. The
miner was repaired first, then used as inspiration only; no mined output was
promoted directly.

## Miner Repair

Problem found:

```text
The ice sampler profile was still effectively one-dimensional. Variants were
row probes, so changing objective weights could only surface longer row events
instead of 2D structure.
```

Changes made:

```text
- Kept row probes for minimal mechanism reproduction.
- Added small 2D capsule-room generators:
  - dual_d4_capsule_room
  - d3_d4_pressure_room
  - icebacked_capsule_room
  - long_branch_inspiration_room
- Added explicit preferred edge start/goal metadata for 2D samples.
- Limited one-dimensional probes to their preferred solve instance so they do
  not dominate reports with repeated edge-goal variants.
- Retuned default sampler dimensions and budgets so small 2D samples complete.
- Kept scoring as an event-sequence discovery prior, not a geometry or quality
  score.
- Updated miner prior documentation and tool maturity wording.
```

Verification:

```text
npm run check
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 48 --max-findings 10
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 72 --max-findings 12 --weight rebound_d4=18 --weight destroy_moving_ice_d3=14 --weight ice_blocks_ice_no_chain_push=10 --weight boundary_disappear=10 --weight pass_through_d5=8 --weight restart_after_group=6 --weight destroy_group_d6_plus=5 --weight short_stop_d1_d2=3
```

Verification result:

```text
Type check passed. Default miner findings now include 2D generators at the top:
icebacked_capsule_room, long_branch_inspiration_room, and dual_d4_capsule_room.
The custom-weight run also surfaces 2D inspiration structures before many row
probes. Some mined 2D structures still contain forbidden-reachable future mechanics;
they remain inspiration only.
```

## Serious Candidate

`ICE_CAND_0004` entered review loop and was later human-rejected.

```text
###########
#.G..I.#..#
####...####
#.#.I..G.##
##...#....@
#.G..I..#.#
###########
```

Solve instance:

```yaml
player_start: [10, 4]
player_goal: [10, 4]
```

Tool evidence summary:

```text
Returned solution cost=24 with three push_ice + ice_rebound_d4 events.
Complete graph: 2254 states, 5914 legal transitions, 1 winning state.
Start/goal machine gate passed: no returned forbidden hits, no forbidden
winning path found, no missing-required winning path found, and no reachable
forbidden-reachable hits in the complete scan.
```

Independent evidence reviewer:

```yaml
verdict: evidence_partial
required_action: revise_evidence
main_points:
  - clean base-flow mechanism scope is supported
  - returned three-d4 solution is supported
  - all-path three-d4 necessity is not proven by the available required-event probe
  - bottom-opens-route and order-freedom claims are only partially supported
```

Independent puzzle critic:

```yaml
verdict: weak_hold
required_action: revise_structure
main_points:
  - three core moves are isomorphic d4 target-cover applications
  - d4 later consumption is weak
  - dead commitments look like graph statistics, not proven player-visible threats
  - branching may be local order freedom rather than hard coupling
  - role fit is below late d4 pre-d5 capstone
```

Designer response:

```text
Accepted the core attacks. ICE_CAND_0004 was initially downgraded to
held_proposal and not submitted as proposal_ready; human follow-up later
changed the archived candidate status to rejected_candidate.
```

Human follow-up:

```text
critic评的很准。这是非常简单的三次d4堆叠，没啥可说的。另外起点和终点不应该一样
```

Archive response:

```text
ICE_CAND_0004 was updated from held_proposal to rejected_candidate. The same
start/goal issue is now recorded as a human taste signal and unresolved core
attack.
```

## Structural Redesign Attempts

Representative attempts:

```yaml
attempts:
  - id: R3_A03
    family: final_exit_after_last_d4
    outcome: held_scratch
    summary: >
      The last d4 was changed so it also opened the final exit route. It passed
      scratch machine checks but reduced complexity and still read like a
      sequential d4 door chain. It was not sent to rereview.
  - id: R3_A04
    family: d4_creates_obstacle_for_next_d4
    outcome: abandoned
    summary: >
      A more promising interlock motif made the first d4 product become the
      obstacle for the second d4. Scratch versions repeatedly triggered
      reachable d5/boundary forbidden-reachable branches when the new obstacle could be
      shifted, so it failed the experiment hard gate.
```

## Failure Distribution

```yaml
failure_distribution:
  d4_witness_or_repeated_application:
    count: 2
    examples:
      - ICE_CAND_0004
      - final_exit_after_last_d4 scratch
    lesson: >
      Multiple d4 covers, even with clean graph evidence, do not automatically
      create capstone-level reasoning if each d4 has the same role.
  forbidden_or_report_only_pollution:
    count: 3
    examples:
      - raw dual_d4_capsule_room seed before sealing
      - dynamic-obstacle interlock sketches
      - long-branch inspiration seeds
    lesson: >
      Strict forbidden-reachable scanning is the main practical constraint on using
      dynamic ice obstacles; shifted obstacle states often create d5/boundary
      branches.
  evidence_overclaim:
    count: 1
    examples:
      - ICE_CAND_0004 all-three-d4 necessity claim
    lesson: >
      Current required-event checks prove the presence of at least one event
      class on all winning paths, not object-specific multi-use necessity.
  promising_but_unresolved:
    count: 1
    examples:
      - d4_creates_obstacle_for_next_d4
    lesson: >
      This motif is worth future work if a locking geometry can prevent the
      newly placed obstacle from being shifted into d5/forbidden-reachable states.
```

## Terminal State

```yaml
terminal_state: failed_search
reason: >
  No candidate survived independent critic as proposal_ready. The only
  serious candidate is mechanically clean but rejected for repeated-application
  structure, weak later consumption, and same start/goal. More aggressive
  interlock designs failed the forbidden-reachable hard gate.
next_recommended_direction: >
  Continue from dynamic d4 obstacle interlocks, but first solve the locking
  problem: once a d4 product becomes an obstacle for another ice, the player
  must not be able to shift that obstacle into a d5/boundary branch.
```
