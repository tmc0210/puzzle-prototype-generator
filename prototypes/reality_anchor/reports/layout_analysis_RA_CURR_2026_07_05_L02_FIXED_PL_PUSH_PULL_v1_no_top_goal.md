# Level Analysis: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L push-pull v1 no top goal
- Role: mechanic_witness
- Status: candidate
- Support: high
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#@C.####
#...#P##
#...#L##
#.CG.###
########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 33
- Inputs: down down right right down right
- Events: walk walk walk walk walk pull_object:crate#2
- Event counts: walk=5, pull_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
########
#.C.####
#...#P##
#...#L##
#.C+.###
########
```

After:

```text
########
#.C.####
#...#P##
#...#L##
#..*@###
########
```


## Graph Facts

- Status: complete
- Reachable states: 66
- Legal transitions: 150
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 66
- Legal transitions: 150
- Budget: maxStates=300000
- Compressed regions: 6
- Bidirectional transitions: 140
- Commitment transitions: 7
- Winning regions: 3
- Initial region: r0, states=21, dist=1, internalBidirectional=44, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=6, edges=5, winReachable=6, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=1, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=21, dist=1, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s1@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 21 | 3 | 3 | 0 | 0 | 0 | s1 | no |
| s1 | 6 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 21 | no | no | right | pull_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=66, regions=6, solution commitments=1
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r3 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 21 | 3 | 3 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 6 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 6 | right | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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
