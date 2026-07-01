# Level Analysis: ICE_CAND_0023_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0023_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#....#########
..IGI#.....I.#
#....#######.#
..IGG#......I.
######..####.@
######I.####.#
######.......#
##############
```

## Shortest Solution

- Found: yes
- Cost: 29
- Depth: 29
- Explored states: 2275
- Inputs: up left up up left right down down down down down left left left left left left up up right up left right right right right right right right
- Events: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk
- Event counts: walk=25, push_ice=4, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=3, ice_stop_short:d2=3, ice_pass_through_d5:len2=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##############
#....#########
..IGI#.....I.#
#....#######.#
..IGG#......I@
######..####..
######I.####.#
######.......#
##############
```

After:

```text
##############
#....#########
..IGI#.....I.#
#....#######.#
..I*G.......@.
######..####..
######I.####.#
######.......#
##############
```

### Step 5: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
..IGI#.....I@#
#....#######.#
..I*G.........
######..####..
######I.####.#
######.......#
##############
```

After:

```text
##############
#....#########
..I*I#.....@.#
#....#######.#
..I*G.........
######..####..
######I.####.#
######.......#
##############
```

### Step 18: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##############
#....#########
..I*I#.......#
#....#######.#
..I*G.........
######..####..
######I.####.#
######@......#
##############
```

After:

```text
##############
#....#########
..I*I#.......#
#....#######.#
..I*G.I.......
######..####..
######@.####.#
######.......#
##############
```

### Step 22: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##############
#....#########
..I*I#.......#
#....#######.#
..I*G.I@......
######..####..
######..####.#
######.......#
##############
```

After:

```text
##############
#....#########
..I*I#.......#
#....#######.#
..I**.@.......
######..####..
######..####.#
######.......#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 13866
- Legal transitions: 32591
- Event-only illegal transitions: 2645
- Winning states: 11
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 13866
- Legal transitions: 32591
- Budget: maxStates=100000
- Compressed regions: 552
- Bidirectional transitions: 31464
- Commitment transitions: 1127
- Winning regions: 11
- Initial region: r0, states=20, dist=4, internalBidirectional=40, commitments=5, viableCommitments=1, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r3@5 -> r25@18 -> r59@22
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=552, edges=1127, winReachable=42, winning=11, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=15, mergingWinSccs=12
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=20, dist=4, out=5, winOut=1, deadOut=4
- SCC path: s0@0 -> s14@2 -> s172@5 -> s173@18 -> s174@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 20 | 5 | 1 | 4 | 0 | 0 | s14 | yes |
| s14 | 2 | 3 | 38 | 9 | 4 | 5 | 1 | 1 | s172 | no |
| s172 | 5 | 2 | 43 | 8 | 4 | 4 | 1 | 1 | s173 | no |
| s173 | 18 | 1 | 29 | 1 | 1 | 0 | 2 | 2 | s174 | yes |
| s174 | 22 | 0 | 31 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s14 | 20 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s14 | 2 | 5 | s172 | 38 | no | no | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s172 | 5 | 18 | s173 | 43 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s173 | 18 | 22 | s174 | 29 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=13866, regions=552, solution commitments=4
- Opening: commitments=5, viable=1, dead=4, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 1 | 4 | 1 | forced optimal |
| 4 | r1 | r3 | 3 | 4 | 5 | 3 | multiple optimal choices |
| 17 | r3 | r25 | 2 | 4 | 4 | 1 | forced optimal |
| 21 | r25 | r59 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 20 | 5 | 1 | 4 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 3 | 38 | 9 | 4 | 5 | 3 | 3 | r3 | no | no | no |
| r3 | 5 | 2 | 43 | 8 | 4 | 4 | 1 | 1 | r25 | no | no | yes |
| r25 | 18 | 1 | 29 | 1 | 1 | 0 | 1 | 1 | r59 | yes | yes | yes |
| r59 | 22 | 0 | 31 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 5 | 1 | 4 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r1 | yes | 3 | 9 | 4 | 5 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 3 | up | r1 | no | 3 | 9 | 4 | 5 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 3 | 9 | 4 | 5 | 3 | 3 | r3 | yes | yes | yes | yes | no | no | walk |
| 5 | left | r3 | yes | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 6 | right | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r3 | no | 2 | 8 | 4 | 4 | 1 | 1 | r25 | yes | yes | yes | yes | no | yes | walk |
| 18 | up | r25 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 19 | up | r25 | no | 1 | 1 | 1 | 0 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r25 | no | 1 | 1 | 1 | 0 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r25 | no | 1 | 1 | 1 | 0 | 1 | 1 | r59 | yes | yes | yes | yes | yes | yes | walk |
| 22 | left | r59 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 23 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r59 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
