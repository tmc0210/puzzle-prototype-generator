# Level Analysis: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3

## Summary

- Prototype: reality_anchor
- Title: Dual lockstep v3
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
####...M.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 477
- Inputs: right down right left up up right down left down right right right up left down right up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:crate#2 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: push_object:box_sticky_anchor=5, anchor_boundary_shift:box_sticky=6, sticky_to_box:n1=4, walk=9, push_object:crate#1=2, force_chain:n2=3, move_sticky_rigid=2, box_to_sticky:n1=1, sticky_merge:n1=2, push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, pull_object:crate#2=1, pull_object:push_pull_anchor=1

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
####...M.##
###########
```

After:

```text
###########
###.PL.####
##.@BSG####
###.CM...G#
####...M.##
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
####...M.##
###########
```

After:

```text
###########
###.PL.####
##..BSG####
###.@MM..G#
####...M.##
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
####...M.##
###########
```

After:

```text
###########
###.@PL####
##..BSG####
###..MM..G#
####...M.##
###########
```

### Step 8: down

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1

Before:

```text
###########
###.@PL####
##..BSG####
###..MM..G#
####...M.##
###########
```

After:

```text
###########
###..PL####
##..@GG####
###.BS...G#
####.MMM.##
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
####.MMM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###.@BS..G#
####.CMM.##
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
####.CMM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###..@BS.G#
####.CCM.##
###########
```

### Step 13: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###..PL####
##...GG####
###..@BS.G#
####.CCM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@BSG#
####.CCC.##
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
####.CCC.##
###########
```

After:

```text
###########
###..PL####
##...G+####
###...CBSG#
####.C.C.##
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
####.C.C.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@CBS#
####.C.C.##
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
####.C.C.##
###########
```

After:

```text
###########
###....####
##...PL####
###...@CBS#
####.C.C.##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2229
- Legal transitions: 5250
- Event-only illegal transitions: 0
- Winning states: 106
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2229
- Legal transitions: 5250
- Budget: maxStates=300000
- Compressed regions: 345
- Bidirectional transitions: 4612
- Commitment transitions: 612
- Winning regions: 11
- Initial region: r0, states=1, dist=10, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@3 -> r17@7 -> r27@8 -> r50@11 -> r60@12 -> r73@14 -> r87@17 -> r97@18 -> r103@19
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=206, edges=286, winReachable=31, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=8, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=1, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s5@3 -> s137@7 -> s140@8 -> s145@11 -> s146@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 5 | 4 | 3 | 3 | 0 | 1 | 1 | s5 | no |
| s5 | 3 | 4 | 7 | 4 | 3 | 1 | 1 | 1 | s137 | no |
| s137 | 7 | 3 | 8 | 4 | 1 | 3 | 2 | 2 | s140 | yes |
| s140 | 8 | 2 | 8 | 2 | 1 | 1 | 1 | 1 | s145 | yes |
| s145 | 11 | 1 | 10 | 2 | 2 | 0 | 1 | 1 | s146 | no |
| s146 | 12 | 0 | 109 | 7 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 3 | s5 | 4 | no | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s5 | 3 | 7 | s137 | 7 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s137 | 7 | 8 | s140 | 8 | yes | yes | down | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1 | scripted_same_state_handoff |
| s140 | 8 | 11 | s145 | 8 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s145 | 11 | 12 | s146 | 10 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=2229, regions=345, solution commitments=10
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/10, optimal prefix=1/10, forced viable commitments=5/10
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 10 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r4 | 9 | 3 | 0 | 2 | multiple optimal choices |
| 6 | r4 | r17 | 8 | 3 | 1 | 1 | forced optimal |
| 7 | r17 | r27 | 7 | 1 | 3 | 1 | forced optimal |
| 10 | r27 | r50 | 6 | 1 | 1 | 1 | forced optimal |
| 11 | r50 | r60 | 5 | 2 | 0 | 2 | multiple optimal choices |
| 13 | r60 | r73 | 4 | 2 | 0 | 2 | multiple optimal choices |
| 16 | r73 | r87 | 3 | 1 | 1 | 1 | forced optimal |
| 17 | r87 | r97 | 2 | 1 | 1 | 1 | forced optimal |
| 18 | r97 | r103 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 10 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 9 | 4 | 3 | 3 | 0 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 8 | 7 | 4 | 3 | 1 | 1 | 1 | r17 | no | no | yes |
| r17 | 7 | 7 | 8 | 4 | 1 | 3 | 1 | 1 | r27 | no | yes | yes |
| r27 | 8 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | r50 | no | yes | yes |
| r50 | 11 | 5 | 10 | 2 | 2 | 0 | 2 | 2 | r60 | no | no | no |
| r60 | 12 | 4 | 12 | 2 | 2 | 0 | 2 | 2 | r73 | no | no | no |
| r73 | 14 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | r87 | no | yes | yes |
| r87 | 17 | 2 | 13 | 2 | 1 | 1 | 1 | 1 | r97 | no | yes | yes |
| r97 | 18 | 1 | 11 | 3 | 3 | 0 | 1 | 1 | r103 | no | no | yes |
| r103 | 19 | 0 | 12 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 10 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 9 | 3 | 3 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r1 | no | 9 | 3 | 3 | 0 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r4 | yes | 8 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | left | r4 | no | 8 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r4 | no | 8 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r4 | no | 8 | 4 | 3 | 1 | 1 | 1 | r17 | yes | yes | yes | yes | no | yes | walk |
| 7 | right | r17 | yes | 7 | 4 | 1 | 3 | 1 | 1 | r27 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r27 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1 |
| 9 | left | r27 | no | 6 | 2 | 1 | 1 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r27 | no | 6 | 2 | 1 | 1 | 1 | 1 | r50 | yes | yes | yes | yes | yes | yes | walk |
| 11 | right | r50 | yes | 5 | 2 | 2 | 0 | 2 | 2 | r60 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | right | r60 | yes | 4 | 2 | 2 | 0 | 2 | 2 | r60 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 13 | right | r60 | no | 4 | 2 | 2 | 0 | 2 | 2 | r73 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 14 | up | r73 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 15 | left | r73 | no | 3 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r73 | no | 3 | 2 | 1 | 1 | 1 | 1 | r87 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r87 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r97 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky |
| 18 | up | r97 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r103 | yes | yes | yes | yes | no | yes | walk |
| 19 | down | r103 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
