# Level Analysis: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2_no_top_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
####BS#####
#P#......##
#L#.C....##
###..MG..##
###...@..##
###########
```

## Shortest Solution

- Found: yes
- Cost: 2
- Depth: 2
- Explored states: 6
- Inputs: up right
- Events: walk pull_object:sticky#1 move_sticky_rigid
- Event counts: walk=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####BS#####
#P#......##
#L#.C....##
###..M+..##
###......##
###########
```

After:

```text
###########
####BS#####
#P#......##
#L#.C....##
###...m@.##
###......##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 1239
- Legal transitions: 3506
- Event-only illegal transitions: 0
- Winning states: 202
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1239
- Legal transitions: 3506
- Budget: maxStates=300000
- Compressed regions: 54
- Bidirectional transitions: 3052
- Commitment transitions: 236
- Winning regions: 15
- Initial region: r0, states=62, dist=1, internalBidirectional=160, commitments=4, viableCommitments=4, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=1, edges=0, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=1239, dist=0, out=0, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 1239 | 0 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=1239, regions=54, solution commitments=1
- Opening: commitments=4, viable=4, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 62 | 4 | 4 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 2 | 0 | 88 | 5 | 5 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 4 | 4 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 1 | 4 | 4 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 2 | right | r1 | yes | 0 | 5 | 5 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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
