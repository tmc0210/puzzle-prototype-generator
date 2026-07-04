# Level Analysis: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2

## Summary

- Prototype: reality_anchor
- Title: Dual lockstep v2
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
###.M..M.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 1169
- Inputs: right down right left up up right down left down right right right up left down right up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:crate#3 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: push_object:box_sticky_anchor=5, anchor_boundary_shift:box_sticky=6, sticky_to_box:n2=1, walk=9, push_object:crate#1=2, force_chain:n2=3, move_sticky_rigid=2, box_to_sticky:n1=1, sticky_merge:n1=2, push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, sticky_to_box:n1=3, pull_object:crate#3=1, pull_object:push_pull_anchor=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
###########
###.PL.####
##@BSGG####
###.MM...G#
###.M..M.##
###########
```

After:

```text
###########
###.PL.####
##.@BSG####
###.CM...G#
###.C..M.##
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
###.C..M.##
###########
```

After:

```text
###########
###.PL.####
##..BSG####
###.@MM..G#
###.C..M.##
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
###.C..M.##
###########
```

After:

```text
###########
###.@PL####
##..BSG####
###..MM..G#
###.C..M.##
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
###.C..M.##
###########
```

After:

```text
###########
###..PL####
##..@GG####
###.BS...G#
###.CMMM.##
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
###.CMMM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###.@BS..G#
###.CCMM.##
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
###.CCMM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###..@BS.G#
###.CCCM.##
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
###.CCCM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@BSG#
###.CCCC.##
###########
```

### Step 14: up

- Legal: true
- Events: pull_object:crate#3

Before:

```text
###########
###..PL####
##...GG####
###...@BSG#
###.CCCC.##
###########
```

After:

```text
###########
###..PL####
##...G+####
###...CBSG#
###.CC.C.##
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
###.CC.C.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@CBS#
###.CC.C.##
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
###.CC.C.##
###########
```

After:

```text
###########
###....####
##...PL####
###...@CBS#
###.CC.C.##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 4993
- Legal transitions: 12021
- Event-only illegal transitions: 0
- Winning states: 93
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 4993
- Legal transitions: 12021
- Budget: maxStates=300000
- Compressed regions: 725
- Bidirectional transitions: 10450
- Commitment transitions: 1522
- Winning regions: 11
- Initial region: r0, states=1, dist=10, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@3 -> r16@7 -> r24@8 -> r57@11 -> r75@12 -> r116@14 -> r187@17 -> r216@18 -> r236@19
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=390, edges=638, winReachable=36, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=11, mergingWinSccs=14
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=1, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s3@3 -> s99@7 -> s171@8 -> s176@11 -> s177@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 5 | 5 | 4 | 4 | 0 | 1 | 1 | s3 | no |
| s3 | 3 | 4 | 6 | 4 | 3 | 1 | 1 | 1 | s99 | no |
| s99 | 7 | 3 | 7 | 4 | 1 | 3 | 2 | 2 | s171 | yes |
| s171 | 8 | 2 | 9 | 3 | 2 | 1 | 1 | 1 | s176 | no |
| s176 | 11 | 1 | 10 | 2 | 2 | 0 | 1 | 1 | s177 | no |
| s177 | 12 | 0 | 109 | 7 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 | scripted_trivial_scc |
| s1 | 1 | 3 | s3 | 5 | no | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s3 | 3 | 7 | s99 | 6 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s99 | 7 | 8 | s171 | 7 | yes | yes | down | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1 | scripted_same_state_handoff |
| s171 | 8 | 11 | s176 | 9 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s176 | 11 | 12 | s177 | 10 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=4993, regions=725, solution commitments=10
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/10, optimal prefix=1/10, forced viable commitments=4/10
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 10 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r4 | 9 | 4 | 0 | 2 | multiple optimal choices |
| 6 | r4 | r16 | 8 | 3 | 1 | 1 | forced optimal |
| 7 | r16 | r24 | 7 | 1 | 3 | 1 | forced optimal |
| 10 | r24 | r57 | 6 | 2 | 1 | 1 | forced optimal |
| 11 | r57 | r75 | 5 | 2 | 0 | 1 | forced optimal |
| 13 | r75 | r116 | 4 | 2 | 0 | 1 | forced optimal |
| 16 | r116 | r187 | 3 | 1 | 1 | 1 | forced optimal |
| 17 | r187 | r216 | 2 | 1 | 1 | 1 | forced optimal |
| 18 | r216 | r236 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 10 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 9 | 5 | 4 | 4 | 0 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 8 | 6 | 4 | 3 | 1 | 1 | 1 | r16 | no | no | yes |
| r16 | 7 | 7 | 7 | 4 | 1 | 3 | 1 | 1 | r24 | no | yes | yes |
| r24 | 8 | 6 | 9 | 3 | 2 | 1 | 1 | 1 | r57 | no | no | yes |
| r57 | 11 | 5 | 10 | 2 | 2 | 0 | 1 | 1 | r75 | no | no | yes |
| r75 | 12 | 4 | 12 | 2 | 2 | 0 | 1 | 1 | r116 | no | no | yes |
| r116 | 14 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | r187 | no | yes | yes |
| r187 | 17 | 2 | 13 | 2 | 1 | 1 | 1 | 1 | r216 | no | yes | yes |
| r216 | 18 | 1 | 11 | 3 | 3 | 0 | 1 | 1 | r236 | no | no | yes |
| r236 | 19 | 0 | 12 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 10 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 9 | 4 | 4 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 |
| 2 | down | r1 | no | 9 | 4 | 4 | 0 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r4 | yes | 8 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | left | r4 | no | 8 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r4 | no | 8 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r4 | no | 8 | 4 | 3 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 7 | right | r16 | yes | 7 | 4 | 1 | 3 | 1 | 1 | r24 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r24 | yes | 6 | 3 | 2 | 1 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid, sticky_merge:n1 |
| 9 | left | r24 | no | 6 | 3 | 2 | 1 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r24 | no | 6 | 3 | 2 | 1 | 1 | 1 | r57 | yes | yes | yes | yes | no | yes | walk |
| 11 | right | r57 | yes | 5 | 2 | 2 | 0 | 1 | 1 | r75 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | right | r75 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r75 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 13 | right | r75 | no | 4 | 2 | 2 | 0 | 1 | 1 | r116 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 14 | up | r116 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r116 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#3 |
| 15 | left | r116 | no | 3 | 2 | 1 | 1 | 1 | 1 | r116 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r116 | no | 3 | 2 | 1 | 1 | 1 | 1 | r187 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r187 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r216 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky |
| 18 | up | r216 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r236 | yes | yes | yes | yes | no | yes | walk |
| 19 | down | r236 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
