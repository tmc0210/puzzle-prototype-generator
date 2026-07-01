# Level Analysis: ICE_EXP_META_2026_07_01_round17_v2_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round17_v2_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..*...#
#.....#####.###..#
@....######.......
##################
```

## Shortest Solution

- Found: yes
- Cost: 32
- Depth: 32
- Explored states: 115449
- Inputs: right up right right up up up left left up right down down right down down left up up right right right down left up up up up left left left left
- Events: walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_stop_short:d1 walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=28, push_ice=4, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_rebound_d4=2, ice_stop_short:d1=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 11: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4

Before:

```text
##################
.......#########..
#@*.....#..G.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..*...#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.+.....#..*.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..*...#
#.....#####.###..#
.....######.......
##################
```

### Step 18: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##################
.......#########..
#.G.....#..*.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..*...#
#.@...#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..*...#.#
#....IG##......I.#
##+.I.#####..*...#
#.....#####.###..#
.....######.......
##################
```

### Step 22: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..*...#.#
#...@IG##......I.#
##G.I.#####..*...#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..*...#.#
#....@*##......I.#
##G.I.#####..*...#
#.....#####.###..#
.....######.......
##################
```

### Step 24: left

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..*...#.#
#.....*##......I.#
##G.I@#####..*...#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....####..*...#.#
#.....*##......I.#
##*.@.#####..*...#
#.....#####.###..#
.....######.......
##################
```


## Graph Facts

- Status: complete
- Reachable states: 214594
- Legal transitions: 635617
- Event-only illegal transitions: 23668
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 214594
- Legal transitions: 635617
- Budget: maxStates=300000
- Compressed regions: 6426
- Bidirectional transitions: 604818
- Commitment transitions: 30799
- Winning regions: 1
- Initial region: r0, states=33, dist=4, internalBidirectional=86, commitments=11, viableCommitments=3, deadCommitments=8, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r46@11 -> r703@18 -> r1716@22 -> r2280@24
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=6273, edges=28190, winReachable=14, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=8, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=33, dist=4, out=11, winOut=3, deadOut=8
- SCC path: s0@0 -> s418@11 -> s480@18 -> s484@22 -> s495@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 33 | 11 | 3 | 8 | 0 | 0 | s418 | no |
| s418 | 11 | 3 | 34 | 7 | 3 | 4 | 1 | 1 | s480 | no |
| s480 | 18 | 2 | 34 | 9 | 2 | 7 | 1 | 1 | s484 | no |
| s484 | 22 | 1 | 35 | 8 | 1 | 7 | 2 | 2 | s495 | yes |
| s495 | 24 | 0 | 35 | 6 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 11 | s418 | 33 | no | no | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4 | has_reposition_room |
| s418 | 11 | 18 | s480 | 34 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s480 | 18 | 22 | s484 | 34 | no | no | right | push_ice, ice_stop_short:d1 | has_reposition_room |
| s484 | 22 | 24 | s495 | 35 | no | yes | left | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=214594, regions=6426, solution commitments=4
- Opening: commitments=11, viable=3, dead=8, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=1/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 10 | r0 | r46 | 4 | 3 | 8 | 2 | multiple optimal choices |
| 17 | r46 | r703 | 3 | 3 | 4 | 2 | multiple optimal choices |
| 21 | r703 | r1716 | 2 | 2 | 7 | 2 | multiple optimal choices |
| 23 | r1716 | r2280 | 1 | 1 | 7 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 33 | 11 | 3 | 8 | 2 | 2 | r46 | no | no | no |
| r46 | 11 | 3 | 34 | 7 | 3 | 4 | 2 | 2 | r703 | no | no | no |
| r703 | 18 | 2 | 34 | 9 | 2 | 7 | 2 | 2 | r1716 | no | no | no |
| r1716 | 22 | 1 | 35 | 8 | 1 | 7 | 1 | 1 | r2280 | no | yes | yes |
| r2280 | 24 | 0 | 35 | 6 | 0 | 6 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r0 | no | 4 | 11 | 3 | 8 | 2 | 2 | r46 | yes | yes | yes | yes | no | no | walk |
| 11 | right | r46 | yes | 3 | 7 | 3 | 4 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4 |
| 12 | down | r46 | no | 3 | 7 | 3 | 4 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r46 | no | 3 | 7 | 3 | 4 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r46 | no | 3 | 7 | 3 | 4 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r46 | no | 3 | 7 | 3 | 4 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r46 | no | 3 | 7 | 3 | 4 | 2 | 2 | r46 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r46 | no | 3 | 7 | 3 | 4 | 2 | 2 | r703 | yes | yes | yes | yes | no | no | walk |
| 18 | up | r703 | yes | 2 | 9 | 2 | 7 | 2 | 2 | r703 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 19 | up | r703 | no | 2 | 9 | 2 | 7 | 2 | 2 | r703 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r703 | no | 2 | 9 | 2 | 7 | 2 | 2 | r703 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r703 | no | 2 | 9 | 2 | 7 | 2 | 2 | r1716 | yes | yes | yes | yes | no | no | walk |
| 22 | right | r1716 | yes | 1 | 8 | 1 | 7 | 1 | 1 | r1716 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 23 | down | r1716 | no | 1 | 8 | 1 | 7 | 1 | 1 | r2280 | yes | yes | yes | yes | yes | yes | walk |
| 24 | left | r2280 | yes | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 25 | up | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | up | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | up | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | r2280 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r2280 | no | 0 | 6 | 0 | 6 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
