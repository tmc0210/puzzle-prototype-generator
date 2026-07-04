# Level Analysis: ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#########...##
#########I....
#########..#.#
#########.#*I.
@........*....
#########.#.##
##############
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 177
- Inputs: right right right right right right right right right up up right up up left down right right right down down right down
- Events: walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_stop_short:d1 walk walk
- Event counts: walk=20, push_ice=3, ice_boundary_disappear:d4=1, ice_rebound_d4=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 9: right

- Legal: true
- Events: push_ice, ice_boundary_disappear:d4

Before:

```text
##############
#########...##
#########I....
#########..#.#
#########.#*I.
........@*....
#########.#.##
##############
```

After:

```text
##############
#########...##
#########I....
#########..#.#
#########.#*I.
.........+....
#########.#.##
##############
```

### Step 16: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##############
#########@..##
#########I....
#########..#.#
#########.#*I.
.........G....
#########.#.##
##############
```

After:

```text
##############
#########...##
#########@....
#########..#.#
#########.#*I.
.........*....
#########.#.##
##############
```

### Step 21: down

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##############
#########...##
#########.....
#########..#@#
#########.#*I.
.........*....
#########.#.##
##############
```

After:

```text
##############
#########...##
#########.....
#########..#.#
#########.#*@.
.........*..I.
#########.#.##
##############
```


## Graph Facts

- Status: complete
- Reachable states: 476
- Legal transitions: 1065
- Event-only illegal transitions: 58
- Winning states: 3
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 476
- Legal transitions: 1065
- Budget: maxStates=100000
- Compressed regions: 20
- Bidirectional transitions: 1030
- Commitment transitions: 35
- Winning regions: 3
- Initial region: r0, states=9, dist=3, internalBidirectional=16, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@9 -> r4@16 -> r11@21
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=20, edges=31, winReachable=10, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@9 -> s8@16 -> s9@21

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 9 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 9 | 2 | 28 | 4 | 3 | 1 | 1 | 1 | s8 | no |
| s8 | 16 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | s9 | yes |
| s9 | 21 | 0 | 15 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 9 | s1 | 9 | no | yes | right | push_ice, ice_boundary_disappear:d4 | has_reposition_room |
| s1 | 9 | 16 | s8 | 28 | no | no | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s8 | 16 | 21 | s9 | 12 | no | yes | down | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=476, regions=20, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=2/3
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 15 | r1 | r4 | 2 | 3 | 1 | 2 | multiple optimal choices |
| 20 | r4 | r11 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 9 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 9 | 2 | 28 | 4 | 3 | 1 | 2 | 2 | r4 | no | no | no |
| r4 | 16 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | r11 | no | yes | yes |
| r11 | 21 | 0 | 15 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r1 | yes | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d4 |
| 10 | up | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 16 | down | r4 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | right | r4 | no | 1 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r4 | no | 1 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r4 | no | 1 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r4 | no | 1 | 2 | 1 | 1 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | walk |
| 21 | down | r11 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 22 | right | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r11 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
