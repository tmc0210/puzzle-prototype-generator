# Level Analysis: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_opening_comfort

## Summary

- Prototype: reality_anchor
- Title: Vacate bind return v3 opening comfort
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
##MG.M.#
#.M.M..#
#BSLP#@#
#.G..#.#
########
```

## Shortest Solution

- Found: yes
- Cost: 27
- Depth: 27
- Explored states: 429
- Inputs: up left left down left right up up left right down right right up left left down down left up right down up left down right up
- Events: walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:sticky#1 move_sticky_rigid push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:sticky#1 move_sticky_rigid pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: walk=13, push_object:sticky#2=2, move_sticky_rigid=8, sticky_merge:n1=4, push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=3, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=3, sticky_to_box:n2=2, pull_object:crate#1=1, box_to_sticky:n1=1, push_object:sticky#1=3, force_chain:n2=2, push_object:box_sticky_anchor=1, box_to_sticky:n2=1, pull_object:push_pull_anchor=1, pull_object:sticky#1=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
########
##MG.M.#
#.M.M@.#
#BSLP#.#
#.G..#.#
########
```

After:

```text
########
##MG.M.#
#.MM@..#
#BSLP#.#
#.G..#.#
########
```

### Step 4: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
##MG.M.#
#.MM@..#
#BSLP#.#
#.G..#.#
########
```

After:

```text
########
##MG.M.#
#.MM...#
#BS.@#.#
#.GLP#.#
########
```

### Step 6: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
########
##MG.M.#
#.MM...#
#BS@.#.#
#.GLP#.#
########
```

After:

```text
########
##CG.M.#
#.CM...#
#.BS@#.#
#.GLP#.#
########
```

### Step 10: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
########
##C+.M.#
#.CM...#
#.BS.#.#
#.GLP#.#
########
```

After:

```text
########
##.m@M.#
#.CM...#
#.BS.#.#
#.GLP#.#
########
```

### Step 15: left

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
########
##.m.M@#
#.CM...#
#.BS.#.#
#.GLP#.#
########
```

After:

```text
########
##.mM@.#
#.CM...#
#.BS.#.#
#.GLP#.#
########
```

### Step 16: left

- Legal: true
- Events: push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2

Before:

```text
########
##.mM@.#
#.CM...#
#.BS.#.#
#.GLP#.#
########
```

After:

```text
########
##Cm@..#
#CC....#
#.BS.#.#
#.GLP#.#
########
```

### Step 19: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
########
##Cm...#
#CC....#
#.BS@#.#
#.GLP#.#
########
```

After:

```text
########
##Mm...#
#CM....#
#BS@.#.#
#.GLP#.#
########
```

### Step 20: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
##Mm...#
#CM....#
#BS@.#.#
#.GLP#.#
########
```

After:

```text
########
##Mm...#
#CM@...#
#BSLP#.#
#.G..#.#
########
```

### Step 21: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
##Mm...#
#CM@...#
#BSLP#.#
#.G..#.#
########
```

After:

```text
########
##.mM..#
#C.M@..#
#BSLP#.#
#.G..#.#
########
```

### Step 22: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
##.mM..#
#C.M@..#
#BSLP#.#
#.G..#.#
########
```

After:

```text
########
##.mM..#
#C.M...#
#BS.@#.#
#.GLP#.#
########
```

### Step 24: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
##.mM..#
#C.M@..#
#BS..#.#
#.GLP#.#
########
```

After:

```text
########
##Mm...#
#CM@...#
#BS..#.#
#.GLP#.#
########
```

### Step 25: down

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
########
##Mm...#
#CM@...#
#BS..#.#
#.GLP#.#
########
```

After:

```text
########
##.G...#
#CMM...#
#.M@.#.#
#BSLP#.#
########
```

### Step 26: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
########
##.G...#
#CMM...#
#.M@.#.#
#BSLP#.#
########
```

After:

```text
########
##.G...#
#C.MM..#
#..M@#.#
#BSLP#.#
########
```

### Step 27: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
##.G...#
#C.MM..#
#..M@#.#
#BSLP#.#
########
```

After:

```text
########
##.mM..#
#C.M@..#
#....#.#
#BSLP#.#
########
```


## Graph Facts

- Status: complete
- Reachable states: 449
- Legal transitions: 975
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=900000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 449
- Legal transitions: 975
- Budget: maxStates=900000
- Compressed regions: 73
- Bidirectional transitions: 842
- Commitment transitions: 131
- Winning regions: 1
- Initial region: r0, states=5, dist=11, internalBidirectional=8, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@3 -> r4@4 -> r7@5 -> r20@9 -> r21@10 -> r41@15 -> r42@16 -> r55@20 -> r61@22 -> r68@25 -> r69@27
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 11

### SCC Irreversible Progress

