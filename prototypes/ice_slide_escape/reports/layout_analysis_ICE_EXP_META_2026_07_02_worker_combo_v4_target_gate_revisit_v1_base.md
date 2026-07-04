# Level Analysis: ICE_EXP_META_2026_07_02_worker_combo_v4_target_gate_revisit_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_worker_combo_v4_target_gate_revisit_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4

## Initial State

```text
##.####.####
#.I.I....###
##.*..I.I###
@...########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 232
- Inputs: right right up up right right right right right up
- Events: walk walk walk push_ice ice_boundary_disappear:d1 walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk
- Event counts: walk=7, push_ice=3, ice_boundary_disappear:d1=1, ice_rebound_d4=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: up

- Legal: true
- Events: push_ice, ice_boundary_disappear:d1

Before:

```text
##.####.####
#.I.I....###
##@*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```

After:

```text
##.####.####
#.@.I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```

### Step 6: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##.####.####
#..@I....###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```

After:

```text
##.####.####
#...@..I.###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```

### Step 9: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##.####.####
#.....@I.###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```

After:

```text
##.####.####
#......@I###
##.*..I.I###
....########
....I....###
##..########
############
######.#####
#I......I..#
###....I.#..
#......I...#
#...*......#
############
```


## Graph Facts

- Status: complete
- Reachable states: 5623
- Legal transitions: 14740
- Event-only illegal transitions: 841
- Winning states: 30
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5623
- Legal transitions: 14740
- Budget: maxStates=120000
- Compressed regions: 240
- Bidirectional transitions: 14090
- Commitment transitions: 650
- Winning regions: 30
- Initial region: r0, states=11, dist=2, internalBidirectional=28, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r7@6 -> r24@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=228, edges=579, winReachable=69, winning=30, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=34, mergingWinSccs=44
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=11, dist=2, out=4, winOut=3, deadOut=1
- SCC path: s0@0 -> s33@4 -> s34@6 -> s40@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 11 | 4 | 3 | 1 | 0 | 0 | s33 | no |
| s33 | 4 | 2 | 15 | 5 | 4 | 1 | 1 | 1 | s34 | no |
| s34 | 6 | 1 | 20 | 7 | 6 | 1 | 1 | 1 | s40 | no |
| s40 | 9 | 0 | 23 | 7 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s33 | 11 | no | no | up | push_ice, ice_boundary_disappear:d1 | has_reposition_room |
| s33 | 4 | 6 | s34 | 15 | no | no | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s34 | 6 | 9 | s40 | 20 | no | no | right | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5623, regions=240, solution commitments=3
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=0/3
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 2 | 3 | 1 | 1 | multiple viable choices |
| 5 | r1 | r7 | 2 | 4 | 1 | 3 | multiple optimal choices |
| 8 | r7 | r24 | 1 | 6 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 11 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 4 | 2 | 15 | 5 | 4 | 1 | 3 | 3 | r7 | no | no | no |
| r7 | 6 | 1 | 20 | 7 | 6 | 1 | 1 | 1 | r24 | no | no | yes |
| r24 | 9 | 0 | 23 | 7 | 6 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 4 | 3 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 2 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | walk |
| 4 | up | r1 | yes | 2 | 5 | 4 | 1 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d1 |
| 5 | right | r1 | no | 2 | 5 | 4 | 1 | 3 | 3 | r7 | yes | yes | yes | yes | no | no | walk |
| 6 | right | r7 | yes | 1 | 7 | 6 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 7 | right | r7 | no | 1 | 7 | 6 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r7 | no | 1 | 7 | 6 | 1 | 1 | 1 | r24 | yes | yes | yes | yes | no | yes | walk |
| 9 | right | r24 | yes | 0 | 7 | 6 | 1 | 0 | 0 | r24 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 10 | up | r24 | no | 0 | 7 | 6 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_rebound_d4

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
