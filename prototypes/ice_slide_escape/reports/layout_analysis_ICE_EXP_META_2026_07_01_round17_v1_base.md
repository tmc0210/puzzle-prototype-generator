# Level Analysis: ICE_EXP_META_2026_07_01_round17_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round17_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
.......#########..
#.I.....#..*.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..I...#
#.....#####.###..#
@....######.......
##################
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 4025
- Inputs: right up right right up up right right left up up up left left left left
- Events: walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk
- Event counts: walk=15, push_ice=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.I.....#..*.##..#
#....####..*...#.#
#...@IG##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.I.....#..*.##..#
#....####..*...#.#
#....@*##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```


## Graph Facts

- Status: complete
- Reachable states: 214594
- Legal transitions: 635617
- Event-only illegal transitions: 23668
- Winning states: 304
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
- Winning regions: 304
- Initial region: r0, states=33, dist=1, internalBidirectional=86, commitments=11, viableCommitments=11, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r13@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=6273, edges=28190, winReachable=1598, winning=302, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=1044, mergingWinSccs=1299
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=33, dist=1, out=11, winOut=11, deadOut=0
- SCC path: s0@0 -> s220@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 33 | 11 | 11 | 0 | 0 | 0 | s220 | no |
| s220 | 8 | 0 | 34 | 10 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s220 | 33 | no | no | right | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=214594, regions=6426, solution commitments=1
- Opening: commitments=11, viable=11, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r13 | 1 | 11 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 33 | 11 | 11 | 0 | 1 | 1 | r13 | no | no | yes |
| r13 | 8 | 0 | 34 | 10 | 10 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 1 | 11 | 11 | 0 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 8 | right | r13 | yes | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 9 | left | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r13 | no | 0 | 10 | 10 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
