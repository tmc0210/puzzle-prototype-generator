# Level Analysis: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#@.#G#####
#.CC....G#
####....##
####BS####
##########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 108
- Inputs: down right right right down right right right up left down left left up right right right
- Events: walk push_object:crate#1 force_chain:n2 push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=9, push_object:crate#1=4, force_chain:n2=3, box_to_sticky:n1=2, move_sticky_rigid=5, sticky_merge:n1=1, push_object:sticky#1=4, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
##########
#..#G#####
#@CC....G#
####....##
####BS####
##########
```

After:

```text
##########
#..#G#####
#.@CC...G#
####....##
####BS####
##########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, box_to_sticky:n1

Before:

```text
##########
#..#G#####
#.@CC...G#
####....##
####BS####
##########
```

After:

```text
##########
#..#G#####
#..@CM..G#
####....##
####BS####
##########
```

### Step 4: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#..#G#####
#..@CM..G#
####....##
####BS####
##########
```

After:

```text
##########
#..#G#####
#...@MM.G#
####....##
####BS####
##########
```

### Step 10: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
##########
#..#G#####
#....MM@G#
####....##
####BS####
##########
```

After:

```text
##########
#..#G#####
#...CM@.G#
####....##
####BS####
##########
```

### Step 14: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#..#G#####
#...CM..G#
####@...##
####BS####
##########
```

After:

```text
##########
#..#*#####
#...@M..G#
####....##
####BS####
##########
```

### Step 15: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#..#*#####
#...@M..G#
####....##
####BS####
##########
```

After:

```text
##########
#..#*#####
#....@M.G#
####....##
####BS####
##########
```

### Step 16: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#..#*#####
#....@M.G#
####....##
####BS####
##########
```

After:

```text
##########
#..#*#####
#.....@MG#
####....##
####BS####
##########
```

### Step 17: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#..#*#####
#.....@MG#
####....##
####BS####
##########
```

After:

```text
##########
#..#*#####
#......@m#
####....##
####BS####
##########
```


## Graph Facts

- Status: complete
- Reachable states: 165
- Legal transitions: 383
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=800000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 165
- Legal transitions: 383
- Budget: maxStates=800000
- Compressed regions: 18
- Bidirectional transitions: 364
- Commitment transitions: 19
- Winning regions: 1
- Initial region: r0, states=3, dist=8, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r3@4 -> r6@10 -> r10@14 -> r12@15 -> r14@16 -> r16@17
- Forced commitment prefix length: 3
- Forced viable prefix length: 6
- Forced optimal prefix length: 8

### SCC Irreversible Progress

- Shape: sccs=17, edges=17, winReachable=8, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=7, forcedWinPrefix=7/7, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=3/7, trivial=0, sameEntryExit=3, forcedScripted=3, maxRun=2
- Initial SCC: s0, states=3, dist=7, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@3 -> s3@4 -> s6@10 -> s10@14 -> s11@16 -> s12@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 6 | 4 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 3 | 5 | 5 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 4 | 4 | 13 | 2 | 1 | 1 | 1 | 1 | s6 | yes |
| s6 | 10 | 3 | 7 | 2 | 1 | 1 | 1 | 1 | s10 | yes |
| s10 | 14 | 2 | 26 | 2 | 1 | 1 | 1 | 1 | s11 | yes |
| s11 | 16 | 1 | 12 | 1 | 1 | 0 | 1 | 1 | s12 | yes |
| s12 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | right | push_object:crate#1, force_chain:n2 | has_reposition_room |
| s1 | 2 | 3 | s2 | 4 | yes | yes | right | push_object:crate#1, force_chain:n2, box_to_sticky:n1 | scripted_same_state_handoff |
| s2 | 3 | 4 | s3 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 4 | 10 | s6 | 13 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s6 | 10 | 14 | s10 | 7 | no | yes | up | push_object:crate#1 | has_reposition_room |
| s10 | 14 | 16 | s11 | 26 | no | yes | right | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s11 | 16 | 17 | s12 | 12 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=165, regions=18, solution commitments=8
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=6/8, optimal prefix=8/8, forced viable commitments=7/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 6 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 8 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 7 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 6 | 1 | 0 | 1 | forced optimal |
| 9 | r3 | r6 | 5 | 1 | 1 | 1 | forced optimal |
| 13 | r6 | r10 | 4 | 1 | 1 | 1 | forced optimal |
| 14 | r10 | r12 | 3 | 1 | 1 | 1 | forced optimal |
| 15 | r12 | r14 | 2 | 2 | 0 | 1 | forced optimal |
| 16 | r14 | r16 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 7 | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 6 | 5 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 5 | 13 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 10 | 4 | 7 | 2 | 1 | 1 | 1 | 1 | r10 | no | yes | yes |
| r10 | 14 | 3 | 13 | 2 | 1 | 1 | 1 | 1 | r12 | no | yes | yes |
| r12 | 15 | 2 | 13 | 2 | 2 | 0 | 1 | 1 | r14 | no | no | yes |
| r14 | 16 | 1 | 12 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes |
| r16 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2 |
| 3 | right | r2 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, box_to_sticky:n1 |
| 4 | right | r3 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 5 | down | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r3 | no | 5 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 10 | left | r6 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 11 | down | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r6 | no | 4 | 2 | 1 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | walk |
| 14 | up | r10 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | push_object:crate#1 |
| 15 | right | r12 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r14 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 16 | right | r14 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 17 | right | r16 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
