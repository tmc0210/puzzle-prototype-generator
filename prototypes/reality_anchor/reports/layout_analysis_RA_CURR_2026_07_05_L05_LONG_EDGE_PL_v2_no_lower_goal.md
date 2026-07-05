# Level Analysis: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_lower_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#PL@G######
#.##.....##
#.#CG....##
#.C.#....##
#........##
###########
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 218
- Inputs: right down down right down down left left left left up up up up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, walk=12, pull_object:crate#1=1, push_object:push_pull_anchor=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#PL@G######
#.##.....##
#.#CG....##
#.C.#....##
#........##
###########
```

After:

```text
###########
#.PL+######
#.##.....##
#.#CG....##
#.C.#....##
#........##
###########
```

### Step 4: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#.PLG######
#.##.....##
#.#C+....##
#.C.#....##
#........##
###########
```

After:

```text
###########
#.PLG######
#.##.....##
#.#.*@...##
#.C.#....##
#........##
###########
```

### Step 15: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#@PLG######
#.##.....##
#.#.*....##
#.C.#....##
#........##
###########
```

After:

```text
###########
#.@PL######
#.##.....##
#.#.*....##
#.C.#....##
#........##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 4331
- Legal transitions: 11302
- Event-only illegal transitions: 0
- Winning states: 443
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4331
- Legal transitions: 11302
- Budget: maxStates=300000
- Compressed regions: 229
- Bidirectional transitions: 10262
- Commitment transitions: 641
- Winning regions: 21
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@4 -> r16@15
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=64, edges=110, winReachable=56, winning=11, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=22, mergingWinSccs=22
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s39@4 -> s44@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 27 | 4 | 4 | 0 | 1 | 1 | s39 | no |
| s39 | 4 | 1 | 195 | 4 | 3 | 1 | 1 | 1 | s44 | no |
| s44 | 15 | 0 | 196 | 3 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_trivial_scc |
| s1 | 1 | 4 | s39 | 27 | no | no | right | pull_object:crate#1 | has_reposition_room |
| s39 | 4 | 15 | s44 | 195 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4331, regions=229, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=3/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r2 | 2 | 4 | 0 | 1 | forced optimal |
| 14 | r2 | r16 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 27 | 4 | 4 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 4 | 1 | 27 | 4 | 3 | 1 | 1 | 1 | r16 | no | no | yes |
| r16 | 15 | 0 | 29 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | down | r1 | no | 2 | 4 | 4 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 2 | 4 | 4 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | walk |
| 4 | right | r2 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 5 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 15 | right | r16 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
