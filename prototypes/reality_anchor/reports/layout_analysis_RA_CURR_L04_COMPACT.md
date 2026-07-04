# Level Analysis: RA_CURR_L04_COMPACT

## Summary

- Prototype: reality_anchor
- Title: L04 compact
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#..PL...#
#.G..@C.#
#########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 43
- Inputs: left left left up right right right down left left
- Events: pull_object:crate#1 pull_object:crate#1 walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 push_object:crate#1
- Event counts: pull_object:crate#1=2, walk=3, push_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=3, push_object:crate#1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#..PL...#
#.G..@C.#
#########
```

After:

```text
#########
#..PL...#
#.G.@C..#
#########
```

### Step 2: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#..PL...#
#.G.@C..#
#########
```

After:

```text
#########
#..PL...#
#.G@C...#
#########
```

### Step 5: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.@PL...#
#.G.C...#
#########
```

After:

```text
#########
#..@PL..#
#.G.C...#
#########
```

### Step 6: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#..@PL..#
#.G.C...#
#########
```

After:

```text
#########
#...@PL.#
#.G.C...#
#########
```

### Step 7: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#...@PL.#
#.G.C...#
#########
```

After:

```text
#########
#....@PL#
#.G.C...#
#########
```

### Step 9: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.....PL#
#.G.C@..#
#########
```

After:

```text
#########
#.....PL#
#.GC@...#
#########
```

### Step 10: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.....PL#
#.GC@...#
#########
```

After:

```text
#########
#.....PL#
#.*@....#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 124
- Legal transitions: 302
- Event-only illegal transitions: 0
- Winning states: 11
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 124
- Legal transitions: 302
- Budget: maxStates=300000
- Compressed regions: 16
- Bidirectional transitions: 282
- Commitment transitions: 20
- Winning regions: 1
- Initial region: r0, states=2, dist=6, internalBidirectional=2, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@5 -> r5@6 -> r7@7 -> r9@9 -> r11@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 5
- Forced optimal prefix length: 6

### SCC Irreversible Progress

- Shape: sccs=14, edges=16, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=3/4, trivial=0, sameEntryExit=3, forcedScripted=3, maxRun=2
- Initial SCC: s0, states=2, dist=4, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@5 -> s3@6 -> s4@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 2 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 6 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 5 | 2 | 6 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 6 | 1 | 7 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 7 | 0 | 33 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 2 | yes | yes | left | pull_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 5 | s2 | 6 | no | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s2 | 5 | 6 | s3 | 6 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s3 | 6 | 7 | s4 | 7 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=124, regions=16, solution commitments=6
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=5/6, optimal prefix=6/6, forced viable commitments=5/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 5 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 1 | 1 | 1 | forced optimal |
| 4 | r1 | r4 | 5 | 1 | 0 | 1 | forced optimal |
| 5 | r4 | r5 | 4 | 1 | 1 | 1 | forced optimal |
| 6 | r5 | r7 | 3 | 1 | 1 | 1 | forced optimal |
| 8 | r7 | r9 | 2 | 1 | 1 | 1 | forced optimal |
| 9 | r9 | r11 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 5 | 6 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 5 | 4 | 6 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 6 | 3 | 7 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 7 | 2 | 11 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 9 | 1 | 11 | 2 | 2 | 0 | 1 | 1 | r11 | no | no | yes |
| r11 | 10 | 0 | 11 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 2 | left | r1 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 3 | left | r1 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 5 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r4 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 6 | right | r5 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 7 | right | r7 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r7 | no | 2 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 9 | left | r9 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 10 | left | r11 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
