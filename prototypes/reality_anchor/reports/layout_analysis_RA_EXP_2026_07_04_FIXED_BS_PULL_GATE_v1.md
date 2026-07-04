# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S pull gate v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
####BS##
########
#C.P@..#
#.GL#M.#
#.#.G..#
########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 35
- Inputs: right down right up left left left down down right left
- Events: walk push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- Event counts: walk=8, push_object:sticky#1=1, move_sticky_rigid=2, push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1, pull_object:sticky#1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
####BS##
########
#C.P.@.#
#.GL#M.#
#.#.G..#
########
```

After:

```text
########
####BS##
########
#C.P...#
#.GL#@.#
#.#.GM.#
########
```

### Step 7: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
####BS##
########
#C.P@..#
#.GL#..#
#.#.GM.#
########
```

After:

```text
########
####BS##
########
#CP@...#
#.L.#..#
#.#.GM.#
########
```

### Step 11: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
########
####BS##
########
#CP....#
#.L.#..#
#.#.+M.#
########
```

After:

```text
########
####BS##
########
#CP....#
#.L.#..#
#.#@*..#
########
```


## Graph Facts

- Status: complete
- Reachable states: 44
- Legal transitions: 92
- Event-only illegal transitions: 0
- Winning states: 10
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 44
- Legal transitions: 92
- Budget: maxStates=300000
- Compressed regions: 4
- Bidirectional transitions: 84
- Commitment transitions: 5
- Winning regions: 1
- Initial region: r0, states=14, dist=3, internalBidirectional=26, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@7 -> r2@10 -> r3@11
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=2, edges=1, winReachable=2, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=14, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 14 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 7 | 0 | 30 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s1 | 14 | no | yes | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=44, regions=4, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 9 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 10 | r2 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 14 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 7 | 2 | 19 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 10 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 11 | 0 | 10 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 3 | right | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 7 | left | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r2 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 11 | left | r3 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |

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
