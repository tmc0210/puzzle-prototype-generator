# Level Analysis: RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed parallel dual join v1
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 42
- Inputs: down right down right right
- Events: push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- Event counts: push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, walk=2, pull_object:sticky#1=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
##..@..####
#P#.C..#B##
#L#...G.S##
##..M.G.###
###########
```

After:

```text
###########
##.....####
#P#.@..#B##
#L#.M.G.S##
##..M.G.###
###########
```

### Step 4: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
##.....####
#P#....#B##
#L#.M@G.S##
##..M.G.###
###########
```

After:

```text
###########
##.....####
#P#....#B##
#L#..M+.S##
##...MG.###
###########
```

### Step 5: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
##.....####
#P#....#B##
#L#..M+.S##
##...MG.###
###########
```

After:

```text
###########
##.....####
#P#....#B##
#L#...m@S##
##....m.###
###########
```


## Graph Facts

- Status: complete
- Reachable states: 887
- Legal transitions: 2256
- Event-only illegal transitions: 0
- Winning states: 18
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 887
- Legal transitions: 2256
- Budget: maxStates=300000
- Compressed regions: 82
- Bidirectional transitions: 1948
- Commitment transitions: 230
- Winning regions: 2
- Initial region: r0, states=17, dist=3, internalBidirectional=38, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r7@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=48, edges=94, winReachable=25, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=11, mergingWinSccs=14
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=210, dist=2, out=16, winOut=11, deadOut=5
- SCC path: s0@0 -> s45@1 -> s46@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 210 | 16 | 11 | 5 | 0 | 0 | s45 | no |
| s45 | 1 | 1 | 33 | 2 | 1 | 1 | 9 | 9 | s46 | yes |
| s46 | 5 | 0 | 2 | 0 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s45 | 210 | yes | no | down | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |
| s45 | 1 | 5 | s46 | 33 | no | yes | right | pull_object:sticky#1, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=887, regions=82, solution commitments=3
- Opening: commitments=5, viable=4, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 4 | 1 | 1 | forced optimal |
| 3 | r1 | r4 | 2 | 1 | 1 | 1 | forced optimal |
| 4 | r4 | r7 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 17 | 5 | 4 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 2 | 17 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 1 | 16 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 5 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 4 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | down | r1 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r4 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | pull_object:sticky#1, move_sticky_rigid |
| 5 | right | r7 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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
