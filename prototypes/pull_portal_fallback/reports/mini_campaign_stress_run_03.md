# Mini Campaign Stress Run 03

> Status: partial / reviewed, not a campaign-quality success.
>
> Post-review found three important issues: T01 is better classified as a fallback discovery/witness than a true application; T02 and V01 were reused earlier candidates and should have been labeled as such; and this pass did not complete the evidence-reading/refinement stage, leaving redundant structure in several maps. The useful new result from this run is primarily T03, the distinct medium combination candidate.

This report is a stress test of the corrected workflow in `docs/18-validated-level-design-loop.md`.

The goal is not to claim a finished campaign. The goal is to verify whether new slots can be designed with concrete causal chains, analyzer evidence, and campaign-level variant classification.

## Gate Used In This Run

Each new candidate must include:

```text
role_claim:
  intended_role
  concrete causal_chain
  consumed_state_changes
  chain_delta_from_previous
  why_not_just_variant
```

Analyzer pass is treated as evidence only. It is not a quality verdict.

## Existing Anchors

These are currently useful anchors from earlier work:

- `dry_v2_s03_side_switch_application`: compact pull + normal teleport side-switch application.
- `stress_v3_same_knowledge_distinct_application`: same knowledge as S03, but a different spatial chain.
- `stress_v3_distinct_medium_combination`: new medium combination, distinct from S07.
- `dry_v2_s07_reuse_fallback_challenge`: strong reuse-strengthened challenge.

## New Stress Slots

### T01 - True Fallback Application

Candidate: `stress_v3_true_fallback_application`

Origin: new candidate from this stress run.

```text
#########
#@  #####
### ### #
#  A G ##
### ### #
#  B ####
#########
```

Role claim:

```text
intended_role: guided_application
causal_chain:
  - Player walks to the cell above A.
  - Player enters A downward.
  - B's downward exit is blocked by wall terrain.
  - A does not teleport the player; blocked-exit fallback pushes A downward.
  - A's original cell becomes empty.
  - The player walks through A's original cell to reach G.
consumed_state_changes:
  - A's old position is consumed as the newly opened doorway.
chain_delta_from_previous:
  compared_to: old straight-line fallback witness
  difference: the moved portal's old cell is explicitly consumed as a doorway to G.
why_not_just_variant:
  - It is still a very small guided application, but it has a distinct spatial role: A is a door, not merely a pushed object in a corridor.
```

Analyzer:

- Cost: 7
- Reachable states: 14
- Win states: 1
- Key events: `portal_exit_blocked=1`, `portal_fallback_push=1`
- Counterfactual: without fallback is unsolvable
- Target-event bypass: none

Post-review classification: fallback discovery / high-support witness, not a true application.

Reason: although A's old cell is consumed as a doorway, that consumption is the natural immediate result of the forced discovery action. The player does not need to choose when to use fallback, construct its condition, or transfer it to a non-obvious role. This should not fill an application slot.

Refinement status: not refined. The map should be simplified or kept only as a witness fixture.

Report: [stress_v3_true_fallback_application](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_stress_v3_true_fallback_application.md)

### T02 - Same Knowledge, Different Chain

Candidate: `stress_v3_same_knowledge_distinct_application`

Origin: reused earlier candidate, previously reported as `dry_variant_directional_pull_challenge`.

```text
###########
####  #####
####  #####
####  #  ##
##@ AC# B #
#### ###  #
####G######
###########
```

Role claim:

```text
intended_role: independent_application
known_mechanisms:
  - pull single crate
  - normal directional portal teleport
causal_chain:
  - Player uses A/B normal teleport to reach a different side of the crate structure.
  - Player pulls C upward, changing which side and lane are usable.
  - Player uses portals again to route around the shifted crate.
  - The final route to G depends on both the earlier pull and directional portal routing.
consumed_state_changes:
  - C's moved vertical position changes the accessible route.
  - Portal exits are used repeatedly as routing, not just as a single side switch.
chain_delta_from_previous:
  compared_to: dry_v2_s03_side_switch_application
  difference: S03 uses a horizontal side-switch around one row; this candidate uses repeated portal routing and a vertical crate relocation.
why_not_just_variant:
  - The required pull direction, route topology, and portal-use rhythm differ from S03.
  - It practices the same knowledge set, but the causal chain is not a shortened or lengthened S03.
```

Analyzer:

- Cost: 18
- Reachable states: 37
- Win states: 1
- Key events: `portal_teleport=4`, `pull_crate=3`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; fallback is not needed
- Target-event bypass: none

