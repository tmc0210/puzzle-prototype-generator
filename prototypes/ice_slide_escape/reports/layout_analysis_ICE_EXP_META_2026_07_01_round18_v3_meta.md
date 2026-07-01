# Level Analysis: ICE_EXP_META_2026_07_01_round18_v3_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round18_v3_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##.#####
.....I.#
.I..G.##
####.###
#....#.#
..#...I@
#...I..#
##.#####
```

## Shortest Solution

- Found: yes
- Cost: 33
- Depth: 33
- Explored states: 918
- Inputs: left down left left up up up up up left left left left down right up right right right down down down left down down right up up left left left down left
- Events: push_ice ice_destroyed_d3 walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk
- Event counts: push_ice=5, ice_destroyed_d3=2, walk=28, ice_rebound_d4=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
##.#####
.....I.#
.I..G.##
####.###
#....#.#
..#...I@
#...I..#
##.#####
```

After:

```text
##.#####
.....I.#
.I..G.##
####.###
#....#.#
..#...@.
#...I..#
##.#####
```

### Step 4: left

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
##.#####
.....I.#
.I..G.##
####.###
#....#.#
..#.....
#...I@.#
##.#####
```

After:

```text
##.#####
.....I.#
.I..G.##
####.###
#....#.#
..#.....
#...@..#
##.#####
```

### Step 15: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##.#####
.....I.#
@I..G.##
####.###
#....#.#
..#.....
#......#
##.#####
```

After:

```text
##.#####
.....I.#
.@..*.##
####.###
#....#.#
..#.....
#......#
##.#####
```

### Step 20: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##.#####
....@I.#
....*.##
####.###
#....#.#
..#.....
#......#
##.#####
```

After:

```text
##.#####
.....I.#
....+.##
####.###
#....#.#
..#.I...
#......#
##.#####
```

### Step 27: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##.#####
.....I.#
....G.##
####.###
#....#.#
..#.I...
#...@..#
##.#####
```

After:

```text
##.#####
.....I.#
....*.##
####.###
#....#.#
..#.@...
#......#
##.#####
```


## Graph Facts

- Status: complete
- Reachable states: 1829
- Legal transitions: 4516
- Event-only illegal transitions: 175
- Winning states: 4
- Budget: maxStates=30000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1829
- Legal transitions: 4516
- Budget: maxStates=30000
- Compressed regions: 67
- Bidirectional transitions: 4394
- Commitment transitions: 122
- Winning regions: 4
- Initial region: r0, states=1, dist=5, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@4 -> r12@15 -> r22@20 -> r30@27
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=67, edges=121, winReachable=19, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=1/5, branchingWinSccs=8, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=1/5, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@4 -> s3@15 -> s4@20 -> s11@27

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 4 | 30 | 5 | 3 | 2 | 1 | 1 | s2 | no |
| s2 | 4 | 3 | 31 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 15 | 2 | 10 | 3 | 2 | 1 | 1 | 1 | s4 | no |
| s4 | 20 | 1 | 31 | 5 | 2 | 3 | 1 | 1 | s11 | no |
| s11 | 27 | 0 | 20 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | left | push_ice, ice_destroyed_d3 | scripted_trivial_scc |
| s1 | 1 | 4 | s2 | 30 | no | no | left | push_ice, ice_destroyed_d3 | has_reposition_room |
| s2 | 4 | 15 | s3 | 31 | no | no | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s3 | 15 | 20 | s4 | 10 | no | no | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s4 | 20 | 27 | s11 | 31 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1829, regions=67, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/5, optimal prefix=1/5, forced viable commitments=1/5
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r2 | 4 | 3 | 2 | 2 | multiple optimal choices |
| 14 | r2 | r12 | 3 | 2 | 1 | 1 | forced optimal |
| 19 | r12 | r22 | 2 | 2 | 1 | 1 | forced optimal |
| 26 | r22 | r30 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 4 | 30 | 5 | 3 | 2 | 2 | 2 | r2 | no | no | no |
| r2 | 4 | 3 | 31 | 3 | 2 | 1 | 1 | 1 | r12 | no | no | yes |
| r12 | 15 | 2 | 10 | 3 | 2 | 1 | 1 | 1 | r22 | no | no | yes |
| r22 | 20 | 1 | 31 | 5 | 2 | 3 | 1 | 1 | r30 | no | no | yes |
| r30 | 27 | 0 | 20 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 4 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 2 | down | r1 | no | 4 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 4 | 5 | 3 | 2 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 4 | left | r2 | yes | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 5 | up | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r2 | no | 3 | 3 | 2 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | no | yes | walk |
| 15 | right | r12 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 16 | up | r12 | no | 2 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r12 | no | 2 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r12 | no | 2 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r12 | no | 2 | 3 | 2 | 1 | 1 | 1 | r22 | yes | yes | yes | yes | no | yes | walk |
| 20 | down | r22 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 21 | down | r22 | no | 1 | 5 | 2 | 3 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r22 | no | 1 | 5 | 2 | 3 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r22 | no | 1 | 5 | 2 | 3 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r22 | no | 1 | 5 | 2 | 3 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r22 | no | 1 | 5 | 2 | 3 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r22 | no | 1 | 5 | 2 | 3 | 1 | 1 | r30 | yes | yes | yes | yes | no | yes | walk |
| 27 | up | r30 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 28 | up | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r30 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
