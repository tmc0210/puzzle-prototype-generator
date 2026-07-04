# Level Analysis: ICE_EXP_META_2026_07_02_round37_cross_axis_target_debt_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round37_cross_axis_target_debt_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########@#######
###########.#######
###########.#######
....###......######
###.*....##.*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 171
- Inputs: down down down down right right right down right right up left down right right right
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=14, push_ice=2, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##@*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

After:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##.+..I.##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

### Step 12: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##.G..I@##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

After:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##.*..@.##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```


## Graph Facts

- Status: complete
- Reachable states: 525
- Legal transitions: 1267
- Event-only illegal transitions: 34
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 525
- Legal transitions: 1267
- Budget: maxStates=300000
- Compressed regions: 18
- Bidirectional transitions: 1244
- Commitment transitions: 23
- Winning regions: 1
- Initial region: r0, states=19, dist=2, internalBidirectional=44, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r6@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=18, edges=23, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=19, dist=2, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s10@5 -> s12@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 19 | 3 | 1 | 2 | 0 | 0 | s10 | yes |
| s10 | 5 | 1 | 37 | 3 | 1 | 2 | 1 | 1 | s12 | yes |
| s12 | 12 | 0 | 9 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s10 | 19 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s10 | 5 | 12 | s12 | 37 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=525, regions=18, solution commitments=2
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 2 | 1 | 2 | 1 | forced optimal |
| 11 | r1 | r6 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 19 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 1 | 37 | 3 | 1 | 2 | 1 | 1 | r6 | no | yes | yes |
| r6 | 12 | 0 | 9 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | right | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 12 | left | r6 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | down | r6 | no | 0 | 1 | 0 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r6 | no | 0 | 1 | 0 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r6 | no | 0 | 1 | 0 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r6 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