Classification: sibling application/review candidate for the pull + teleport branch, but not a newly generated result of this stress run.

Refinement status: previously reviewed as high quality, but this report should not count it as new slot generation.

Report: [stress_v3_same_knowledge_distinct_application](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_stress_v3_same_knowledge_distinct_application.md)

### T03 - Distinct Medium Combination

Candidate: `stress_v3_distinct_medium_combination`

Origin: new candidate from this stress run, after two analyzer-rejected bypass attempts.

```text
#########
###  ####
#G A@####
### #####
#  B#  ##
#    C ##
#########
```

Role claim:

```text
intended_role: combination
known_mechanisms:
  - normal directional portal teleport
  - pull single crate
  - blocked-exit fallback
causal_chain:
  - Player starts on the right side of A.
  - Player uses A as a normal portal, entering from above after stepping around it, and lands below B.
  - Player pulls C left twice until C occupies B's downward exit cell.
  - Player enters B from the left to teleport back to the right side of A.
  - Player moves above A and enters A downward.
  - Because C now blocks B's downward exit, A is pushed downward by fallback.
  - A's original cell opens the path from the right/top side to G on the left.
consumed_state_changes:
  - C's new position is consumed as the remote blocker for A's fallback.
  - A's old position is consumed as the opened doorway to G.
chain_delta_from_previous:
  compared_to: dry_v2_s07_reuse_fallback_challenge
  difference: S07 uses fallback to extend the crate-pulling lane; this candidate uses pulling to construct the remote portal-exit blocker, then uses fallback as the final door opener.
why_not_just_variant:
  - The crate's role is different: constructed remote blocker instead of final-path cargo.
  - The portal's role is different: A is a door to G, not a lane extender for later pulling.
```

Analyzer:

- Cost: 14
- Reachable states: 45
- Win states: 1
- Key events: `portal_teleport=2`, `pull_crate=2`, `portal_fallback_push=1`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; without fallback is unsolvable
- Target-event bypass: none

Classification: accepted as a distinct medium combination candidate.

Refinement status: analyzer evidence and causal chain are promising, but a dedicated read-evidence-and-trim pass is still required before campaign acceptance.

Report: [stress_v3_distinct_medium_combination](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_stress_v3_distinct_medium_combination.md)

### V01 - Advanced Variant Pool

Candidate: `stress_v3_advanced_variant_hard_chain`

Origin: reused earlier hard-chain candidate, rerun under stress-run naming for variant-pool classification.

```text
########
# A    #
#     B#
# @C## #
###### #
#####G #
########
```

Role claim:

```text
intended_role: advanced_variant
causal_chain:
  - Multiple fallback pushes move portal positions.
  - Pulls adjust C's relationship to portal exits.
  - Final normal teleport reaches the goal region.
why_not_mainline_now:
  - Strong chain, but 1231 reachable states and 14 win states.
  - Needs solution-family analysis before campaign placement.
```

Analyzer:

- Cost: 23
- Reachable states: 1231
- Win states: 14
- Key events: `pull_crate=4`, `portal_fallback_push=5`, `portal_teleport=1`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; without fallback is unsolvable
- Target-event bypass: none

Classification: save in advanced variant pool, not accepted into mainline yet. This is not a new design result from v3.

Report: [stress_v3_advanced_variant_hard_chain](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_stress_v3_advanced_variant_hard_chain.md)

## Mainline Implication

After review, this stress run does not yet suggest a complete sequence. It suggests only a partial correction:

```text
1. Existing pull / portal / pull+portal anchors still need campaign-level review.
2. T02 remains a useful reused sibling candidate, not a new result.
3. T01 should be moved to discovery / witness.
4. T03 is the main new candidate from this run.
5. A true fallback application slot remains open.
6. A refined complete mini campaign remains open.
```

Important: T03 and S07 are not the same chain. T03 constructs a remote blocker with C, then uses A as a door. S07 uses fallback to extend the crate-pull lane and then finishes with further pulling.

## Lessons From V3

- Concrete causal chains are necessary, but not sufficient. A plausible chain can still describe a discovery if the player does not actively choose, construct, or arrange the mechanism use.
- Reused candidates must be marked as reused anchors or variants. Otherwise a stress run can appear more productive than it was.
- The distinct medium combination slot remains the strongest pressure test so far; it caught multiple bypasses before producing T03.
- The read-evidence-and-refine stage was skipped too quickly in this run. Future runs must inspect key snapshots and trim redundant structure before any campaign claim.
- The next tooling gap remains campaign-level graph comparison: current `why_not_just_variant` is still written by LLM/human, not verified by code.
