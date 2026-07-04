# Level Analysis: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_no_right_box

## Summary

- Prototype: reality_anchor
- Title: Dual lockstep v3 no right box probe
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###.PL.####
##@BSGG####
###.MM...G#
####...#.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 330
- Inputs: right down right left up up right down left down right right right up left down right up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:crate#2 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: push_object:box_sticky_anchor=5, anchor_boundary_shift:box_sticky=6, sticky_to_box:n1=3, walk=9, push_object:crate#1=2, force_chain:n2=3, move_sticky_rigid=2, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, pull_object:crate#2=1, pull_object:push_pull_anchor=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###.PL.####
##@BSGG####
###.MM...G#
####...#.##
###########
```

After:

```text
###########
###.PL.####
##.@BSG####
###.CM...G#
####...#.##
###########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
###.PL.####
##..BSG####
###@CM...G#
####...#.##
###########
```

After:

```text
###########
###.PL.####
##..BSG####
###.@MM..G#
####...#.##
###########
```

### Step 7: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
###@PL.####
##..BSG####
###..MM..G#
####...#.##
###########
```

After:

```text
###########
###.@PL####
##..BSG####
###..MM..G#
####...#.##
###########
```

### Step 8: down

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
###.@PL####
##..BSG####
###..MM..G#
####...#.##
###########
```

After:

```text
###########
###..PL####
##..@GG####
###.BS...G#
####.MM#.##
###########
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###..PL####
##...GG####
###@BS...G#
####.MM#.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###.@BS..G#
####.CM#.##
###########
```

### Step 12: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###..PL####
##...GG####
###.@BS..G#
####.CM#.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###..@BS.G#
####.CC#.##
###########
```

### Step 13: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
###..PL####
##...GG####
###..@BS.G#
####.CC#.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@BSG#
####.CC#.##
###########
```

### Step 14: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
###..PL####
##...GG####
###...@BSG#
####.CC#.##
###########
```

After:

```text
###########
###..PL####
##...G+####
###...CBSG#
####.C.#.##
###########
```

### Step 17: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
###########
###..PL####
##...GG####
###..@CBSG#
####.C.#.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@CBS#
####.C.#.##
###########
```

### Step 19: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
###..PL####
##...G+####
###....CBS#
####.C.#.##
###########
```

After:

```text
###########
###....####
##...PL####
###...@CBS#
####.C.#.##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 538
- Legal transitions: 1263
- Event-only illegal transitions: 0
- Winning states: 38
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 538
- Legal transitions: 1263
- Budget: maxStates=300000
- Compressed regions: 68
- Bidirectional transitions: 1152
- Commitment transitions: 109
- Winning regions: 4
- Initial region: r0, states=1, dist=10, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@3 -> r13@7 -> r20@8 -> r31@11 -> r37@12 -> r43@14 -> r47@17 -> r51@18 -> r54@19
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=45, edges=63, winReachable=10, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=1, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=1, sameEntryExit=3, forcedScripted=3, maxRun=1
- Initial SCC: s0, states=1, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s5@3 -> s12@7 -> s23@8 -> s28@11 -> s29@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 5 | 4 | 3 | 2 | 1 | 1 | 1 | s5 | no |
| s5 | 3 | 4 | 20 | 4 | 1 | 3 | 1 | 1 | s12 | yes |
| s12 | 7 | 3 | 9 | 3 | 1 | 2 | 2 | 2 | s23 | yes |
| s23 | 8 | 2 | 8 | 2 | 1 | 1 | 1 | 1 | s28 | yes |
| s28 | 11 | 1 | 10 | 1 | 1 | 0 | 1 | 1 | s29 | yes |
| s29 | 12 | 0 | 109 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 3 | s5 | 4 | no | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s5 | 3 | 7 | s12 | 20 | no | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s12 | 7 | 8 | s23 | 9 | yes | yes | down | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_same_state_handoff |
| s23 | 8 | 11 | s28 | 8 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s28 | 11 | 12 | s29 | 10 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=538, regions=68, solution commitments=10
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/10, optimal prefix=1/10, forced viable commitments=7/10
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 10 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r4 | 9 | 2 | 1 | 2 | multiple optimal choices |
| 6 | r4 | r13 | 8 | 2 | 1 | 1 | forced optimal |
| 7 | r13 | r20 | 7 | 1 | 2 | 1 | forced optimal |
| 10 | r20 | r31 | 6 | 1 | 1 | 1 | forced optimal |
| 11 | r31 | r37 | 5 | 1 | 0 | 1 | forced optimal |
| 13 | r37 | r43 | 4 | 1 | 0 | 1 | forced optimal |
| 16 | r43 | r47 | 3 | 1 | 1 | 1 | forced optimal |
| 17 | r47 | r51 | 2 | 1 | 1 | 1 | forced optimal |
| 18 | r51 | r54 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 10 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 9 | 4 | 3 | 2 | 1 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 8 | 9 | 3 | 2 | 1 | 1 | 1 | r13 | no | no | yes |
| r13 | 7 | 7 | 9 | 3 | 1 | 2 | 1 | 1 | r20 | no | yes | yes |
| r20 | 8 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | r31 | no | yes | yes |
| r31 | 11 | 5 | 10 | 1 | 1 | 0 | 1 | 1 | r37 | yes | yes | yes |
| r37 | 12 | 4 | 12 | 1 | 1 | 0 | 1 | 1 | r43 | yes | yes | yes |
| r43 | 14 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | r47 | no | yes | yes |
| r47 | 17 | 2 | 13 | 2 | 1 | 1 | 1 | 1 | r51 | no | yes | yes |
| r51 | 18 | 1 | 11 | 3 | 3 | 0 | 1 | 1 | r54 | no | no | yes |
| r54 | 19 | 0 | 12 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 10 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 9 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r1 | no | 9 | 3 | 2 | 1 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r4 | yes | 8 | 3 | 2 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | left | r4 | no | 8 | 3 | 2 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r4 | no | 8 | 3 | 2 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r4 | no | 8 | 3 | 2 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 7 | right | r13 | yes | 7 | 3 | 1 | 2 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r20 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 9 | left | r20 | no | 6 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r20 | no | 6 | 2 | 1 | 1 | 1 | 1 | r31 | yes | yes | yes | yes | yes | yes | walk |
| 11 | right | r31 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r37 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | right | r37 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r37 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 13 | right | r37 | no | 4 | 1 | 1 | 0 | 1 | 1 | r43 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 14 | up | r43 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 15 | left | r43 | no | 3 | 2 | 1 | 1 | 1 | 1 | r43 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r43 | no | 3 | 2 | 1 | 1 | 1 | 1 | r47 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r47 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r51 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky |
| 18 | up | r51 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r54 | yes | yes | yes | yes | no | yes | walk |
| 19 | down | r54 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
