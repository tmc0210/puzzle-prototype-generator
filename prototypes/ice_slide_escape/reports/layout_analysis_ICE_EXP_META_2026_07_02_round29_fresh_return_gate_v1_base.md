# Level Analysis: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4

## Initial State

```text
#####################
#####################
#...#################
@.#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

## Shortest Solution

- Found: yes
- Cost: 34
- Depth: 34
- Explored states: 734
- Inputs: right up right right down right right right down right right up left down right right right up right right right down right right up left down right right right up right right right
- Events: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk
- Event counts: walk=30, push_ice=4, ice_rebound_d4=4

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#@*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

After:

```text
#####################
#####################
#...#################
..#.+..I.#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 13: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.G..I@#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

After:

```text
#####################
#####################
#...#################
..#.*..@.#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 19: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#@*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

After:

```text
#####################
#####################
#...#################
..#.*....#.+..I.#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 26: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#.G..I@#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

After:

```text
#####################
#####################
#...#################
..#.*....#.*..@.#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```


## Graph Facts

- Status: complete
- Reachable states: 109808
- Legal transitions: 243352
- Event-only illegal transitions: 9344
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 109808
- Legal transitions: 243352
- Budget: maxStates=300000
- Compressed regions: 3784
- Bidirectional transitions: 235280
- Commitment transitions: 8072
- Winning regions: 1
- Initial region: r0, states=11, dist=4, internalBidirectional=24, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@6 -> r5@13 -> r13@19 -> r26@26
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=3205, edges=6455, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2064, dist=0, out=100, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 2064 | 100 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=109808, regions=3784, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 4 | 1 | 1 | 1 | forced optimal |
| 12 | r2 | r5 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 18 | r5 | r13 | 2 | 1 | 1 | 1 | forced optimal |
| 25 | r13 | r26 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 11 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 6 | 3 | 21 | 4 | 2 | 2 | 2 | 2 | r5 | no | no | no |
| r5 | 13 | 2 | 10 | 2 | 1 | 1 | 1 | 1 | r13 | no | yes | yes |
| r13 | 19 | 1 | 30 | 4 | 2 | 2 | 1 | 1 | r26 | no | no | yes |
| r26 | 26 | 0 | 20 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r2 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 7 | right | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | walk |
| 13 | left | r5 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 14 | down | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r13 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | right | r13 | no | 1 | 4 | 2 | 2 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r13 | no | 1 | 4 | 2 | 2 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r13 | no | 1 | 4 | 2 | 2 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r13 | no | 1 | 4 | 2 | 2 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r13 | no | 1 | 4 | 2 | 2 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r13 | no | 1 | 4 | 2 | 2 | 1 | 1 | r26 | yes | yes | yes | yes | no | yes | walk |
| 26 | left | r26 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | down | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | r26 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r26 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

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
