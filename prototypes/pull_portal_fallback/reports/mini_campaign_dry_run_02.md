# Mini Campaign Dry Run 02

> Status: invalidated as a campaign-quality example.
>
> This report is preserved as a regression artifact. The batch filled all slots formally, but later review found that S05 is a discovery/witness rather than an application, and S06/S07 are variants of the same core causal structure rather than independent mainline levels. Do not use this report as a successful bulk-generation template. See `docs/18-validated-level-design-loop.md` for the corrected workflow.

This report is a stronger mini campaign candidate produced by continuing the slot-driven loop after Dry Run 01. It is still a candidate campaign, not a final accepted pack.

Main rule for this pass: fix weak slots directly instead of stopping at diagnosis.

## Campaign Order

### S01 - Pull Path Discovery

Candidate: `dry_v2_s01_pull_path_discovery`

```text
#######
#G C@ #
###   #
#     #
#######
```

Intent: introduce pulling as a necessary way to clear and traverse a path.

Analyzer:

- Cost: 7
- Reachable states: 46
- Win states: 3
- Key events: `pull_crate=3`
- Counterfactual: without pull is unsolvable
- Target-event bypass: none

Notes: stronger than the previous one-step pull witness because pull is now necessary. Remaining caveat: multiple win states; acceptable for a first discovery candidate but worth solution-family review later.

### S02 - Portal Discovery

Candidate: `dry_v2_s02_portal_discovery`

```text
#########
#@ A#####
### B G #
#########
```

Intent: ordinary portal transport into a sealed goal region.

Analyzer:

- Cost: 3
- Reachable states: 5
- Win states: 1
- Key events: `portal_teleport=1`
- Counterfactual: without teleport is unsolvable
- Target-event bypass: none

Notes: clean discovery slot.

### S03 - Side-Switch Application

Candidate: `dry_v2_s03_side_switch_application`

```text
######  #
#G C   A#
#### ## #
##B  ####
#@ ######
#########
```

Intent: combine pull and directional portal routing so the player can switch sides around the crate.

Analyzer:

- Cost: 15
- Reachable states: 23
- Win states: 1
- Key events: `portal_teleport=2`, `pull_crate=5`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; fallback is not needed
- Target-event bypass: none

Notes: strong compact application level.

### S04 - Directional Pull Review

Candidate: `dry_variant_directional_pull_challenge`

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

Intent: review pull + portal routing with a different spatial chain before introducing fallback.

Analyzer:

- Cost: 18
- Reachable states: 37
- Win states: 1
- Key events: `portal_teleport=4`, `pull_crate=3`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; fallback is not needed
- Target-event bypass: none

Notes: this emerged off-spec during design, but it is high quality and fits well as a side/review challenge.

### S05 - Fallback Door Application

Candidate: `dry_v2_s04_fallback_door_application`

```text
#######
##@####
##A G##
##  B##
#######
```

Intent: introduce blocked-exit fallback as a spatial operation: the entrance portal is moved out of a doorway, opening the route to the goal.

Analyzer:

- Cost: 4
- Reachable states: 6
- Win states: 1
- Key events: `portal_exit_blocked=1`, `portal_fallback_push=1`
- Counterfactual: without fallback is unsolvable
- Target-event bypass: none

Notes: intentionally easy because it introduces a new exception. This replaces the old straight-line repeated-push fallback slot.

### S06 - Reuse Combination

Candidate: `dry_v2_s06_reuse_combination`

```text
#####   ##
# G C  A #
#### ## ##
##B# #####
#@ #######
##########
```

Intent: medium combination using ordinary teleport, pull, and blocked-exit fallback in one compact chain.

Analyzer:

- Cost: 15
- Reachable states: 38
- Win states: 1
- Key events: `portal_teleport=1`, `pull_crate=5`, `portal_fallback_push=1`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; without fallback is unsolvable
- Target-event bypass: none

Notes: derived by shrinking the stronger S07 chain. This is a good example of reuse-strengthening and reuse-trimming as level generation moves.

### S07 - Reuse Fallback Challenge

Candidate: `dry_v2_s07_reuse_fallback_challenge`

```text
#####   ##
#G C   A #
#### ## ##
##B# #####
#@ #######
##########
```

Intent: harder challenge where the same A/B/C elements carry a longer causal chain.

Analyzer:

- Cost: 18
- Reachable states: 58
- Win states: 1
- Key events: `portal_teleport=1`, `pull_crate=7`, `portal_fallback_push=1`
- Counterfactual: without pull is unsolvable; without teleport is unsolvable; without fallback is unsolvable
- Target-event bypass: none

Notes: strongest mainline candidate from this pass.

## Replaced Or Rejected During V2

- The old S01 one-step pull witness was replaced because pull was not counterfactually necessary.
- The old S05 repeated-fallback corridor was replaced because it was only a longer version of the fallback witness.
- A proposed "fallback moves A, then B teleports to the moved A exit" application was rejected twice because the analyzer found direct walk or teleport bypasses.
- The larger hard-chain candidate remains saved as an advanced variant, not part of this v2 mainline, because it has 14 win states and needs solution-family analysis.

## Summary Table

| Slot | Candidate | Cost | States | Win states | Required mechanisms verified |
| --- | --- | ---: | ---: | ---: | --- |
| S01 | `dry_v2_s01_pull_path_discovery` | 7 | 46 | 3 | pull |
| S02 | `dry_v2_s02_portal_discovery` | 3 | 5 | 1 | teleport |
| S03 | `dry_v2_s03_side_switch_application` | 15 | 23 | 1 | pull, teleport |
| S04 | `dry_variant_directional_pull_challenge` | 18 | 37 | 1 | pull, teleport |
| S05 | `dry_v2_s04_fallback_door_application` | 4 | 6 | 1 | fallback |
| S06 | `dry_v2_s06_reuse_combination` | 15 | 38 | 1 | pull, teleport, fallback |
| S07 | `dry_v2_s07_reuse_fallback_challenge` | 18 | 58 | 1 | pull, teleport, fallback |

## Process Lessons

- The slot-driven loop now works well enough to produce a complete candidate batch.
- Reuse-trimming worked: S06 was produced by moving the goal in the stronger S07 structure, preserving the same causal vocabulary with a shorter chain.
- Reuse-strengthening worked earlier: S07 came from extending S03 by letting existing A/B/C elements carry an added fallback dependency.
- Off-spec emergence is useful when classified correctly: S04 is a strong review/side challenge even though it was not the original target of that design attempt.
- Future campaign evaluation still needs solution-family analysis, especially for multi-win-state levels like S01 and saved advanced variants.

## Report Links

- [S01 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s01_pull_path_discovery.md)
- [S02 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s02_portal_discovery.md)
- [S03 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s03_side_switch_application.md)
- [S04 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_variant_directional_pull_challenge.md)
- [S05 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s04_fallback_door_application.md)
- [S06 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s06_reuse_combination.md)
- [S07 report](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s07_reuse_fallback_challenge.md)
