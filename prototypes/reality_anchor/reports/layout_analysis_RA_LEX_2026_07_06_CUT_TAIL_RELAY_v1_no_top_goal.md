# Level Analysis: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.......#
#B#C....#
#S#..G.##
##.M.G.##
##.M...##
#..@...##
#########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 58
- Inputs: up left up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:sticky#1=3, move_sticky_rigid=3, walk=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C....#
#S#..G.##
##.M.G.##
##.M...##
#..@...##
#########
```

After:

```text
#########
#.......#
#B#C....#
#S#M.G.##
##.M.G.##
##.@...##
#......##
#########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C....#
#S#M.G.##
##@M.G.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C....#
#S#.MG.##
##.@MG.##
##.....##
#......##
#########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#.......#
#B#C....#
#S#.MG.##
##.@MG.##
##.....##
#......##
#########
```

After:

```text
#########
#.......#
#B#C....#
#S#..m.##
##..@m.##
##.....##
#......##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 141651
- Legal transitions: 426226
- Event-only illegal transitions: 0
- Winning states: 866
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 141651
- Legal transitions: 426226
- Budget: maxStates=500000
- Compressed regions: 4961
- Bidirectional transitions: 396626
- Commitment transitions: 29600
- Winning regions: 30
- Initial region: r0, states=29, dist=3, internalBidirectional=78, commitments=6, viableCommitments=5, deadCommitments=1, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r1@1 -> r5@4 -> r7@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=610, edges=2268, winReachable=21, winning=9, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=3, mergingWinSccs=12
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=36490, dist=0, out=128, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 36490 | 128 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=141651, regions=4961, solution commitments=3
- Opening: commitments=6, viable=5, dead=1, optimal=3
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 5 | 1 | 3 | multiple optimal choices |
| 3 | r1 | r5 | 2 | 3 | 0 | 1 | forced optimal |
| 4 | r5 | r7 | 1 | 6 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 29 | 6 | 5 | 1 | 3 | 3 | r1 | no | no | no |
| r1 | 1 | 2 | 29 | 3 | 3 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 4 | 1 | 29 | 6 | 6 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 5 | 0 | 29 | 6 | 6 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 6 | 5 | 1 | 3 | 3 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | up | r1 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 2 | left | r1 | no | 2 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 2 | 3 | 3 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 4 | right | r5 | yes | 1 | 6 | 6 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 5 | right | r7 | yes | 0 | 6 | 6 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
