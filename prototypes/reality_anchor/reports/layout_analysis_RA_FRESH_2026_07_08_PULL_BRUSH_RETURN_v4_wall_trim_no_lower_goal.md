# Level Analysis: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: Fresh Pull Brush Return v4 no lower goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
####P####
####L####
#...MM.G#
#@S.M...#
##B....##
####...##
#########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 13
- Inputs: up right right down down right right right
- Events: walk walk walk walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- Event counts: walk=5, pull_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3, force_chain:n2=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
#########
####P####
####L####
#...MM.G#
#.S.M...#
##B@...##
####...##
#########
```

After:

```text
#########
####P####
####L####
#...MM.G#
#..SM...#
##.B@..##
####...##
#########
```

### Step 7: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
#########
####P####
####L####
#...MM.G#
#..SM...#
##.B@..##
####...##
#########
```

After:

```text
#########
####P####
####L####
#....MMG#
#...SM..#
##..B@.##
####...##
#########
```

### Step 8: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
#########
####P####
####L####
#....MMG#
#...SM..#
##..B@.##
####...##
#########
```

After:

```text
#########
####P####
####L####
#.....Mm#
#....SM.#
##...B@##
####...##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 92030
- Legal transitions: 217844
- Event-only illegal transitions: 0
- Winning states: 827
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 92030
- Legal transitions: 217844
- Budget: maxStates=300000
- Compressed regions: 9894
- Bidirectional transitions: 191634
- Commitment transitions: 24648
- Winning regions: 827
- Initial region: r0, states=3, dist=4, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r3@6 -> r5@7 -> r7@8
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=5317, edges=10016, winReachable=2040, winning=827, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=708, mergingWinSccs=628
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=2, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=3, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s3@6 -> s4@7 -> s5@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 6 | 2 | 1 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 7 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | s5 | yes |
| s5 | 8 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 3 | no | yes | right | walk | has_reposition_room |
| s1 | 3 | 6 | s3 | 3 | no | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |
| s3 | 6 | 7 | s4 | 1 | yes | no | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |
| s4 | 7 | 8 | s5 | 1 | yes | yes | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=92030, regions=9894, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=4/4, forced viable commitments=3/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r3 | 3 | 1 | 1 | 1 | forced optimal |
| 6 | r3 | r5 | 2 | 2 | 0 | 1 | forced optimal |
| 7 | r5 | r7 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 6 | 2 | 1 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 7 | 1 | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 8 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r1 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r3 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 7 | right | r5 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 8 | right | r7 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |

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
