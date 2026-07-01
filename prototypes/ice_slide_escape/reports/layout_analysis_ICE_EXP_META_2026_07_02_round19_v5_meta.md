# Level Analysis: ICE_EXP_META_2026_07_02_round19_v5_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round19_v5_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
########
.....I.#
.I..G.##
####.###
#....#.#
..#..#I.
#...I..#
######@#
```

## Shortest Solution

- Found: yes
- Cost: 31
- Depth: 31
- Explored states: 674
- Inputs: up left left up up up up up left left left left down right up right right right down down down left down down right up down right right up right
- Events: walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_stop_short:d1 walk
- Event counts: walk=26, push_ice=5, ice_destroyed_d3=1, ice_rebound_d4=3, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
########
.....I.#
.I..G.##
####.###
#....#.#
..#..#I.
#...I@.#
######.#
```

After:

```text
########
.....I.#
.I..G.##
####.###
#....#.#
..#..#I.
#...@..#
######.#
```

### Step 14: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########
.....I.#
@I..G.##
####.###
#....#.#
..#..#I.
#......#
######.#
```

After:

```text
########
.....I.#
.@..*.##
####.###
#....#.#
..#..#I.
#......#
######.#
```

### Step 19: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########
....@I.#
....*.##
####.###
#....#.#
..#..#I.
#......#
######.#
```

After:

```text
########
.....I.#
....+.##
####.###
#....#.#
..#.I#I.
#......#
######.#
```

### Step 26: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########
.....I.#
....G.##
####.###
#....#.#
..#.I#I.
#...@..#
######.#
```

After:

```text
########
.....I.#
....*.##
####.###
#....#.#
..#.@#I.
#......#
######.#
```

### Step 30: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
########
.....I.#
....*.##
####.###
#....#.#
..#..#I.
#.....@#
######.#
```

After:

```text
########
.....I.#
....*.##
####.###
#....#I#
..#..#@.
#......#
######.#
```


## Graph Facts

- Status: complete
- Reachable states: 922
- Legal transitions: 2272
- Event-only illegal transitions: 74
- Winning states: 2
- Budget: maxStates=20000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 922
- Legal transitions: 2272
- Budget: maxStates=20000
- Compressed regions: 40
- Bidirectional transitions: 2204
- Commitment transitions: 68
- Winning regions: 2
- Initial region: r0, states=3, dist=5, internalBidirectional=4, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@3 -> r8@14 -> r16@19 -> r27@26 -> r30@30
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=40, edges=68, winReachable=18, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=9, mergingWinSccs=9
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=3, dist=5, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@3 -> s4@14 -> s8@19 -> s9@26 -> s29@30

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 3 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 3 | 4 | 26 | 4 | 3 | 1 | 1 | 1 | s4 | no |
| s4 | 14 | 3 | 9 | 3 | 2 | 1 | 1 | 1 | s8 | no |
| s8 | 19 | 2 | 26 | 4 | 3 | 1 | 1 | 1 | s9 | no |
| s9 | 26 | 1 | 16 | 2 | 1 | 1 | 1 | 1 | s29 | yes |
| s29 | 30 | 0 | 18 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 3 | no | no | left | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1 | 3 | 14 | s4 | 26 | no | no | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s4 | 14 | 19 | s8 | 9 | no | no | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s8 | 19 | 26 | s9 | 26 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s9 | 26 | 30 | s29 | 16 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=922, regions=40, solution commitments=5
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r2 | 5 | 2 | 0 | 2 | multiple optimal choices |
| 13 | r2 | r8 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 18 | r8 | r16 | 3 | 2 | 1 | 1 | forced optimal |
| 25 | r16 | r27 | 2 | 3 | 1 | 2 | multiple optimal choices |
| 29 | r27 | r30 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 3 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 3 | 4 | 26 | 4 | 3 | 1 | 2 | 2 | r8 | no | no | no |
| r8 | 14 | 3 | 9 | 3 | 2 | 1 | 1 | 1 | r16 | no | no | yes |
| r16 | 19 | 2 | 26 | 4 | 3 | 1 | 2 | 2 | r27 | no | no | no |
| r27 | 26 | 1 | 16 | 2 | 1 | 1 | 1 | 1 | r30 | no | yes | yes |
| r30 | 30 | 0 | 18 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 5 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 3 | left | r2 | yes | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 4 | up | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 4 | 4 | 3 | 1 | 2 | 2 | r8 | yes | yes | yes | yes | no | no | walk |
| 14 | right | r8 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 15 | up | r8 | no | 3 | 3 | 2 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r8 | no | 3 | 3 | 2 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r8 | no | 3 | 3 | 2 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r8 | no | 3 | 3 | 2 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 19 | down | r16 | yes | 2 | 4 | 3 | 1 | 2 | 2 | r16 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | down | r16 | no | 2 | 4 | 3 | 1 | 2 | 2 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r16 | no | 2 | 4 | 3 | 1 | 2 | 2 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r16 | no | 2 | 4 | 3 | 1 | 2 | 2 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r16 | no | 2 | 4 | 3 | 1 | 2 | 2 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r16 | no | 2 | 4 | 3 | 1 | 2 | 2 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r16 | no | 2 | 4 | 3 | 1 | 2 | 2 | r27 | yes | yes | yes | yes | no | no | walk |
| 26 | up | r27 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | down | r27 | no | 1 | 2 | 1 | 1 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r27 | no | 1 | 2 | 1 | 1 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r27 | no | 1 | 2 | 1 | 1 | 1 | 1 | r30 | yes | yes | yes | yes | yes | yes | walk |
| 30 | up | r30 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 31 | right | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
