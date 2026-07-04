# Level Analysis: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v2

## Summary

- Prototype: reality_anchor
- Title: Dual-axis anchor lock v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.#C.G.###
#.....P###
#@CBSMLG##
###..M..##
#####G####
##########
```

## Shortest Solution

- Found: yes
- Cost: 25
- Depth: 25
- Explored states: 1479
- Inputs: up right right down right up up right right down left down up left down left left up right right down right up down right
- Events: walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=15, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=3, pull_object:crate#2=1, pull_object:box_sticky_anchor=1, force_chain:n2=1, push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, push_object:sticky#1=3, move_sticky_rigid=3, push_object:crate#2=1, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#.#C.G.###
#..@..P###
#.CBSMLG##
###..M..##
#####G####
##########
```

After:

```text
##########
#.#C.G.###
#.....P###
#.C@.MLG##
###BSM..##
#####G####
##########
```

### Step 5: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#.#C.G.###
#.....P###
#.C@.MLG##
###BSM..##
#####G####
##########
```

After:

```text
##########
#.#C.G.###
#.....P###
#..C@MLG##
###BSM..##
#####G####
##########
```

### Step 6: up

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
##########
#.#C.G.###
#.....P###
#..C@MLG##
###BSM..##
#####G####
##########
```

After:

```text
##########
#.#C.G.###
#..C@.P###
#..BSMLG##
###..M..##
#####G####
##########
```

### Step 10: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.#C.G@###
#..C..P###
#..BSMLG##
###..M..##
#####G####
##########
```

After:

```text
##########
#.#C.G.###
#..C..@###
#..BSMPG##
###..ML.##
#####G####
##########
```

### Step 12: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.#C.G.###
#..C.@.###
#..BSMPG##
###..ML.##
#####G####
##########
```

After:

```text
##########
#.#C.G.###
#..C...###
#..BS@PG##
###..ML.##
#####m####
##########
```

### Step 15: down

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#.#C.G.###
#..C@..###
#..BS.PG##
###..ML.##
#####m####
##########
```

After:

```text
##########
#.#C.G.###
#..C...###
#...@.PG##
###BSML.##
#####m####
##########
```

### Step 19: right

- Legal: true
- Events: push_object:crate#2, box_to_sticky:n1

Before:

```text
##########
#.#C.G.###
#.@C...###
#.....PG##
###BSML.##
#####m####
##########
```

After:

```text
##########
#.#C.G.###
#..@M..###
#.....PG##
###BSML.##
#####m####
##########
```

### Step 20: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.#C.G.###
#..@M..###
#.....PG##
###BSML.##
#####m####
##########
```

After:

```text
##########
#.#C.G.###
#...@M.###
#.....PG##
###BSML.##
#####m####
##########
```

### Step 23: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#.#C.G.###
#....M.###
#....@PG##
###BSML.##
#####m####
##########
```

After:

```text
##########
#.#C.m.###
#....@.###
#.....PG##
###BSML.##
#####m####
##########
```

### Step 25: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.#C.m.###
#......###
#....@PG##
###BSML.##
#####m####
##########
```

After:

```text
##########
#.#C.m.###
#......###
#.....@P##
###BSM.L##
#####m####
##########
```


## Graph Facts

