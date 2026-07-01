# Level Analysis: ICE_CAND_0023_v4_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0023_v4_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#....#########
..IGI#.....I.@
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

## Shortest Solution

- Found: yes
- Cost: 18
- Depth: 18
- Explored states: 237
- Inputs: left left right down down left down right down down left up up right up left right right
- Events: walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk
- Event counts: walk=14, push_ice=4, ice_pass_through_d5:len2=1, slide_restart_after_group=3, ice_blocks_ice_no_chain_push=3, ice_stop_short:d1=2, ice_pass_through_d5:len1=2, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
..IGI#.....I@.
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

After:

```text
##############
#....#########
..I*I#.....@..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

### Step 6: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##############
#....#########
..I*I#........
#....#######.#
..IGG#.....I@.
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

After:

```text
##############
#....#########
..I*I#........
#....#######.#
..I*G#.....@..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

### Step 12: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##############
#....#########
..I*I#........
#....#######.#
..I*G#........
#....######..#
#....######I.#
#...I######@.#
#....#########
##############
```

After:

```text
##############
#....#########
..I*I#........
#....#######.#
..I*G#.....I..
#....######..#
#....######@.#
#...I######..#
#....#########
##############
```

### Step 16: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
..I*I#........
#....#######.#
..I*G#.....I@.
#....######..#
#....######..#
#...I######..#
#....#########
##############
```

After:

```text
##############
#....#########
..I*I#........
#....#######.#
..I**#.....@..
#....######..#
#....######..#
#...I######..#
#....#########
##############
```


## Graph Facts

- Status: complete
- Reachable states: 260
- Legal transitions: 560
- Event-only illegal transitions: 24
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 260
- Legal transitions: 560
- Budget: maxStates=100000
- Compressed regions: 16
- Bidirectional transitions: 532
- Commitment transitions: 28
- Winning regions: 1
- Initial region: r0, states=10, dist=4, internalBidirectional=18, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@2 -> r5@6 -> r12@12 -> r15@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=16, edges=28, winReachable=12, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=6, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=10, dist=4, out=4, winOut=3, deadOut=1
- SCC path: s0@0 -> s1@2 -> s3@6 -> s13@12 -> s14@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 10 | 4 | 3 | 1 | 0 | 0 | s1 | no |
| s1 | 2 | 3 | 16 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 6 | 2 | 22 | 2 | 1 | 1 | 2 | 2 | s13 | yes |
| s13 | 12 | 1 | 17 | 1 | 1 | 0 | 3 | 3 | s14 | yes |
| s14 | 16 | 0 | 23 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 10 | no | no | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1 | 2 | 6 | s3 | 16 | no | no | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s3 | 6 | 12 | s13 | 22 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s13 | 12 | 16 | s14 | 17 | no | yes | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=260, regions=16, solution commitments=4
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 5 | r1 | r5 | 3 | 2 | 1 | 1 | forced optimal |
| 11 | r5 | r12 | 2 | 1 | 1 | 1 | forced optimal |
| 15 | r12 | r15 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 10 | 4 | 3 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 2 | 3 | 16 | 3 | 2 | 1 | 1 | 1 | r5 | no | no | yes |
| r5 | 6 | 2 | 22 | 2 | 1 | 1 | 1 | 1 | r12 | no | yes | yes |
| r12 | 12 | 1 | 17 | 1 | 1 | 0 | 1 | 1 | r15 | yes | yes | yes |
| r15 | 16 | 0 | 23 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 2 | left | r1 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 3 | right | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 3 | 2 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 6 | left | r5 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 7 | down | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | walk |
| 12 | up | r12 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 13 | up | r12 | no | 1 | 1 | 1 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r12 | no | 1 | 1 | 1 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r12 | no | 1 | 1 | 1 | 0 | 1 | 1 | r15 | yes | yes | yes | yes | yes | yes | walk |
| 16 | left | r15 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 17 | right | r15 | no | 0 | 0 | 0 | 0 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r15 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
