# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
###########
####PL#####
###########
###BS@....#
######.####
#...M..G..#
#....M.G..#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 38
- Inputs: right down down left right right right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- Event counts: pull_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1, walk=3, pull_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, pull_object:sticky#1=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
####PL#####
###########
###BS@....#
######.####
#...M..G..#
#....M.G..#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.BS@...#
######.####
#...C..G..#
#....M.G..#
#.........#
###########
```

### Step 5: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
####PL#####
###########
###.BS....#
######.####
#...C@.G..#
#....M.G..#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.BS....#
######.####
#....M@G..#
#....M.G..#
#.........#
###########
```

### Step 6: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####PL#####
###########
###.BS....#
######.####
#....M@G..#
#....M.G..#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.BS....#
######.####
#.....M+..#
#.....MG..#
#.........#
###########
```

### Step 7: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####PL#####
###########
###.BS....#
######.####
#.....M+..#
#.....MG..#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.BS....#
######.####
#......m@.#
#......m..#
#.........#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 544
- Legal transitions: 1437
- Event-only illegal transitions: 0
- Winning states: 30
- Budget: maxStates=800000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 544
- Legal transitions: 1437
- Budget: maxStates=800000
- Compressed regions: 65
- Bidirectional transitions: 1292
- Commitment transitions: 98
- Winning regions: 4
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r6@5 -> r9@7
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=58, edges=70, winReachable=14, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=3, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=2, sameEntryExit=2, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s5@4 -> s48@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 105 | 9 | 5 | 4 | 1 | 1 | s5 | no |
| s5 | 4 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s48 | yes |
| s48 | 5 | 0 | 106 | 3 | 0 | 0 | 8 | 8 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 4 | s5 | 105 | no | no | left | walk | has_reposition_room |
| s5 | 4 | 5 | s48 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=544, regions=65, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=3/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r4 | 2 | 5 | 2 | 1 | multiple viable choices |
| 4 | r4 | r6 | 2 | 1 | 0 | 1 | forced optimal |
| 6 | r6 | r9 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 51 | 7 | 5 | 2 | 1 | 1 | r4 | no | no | no |
| r4 | 4 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 5 | 1 | 52 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 7 | 0 | 27 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 2 | 7 | 5 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r1 | no | 2 | 7 | 5 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 2 | 7 | 5 | 2 | 1 | 1 | r4 | yes | yes | no | no | no | no | walk |
| 4 | left | r4 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r6 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 6 | right | r6 | no | 1 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 7 | right | r9 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
