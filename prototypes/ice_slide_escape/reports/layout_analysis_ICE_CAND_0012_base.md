# Level Analysis: ICE_CAND_0012_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0012_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
####..########
####.II......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
@.I..G.#####.#
####..######.#
####GG.....I.#
##############
```

## Shortest Solution

- Found: yes
- Cost: 39
- Depth: 39
- Explored states: 1856
- Inputs: right right right right up up up up up up up right down right right right right right right right down down down down down down down down left right up up up up up up up up right
- Events: walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=35, push_ice=4, ice_rebound_d4=1, ice_blocks_ice_no_chain_push=2, ice_pass_through_d5:len1=2, slide_restart_after_group=2, ice_stop_short:d2=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
####..########
####.II......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.@I..G.#####.#
####..######.#
####GG.....I.#
##############
```

After:

```text
####..########
####.II......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
..@..*.#####.#
####..######.#
####GG.....I.#
##############
```

### Step 13: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
####.@########
####.II......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.....*.#####.#
####..######.#
####GG.....I.#
##############
```

After:

```text
####..########
####.@I......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.....*.#####.#
####..######.#
####G*.....I.#
##############
```

### Step 14: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
####..########
####.@I......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.....*.#####.#
####..######.#
####G*.....I.#
##############
```

After:

```text
####..########
####..@.......
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.....*.#####.#
####..######.#
####G*.....I.#
##############
```

### Step 29: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
####..########
####..........
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.....*.#####.#
####..######.#
####G*.....I@#
##############
```

After:

```text
####..########
####..........
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
.....*.#####.#
####..######.#
####**.....@.#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 4058
- Legal transitions: 9769
- Event-only illegal transitions: 138
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4058
- Legal transitions: 9769
- Budget: maxStates=100000
- Compressed regions: 104
- Bidirectional transitions: 9574
- Commitment transitions: 195
- Winning regions: 1
- Initial region: r0, states=2, dist=4, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r10@13 -> r15@14 -> r46@29
- Forced commitment prefix length: 1
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=104, edges=195, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=2, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s82@13 -> s83@14 -> s84@29

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 3 | 27 | 6 | 1 | 5 | 1 | 1 | s82 | yes |
| s82 | 13 | 2 | 22 | 5 | 1 | 4 | 1 | 1 | s83 | yes |
| s83 | 14 | 1 | 38 | 5 | 1 | 4 | 1 | 1 | s84 | yes |
| s84 | 29 | 0 | 43 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 2 | 13 | s82 | 27 | no | yes | down | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s82 | 13 | 14 | s83 | 22 | yes | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | scripted_same_state_handoff |
| s83 | 14 | 29 | s84 | 38 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4058, regions=104, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r10 | 3 | 1 | 5 | 1 | forced optimal |
| 13 | r10 | r15 | 2 | 1 | 4 | 1 | forced optimal |
| 28 | r15 | r46 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 3 | 27 | 6 | 1 | 5 | 1 | 1 | r10 | no | yes | yes |
| r10 | 13 | 2 | 22 | 5 | 1 | 4 | 1 | 1 | r15 | no | yes | yes |
| r15 | 14 | 1 | 38 | 5 | 1 | 4 | 1 | 1 | r46 | no | yes | yes |
| r46 | 29 | 0 | 43 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 3 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 13 | down | r10 | yes | 2 | 5 | 1 | 4 | 1 | 1 | r15 | yes | yes | yes | yes | yes | yes | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 14 | right | r15 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 15 | right | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r15 | no | 1 | 5 | 1 | 4 | 1 | 1 | r46 | yes | yes | yes | yes | yes | yes | walk |
| 29 | left | r46 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 30 | right | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r46 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
