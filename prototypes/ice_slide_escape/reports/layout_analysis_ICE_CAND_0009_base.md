# Level Analysis: ICE_CAND_0009_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0009_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#.#############
#G#########G###
#.##########...
#..I.....##.###
#I..###########
@.#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

## Shortest Solution

- Found: yes
- Cost: 37
- Depth: 37
- Explored states: 565
- Inputs: right up up right right down down down down right down down down down down down right right right right right right right up up up up up up up up up up up right right right
- Events: walk push_ice ice_rebound_d4 walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_stop_short:d1 walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=33, push_ice=4, ice_rebound_d4=1, ice_pass_through_d5:len2=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###############
#.#############
#G#########G###
#.##########...
#..I.....##.###
#I..###########
.@#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

After:

```text
###############
#.#############
#*#########G###
#.##########...
#..I.....##.###
#@..###########
..#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

### Step 5: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###############
#.#############
#*#########G###
#.##########...
#.@I.....##.###
#...###########
..#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

After:

```text
###############
#.#############
#*#########G###
#.##########...
#..@.....##I###
#...###########
..#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

### Step 10: right

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
###############
#.#############
#*#########G###
#.##########...
#........##I###
#...###########
..#.###########
#.#.#######.###
#..@I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

After:

```text
###############
#.#############
#*#########G###
#.##########...
#........##I###
#...###########
..#.###########
#.#.#######.###
#...@...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

### Step 24: up

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len4, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###############
#.#############
#*#########G###
#.##########...
#........##I###
#...###########
..#.###########
#.#.#######.###
#.......###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####.......@###
```

After:

```text
###############
#.#############
#*#########*###
#.#########....
#........##.###
#...#######.###
..#.#######.###
#.#.#######.###
#.......###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######@###
####........###
```


## Graph Facts

- Status: complete
- Reachable states: 984
- Legal transitions: 2077
- Event-only illegal transitions: 38
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 984
- Legal transitions: 2077
- Budget: maxStates=100000
- Compressed regions: 28
- Bidirectional transitions: 2028
- Commitment transitions: 49
- Winning regions: 1
- Initial region: r0, states=15, dist=4, internalBidirectional=28, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r1@2 -> r3@5 -> r7@10 -> r18@24
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=28, edges=49, winReachable=10, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=5, mergingWinSccs=5
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=15, dist=4, out=4, winOut=3, deadOut=1
- SCC path: s0@0 -> s14@2 -> s15@5 -> s17@10 -> s18@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 15 | 4 | 3 | 1 | 0 | 0 | s14 | no |
| s14 | 2 | 3 | 14 | 3 | 2 | 1 | 1 | 1 | s15 | no |
| s15 | 5 | 2 | 20 | 2 | 1 | 1 | 2 | 2 | s17 | yes |
| s17 | 10 | 1 | 37 | 2 | 1 | 1 | 3 | 3 | s18 | yes |
| s18 | 24 | 0 | 51 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s14 | 15 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s14 | 2 | 5 | s15 | 14 | no | no | right | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s15 | 5 | 10 | s17 | 20 | no | yes | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s17 | 10 | 24 | s18 | 37 | no | yes | up | push_ice, ice_destroy_group_d6_plus:len4, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=984, regions=28, solution commitments=4
- Opening: commitments=4, viable=3, dead=1, optimal=3
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 13 step(s) after first entering a winning region
- Reading hints: 13 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 4 | 3 | 1 | 3 | multiple optimal choices |
| 4 | r1 | r3 | 3 | 2 | 1 | 2 | multiple optimal choices |
| 9 | r3 | r7 | 2 | 1 | 1 | 1 | forced optimal |
| 23 | r7 | r18 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 15 | 4 | 3 | 1 | 3 | 3 | r1 | no | no | no |
| r1 | 2 | 3 | 14 | 3 | 2 | 1 | 2 | 2 | r3 | no | no | no |
| r3 | 5 | 2 | 20 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 10 | 1 | 37 | 2 | 1 | 1 | 1 | 1 | r18 | no | yes | yes |
| r18 | 24 | 0 | 51 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 4 | 3 | 1 | 3 | 3 | r1 | yes | yes | yes | yes | no | no | walk |
| 2 | up | r1 | yes | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 3 | up | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 3 | 3 | 2 | 1 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 5 | right | r3 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1 |
| 6 | down | r3 | no | 2 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r3 | no | 2 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r3 | no | 2 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r3 | no | 2 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r7 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 11 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | walk |
| 24 | up | r18 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len4, slide_restart_after_group, ice_stop_short:d1 |
| 25 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r18 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
