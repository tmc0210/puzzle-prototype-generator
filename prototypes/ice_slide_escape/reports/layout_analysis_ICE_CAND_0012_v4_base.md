# Level Analysis: ICE_CAND_0012_v4_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0012_v4_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
@.I..G.######.#
#.....#######.#
####GG.....I..#
###############
```

## Shortest Solution

- Found: yes
- Cost: 42
- Depth: 42
- Explored states: 5893
- Inputs: right right up right right up up up up up up right down right right right right right right right right down down down down down down down down left left right right up up up up up up up up right
- Events: walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=38, push_ice=4, ice_rebound_d4=1, ice_blocks_ice_no_chain_push=2, ice_pass_through_d5:len1=2, slide_restart_after_group=2, ice_stop_short:d2=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.@I..G.######.#
#.....#######.#
####GG.....I..#
###############
```

After:

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
..@..*.######.#
#.....#######.#
####GG.....I..#
###############
```

### Step 13: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
####.@#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.....*.######.#
#.....#######.#
####GG.....I..#
###############
```

After:

```text
####..#########
####.@.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.....*.######.#
#.....#######.#
####G*.....I..#
###############
```

### Step 15: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
####..#########
####..@I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.....*.######.#
#.....#######.#
####G*.....I..#
###############
```

After:

```text
####..#########
####...@.......
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.....*.######.#
#.....#######.#
####G*.....I..#
###############
```

### Step 31: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
####..#########
####...........
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.....*.######.#
#.....#######.#
####G*.....I@.#
###############
```

After:

```text
####..#########
####...........
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
.....*.######.#
#.....#######.#
####**.....@..#
###############
```


## Graph Facts

- Status: complete
- Reachable states: 9158
- Legal transitions: 24077
- Event-only illegal transitions: 287
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9158
- Legal transitions: 24077
- Budget: maxStates=100000
- Compressed regions: 202
- Bidirectional transitions: 23610
- Commitment transitions: 467
- Winning regions: 1
- Initial region: r0, states=34, dist=4, internalBidirectional=86, commitments=8, viableCommitments=1, deadCommitments=7, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r22@13 -> r40@15 -> r122@31
- Forced commitment prefix length: 0
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=202, edges=462, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=34, dist=4, out=8, winOut=1, deadOut=7
- SCC path: s0@0 -> s1@2 -> s10@13 -> s11@15 -> s12@31

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 34 | 8 | 1 | 7 | 0 | 0 | s1 | yes |
| s1 | 2 | 3 | 33 | 7 | 1 | 6 | 1 | 1 | s10 | yes |
| s10 | 13 | 2 | 29 | 5 | 1 | 4 | 1 | 1 | s11 | yes |
| s11 | 15 | 1 | 46 | 5 | 1 | 4 | 1 | 1 | s12 | yes |
| s12 | 31 | 0 | 51 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 34 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 2 | 13 | s10 | 33 | no | yes | down | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s10 | 13 | 15 | s11 | 29 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s11 | 15 | 31 | s12 | 46 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9158, regions=202, solution commitments=4
- Opening: commitments=8, viable=1, dead=7, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 11 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 11 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 1 | 7 | 1 | forced optimal |
| 12 | r1 | r22 | 3 | 1 | 6 | 1 | forced optimal |
| 14 | r22 | r40 | 2 | 1 | 4 | 1 | forced optimal |
| 30 | r40 | r122 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 34 | 8 | 1 | 7 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 3 | 33 | 7 | 1 | 6 | 1 | 1 | r22 | no | yes | yes |
| r22 | 13 | 2 | 29 | 5 | 1 | 4 | 1 | 1 | r40 | no | yes | yes |
| r40 | 15 | 1 | 46 | 5 | 1 | 4 | 1 | 1 | r122 | no | yes | yes |
| r122 | 31 | 0 | 51 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 8 | 1 | 7 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 8 | 1 | 7 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 3 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 3 | 7 | 1 | 6 | 1 | 1 | r22 | yes | yes | yes | yes | yes | yes | walk |
| 13 | down | r22 | yes | 2 | 5 | 1 | 4 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 14 | right | r22 | no | 2 | 5 | 1 | 4 | 1 | 1 | r40 | yes | yes | yes | yes | yes | yes | walk |
| 15 | right | r40 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 16 | right | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r40 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r40 | no | 1 | 5 | 1 | 4 | 1 | 1 | r122 | yes | yes | yes | yes | yes | yes | walk |
| 31 | left | r122 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 32 | right | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | up | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r122 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
