# Level Analysis: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_meta
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
..#.*....#.*....#...@
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
- Cost: 46
- Depth: 46
- Explored states: 1596
- Inputs: left down down down left left down left left left down left left up right down left left left up left left left down left left up right left up left left down left left up up up right right up up left left down left
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk
- Event counts: walk=40, push_ice=6, ice_rebound_d4=6

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#....*@#.#
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
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#.I..+.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 15: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#@I..G.#.#
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
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*.#.@..*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 21: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#....*@#....*.#.#
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
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#.I..+.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 28: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#@I..G.#....*.#.#
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
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#...#.@..*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 36: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#...#################
..#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#*#...###########...#
#@..#....*.#....*.#.#
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
.I#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#+#...###########...#
#...#....*.#....*.#.#
####....##.....######
#####################
#####################
#####################
```

### Step 45: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#####################
#####################
#@..#################
.I#.*....#.*....#....
#...##.....##.....#.#
#..################.#
#G#...###########...#
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
.@#.*....#.*....#....
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
- Initial region: r0, states=20, dist=6, internalBidirectional=42, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@8 -> r4@15 -> r10@21 -> r21@28 -> r37@36 -> r104@45
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

- Shape: states=109808, regions=3784, solution commitments=6
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/6, optimal prefix=1/6, forced viable commitments=3/6
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r1 | 6 | 1 | 1 | 1 | forced optimal |
| 14 | r1 | r4 | 5 | 2 | 2 | 2 | multiple optimal choices |
| 20 | r4 | r10 | 4 | 1 | 1 | 1 | forced optimal |
| 27 | r10 | r21 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 35 | r21 | r37 | 2 | 1 | 1 | 1 | forced optimal |
| 44 | r37 | r104 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 20 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 8 | 5 | 30 | 4 | 2 | 2 | 2 | 2 | r4 | no | no | no |
| r4 | 15 | 4 | 10 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 21 | 3 | 24 | 4 | 2 | 2 | 2 | 2 | r21 | no | no | no |
| r21 | 28 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | r37 | no | yes | yes |
| r37 | 36 | 1 | 24 | 4 | 2 | 2 | 1 | 1 | r104 | no | no | yes |
| r104 | 45 | 0 | 11 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r1 | yes | 5 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | left | r1 | no | 5 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r1 | no | 5 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 5 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | 5 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r1 | no | 5 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r1 | no | 5 | 4 | 2 | 2 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 15 | right | r4 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 16 | down | r4 | no | 4 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r4 | no | 4 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r4 | no | 4 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r4 | no | 4 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r4 | no | 4 | 2 | 1 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 21 | left | r10 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 22 | left | r10 | no | 3 | 4 | 2 | 2 | 2 | 2 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r10 | no | 3 | 4 | 2 | 2 | 2 | 2 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r10 | no | 3 | 4 | 2 | 2 | 2 | 2 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r10 | no | 3 | 4 | 2 | 2 | 2 | 2 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r10 | no | 3 | 4 | 2 | 2 | 2 | 2 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | up | r10 | no | 3 | 4 | 2 | 2 | 2 | 2 | r21 | yes | yes | yes | yes | no | no | walk |
| 28 | right | r21 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 29 | left | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | up | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | left | r21 | no | 2 | 2 | 1 | 1 | 1 | 1 | r37 | yes | yes | yes | yes | yes | yes | walk |
| 36 | up | r37 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 37 | up | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | up | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | up | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | left | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | left | r37 | no | 1 | 4 | 2 | 2 | 1 | 1 | r104 | yes | yes | yes | yes | no | yes | walk |
| 45 | down | r104 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r104 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 46 | left | r104 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

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
