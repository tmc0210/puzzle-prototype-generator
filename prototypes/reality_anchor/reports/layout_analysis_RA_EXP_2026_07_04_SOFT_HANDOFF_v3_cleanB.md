# Level Analysis: RA_EXP_2026_07_04_SOFT_HANDOFF_v3_cleanB

## Summary

- Prototype: reality_anchor
- Title: Soft handoff v3 cleanB
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 356
- Inputs: down up right right down left down left down left up right left
- Events: walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1 pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
- Event counts: walk=4, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=4, pull_object:crate#1=3, pull_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n1=1, pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, box_to_sticky:n2=1, sticky_merge:n1=1, push_object:push_pull_anchor=1, force_chain:n2=1, sticky_to_box:n2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####C...#
###G.+..#
####PL.M#
####..BS#
#########
```

After:

```text
#########
####C@..#
###GPL..#
####...M#
####..BS#
#########
```

### Step 3: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####C@..#
###GPL..#
####...M#
####..BS#
#########
```

After:

```text
#########
####.C@.#
###GPL..#
####...M#
####..BS#
#########
```

### Step 4: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####.C@.#
###GPL..#
####...M#
####..BS#
#########
```

After:

```text
#########
####..C@#
###GPL..#
####...M#
####..BS#
#########
```

### Step 7: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
####..C.#
###GPL@.#
####...M#
####..BS#
#########
```

After:

```text
#########
####....#
###GPLC.#
####..@M#
####..BS#
#########
```

### Step 8: left

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#########
####....#
###GPLC.#
####..@M#
####..BS#
#########
```

After:

```text
#########
####....#
###GPLC.#
####.@C.#
####..BS#
#########
```

### Step 9: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####....#
###GPLC.#
####.@C.#
####..BS#
#########
```

After:

```text
#########
####....#
###G.GC.#
####PLC.#
####.@BS#
#########
```

### Step 10: left

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1

Before:

```text
#########
####....#
###G.GC.#
####PLC.#
####.@BS#
#########
```

After:

```text
#########
####....#
###G.GM.#
####PLM.#
####@BS.#
#########
```

### Step 11: up

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####....#
###G.GM.#
####PLM.#
####@BS.#
#########
```

After:

```text
#########
####....#
###GPLM.#
####@.M.#
####.BS.#
#########
```

### Step 13: left

- Legal: true
- Events: pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n2

Before:

```text
#########
####....#
###GPLM.#
####.@M.#
####.BS.#
#########
```

After:

```text
#########
####....#
###PL*..#
####@C..#
####.BS.#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 2828
- Legal transitions: 6093
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2828
- Legal transitions: 6093
- Budget: maxStates=300000
- Compressed regions: 574
- Bidirectional transitions: 5078
- Commitment transitions: 989
- Winning regions: 1
- Initial region: r0, states=1, dist=11, internalBidirectional=0, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r5@3 -> r10@4 -> r18@5 -> r31@6 -> r41@7 -> r56@8 -> r75@9 -> r106@11 -> r122@12 -> r149@13
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 8

### SCC Irreversible Progress

