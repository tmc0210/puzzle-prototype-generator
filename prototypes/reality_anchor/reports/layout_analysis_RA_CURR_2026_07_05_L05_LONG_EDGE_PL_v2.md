# Level Analysis: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2
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
#.CG#....##
#........##
###########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 278
- Inputs: right down down right down down left left left left up right left up up up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk pull_object:crate#1 walk walk walk walk walk walk walk push_object:crate#2 walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, walk=13, pull_object:crate#1=1, push_object:crate#2=1, push_object:push_pull_anchor=1

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
#.CG#....##
#........##
###########
```

After:

```text
###########
#.PL+######
#.##.....##
#.#CG....##
#.CG#....##
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
#.CG#....##
#........##
###########
```

After:

```text
###########
#.PLG######
#.##.....##
#.#.*@...##
#.CG#....##
#........##
###########
```

### Step 12: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
###########
#.PLG######
#.##.....##
#.#.*....##
#@CG#....##
#........##
###########
```

After:

```text
###########
#.PLG######
#.##.....##
#.#.*....##
#.@*#....##
#........##
###########
```

### Step 17: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
#@PLG######
#.##.....##
#.#.*....##
#..*#....##
#........##
###########
```

After:

```text
###########
#.@PL######
#.##.....##
#.#.*....##
#..*#....##
#........##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 4331
- Legal transitions: 11302
- Event-only illegal transitions: 0
- Winning states: 28
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
- Winning regions: 2
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@4 -> r12@12 -> r20@17
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=64, edges=110, winReachable=19, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=8, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s39@4 -> s40@12 -> s45@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 27 | 4 | 4 | 0 | 1 | 1 | s39 | no |
| s39 | 4 | 2 | 195 | 4 | 3 | 1 | 1 | 1 | s40 | no |
| s40 | 12 | 1 | 26 | 3 | 2 | 1 | 2 | 2 | s45 | no |
| s45 | 17 | 0 | 27 | 2 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_trivial_scc |
| s1 | 1 | 4 | s39 | 27 | no | no | right | pull_object:crate#1 | has_reposition_room |
| s39 | 4 | 12 | s40 | 195 | no | no | right | push_object:crate#2 | has_reposition_room |
| s40 | 12 | 17 | s45 | 26 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=4331, regions=229, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=1/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r2 | 3 | 4 | 0 | 2 | multiple optimal choices |
| 11 | r2 | r12 | 2 | 3 | 1 | 2 | multiple optimal choices |
| 16 | r12 | r20 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 27 | 4 | 4 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 4 | 2 | 27 | 4 | 3 | 1 | 2 | 2 | r12 | no | no | no |
| r12 | 12 | 1 | 26 | 3 | 2 | 1 | 1 | 1 | r20 | no | no | yes |
| r20 | 17 | 0 | 27 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 4 | 4 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | down | r1 | no | 3 | 4 | 4 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 3 | 4 | 4 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 4 | right | r2 | yes | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 5 | down | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r2 | no | 2 | 4 | 3 | 1 | 2 | 2 | r12 | yes | yes | yes | yes | no | no | walk |
| 12 | right | r12 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 13 | left | r12 | no | 1 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r12 | no | 1 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r12 | no | 1 | 3 | 2 | 1 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r12 | no | 1 | 3 | 2 | 1 | 1 | 1 | r20 | yes | yes | yes | yes | no | yes | walk |
| 17 | right | r20 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
