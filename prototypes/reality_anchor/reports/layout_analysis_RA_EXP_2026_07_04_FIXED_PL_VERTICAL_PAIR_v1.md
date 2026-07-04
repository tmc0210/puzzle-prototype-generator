# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v1
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
######....#
#...M..G..#
#....M.G..#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 75
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
######....#
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
######....#
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
######....#
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
######....#
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
######....#
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
######....#
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
######....#
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
######....#
#......m@.#
#......m..#
#.........#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 63361
- Legal transitions: 174766
- Event-only illegal transitions: 0
- Winning states: 3192
- Budget: maxStates=800000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 63361
- Legal transitions: 174766
- Budget: maxStates=800000
- Compressed regions: 4125
- Bidirectional transitions: 152562
- Commitment transitions: 15401
- Winning regions: 260
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r6@5 -> r11@7
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=615, edges=1027, winReachable=170, winning=13, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=66, mergingWinSccs=66
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=2, sameEntryExit=2, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@4 -> s125@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 296 | 9 | 9 | 0 | 1 | 1 | s2 | no |
| s2 | 4 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s125 | yes |
| s125 | 5 | 0 | 230 | 3 | 0 | 0 | 17 | 17 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 4 | s2 | 296 | no | no | left | walk | has_reposition_room |
| s2 | 4 | 5 | s125 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=63361, regions=4125, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r4 | 2 | 7 | 0 | 1 | multiple viable choices |
| 4 | r4 | r6 | 2 | 1 | 0 | 1 | forced optimal |
| 6 | r6 | r11 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 65 | 7 | 7 | 0 | 1 | 1 | r4 | no | no | no |
| r4 | 4 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 5 | 1 | 65 | 4 | 4 | 0 | 1 | 1 | r11 | no | no | yes |
| r11 | 7 | 0 | 33 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 2 | 7 | 7 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r1 | no | 2 | 7 | 7 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 2 | 7 | 7 | 0 | 1 | 1 | r4 | yes | yes | no | no | no | no | walk |
| 4 | left | r4 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r6 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 6 | right | r6 | no | 1 | 4 | 4 | 0 | 1 | 1 | r11 | yes | yes | yes | yes | no | yes | pull_object:sticky#1, move_sticky_rigid |
| 7 | right | r11 | yes | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
