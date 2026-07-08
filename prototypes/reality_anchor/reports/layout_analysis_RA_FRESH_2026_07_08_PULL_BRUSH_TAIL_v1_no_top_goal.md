# Level Analysis: RA_FRESH_2026_07_08_PULL_BRUSH_TAIL_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: Pull brush tail v1 no top goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#####P#####
#####L#####
##...MM..##
##@S.M...##
###B...G###
#####...###
###########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 18
- Inputs: up right right down down right right right down
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
- Event counts: walk=5, pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, force_chain:n2=2, move_sticky_rigid=3, pull_object:sticky#1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#####P#####
#####L#####
##...MM..##
##.S.M...##
###B@..G###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##...MM..##
##..SM...##
###.B@.G###
#####...###
###########
```

### Step 7: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#####P#####
#####L#####
##...MM..##
##..SM...##
###.B@.G###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##....MM.##
##...SM..##
###..B@G###
#####...###
###########
```

### Step 8: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#####P#####
#####L#####
##....MM.##
##...SM..##
###..B@G###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##.....MM##
##....SM.##
###...B+###
#####...###
###########
```

### Step 9: down

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
###########
#####P#####
#####L#####
##.....MM##
##....SM.##
###...B+###
#####...###
###########
```

After:

```text
###########
#####P#####
#####L#####
##.......##
##....SMM##
###...B*###
#####..@###
###########
```


## Graph Facts

- Status: complete
- Reachable states: 16533
- Legal transitions: 37312
- Event-only illegal transitions: 0
- Winning states: 597
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 16533
- Legal transitions: 37312
- Budget: maxStates=300000
- Compressed regions: 2231
- Bidirectional transitions: 32564
- Commitment transitions: 4370
- Winning regions: 597
- Initial region: r0, states=3, dist=5, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r3@6 -> r5@7 -> r7@8 -> r9@9
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=1419, edges=1935, winReachable=1134, winning=597, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=2/5, branchingWinSccs=273, mergingWinSccs=234
- Handoff scriptiness: scope=returned_solution, scripted=3/5, trivial=3, sameEntryExit=3, forcedScripted=1, maxRun=3
- Initial SCC: s0, states=3, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s3@6 -> s4@7 -> s5@8 -> s6@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 4 | 3 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 6 | 3 | 1 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 7 | 2 | 1 | 2 | 2 | 0 | 1 | 1 | s5 | no |
| s5 | 8 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 9 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 3 | no | yes | right | walk | has_reposition_room |
| s1 | 3 | 6 | s3 | 3 | no | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s3 | 6 | 7 | s4 | 1 | yes | no | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s4 | 7 | 8 | s5 | 1 | yes | no | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s5 | 8 | 9 | s6 | 1 | yes | yes | down | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=16533, regions=2231, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/5, optimal prefix=5/5, forced viable commitments=3/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r3 | 4 | 1 | 1 | 1 | forced optimal |
| 6 | r3 | r5 | 3 | 2 | 0 | 1 | forced optimal |
| 7 | r5 | r7 | 2 | 2 | 0 | 1 | forced optimal |
| 8 | r7 | r9 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 4 | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 6 | 3 | 1 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 7 | 2 | 1 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 8 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes |
| r9 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r1 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 4 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 4 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r3 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 7 | right | r5 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 8 | right | r7 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 9 | down | r9 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |

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
