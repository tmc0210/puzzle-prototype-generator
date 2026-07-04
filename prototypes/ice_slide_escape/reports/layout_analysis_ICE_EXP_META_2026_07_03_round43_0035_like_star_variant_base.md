# Level Analysis: ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_base
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
#.*..I.####
#I..I....##
#@#####.###
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 89
- Inputs: up right right right right right right down
- Events: push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk
- Event counts: push_ice=3, ice_destroyed_d3=1, walk=5, ice_rebound_d4=1, ice_stop_short:d1=1

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
#.*..I.####
#I..I....##
#@#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
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
#.*..I.####
#..@I....##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#...@..I.##
#.#####.###
```

### Step 7: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#.....@I.##
#.#####.###
```

After:

```text
###########
#....#....#
#.#..#....#
#.*..I.####
#......@I##
#.#####.###
```


## Graph Facts

- Status: complete
- Reachable states: 3783
- Legal transitions: 9926
- Event-only illegal transitions: 406
- Winning states: 14
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3783
- Legal transitions: 9926
- Budget: maxStates=120000
- Compressed regions: 155
- Bidirectional transitions: 9588
- Commitment transitions: 338
- Winning regions: 14
- Initial region: r0, states=1, dist=2, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4 -> r10@7
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=139, edges=288, winReachable=36, winning=14, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=12, mergingWinSccs=19
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s27@4 -> s28@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 14 | 4 | 4 | 0 | 1 | 1 | s27 | no |
| s27 | 4 | 1 | 26 | 5 | 5 | 0 | 1 | 1 | s28 | no |
| s28 | 7 | 0 | 28 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | up | push_ice, ice_destroyed_d3 | scripted_trivial_scc |
| s1 | 1 | 4 | s27 | 14 | no | no | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s27 | 4 | 7 | s28 | 26 | no | no | right | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=3783, regions=155, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=1/3
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r3 | 1 | 4 | 0 | 1 | multiple viable choices |
| 6 | r3 | r10 | 1 | 5 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 14 | 4 | 4 | 0 | 1 | 1 | r3 | no | no | no |
| r3 | 4 | 1 | 26 | 5 | 5 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 7 | 0 | 28 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 2 | right | r1 | no | 1 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 1 | 4 | 4 | 0 | 1 | 1 | r3 | yes | yes | no | no | no | no | walk |
| 4 | right | r3 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 5 | right | r3 | no | 1 | 5 | 5 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r3 | no | 1 | 5 | 5 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 7 | right | r10 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 8 | down | r10 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
