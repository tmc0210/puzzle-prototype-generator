# Level Analysis: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#@.#G######
#.CCC....G#
####.....##
####BS#####
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 125
- Inputs: down right right right down right right right right up left down left left left up right right right
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=11, push_object:crate#1=4, force_chain:n3=2, box_to_sticky:n1=3, move_sticky_rigid=6, sticky_merge:n1=2, force_chain:n2=1, push_object:sticky#1=4, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, box_to_sticky:n1

Before:

```text
###########
#..#G######
#@CCC....G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G######
#.@CCM...G#
####.....##
####BS#####
###########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#..#G######
#.@CCM...G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G######
#..@CMM..G#
####.....##
####BS#####
###########
```

### Step 4: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#..#G######
#..@CMM..G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G######
#...@MMM.G#
####.....##
####BS#####
###########
```

### Step 11: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
###########
#..#G######
#....MMM@G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G######
#...CMM@.G#
####.....##
####BS#####
###########
```

### Step 16: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
###########
#..#G######
#...CMM..G#
####@....##
####BS#####
###########
```

After:

```text
###########
#..#*######
#...@MM..G#
####.....##
####BS#####
###########
```

### Step 17: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..#*######
#...@MM..G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#*######
#....@MM.G#
####.....##
####BS#####
###########
```

### Step 18: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..#*######
#....@MM.G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#*######
#.....@MMG#
####.....##
####BS#####
###########
```

### Step 19: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..#*######
#.....@MMG#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#*######
#......@Mm#
####.....##
####BS#####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 347
- Legal transitions: 824
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 347
- Legal transitions: 824
- Budget: maxStates=300000
- Compressed regions: 36
- Bidirectional transitions: 772
- Commitment transitions: 52
- Winning regions: 4
- Initial region: r0, states=3, dist=8, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r3@4 -> r6@11 -> r10@16 -> r13@17 -> r17@18 -> r20@19
- Forced commitment prefix length: 3
- Forced viable prefix length: 4
- Forced optimal prefix length: 8

### SCC Irreversible Progress

- Shape: sccs=29, edges=34, winReachable=18, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=7, forcedWinPrefix=4/7, branchingWinSccs=5, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=3/7, trivial=0, sameEntryExit=3, forcedScripted=3, maxRun=2
- Initial SCC: s0, states=3, dist=7, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@3 -> s3@4 -> s6@11 -> s22@16 -> s23@18 -> s24@19

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 6 | 4 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 3 | 5 | 5 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 4 | 4 | 14 | 2 | 1 | 1 | 1 | 1 | s6 | yes |
| s6 | 11 | 3 | 8 | 2 | 2 | 0 | 1 | 1 | s22 | no |
| s22 | 16 | 2 | 28 | 2 | 1 | 1 | 1 | 1 | s23 | yes |
| s23 | 18 | 1 | 13 | 1 | 1 | 0 | 1 | 1 | s24 | yes |
| s24 | 19 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | right | push_object:crate#1, force_chain:n3, box_to_sticky:n1 | has_reposition_room |
| s1 | 2 | 3 | s2 | 4 | yes | yes | right | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 3 | 4 | s3 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 4 | 11 | s6 | 14 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s6 | 11 | 16 | s22 | 8 | no | no | up | push_object:crate#1 | has_reposition_room |
| s22 | 16 | 18 | s23 | 28 | no | yes | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s23 | 18 | 19 | s24 | 13 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=347, regions=36, solution commitments=8
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/8, optimal prefix=8/8, forced viable commitments=6/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 4 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 8 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 7 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 6 | 1 | 0 | 1 | forced optimal |
| 10 | r3 | r6 | 5 | 1 | 1 | 1 | forced optimal |
| 15 | r6 | r10 | 4 | 2 | 0 | 1 | forced optimal |
| 16 | r10 | r13 | 3 | 1 | 1 | 1 | forced optimal |
| 17 | r13 | r17 | 2 | 2 | 0 | 1 | forced optimal |
| 18 | r17 | r20 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 7 | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 6 | 5 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 5 | 14 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 11 | 4 | 8 | 2 | 2 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 16 | 3 | 14 | 2 | 1 | 1 | 1 | 1 | r13 | no | yes | yes |
| r13 | 17 | 2 | 14 | 2 | 2 | 0 | 1 | 1 | r17 | no | no | yes |
| r17 | 18 | 1 | 13 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes |
| r20 | 19 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n3, box_to_sticky:n1 |
| 3 | right | r2 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | right | r3 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 5 | down | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 11 | left | r6 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 12 | down | r6 | no | 4 | 2 | 2 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r6 | no | 4 | 2 | 2 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r6 | no | 4 | 2 | 2 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r6 | no | 4 | 2 | 2 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 16 | up | r10 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | push_object:crate#1 |
| 17 | right | r13 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r17 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 18 | right | r17 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r20 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 19 | right | r20 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