- Status: complete
- Reachable states: 3128
- Legal transitions: 7877
- Event-only illegal transitions: 0
- Winning states: 16
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3128
- Legal transitions: 7877
- Budget: maxStates=300000
- Compressed regions: 286
- Bidirectional transitions: 7206
- Commitment transitions: 594
- Winning regions: 1
- Initial region: r0, states=13, dist=9, internalBidirectional=26, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r2@6 -> r6@10 -> r12@12 -> r29@15 -> r68@19 -> r86@20 -> r129@23 -> r153@25
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=193, edges=308, winReachable=14, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=2/7, branchingWinSccs=7, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=1/7, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=13, dist=7, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s28@5 -> s29@6 -> s105@10 -> s137@12 -> s171@15 -> s175@23 -> s187@25

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 13 | 2 | 1 | 1 | 0 | 0 | s28 | yes |
| s28 | 5 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | s29 | yes |
| s29 | 6 | 5 | 26 | 4 | 2 | 2 | 1 | 1 | s105 | no |
| s105 | 10 | 4 | 6 | 3 | 3 | 0 | 1 | 1 | s137 | no |
| s137 | 12 | 3 | 7 | 4 | 3 | 1 | 1 | 1 | s171 | no |
| s171 | 15 | 2 | 56 | 7 | 2 | 5 | 3 | 3 | s175 | no |
| s175 | 23 | 1 | 14 | 3 | 1 | 2 | 1 | 1 | s187 | yes |
| s187 | 25 | 0 | 16 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s28 | 13 | no | yes | right | pull_object:crate#2 | has_reposition_room |
| s28 | 5 | 6 | s29 | 1 | yes | yes | up | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s29 | 6 | 10 | s105 | 26 | no | no | down | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s105 | 10 | 12 | s137 | 6 | no | no | down | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s137 | 12 | 15 | s171 | 7 | no | no | down | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s171 | 15 | 23 | s175 | 56 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s175 | 23 | 25 | s187 | 14 | no | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=3128, regions=286, solution commitments=9
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/9, optimal prefix=3/9, forced viable commitments=3/9
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 9 | 1 | 1 | 1 | forced optimal |
| 5 | r1 | r2 | 8 | 1 | 0 | 1 | forced optimal |
| 9 | r2 | r6 | 7 | 2 | 0 | 1 | forced optimal |
| 11 | r6 | r12 | 6 | 3 | 0 | 2 | multiple optimal choices |
| 14 | r12 | r29 | 5 | 3 | 1 | 2 | multiple optimal choices |
| 18 | r29 | r68 | 4 | 3 | 0 | 2 | multiple optimal choices |
| 19 | r68 | r86 | 3 | 3 | 2 | 2 | multiple optimal choices |
| 22 | r86 | r129 | 2 | 3 | 2 | 2 | multiple optimal choices |
| 24 | r129 | r153 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 9 | 13 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 5 | 8 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 7 | 7 | 2 | 2 | 0 | 1 | 1 | r6 | no | no | yes |
| r6 | 10 | 6 | 6 | 3 | 3 | 0 | 2 | 2 | r12 | no | no | no |
| r12 | 12 | 5 | 7 | 4 | 3 | 1 | 2 | 2 | r29 | no | no | no |
| r29 | 15 | 4 | 14 | 3 | 3 | 0 | 2 | 2 | r68 | no | no | no |
| r68 | 19 | 3 | 14 | 5 | 3 | 2 | 2 | 2 | r86 | no | no | no |
| r86 | 20 | 2 | 14 | 5 | 3 | 2 | 2 | 2 | r129 | no | no | no |
| r129 | 23 | 1 | 14 | 3 | 1 | 2 | 1 | 1 | r153 | no | yes | yes |
| r153 | 25 | 0 | 16 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 9 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 9 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 9 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 9 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 9 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 5 | right | r1 | yes | 8 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | pull_object:crate#2 |
| 6 | up | r2 | yes | 7 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky |
| 7 | up | r2 | no | 7 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 7 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r2 | no | 7 | 2 | 2 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 10 | down | r6 | yes | 6 | 3 | 3 | 0 | 2 | 2 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 11 | left | r6 | no | 6 | 3 | 3 | 0 | 2 | 2 | r12 | yes | yes | yes | yes | no | no | walk |
| 12 | down | r12 | yes | 5 | 4 | 3 | 1 | 2 | 2 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 13 | up | r12 | no | 5 | 4 | 3 | 1 | 2 | 2 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r12 | no | 5 | 4 | 3 | 1 | 2 | 2 | r29 | yes | yes | yes | yes | no | no | walk |
| 15 | down | r29 | yes | 4 | 3 | 3 | 0 | 2 | 2 | r29 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 16 | left | r29 | no | 4 | 3 | 3 | 0 | 2 | 2 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r29 | no | 4 | 3 | 3 | 0 | 2 | 2 | r29 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r29 | no | 4 | 3 | 3 | 0 | 2 | 2 | r68 | yes | yes | yes | yes | no | no | walk |
| 19 | right | r68 | yes | 3 | 5 | 3 | 2 | 2 | 2 | r86 | yes | yes | yes | yes | no | no | push_object:crate#2, box_to_sticky:n1 |
| 20 | right | r86 | yes | 2 | 5 | 3 | 2 | 2 | 2 | r86 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 21 | down | r86 | no | 2 | 5 | 3 | 2 | 2 | 2 | r86 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r86 | no | 2 | 5 | 3 | 2 | 2 | 2 | r129 | yes | yes | yes | yes | no | no | walk |
| 23 | up | r129 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r129 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 24 | down | r129 | no | 1 | 3 | 1 | 2 | 1 | 1 | r153 | yes | yes | yes | yes | yes | yes | walk |
| 25 | right | r153 | yes | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
