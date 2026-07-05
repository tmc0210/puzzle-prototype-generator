# Level Analysis: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S join v2
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#......#
#B.C#..#
#S...@.#
###M.G.#
########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 56
- Inputs: up up left left down left down right right
- Events: walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=6, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: down

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
########
#..@...#
#B.C#..#
#S.....#
###M.G.#
########
```

After:

```text
########
#......#
#B.@#..#
#S.M...#
###M.G.#
########
```

### Step 8: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
#......#
#B..#..#
#S@M...#
###M.G.#
########
```

After:

```text
########
#......#
#B..#..#
#S.@M..#
###.MG.#
########
```

### Step 9: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
#......#
#B..#..#
#S.@M..#
###.MG.#
########
```

After:

```text
########
#......#
#B..#..#
#S..@M.#
###..m.#
########
```


## Graph Facts

- Status: complete
- Reachable states: 186
- Legal transitions: 488
- Event-only illegal transitions: 0
- Winning states: 17
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 186
- Legal transitions: 488
- Budget: maxStates=300000
- Compressed regions: 11
- Bidirectional transitions: 470
- Commitment transitions: 18
- Winning regions: 1
- Initial region: r0, states=17, dist=3, internalBidirectional=42, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@5 -> r5@8 -> r7@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=7, edges=6, winReachable=2, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=17, dist=1, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s5@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 17 | 2 | 1 | 1 | 0 | 0 | s5 | yes |
| s5 | 5 | 0 | 51 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s5 | 17 | no | yes | down | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=186, regions=11, solution commitments=3
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r2 | 3 | 1 | 1 | 1 | forced optimal |
| 7 | r2 | r5 | 2 | 1 | 0 | 1 | forced optimal |
| 8 | r5 | r7 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 17 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 5 | 2 | 17 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 8 | 1 | 17 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 9 | 0 | 17 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 3 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 5 | down | r2 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 6 | left | r2 | no | 2 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r2 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r5 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 9 | right | r7 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
