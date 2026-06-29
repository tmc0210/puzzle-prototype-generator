# Level Analysis: ICE_CAND_0003_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0003_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: K_ice_runtime_smoke

## Initial State

```text
##########
#######..#
#####.#.I#
#....G...#
#.###.##.#
#.###.##G#
#.###I##.#
#.....####
#@...#####
```

## Shortest Solution

- Found: yes
- Cost: 35
- Depth: 35
- Explored states: 457
- Inputs: up up up up up right right right right right right up up right down down left left left left left left left down down down down right right right right up down left down
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk
- Event counts: walk=33, push_ice=2, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 15: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##########
#######.@#
#####.#.I#
#....G...#
#.###.##.#
#.###.##G#
#.###I##.#
#.....####
#....#####
```

After:

```text
##########
#######..#
#####.#.@#
#....G...#
#.###.##.#
#.###.##*#
#.###I##.#
#.....####
#....#####
```

### Step 32: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##########
#######..#
#####.#..#
#....G...#
#.###.##.#
#.###.##*#
#.###I##.#
#....@####
#....#####
```

After:

```text
##########
#######..#
#####.#..#
#....*...#
#.###.##.#
#.###.##*#
#.###@##.#
#.....####
#....#####
```


## Graph Facts

- Status: complete
- Reachable states: 540
- Legal transitions: 1244
- Event-only illegal transitions: 28
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 540
- Legal transitions: 1244
- Budget: maxStates=100000
- Compressed regions: 20
- Bidirectional transitions: 1216
- Commitment transitions: 28
- Winning regions: 1
- Initial region: r0, states=29, dist=2, internalBidirectional=62, commitments=4, viableCommitments=1, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r6@15 -> r18@32
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=20, edges=28, winReachable=3, winning=1, winSubgraph=single_win_chain
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=29, dist=2, out=4, winOut=1, deadOut=3
- SCC path: s0@0 -> s8@15 -> s11@32

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 29 | 4 | 1 | 3 | 0 | 0 | s8 | yes |
| s8 | 15 | 1 | 28 | 3 | 1 | 2 | 1 | 1 | s11 | yes |
| s11 | 32 | 0 | 19 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 15 | s8 | 29 | no | yes | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s8 | 15 | 32 | s11 | 28 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=540, regions=20, solution commitments=2
- Opening: commitments=4, viable=1, dead=3, optimal=1
- Forced chain: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 14 | r0 | r6 | 2 | 1 | 3 | 1 | forced optimal |
| 31 | r6 | r18 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 29 | 4 | 1 | 3 | 1 | 1 | r6 | no | yes | yes |
| r6 | 15 | 1 | 28 | 3 | 1 | 2 | 1 | 1 | r18 | no | yes | yes |
| r18 | 32 | 0 | 19 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 2 | 4 | 1 | 3 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 15 | down | r6 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 16 | down | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r6 | no | 1 | 3 | 1 | 2 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | walk |
| 32 | up | r18 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 33 | down | r18 | no | 0 | 2 | 0 | 2 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r18 | no | 0 | 2 | 0 | 2 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r18 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_ice_runtime_smoke

Ice blocks slide automatically after a successful push.

- Required events: push_ice
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=466
- Winning bypass: none found; complete search, explored=539


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