- Shape: sccs=459, edges=706, winReachable=13, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=9, forcedWinPrefix=7/9, branchingWinSccs=1, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=7/9, trivial=6, sameEntryExit=7, forcedScripted=7, maxRun=6
- Initial SCC: s0, states=18, dist=9, out=5, winOut=1, deadOut=4
- SCC path: s0@0 -> s335@2 -> s336@3 -> s337@4 -> s338@5 -> s339@6 -> s341@7 -> s342@8 -> s349@12 -> s350@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 9 | 18 | 5 | 1 | 4 | 0 | 0 | s335 | yes |
| s335 | 2 | 8 | 1 | 1 | 1 | 0 | 1 | 1 | s336 | yes |
| s336 | 3 | 7 | 2 | 3 | 1 | 2 | 1 | 1 | s337 | yes |
| s337 | 4 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | s338 | yes |
| s338 | 5 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | s339 | yes |
| s339 | 6 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | s341 | yes |
| s341 | 7 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s342 | yes |
| s342 | 8 | 2 | 23 | 7 | 4 | 3 | 1 | 1 | s349 | no |
| s349 | 12 | 1 | 1 | 1 | 1 | 0 | 3 | 3 | s350 | yes |
| s350 | 13 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s335 | 18 | no | yes | up | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s335 | 2 | 3 | s336 | 1 | yes | yes | right | pull_object:crate#1 | scripted_trivial_scc |
| s336 | 3 | 4 | s337 | 2 | yes | yes | right | pull_object:crate#1 | scripted_same_state_handoff |
| s337 | 4 | 5 | s338 | 1 | yes | yes | down | walk | scripted_trivial_scc |
| s338 | 5 | 6 | s339 | 1 | yes | yes | left | walk | scripted_trivial_scc |
| s339 | 6 | 7 | s341 | 1 | yes | yes | down | pull_object:crate#1 | scripted_trivial_scc |
| s341 | 7 | 8 | s342 | 1 | yes | yes | left | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_trivial_scc |
| s342 | 8 | 12 | s349 | 23 | no | no | right | walk | has_reposition_room |
| s349 | 12 | 13 | s350 | 1 | yes | yes | left | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n2 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=2828, regions=574, solution commitments=12
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/12, optimal prefix=8/12, forced viable commitments=9/12
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 11 | 1 | 1 | 1 | forced optimal |
| 1 | r1 | r3 | 10 | 3 | 2 | 1 | forced optimal |
| 2 | r3 | r5 | 9 | 1 | 0 | 1 | forced optimal |
| 3 | r5 | r10 | 8 | 1 | 2 | 1 | forced optimal |
| 4 | r10 | r18 | 7 | 1 | 0 | 1 | forced optimal |
| 5 | r18 | r31 | 6 | 1 | 1 | 1 | forced optimal |
| 6 | r31 | r41 | 5 | 1 | 1 | 1 | forced optimal |
| 7 | r41 | r56 | 4 | 1 | 0 | 1 | forced optimal |
| 8 | r56 | r75 | 3 | 3 | 0 | 1 | multiple viable choices |
| 10 | r75 | r106 | 3 | 1 | 0 | 1 | forced optimal |
| 11 | r106 | r122 | 2 | 3 | 0 | 1 | forced optimal |
| 12 | r122 | r149 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 11 | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 10 | 7 | 5 | 3 | 2 | 1 | 1 | r3 | no | no | yes |
| r3 | 2 | 9 | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 3 | 8 | 2 | 3 | 1 | 2 | 1 | 1 | r10 | no | yes | yes |
| r10 | 4 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes |
| r18 | 5 | 6 | 1 | 2 | 1 | 1 | 1 | 1 | r31 | no | yes | yes |
| r31 | 6 | 5 | 1 | 2 | 1 | 1 | 1 | 1 | r41 | no | yes | yes |
| r41 | 7 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r56 | yes | yes | yes |
| r56 | 8 | 3 | 3 | 3 | 3 | 0 | 1 | 1 | r75 | no | no | no |
| r75 | 9 | 3 | 2 | 1 | 1 | 0 | 1 | 1 | r106 | yes | yes | yes |
| r106 | 11 | 2 | 3 | 3 | 3 | 0 | 1 | 1 | r122 | no | no | yes |
| r122 | 12 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r149 | yes | yes | yes |
| r149 | 13 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 11 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 10 | 5 | 3 | 2 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 2 | up | r3 | yes | 9 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | right | r5 | yes | 8 | 3 | 1 | 2 | 1 | 1 | r10 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 4 | right | r10 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 5 | down | r18 | yes | 6 | 2 | 1 | 1 | 1 | 1 | r31 | yes | yes | yes | yes | yes | yes | walk |
| 6 | left | r31 | yes | 5 | 2 | 1 | 1 | 1 | 1 | r41 | yes | yes | yes | yes | yes | yes | walk |
| 7 | down | r41 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r56 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 8 | left | r56 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r75 | yes | yes | no | no | no | no | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 9 | down | r75 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r75 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 10 | left | r75 | no | 3 | 1 | 1 | 0 | 1 | 1 | r106 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n2, sticky_merge:n1 |
| 11 | up | r106 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r122 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 12 | right | r122 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r149 | yes | yes | yes | yes | yes | yes | walk |
| 13 | left | r149 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n2 |

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
