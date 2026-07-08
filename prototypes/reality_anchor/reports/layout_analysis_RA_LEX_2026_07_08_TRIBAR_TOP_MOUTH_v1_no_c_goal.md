# Level Analysis: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v1_no_c_goal

## Summary

- Prototype: reality_anchor
- Title: Tri-bar top mouth v1 no C goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#@.#.GG####
#.CCC....##
####.....##
####BS#####
###########
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 87
- Inputs: down right right right down right right right right up left down left up
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=9, push_object:crate#1=3, force_chain:n3=2, box_to_sticky:n1=3, move_sticky_rigid=4, sticky_merge:n1=2, force_chain:n2=1, push_object:sticky#1=2, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, box_to_sticky:n1

Before:

```text
###########
#..#.GG####
#@CCC....##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.GG####
#.@CCM...##
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
#..#.GG####
#.@CCM...##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.GG####
#..@CMM..##
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
#..#.GG####
#..@CMM..##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.GG####
#...@MMM.##
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
#..#.GG####
#....MMM@##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.GG####
#...CMM@.##
####.....##
####BS#####
###########
```

### Step 14: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..#.GG####
#...CMM..##
####..@..##
####BS#####
###########
```

After:

```text
###########
#..#.mm####
#...C.@..##
####.....##
####BS#####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1384
- Legal transitions: 3512
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1384
- Legal transitions: 3512
- Budget: maxStates=300000
- Compressed regions: 116
- Bidirectional transitions: 3296
- Commitment transitions: 216
- Winning regions: 4
- Initial region: r0, states=3, dist=5, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r3@4 -> r7@11 -> r11@14
- Forced commitment prefix length: 3
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=89, edges=142, winReachable=10, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=4/5, branchingWinSccs=2, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=3, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@3 -> s3@4 -> s5@11 -> s85@14

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 4 | 2 | 15 | 3 | 1 | 2 | 1 | 1 | s5 | yes |
| s5 | 11 | 1 | 7 | 4 | 3 | 1 | 1 | 1 | s85 | no |
| s85 | 14 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | right | push_object:crate#1, force_chain:n3, box_to_sticky:n1 | has_reposition_room |
| s1 | 2 | 3 | s2 | 4 | yes | yes | right | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 3 | 4 | s3 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 4 | 11 | s5 | 15 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s5 | 11 | 14 | s85 | 7 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1384, regions=116, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/5, optimal prefix=4/5, forced viable commitments=4/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 4 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 10 | r3 | r7 | 2 | 1 | 2 | 1 | forced optimal |
| 13 | r7 | r11 | 1 | 3 | 1 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 2 | 15 | 3 | 1 | 2 | 1 | 1 | r7 | no | yes | yes |
| r7 | 11 | 1 | 7 | 4 | 3 | 1 | 2 | 2 | r11 | no | no | no |
| r11 | 14 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n3, box_to_sticky:n1 |
| 3 | right | r2 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | right | r3 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 5 | down | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r3 | no | 2 | 3 | 1 | 2 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 11 | left | r7 | yes | 1 | 4 | 3 | 1 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 12 | down | r7 | no | 1 | 4 | 3 | 1 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r7 | no | 1 | 4 | 3 | 1 | 2 | 2 | r11 | yes | yes | yes | yes | no | no | walk |
| 14 | up | r11 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