- Shape: sccs=50, edges=76, winReachable=16, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=9, forcedWinPrefix=3/9, branchingWinSccs=5, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=4/9, trivial=1, sameEntryExit=4, forcedScripted=4, maxRun=2
- Initial SCC: s0, states=5, dist=7, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@3 -> s3@4 -> s4@5 -> s5@9 -> s6@10 -> s7@15 -> s17@16 -> s18@25 -> s19@27

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 7 | 5 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 3 | 6 | 7 | 4 | 1 | 3 | 1 | 1 | s3 | yes |
| s3 | 4 | 5 | 8 | 4 | 1 | 3 | 1 | 1 | s4 | yes |
| s4 | 5 | 4 | 9 | 4 | 2 | 2 | 1 | 1 | s5 | no |
| s5 | 9 | 5 | 1 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 10 | 4 | 9 | 3 | 2 | 1 | 1 | 1 | s7 | no |
| s7 | 15 | 3 | 9 | 2 | 1 | 1 | 1 | 1 | s17 | yes |
| s17 | 16 | 2 | 53 | 2 | 1 | 1 | 7 | 7 | s18 | yes |
| s18 | 25 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | s19 | yes |
| s19 | 27 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 5 | no | yes | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s1 | 3 | 4 | s3 | 7 | yes | yes | down | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s3 | 4 | 5 | s4 | 8 | yes | yes | left | walk | scripted_same_state_handoff |
| s4 | 5 | 9 | s5 | 9 | no | no | left | walk | has_reposition_room |
| s5 | 9 | 10 | s6 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_trivial_scc |
| s6 | 10 | 15 | s7 | 9 | no | no | left | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 | has_reposition_room |
| s7 | 15 | 16 | s17 | 9 | yes | yes | left | push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 | scripted_same_state_handoff |
| s17 | 16 | 25 | s18 | 53 | no | yes | down | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | has_reposition_room |
| s18 | 25 | 27 | s19 | 2 | no | yes | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=449, regions=73, solution commitments=11
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=3/11, optimal prefix=11/11, forced viable commitments=7/11
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r2 | 11 | 1 | 1 | 1 | forced optimal |
| 3 | r2 | r4 | 10 | 1 | 3 | 1 | forced optimal |
| 4 | r4 | r7 | 9 | 1 | 3 | 1 | forced optimal |
| 8 | r7 | r20 | 8 | 2 | 2 | 1 | forced optimal |
| 9 | r20 | r21 | 7 | 1 | 0 | 1 | forced optimal |
| 14 | r21 | r41 | 6 | 3 | 1 | 1 | forced optimal |
| 15 | r41 | r42 | 5 | 1 | 1 | 1 | forced optimal |
| 19 | r42 | r55 | 4 | 1 | 1 | 1 | forced optimal |
| 21 | r55 | r61 | 3 | 2 | 0 | 1 | forced optimal |
| 24 | r61 | r68 | 2 | 3 | 0 | 1 | forced optimal |
| 26 | r68 | r69 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 11 | 5 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 3 | 10 | 7 | 4 | 1 | 3 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 9 | 8 | 4 | 1 | 3 | 1 | 1 | r7 | no | yes | yes |
| r7 | 5 | 8 | 9 | 4 | 2 | 2 | 1 | 1 | r20 | no | no | yes |
| r20 | 9 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | r21 | yes | yes | yes |
| r21 | 10 | 6 | 9 | 4 | 3 | 1 | 1 | 1 | r41 | no | no | yes |
| r41 | 15 | 5 | 9 | 2 | 1 | 1 | 1 | 1 | r42 | no | yes | yes |
| r42 | 16 | 4 | 10 | 2 | 1 | 1 | 1 | 1 | r55 | no | yes | yes |
| r55 | 20 | 3 | 8 | 2 | 2 | 0 | 1 | 1 | r61 | no | no | yes |
| r61 | 22 | 2 | 9 | 3 | 3 | 0 | 1 | 1 | r68 | no | no | yes |
| r68 | 25 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | r69 | yes | yes | yes |
| r69 | 27 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 3 | left | r2 | yes | 10 | 4 | 1 | 3 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 4 | down | r4 | yes | 9 | 4 | 1 | 3 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 5 | left | r7 | yes | 8 | 4 | 2 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r7 | no | 8 | 4 | 2 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 |
| 7 | up | r7 | no | 8 | 4 | 2 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r7 | no | 8 | 4 | 2 | 2 | 1 | 1 | r20 | yes | yes | yes | yes | no | yes | walk |
| 9 | left | r20 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r21 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r21 | yes | 6 | 4 | 3 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 11 | down | r21 | no | 6 | 4 | 3 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r21 | no | 6 | 4 | 3 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r21 | no | 6 | 4 | 3 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r21 | no | 6 | 4 | 3 | 1 | 1 | 1 | r41 | yes | yes | yes | yes | no | yes | walk |
| 15 | left | r41 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r42 | yes | yes | yes | yes | yes | yes | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 16 | left | r42 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 |
| 17 | down | r42 | no | 4 | 2 | 1 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r42 | no | 4 | 2 | 1 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r42 | no | 4 | 2 | 1 | 1 | 1 | 1 | r55 | yes | yes | yes | yes | yes | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 |
| 20 | up | r55 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r55 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | right | r55 | no | 3 | 2 | 2 | 0 | 1 | 1 | r61 | yes | yes | yes | yes | no | yes | pull_object:sticky#1, move_sticky_rigid |
| 22 | down | r61 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r61 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 23 | up | r61 | no | 2 | 3 | 3 | 0 | 1 | 1 | r61 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r61 | no | 2 | 3 | 3 | 0 | 1 | 1 | r68 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 25 | down | r68 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r68 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 26 | right | r68 | no | 1 | 1 | 1 | 0 | 1 | 1 | r69 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 27 | up | r69 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
