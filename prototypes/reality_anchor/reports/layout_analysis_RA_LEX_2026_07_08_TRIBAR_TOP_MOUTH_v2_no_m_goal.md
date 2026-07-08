# Level Analysis: RA_LEX_2026_07_08_TRIBAR_TOP_MOUTH_v2_no_m_goal

## Summary

- Prototype: reality_anchor
- Title: Tri-bar top mouth v2 no M goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#@.#G..####
#.CCC....##
####.....##
####BS#####
###########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 123
- Inputs: down right right right down right right right right up left down left left left up
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:crate#1
- Event counts: walk=11, push_object:crate#1=4, force_chain:n3=2, box_to_sticky:n1=3, move_sticky_rigid=3, sticky_merge:n1=2, force_chain:n2=1, push_object:sticky#1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, box_to_sticky:n1

Before:

```text
###########
#..#G..####
#@CCC....##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G..####
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
#..#G..####
#.@CCM...##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G..####
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
#..#G..####
#..@CMM..##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G..####
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
#..#G..####
#....MMM@##
####.....##
####BS#####
###########
```

After:

```text
###########
#..#G..####
#...CMM@.##
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
#..#G..####
#...CMM..##
####@....##
####BS#####
###########
```

After:

```text
###########
#..#*..####
#...@MM..##
####.....##
####BS#####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 808
- Legal transitions: 2041
- Event-only illegal transitions: 0
- Winning states: 11
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 808
- Legal transitions: 2041
- Budget: maxStates=300000
- Compressed regions: 77
- Bidirectional transitions: 1914
- Commitment transitions: 127
- Winning regions: 11
- Initial region: r0, states=3, dist=5, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r3@4 -> r7@11 -> r16@16
- Forced commitment prefix length: 3
- Forced viable prefix length: 4
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=64, edges=91, winReachable=28, winning=11, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=4/5, branchingWinSccs=8, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=3, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@3 -> s3@4 -> s5@11 -> s55@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 4 | 2 | 15 | 3 | 1 | 2 | 1 | 1 | s5 | yes |
| s5 | 11 | 1 | 7 | 3 | 3 | 0 | 1 | 1 | s55 | no |
| s55 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | right | push_object:crate#1, force_chain:n3, box_to_sticky:n1 | has_reposition_room |
| s1 | 2 | 3 | s2 | 4 | yes | yes | right | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 3 | 4 | s3 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 4 | 11 | s5 | 15 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | has_reposition_room |
| s5 | 11 | 16 | s55 | 7 | no | no | up | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=808, regions=77, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/5, optimal prefix=5/5, forced viable commitments=4/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 4 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 10 | r3 | r7 | 2 | 1 | 2 | 1 | forced optimal |
| 15 | r7 | r16 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 2 | 15 | 3 | 1 | 2 | 1 | 1 | r7 | no | yes | yes |
| r7 | 11 | 1 | 7 | 3 | 3 | 0 | 1 | 1 | r16 | no | no | yes |
| r16 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

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
| 11 | left | r7 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 12 | down | r7 | no | 1 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r7 | no | 1 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r7 | no | 1 | 3 | 3 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r7 | no | 1 | 3 | 3 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 16 | up | r16 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
