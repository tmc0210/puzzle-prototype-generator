# Level Analysis: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_lower_two_only

## Summary

- Prototype: reality_anchor
- Title: Dual lockstep v3 lower two only probe
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
#####..####
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 162
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
#####..####
###########
```

After:

```text
###########
###.PL.####
##.@BSG####
###.CM...G#
#####..####
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
#####..####
###########
```

After:

```text
###########
###.PL.####
##..BSG####
###.@MM..G#
#####..####
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
#####..####
###########
```

After:

```text
###########
###.@PL####
##..BSG####
###..MM..G#
#####..####
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
#####..####
###########
```

After:

```text
###########
###..PL####
##..@GG####
###.BS...G#
#####MM####
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
#####MM####
###########
```

After:

```text
###########
###..PL####
##...GG####
###.@BS..G#
#####CM####
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
#####CM####
###########
```

After:

```text
###########
###..PL####
##...GG####
###..@BS.G#
#####CC####
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
#####CC####
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@BSG#
#####CC####
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
#####CC####
###########
```

After:

```text
###########
###..PL####
##...G+####
###...CBSG#
#####C.####
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
#####C.####
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@CBS#
#####C.####
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
#####C.####
###########
```

After:

```text
###########
###....####
##...PL####
###...@CBS#
#####C.####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 296
- Legal transitions: 681
- Event-only illegal transitions: 0
- Winning states: 23
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 296
- Legal transitions: 681
- Budget: maxStates=300000
- Compressed regions: 42
- Bidirectional transitions: 618
- Commitment transitions: 61
- Winning regions: 3
- Initial region: r0, states=1, dist=10, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@3 -> r8@7 -> r10@8 -> r15@11 -> r18@12 -> r23@14 -> r26@17 -> r29@18 -> r30@19
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=27, edges=34, winReachable=8, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=1, sameEntryExit=3, forcedScripted=3, maxRun=1
- Initial SCC: s0, states=1, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s3@3 -> s8@7 -> s18@8 -> s23@11 -> s24@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 5 | 4 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 3 | 4 | 6 | 3 | 1 | 2 | 1 | 1 | s8 | yes |
| s8 | 7 | 3 | 6 | 3 | 1 | 2 | 2 | 2 | s18 | yes |
| s18 | 8 | 2 | 8 | 2 | 1 | 1 | 1 | 1 | s23 | yes |
| s23 | 11 | 1 | 9 | 1 | 1 | 0 | 1 | 1 | s24 | yes |
| s24 | 12 | 0 | 100 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 3 | s3 | 4 | no | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s3 | 3 | 7 | s8 | 6 | no | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s8 | 7 | 8 | s18 | 6 | yes | yes | down | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_same_state_handoff |
| s18 | 8 | 11 | s23 | 8 | no | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s23 | 11 | 12 | s24 | 9 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=296, regions=42, solution commitments=10
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/10, optimal prefix=1/10, forced viable commitments=8/10
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 10 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r4 | 9 | 2 | 1 | 2 | multiple optimal choices |
| 6 | r4 | r8 | 8 | 1 | 2 | 1 | forced optimal |
| 7 | r8 | r10 | 7 | 1 | 2 | 1 | forced optimal |
| 10 | r10 | r15 | 6 | 1 | 1 | 1 | forced optimal |
| 11 | r15 | r18 | 5 | 1 | 0 | 1 | forced optimal |
| 13 | r18 | r23 | 4 | 1 | 0 | 1 | forced optimal |
| 16 | r23 | r26 | 3 | 1 | 0 | 1 | forced optimal |
| 17 | r26 | r29 | 2 | 1 | 0 | 1 | forced optimal |
| 18 | r29 | r30 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 10 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 9 | 4 | 3 | 2 | 1 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 8 | 6 | 3 | 1 | 2 | 1 | 1 | r8 | no | yes | yes |
| r8 | 7 | 7 | 6 | 3 | 1 | 2 | 1 | 1 | r10 | no | yes | yes |
| r10 | 8 | 6 | 8 | 2 | 1 | 1 | 1 | 1 | r15 | no | yes | yes |
| r15 | 11 | 5 | 9 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes |
| r18 | 12 | 4 | 11 | 1 | 1 | 0 | 1 | 1 | r23 | yes | yes | yes |
| r23 | 14 | 3 | 10 | 1 | 1 | 0 | 1 | 1 | r26 | yes | yes | yes |
| r26 | 17 | 2 | 12 | 1 | 1 | 0 | 1 | 1 | r29 | yes | yes | yes |
| r29 | 18 | 1 | 10 | 2 | 2 | 0 | 1 | 1 | r30 | no | no | yes |
| r30 | 19 | 0 | 11 | 3 | 2 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 10 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 9 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r1 | no | 9 | 3 | 2 | 1 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r4 | yes | 8 | 3 | 1 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | left | r4 | no | 8 | 3 | 1 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r4 | no | 8 | 3 | 1 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r4 | no | 8 | 3 | 1 | 2 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 7 | right | r8 | yes | 7 | 3 | 1 | 2 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r10 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 9 | left | r10 | no | 6 | 2 | 1 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r10 | no | 6 | 2 | 1 | 1 | 1 | 1 | r15 | yes | yes | yes | yes | yes | yes | walk |
| 11 | right | r15 | yes | 5 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | right | r18 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 13 | right | r18 | no | 4 | 1 | 1 | 0 | 1 | 1 | r23 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 14 | up | r23 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 15 | left | r23 | no | 3 | 1 | 1 | 0 | 1 | 1 | r23 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r23 | no | 3 | 1 | 1 | 0 | 1 | 1 | r26 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r26 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r29 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky |
| 18 | up | r29 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r30 | yes | yes | yes | yes | no | yes | walk |
| 19 | down | r30 | yes | 0 | 3 | 2 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
