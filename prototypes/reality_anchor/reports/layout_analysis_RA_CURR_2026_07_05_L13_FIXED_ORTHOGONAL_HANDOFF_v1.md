# Level Analysis: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_HANDOFF_v1

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_HANDOFF_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
####BS#####
#P#.C.G..##
#L#..MG..##
###.@....##
###########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 34
- Inputs: left up up right right
- Events: walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: walk=3, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
####BS#####
#P#@C.G..##
#L#..MG..##
###......##
###########
```

After:

```text
###########
####BS#####
#P#.@MG..##
#L#..MG..##
###......##
###########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####BS#####
#P#.@MG..##
#L#..MG..##
###......##
###########
```

After:

```text
###########
####BS#####
#P#..@m..##
#L#...m..##
###......##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1611
- Legal transitions: 4316
- Event-only illegal transitions: 0
- Winning states: 16
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1611
- Legal transitions: 4316
- Budget: maxStates=300000
- Compressed regions: 81
- Bidirectional transitions: 3744
- Commitment transitions: 340
- Winning regions: 1
- Initial region: r0, states=30, dist=2, internalBidirectional=70, commitments=7, viableCommitments=5, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r5@4 -> r8@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=16, edges=27, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=528, dist=0, out=4, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 528 | 4 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=1611, regions=81, solution commitments=2
- Opening: commitments=7, viable=5, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r5 | 2 | 5 | 2 | 1 | forced optimal |
| 4 | r5 | r8 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 30 | 7 | 5 | 2 | 1 | 1 | r5 | no | no | yes |
| r5 | 4 | 1 | 16 | 2 | 2 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 5 | 0 | 16 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 7 | 5 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 7 | 5 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 2 | 7 | 5 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 2 | 7 | 5 | 2 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 4 | right | r5 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 5 | right | r8 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
