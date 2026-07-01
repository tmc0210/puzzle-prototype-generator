# Level Analysis: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#I..I....##
#@#####.###
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 178
- Inputs: up right right right right right up left down right right down
- Events: push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk
- Event counts: push_ice=4, ice_destroyed_d3=1, walk=8, ice_rebound_d4=2, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#I..I....##
#@#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#@..I....##
#.#####.###
```

### Step 4: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#..@I....##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#...@..I.##
#.#####.###
```

### Step 8: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#....#....#
#.#..#....#
#.G..I@####
#......I.##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..@.####
#......I.##
#.#####.###
```

### Step 11: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###########
#....#....#
#.#..#....#
#.*....####
#.....@I.##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*....####
#......@I##
#.#####.###
```


## Graph Facts

- Status: complete
- Reachable states: 496
- Legal transitions: 1312
- Event-only illegal transitions: 32
- Winning states: 1
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 496
- Legal transitions: 1312
- Budget: maxStates=80000
- Compressed regions: 20
- Bidirectional transitions: 1282
- Commitment transitions: 30
- Winning regions: 1
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@4 -> r7@8 -> r11@11
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=18, edges=25, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s6@4 -> s7@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 15 | 2 | 1 | 1 | 1 | 1 | s6 | yes |
| s6 | 4 | 1 | 54 | 3 | 1 | 2 | 1 | 1 | s7 | yes |
| s7 | 11 | 0 | 58 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | up | push_ice, ice_destroyed_d3 | scripted_trivial_scc |
| s1 | 1 | 4 | s6 | 15 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s6 | 4 | 11 | s7 | 54 | no | yes | right | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=496, regions=20, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=2/4
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r2 | 3 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r7 | 2 | 2 | 1 | 2 | multiple optimal choices |
| 10 | r7 | r11 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 15 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 4 | 2 | 27 | 3 | 2 | 1 | 2 | 2 | r7 | no | no | no |
| r7 | 8 | 1 | 27 | 3 | 2 | 1 | 1 | 1 | r11 | no | no | yes |
| r11 | 11 | 0 | 29 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 2 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r2 | yes | 2 | 3 | 2 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 5 | right | r2 | no | 2 | 3 | 2 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r2 | no | 2 | 3 | 2 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 2 | 3 | 2 | 1 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 8 | left | r7 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | down | r7 | no | 1 | 3 | 2 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r7 | no | 1 | 3 | 2 | 1 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | walk |
| 11 | right | r11 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 12 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
