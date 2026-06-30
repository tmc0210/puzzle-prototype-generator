# Level Analysis: ICE_CAND_0011_v3_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0011_v3_base
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
#.I.....#G..
#..........#
#........G.#
#.........I#
#..........#
#........I.#
#..........#
#.........I#
##########@#
```

## Shortest Solution

- Found: yes
- Cost: 39
- Depth: 39
- Explored states: 8828
- Inputs: up up up up up up up left left left left left left left left left up right down down down down down down right right right right right right right up up up right up up up right
- Events: push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk
- Event counts: push_ice=5, ice_blocks_ice_no_chain_push=3, ice_destroyed_d3=1, walk=34, ice_rebound_d4=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

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
#..........#
#........I.#
#..........#
#.........I#
##########@#
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
#.I.....#G..
#..........#
#........G.#
#.........I#
#..........#
#........I.#
#..........#
#.........@#
##########.#
```

### Step 5: up

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
#..........#
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
#..........#
##########.#
```

### Step 18: right

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
#..........#
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
#..........#
##########.#
```

### Step 32: up

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
##########G#
#.......#*I.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#........@.#
#..........#
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
#.......#*I.
#..........#
#........*.#
#..........#
#..........#
#........@.#
#..........#
#..........#
##########.#
```

### Step 38: up

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
#........*.#
#..........#
#..........#
#..........#
#..........#
#..........#
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
#........*.#
#..........#
#..........#
#..........#
#..........#
#..........#
##########.#
```


## Graph Facts

- Status: complete
- Reachable states: 10972
- Legal transitions: 38086
- Event-only illegal transitions: 300
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10972
- Legal transitions: 38086
- Budget: maxStates=100000
- Compressed regions: 139
- Bidirectional transitions: 37736
- Commitment transitions: 350
- Winning regions: 1
- Initial region: r0, states=1, dist=5, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@5 -> r39@18 -> r112@32 -> r122@38
- Forced commitment prefix length: 1
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=139, edges=343, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=3/5, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=1/5, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s37@5 -> s50@18 -> s56@32 -> s59@38

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 4 | 79 | 8 | 1 | 7 | 1 | 1 | s37 | yes |
| s37 | 5 | 3 | 77 | 8 | 1 | 7 | 1 | 1 | s50 | yes |
| s50 | 18 | 2 | 77 | 5 | 2 | 3 | 1 | 1 | s56 | no |
| s56 | 32 | 1 | 77 | 5 | 1 | 4 | 1 | 1 | s59 | yes |
| s59 | 38 | 0 | 79 | 4 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_trivial_scc |
| s1 | 1 | 5 | s37 | 79 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s37 | 5 | 18 | s50 | 77 | no | yes | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s50 | 18 | 32 | s56 | 77 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s56 | 32 | 38 | s59 | 77 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10972, regions=139, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/5, optimal prefix=3/5, forced viable commitments=4/5
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 4 | r1 | r4 | 4 | 1 | 7 | 1 | forced optimal |
| 17 | r4 | r39 | 3 | 1 | 7 | 1 | forced optimal |
| 31 | r39 | r112 | 2 | 2 | 3 | 2 | multiple optimal choices |
| 37 | r112 | r122 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 4 | 79 | 8 | 1 | 7 | 1 | 1 | r4 | no | yes | yes |
| r4 | 5 | 3 | 77 | 8 | 1 | 7 | 1 | 1 | r39 | no | yes | yes |
| r39 | 18 | 2 | 77 | 5 | 2 | 3 | 2 | 2 | r112 | no | no | no |
| r112 | 32 | 1 | 77 | 5 | 1 | 4 | 1 | 1 | r122 | no | yes | yes |
| r122 | 38 | 0 | 79 | 4 | 0 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 4 | 8 | 1 | 7 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 2 | up | r1 | no | 4 | 8 | 1 | 7 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 4 | 8 | 1 | 7 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 4 | 8 | 1 | 7 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 5 | up | r4 | yes | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | up | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r4 | no | 3 | 8 | 1 | 7 | 1 | 1 | r39 | yes | yes | yes | yes | yes | yes | walk |
| 18 | right | r39 | yes | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 19 | down | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r39 | no | 2 | 5 | 2 | 3 | 2 | 2 | r112 | yes | yes | yes | yes | no | no | walk |
| 32 | up | r112 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r112 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 33 | up | r112 | no | 1 | 5 | 1 | 4 | 1 | 1 | r112 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r112 | no | 1 | 5 | 1 | 4 | 1 | 1 | r112 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r112 | no | 1 | 5 | 1 | 4 | 1 | 1 | r112 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r112 | no | 1 | 5 | 1 | 4 | 1 | 1 | r112 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r112 | no | 1 | 5 | 1 | 4 | 1 | 1 | r122 | yes | yes | yes | yes | yes | yes | walk |
| 38 | up | r122 | yes | 0 | 4 | 0 | 4 | 0 | 0 | r122 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 39 | right | r122 | no | 0 | 4 | 0 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
