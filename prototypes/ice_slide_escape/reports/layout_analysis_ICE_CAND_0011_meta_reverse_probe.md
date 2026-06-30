# Level Analysis: ICE_CAND_0011_meta_reverse_probe

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0011_meta_reverse_probe
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
############
############
############
############
############
############
############
##########G#
#.I.....#G.@
#..........#
#........G.#
#.........I#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

## Shortest Solution

- Found: yes
- Cost: 43
- Depth: 43
- Explored states: 16654
- Inputs: left down down left down down right up up up left left left left left left left left left up right down right right right right right right right right up down down down down down down left up down right down down
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_boundary_disappear:d1 walk
- Event counts: walk=38, push_ice=5, ice_rebound_d4=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_boundary_disappear:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############
############
############
############
############
############
############
##########G#
#.I.....#G..
#..........#
#........G.#
#.........I#
#.........@#
#........I.#
#..........#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########G#
#.I.....#GI.
#..........#
#........G.#
#.........@#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

### Step 21: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
############
############
############
############
############
############
############
##########G#
#@I.....#GI.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########G#
#.@.....#*I.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

### Step 31: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
############
############
############
############
############
############
############
##########G#
#.......#*I.
#.........@#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########*#
#.......#*@.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

### Step 39: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
############
############
############
############
############
############
############
##########*#
#.......#*..
#..........#
#........G.#
#..........#
#..........#
#........I.#
#........@.#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########*#
#.......#*..
#..........#
#........*.#
#..........#
#..........#
#........@.#
#..........#
#.........I#
##########.#
```

### Step 42: down

- Legal: true
- Events: push_ice, ice_boundary_disappear:d1

Before:

```text
############
############
############
############
############
############
############
##########*#
#.......#*..
#..........#
#........*.#
#..........#
#..........#
#..........#
#.........@#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########*#
#.......#*..
#..........#
#........*.#
#..........#
#..........#
#..........#
#..........#
#.........@#
##########.#
```


## Graph Facts

- Status: complete
- Reachable states: 19716
- Legal transitions: 68608
- Event-only illegal transitions: 695
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 19716
- Legal transitions: 68608
- Budget: maxStates=100000
- Compressed regions: 251
- Bidirectional transitions: 67896
- Commitment transitions: 712
- Winning regions: 1
- Initial region: r0, states=77, dist=5, internalBidirectional=258, commitments=9, viableCommitments=2, deadCommitments=7, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r6@8 -> r74@21 -> r181@31 -> r224@39 -> r233@42
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=247, edges=695, winReachable=12, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=6, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=77, dist=5, out=9, winOut=2, deadOut=7
- SCC path: s0@0 -> s15@8 -> s33@21 -> s37@31 -> s49@39 -> s55@42

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 77 | 9 | 2 | 7 | 0 | 0 | s15 | no |
| s15 | 8 | 4 | 75 | 9 | 2 | 7 | 1 | 1 | s33 | no |
| s33 | 21 | 3 | 75 | 6 | 3 | 3 | 1 | 1 | s37 | no |
| s37 | 31 | 2 | 77 | 5 | 2 | 3 | 1 | 1 | s49 | no |
| s49 | 39 | 1 | 77 | 5 | 1 | 4 | 2 | 2 | s55 | yes |
| s55 | 42 | 0 | 79 | 4 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s15 | 77 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s15 | 8 | 21 | s33 | 75 | no | no | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s33 | 21 | 31 | s37 | 75 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s37 | 31 | 39 | s49 | 77 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s49 | 39 | 42 | s55 | 77 | no | yes | down | push_ice, ice_boundary_disappear:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=19716, regions=251, solution commitments=5
- Opening: commitments=9, viable=2, dead=7, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r6 | 5 | 2 | 7 | 2 | multiple optimal choices |
| 20 | r6 | r74 | 4 | 2 | 7 | 2 | multiple optimal choices |
| 30 | r74 | r181 | 3 | 3 | 3 | 3 | multiple optimal choices |
| 38 | r181 | r224 | 2 | 2 | 3 | 2 | multiple optimal choices |
| 41 | r224 | r233 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 77 | 9 | 2 | 7 | 2 | 2 | r6 | no | no | no |
| r6 | 8 | 4 | 75 | 9 | 2 | 7 | 2 | 2 | r74 | no | no | no |
| r74 | 21 | 3 | 75 | 6 | 3 | 3 | 3 | 3 | r181 | no | no | no |
| r181 | 31 | 2 | 77 | 5 | 2 | 3 | 2 | 2 | r224 | no | no | no |
| r224 | 39 | 1 | 77 | 5 | 1 | 4 | 1 | 1 | r233 | no | yes | yes |
| r233 | 42 | 0 | 79 | 4 | 0 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 5 | 9 | 2 | 7 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 8 | up | r6 | yes | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | up | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r6 | no | 4 | 9 | 2 | 7 | 2 | 2 | r74 | yes | yes | yes | yes | no | no | walk |
| 21 | right | r74 | yes | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 22 | down | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r74 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r74 | no | 3 | 6 | 3 | 3 | 3 | 3 | r181 | yes | yes | yes | yes | no | no | walk |
| 31 | up | r181 | yes | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 32 | down | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | down | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r181 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | left | r181 | no | 2 | 5 | 2 | 3 | 2 | 2 | r224 | yes | yes | yes | yes | no | no | walk |
| 39 | up | r224 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 40 | down | r224 | no | 1 | 5 | 1 | 4 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r224 | no | 1 | 5 | 1 | 4 | 1 | 1 | r233 | yes | yes | yes | yes | yes | yes | walk |
| 42 | down | r233 | yes | 0 | 4 | 0 | 4 | 0 | 0 | r233 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d1 |
| 43 | down | r233 | no | 0 | 4 | 0 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
