# Level Analysis: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_TRIBAR_CUT_TAIL_v1_no_top_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#@.#.######
#.CCC....G#
####.....##
####BS#####
###########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 22
- Inputs: down right right right right right
- Events: walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=1, push_object:crate#1=3, force_chain:n3=2, box_to_sticky:n1=3, move_sticky_rigid=4, sticky_merge:n1=2, force_chain:n2=1, push_object:sticky#1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n3, box_to_sticky:n1

Before:

```text
###########
#..#.######
#@CCC....G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.######
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
#..#.######
#.@CCM...G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.######
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
#..#.######
#..@CMM..G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.######
#...@MMM.G#
####.....##
####BS#####
###########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..#.######
#...@MMM.G#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.######
#....@MMMG#
####.....##
####BS#####
###########
```

### Step 6: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
#..#.######
#....@MMMG#
####.....##
####BS#####
###########
```

After:

```text
###########
#..#.######
#.....@MMm#
####.....##
####BS#####
###########
```


## Graph Facts

- Status: complete
- Reachable states: 334
- Legal transitions: 792
- Event-only illegal transitions: 0
- Winning states: 5
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 334
- Legal transitions: 792
- Budget: maxStates=300000
- Compressed regions: 36
- Bidirectional transitions: 740
- Commitment transitions: 52
- Winning regions: 5
- Initial region: r0, states=3, dist=5, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r3@4 -> r4@5 -> r5@6
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=29, edges=34, winReachable=20, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=3/5, branchingWinSccs=6, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=4/5, trivial=0, sameEntryExit=4, forcedScripted=3, maxRun=4
- Initial SCC: s0, states=3, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@3 -> s3@4 -> s4@5 -> s5@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 4 | 2 | 14 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 5 | 1 | 13 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 6 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 3 | no | yes | right | push_object:crate#1, force_chain:n3, box_to_sticky:n1 | has_reposition_room |
| s1 | 2 | 3 | s2 | 4 | yes | yes | right | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s2 | 3 | 4 | s3 | 5 | yes | yes | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s3 | 4 | 5 | s4 | 14 | yes | no | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |
| s4 | 5 | 6 | s5 | 13 | yes | yes | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=334, regions=36, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/5, optimal prefix=5/5, forced viable commitments=4/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 3 | 1 | 0 | 1 | forced optimal |
| 4 | r3 | r4 | 2 | 2 | 0 | 1 | forced optimal |
| 5 | r4 | r5 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 4 | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 3 | 5 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 2 | 14 | 2 | 2 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 5 | 1 | 13 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 6 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n3, box_to_sticky:n1 |
| 3 | right | r2 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n3, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 4 | right | r3 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 5 | right | r4 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 6 | right | r5 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
