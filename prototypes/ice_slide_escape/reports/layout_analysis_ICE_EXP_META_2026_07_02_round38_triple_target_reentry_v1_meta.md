# Level Analysis: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########@###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.*....##
####.....###.#.....###.....
###########################
```

## Shortest Solution

- Found: yes
- Cost: 30
- Depth: 30
- Explored states: 1304
- Inputs: down down down down right right right down right right up left up right right right right down right right right down right right up left down right right right
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=26, push_ice=4, ice_rebound_d4=4

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##@*....##.*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.+..I.##.*....##
####.....###.#.....###.....
###########################
```

### Step 12: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.G..I@##.*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*..@.##.*....##
####.....###.#.....###.....
###########################
```

### Step 19: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##@*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.+..I.##
####.....###.#.....###.....
###########################
```

### Step 26: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.G..I@##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.*..@.##
####.....###.#.....###.....
###########################
```


## Graph Facts

- Status: complete
- Reachable states: 4763
- Legal transitions: 11465
- Event-only illegal transitions: 358
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4763
- Legal transitions: 11465
- Budget: maxStates=300000
- Compressed regions: 140
- Bidirectional transitions: 11216
- Commitment transitions: 249
- Winning regions: 1
- Initial region: r0, states=19, dist=4, internalBidirectional=44, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r8@12 -> r25@19 -> r52@26
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=140, edges=249, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=19, dist=4, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s12@5 -> s19@12 -> s25@19 -> s27@26

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 19 | 3 | 1 | 2 | 0 | 0 | s12 | yes |
| s12 | 5 | 3 | 36 | 6 | 2 | 4 | 1 | 1 | s19 | no |
| s19 | 12 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | s25 | yes |
| s25 | 19 | 1 | 25 | 3 | 1 | 2 | 2 | 2 | s27 | yes |
| s27 | 26 | 0 | 9 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s12 | 19 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s12 | 5 | 12 | s19 | 36 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s19 | 12 | 19 | s25 | 16 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s25 | 19 | 26 | s27 | 25 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4763, regions=140, solution commitments=4
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=3/4
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 1 | 2 | 1 | forced optimal |
| 11 | r1 | r8 | 3 | 2 | 4 | 2 | multiple optimal choices |
| 18 | r8 | r25 | 2 | 1 | 1 | 1 | forced optimal |
| 25 | r25 | r52 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 19 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 3 | 36 | 6 | 2 | 4 | 2 | 2 | r8 | no | no | no |
| r8 | 12 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | r25 | no | yes | yes |
| r25 | 19 | 1 | 25 | 3 | 1 | 2 | 1 | 1 | r52 | no | yes | yes |
| r52 | 26 | 0 | 9 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 4 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 4 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 4 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 4 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r8 | yes | yes | yes | yes | no | no | walk |
| 12 | left | r8 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | up | r8 | no | 2 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r8 | no | 2 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r8 | no | 2 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r8 | no | 2 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r8 | no | 2 | 2 | 1 | 1 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r8 | no | 2 | 2 | 1 | 1 | 1 | 1 | r25 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r25 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | right | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r25 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r25 | no | 1 | 3 | 1 | 2 | 1 | 1 | r52 | yes | yes | yes | yes | yes | yes | walk |
| 26 | left | r52 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r52 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | down | r52 | no | 0 | 1 | 0 | 1 | 0 | 0 | r52 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r52 | no | 0 | 1 | 0 | 1 | 0 | 0 | r52 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r52 | no | 0 | 1 | 0 | 1 | 0 | 0 | r52 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r52 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
