# Level Analysis: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2

## Summary

- Prototype: reality_anchor
- Title: Pull cut anchor handoff v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#..G#...##
#...MM@P##
#.....#L##
###BS#####
##########
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 280
- Inputs: left left left up left left down right down right right up
- Events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 force_chain:n2 walk walk walk push_object:crate#1 push_object:crate#1 walk pull_object:crate#2 pull_object:crate#2 pull_object:box_sticky_anchor force_chain:n3 anchor_boundary_shift:box_sticky
- Event counts: push_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n1=2, force_chain:n2=2, push_object:crate#2=1, walk=4, push_object:crate#1=2, pull_object:crate#2=2, pull_object:box_sticky_anchor=1, force_chain:n3=1, anchor_boundary_shift:box_sticky=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
##########
#..G#...##
#...MM@P##
#.....#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#..CM@.P##
#.....#L##
###BS#####
##########
```

### Step 2: left

- Legal: true
- Events: push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n1

Before:

```text
##########
#..G#...##
#..CM@.P##
#.....#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#.CC@..P##
#.....#L##
###BS#####
##########
```

### Step 3: left

- Legal: true
- Events: push_object:crate#2, force_chain:n2

Before:

```text
##########
#..G#...##
#.CC@..P##
#.....#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#CC@...P##
#.....#L##
###BS#####
##########
```

### Step 7: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#@.G#...##
#CC....P##
#.....#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#@C....P##
#C....#L##
###BS#####
##########
```

### Step 8: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#..G#...##
#@C....P##
#C....#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#.@C...P##
#C....#L##
###BS#####
##########
```

### Step 10: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#..G#...##
#..C...P##
#C@...#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#..C...P##
#.C@..#L##
###BS#####
##########
```

### Step 11: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#..G#...##
#..C...P##
#.C@..#L##
###BS#####
##########
```

After:

```text
##########
#..G#...##
#..C...P##
#..C@.#L##
###BS#####
##########
```

### Step 12: up

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n3, anchor_boundary_shift:box_sticky

Before:

```text
##########
#..G#...##
#..C...P##
#..C@.#L##
###BS#####
##########
```

After:

```text
##########
#..*#...##
#..C@..P##
#..BS.#L##
###..#####
##########
```


## Graph Facts

- Status: complete
- Reachable states: 1081
- Legal transitions: 2597
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1081
- Legal transitions: 2597
- Budget: maxStates=100000
- Compressed regions: 109
- Bidirectional transitions: 2284
- Commitment transitions: 253
- Winning regions: 1
- Initial region: r0, states=4, dist=8, internalBidirectional=6, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r4@3 -> r9@7 -> r12@8 -> r23@10 -> r31@11 -> r42@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 8

### SCC Irreversible Progress

- Shape: sccs=33, edges=49, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=4, dist=2, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s3@1 -> s27@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 4 | 2 | 2 | 0 | 0 | 0 | s3 | no |
| s3 | 1 | 1 | 572 | 8 | 1 | 7 | 2 | 2 | s27 | yes |
| s27 | 12 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s3 | 4 | yes | no | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_same_state_handoff |
| s3 | 1 | 12 | s27 | 572 | no | yes | up | pull_object:box_sticky_anchor, force_chain:n3, anchor_boundary_shift:box_sticky | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1081, regions=109, solution commitments=8
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/8, optimal prefix=8/8, forced viable commitments=1/8
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 8 | 2 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 7 | 2 | 1 | 1 | forced optimal |
| 2 | r2 | r4 | 6 | 4 | 0 | 1 | forced optimal |
| 6 | r4 | r9 | 5 | 2 | 0 | 1 | forced optimal |
| 7 | r9 | r12 | 4 | 5 | 0 | 1 | forced optimal |
| 9 | r12 | r23 | 3 | 3 | 0 | 1 | forced optimal |
| 10 | r23 | r31 | 2 | 1 | 0 | 1 | forced optimal |
| 11 | r31 | r42 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 4 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 7 | 15 | 3 | 2 | 1 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 6 | 22 | 4 | 4 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 3 | 5 | 26 | 2 | 2 | 0 | 1 | 1 | r9 | no | no | yes |
| r9 | 7 | 4 | 26 | 5 | 5 | 0 | 1 | 1 | r12 | no | no | yes |
| r12 | 8 | 3 | 6 | 3 | 3 | 0 | 1 | 1 | r23 | no | no | yes |
| r23 | 10 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r31 | yes | yes | yes |
| r31 | 11 | 1 | 1 | 2 | 2 | 0 | 1 | 1 | r42 | no | no | yes |
| r42 | 12 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | left | r1 | yes | 7 | 3 | 2 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 2 | left | r2 | yes | 6 | 4 | 4 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n1 |
| 3 | left | r4 | yes | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2, force_chain:n2 |
| 4 | up | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r4 | no | 5 | 2 | 2 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | no | yes | walk |
| 7 | down | r9 | yes | 4 | 5 | 5 | 0 | 1 | 1 | r12 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 8 | right | r12 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 9 | down | r12 | no | 3 | 3 | 3 | 0 | 1 | 1 | r23 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r23 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r31 | yes | yes | yes | yes | yes | yes | pull_object:crate#2 |
| 11 | right | r31 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r42 | yes | yes | yes | yes | no | yes | pull_object:crate#2 |
| 12 | up | r42 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, force_chain:n3, anchor_boundary_shift:box_sticky |

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
