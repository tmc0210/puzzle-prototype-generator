# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v1_postmerge_box_analog

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L downpull sidecar v1 postmerge box analog
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
####.#....#
#P#.......#
#L#.CC@...#
####GG....#
####.#....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 216
- Inputs: right up left down left down left down
- Events: pull_object:crate#2 walk walk push_object:crate#2 walk walk pull_object:crate#2 pull_object:crate#1
- Event counts: pull_object:crate#2=2, walk=4, push_object:crate#2=1, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
####.#....#
#P#.......#
#L#.CC@...#
####GG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#.......#
#L#.C.C@..#
####GG....#
####.#....#
###########
```

### Step 4: down

- Legal: true
- Events: push_object:crate#2

Before:

```text
###########
####.#....#
#P#...@...#
#L#.C.C...#
####GG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#.......#
#L#.C.@...#
####GGC...#
####.#....#
###########
```

### Step 7: left

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
####.#....#
#P#.......#
#L#.C.....#
####G+C...#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#.......#
#L#.C.....#
####+*....#
####.#....#
###########
```

### Step 8: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
####.#....#
#P#.......#
#L#.C.....#
####+*....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#.......#
#L#.......#
####**....#
####@#....#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2365
- Legal transitions: 6735
- Event-only illegal transitions: 0
- Winning states: 28
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2365
- Legal transitions: 6735
- Budget: maxStates=400000
- Compressed regions: 73
- Bidirectional transitions: 6146
- Commitment transitions: 311
- Winning regions: 2
- Initial region: r0, states=29, dist=2, internalBidirectional=78, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r13@7 -> r16@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=13, edges=12, winReachable=3, winning=2, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=2353, dist=0, out=11, winOut=0, deadOut=0
- SCC path: s0@0 -> s7@7 -> s8@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 2353 | 11 | 0 | 0 | 0 | 0 | s7 | no |
| s7 | 7 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s8 | yes |
| s8 | 8 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s7 | 2353 | no | no | left | pull_object:crate#2 | has_reposition_room |
| s7 | 7 | 8 | s8 | 1 | yes | yes | down | pull_object:crate#1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=2365, regions=73, solution commitments=3
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 3 | 1 | 2 | multiple optimal choices |
| 6 | r1 | r13 | 2 | 5 | 1 | 1 | forced optimal |
| 7 | r13 | r16 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 29 | 4 | 3 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 2 | 107 | 6 | 5 | 1 | 1 | 1 | r13 | no | no | yes |
| r13 | 7 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes |
| r16 | 8 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 2 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 2 | up | r1 | no | 2 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 2 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 2 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 5 | left | r1 | no | 2 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 2 | 6 | 5 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 7 | left | r13 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | pull_object:crate#2 |
| 8 | down | r16 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_runtime_smoke

Reality Anchor v0 runtime smoke behavior is executable through the registered adapter.

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
