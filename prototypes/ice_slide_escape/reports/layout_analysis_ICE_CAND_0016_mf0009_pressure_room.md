# Level Analysis: ICE_CAND_0016_mf0009_pressure_room

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0016_mf0009_pressure_room
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
########.##
#.#.G..I..#
#.....I....
#..I..G.#.@
#.#...I...#
###########
```

## Shortest Solution

- Found: yes
- Cost: 41
- Depth: 41
- Explored states: 50783
- Inputs: up left left left down left left up up right down left down right left down right right up down right right up up up left left right down left left left left left left down right up left left left
- Events: walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_destroyed_d3 walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=34, push_ice=7, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=3, ice_destroyed_d3=1, ice_rebound_d4=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 11: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
########.##
#.#.G.@I..#
#.....I....
#..I..G.#..
#.#...I...#
###########
```

After:

```text
########.##
#.#.G..I..#
#.....@....
#..I..*.#..
#.#...I...#
###########
```

### Step 14: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
########.##
#.#.G..I..#
#..........
#..I.@*.#..
#.#...I...#
###########
```

After:

```text
########.##
#.#.G..I..#
#..........
#..I..+I#..
#.#...I...#
###########
```

### Step 17: right

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
########.##
#.#.G..I..#
#..........
#..I..GI#..
#.#..@I...#
###########
```

After:

```text
########.##
#.#.G..I..#
#..........
#..I..GI#..
#.#...@...#
###########
```

### Step 19: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
########.##
#.#.G..I..#
#..........
#..I..GI#..
#.#....@..#
###########
```

After:

```text
########.##
#.#.G..I..#
#......I...
#..I..G@#..
#.#.......#
###########
```

### Step 27: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.##
#.#.G..I@.#
#......I...
#..I..G.#..
#.#.......#
###########
```

After:

```text
########.##
#.#.*..@..#
#......I...
#..I..G.#..
#.#.......#
###########
```

### Step 30: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
########.##
#.#.*.....#
#......I@..
#..I..G.#..
#.#.......#
###########
```

After:

```text
########.##
#.#.*.....#
.......@...
#..I..G.#..
#.#.......#
###########
```

### Step 37: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.##
#.#.*.....#
...........
#.@I..G.#..
#.#.......#
###########
```

After:

```text
########.##
#.#.*.....#
...........
#..@..*.#..
#.#.......#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 58296
- Legal transitions: 166130
- Event-only illegal transitions: 6623
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 58296
- Legal transitions: 166130
- Budget: maxStates=100000
- Compressed regions: 1780
- Bidirectional transitions: 159202
- Commitment transitions: 6928
- Winning regions: 2
- Initial region: r0, states=32, dist=6, internalBidirectional=78, commitments=10, viableCommitments=2, deadCommitments=8, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r35@11 -> r101@14 -> r235@17 -> r359@19 -> r1011@27 -> r1158@30 -> r1559@37
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=1726, edges=6076, winReachable=26, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=0/7, branchingWinSccs=15, mergingWinSccs=13
- Handoff scriptiness: scope=returned_solution, scripted=0/7, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=32, dist=6, out=10, winOut=2, deadOut=8
- SCC path: s0@0 -> s86@11 -> s283@14 -> s333@17 -> s336@19 -> s337@27 -> s345@30 -> s769@37

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 32 | 10 | 2 | 8 | 0 | 0 | s86 | no |
| s86 | 11 | 5 | 32 | 9 | 2 | 7 | 1 | 1 | s283 | no |
| s283 | 14 | 4 | 32 | 9 | 2 | 7 | 1 | 1 | s333 | no |
| s333 | 17 | 4 | 33 | 8 | 1 | 7 | 2 | 2 | s336 | yes |
| s336 | 19 | 3 | 33 | 8 | 3 | 5 | 2 | 2 | s337 | no |
| s337 | 27 | 2 | 33 | 10 | 2 | 8 | 2 | 2 | s345 | no |
| s345 | 30 | 1 | 35 | 6 | 1 | 5 | 3 | 3 | s769 | yes |
| s769 | 37 | 0 | 35 | 6 | 0 | 0 | 4 | 4 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 11 | s86 | 32 | no | no | down | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s86 | 11 | 14 | s283 | 32 | no | no | right | push_ice, ice_stop_short:d1 | has_reposition_room |
| s283 | 14 | 17 | s333 | 32 | no | no | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s333 | 17 | 19 | s336 | 33 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s336 | 19 | 27 | s337 | 33 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s337 | 27 | 30 | s345 | 33 | no | no | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s345 | 30 | 37 | s769 | 35 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=58296, regions=1780, solution commitments=7
- Opening: commitments=10, viable=2, dead=8, optimal=2
- Win-continuation prefix: viable prefix=0/7, optimal prefix=0/7, forced viable commitments=2/7
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 10 | r0 | r35 | 6 | 2 | 8 | 2 | multiple optimal choices |
| 13 | r35 | r101 | 5 | 2 | 7 | 1 | forced optimal |
| 16 | r101 | r235 | 4 | 2 | 7 | 1 | multiple viable choices |
| 18 | r235 | r359 | 4 | 1 | 7 | 1 | forced optimal |
| 26 | r359 | r1011 | 3 | 3 | 5 | 3 | multiple optimal choices |
| 29 | r1011 | r1158 | 2 | 2 | 8 | 2 | multiple optimal choices |
| 36 | r1158 | r1559 | 1 | 1 | 5 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 32 | 10 | 2 | 8 | 2 | 2 | r35 | no | no | no |
| r35 | 11 | 5 | 32 | 9 | 2 | 7 | 1 | 1 | r101 | no | no | yes |
| r101 | 14 | 4 | 32 | 9 | 2 | 7 | 1 | 1 | r235 | no | no | no |
| r235 | 17 | 4 | 33 | 8 | 1 | 7 | 1 | 1 | r359 | no | yes | yes |
| r359 | 19 | 3 | 33 | 8 | 3 | 5 | 3 | 3 | r1011 | no | no | no |
| r1011 | 27 | 2 | 33 | 10 | 2 | 8 | 2 | 2 | r1158 | no | no | no |
| r1158 | 30 | 1 | 35 | 6 | 1 | 5 | 1 | 1 | r1559 | no | yes | yes |
| r1559 | 37 | 0 | 35 | 6 | 0 | 6 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 6 | 10 | 2 | 8 | 2 | 2 | r35 | yes | yes | yes | yes | no | no | walk |
| 11 | down | r35 | yes | 5 | 9 | 2 | 7 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 12 | left | r35 | no | 5 | 9 | 2 | 7 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r35 | no | 5 | 9 | 2 | 7 | 1 | 1 | r101 | yes | yes | yes | yes | no | yes | walk |
| 14 | right | r101 | yes | 4 | 9 | 2 | 7 | 1 | 1 | r101 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 15 | left | r101 | no | 4 | 9 | 2 | 7 | 1 | 1 | r101 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r101 | no | 4 | 9 | 2 | 7 | 1 | 1 | r235 | yes | yes | no | no | no | no | walk |
| 17 | right | r235 | yes | 4 | 8 | 1 | 7 | 1 | 1 | r235 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 18 | right | r235 | no | 4 | 8 | 1 | 7 | 1 | 1 | r359 | yes | yes | yes | yes | yes | yes | walk |
| 19 | up | r359 | yes | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 20 | down | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r359 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r359 | no | 3 | 8 | 3 | 5 | 3 | 3 | r1011 | yes | yes | yes | yes | no | no | walk |
| 27 | left | r1011 | yes | 2 | 10 | 2 | 8 | 2 | 2 | r1011 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 28 | right | r1011 | no | 2 | 10 | 2 | 8 | 2 | 2 | r1011 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r1011 | no | 2 | 10 | 2 | 8 | 2 | 2 | r1158 | yes | yes | yes | yes | no | no | walk |
| 30 | left | r1158 | yes | 1 | 6 | 1 | 5 | 1 | 1 | r1158 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 31 | left | r1158 | no | 1 | 6 | 1 | 5 | 1 | 1 | r1158 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r1158 | no | 1 | 6 | 1 | 5 | 1 | 1 | r1158 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r1158 | no | 1 | 6 | 1 | 5 | 1 | 1 | r1158 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r1158 | no | 1 | 6 | 1 | 5 | 1 | 1 | r1158 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | left | r1158 | no | 1 | 6 | 1 | 5 | 1 | 1 | r1158 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r1158 | no | 1 | 6 | 1 | 5 | 1 | 1 | r1559 | yes | yes | yes | yes | yes | yes | walk |
| 37 | right | r1559 | yes | 0 | 6 | 0 | 6 | 0 | 0 | r1559 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 38 | up | r1559 | no | 0 | 6 | 0 | 6 | 0 | 0 | r1559 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | left | r1559 | no | 0 | 6 | 0 | 6 | 0 | 0 | r1559 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | left | r1559 | no | 0 | 6 | 0 | 6 | 0 | 0 | r1559 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r1559 | no | 0 | 6 | 0 | 6 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
