# Level Analysis: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_no_bottom_goal

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L push-pull v1 no bottom goal
- Role: mechanic_witness
- Status: candidate
- Support: high
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#@CG####
#...#P##
#...#L##
#.C..###
########
```

## Shortest Solution

- Found: yes
- Cost: 1
- Depth: 1
- Explored states: 3
- Inputs: right
- Events: push_object:crate#1
- Event counts: push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
########
#@CG####
#...#P##
#...#L##
#.C..###
########
```

After:

```text
########
#.@*####
#...#P##
#...#L##
#.C..###
########
```


## Graph Facts

- Status: complete
- Reachable states: 66
- Legal transitions: 150
- Event-only illegal transitions: 0
- Winning states: 22
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
- Winning regions: 2
- Initial region: r0, states=21, dist=1, internalBidirectional=44, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=6, edges=5, winReachable=3, winning=2, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/1, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=21, dist=1, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s4@1

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 21 | 3 | 1 | 2 | 0 | 0 | s4 | yes |
| s4 | 1 | 0 | 21 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 21 | yes | yes | right | push_object:crate#1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=66, regions=6, solution commitments=1
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=1/1, optimal prefix=1/1, forced viable commitments=1/1
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: near-discovery shape; opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 21 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 0 | 21 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
