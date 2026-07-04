# Level Analysis: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L push-pull v1
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
#.CG.###
########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 39
- Inputs: right down down right down right
- Events: push_object:crate#1 walk walk walk walk pull_object:crate#2
- Event counts: push_object:crate#1=1, walk=4, pull_object:crate#2=1

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
#.CG.###
########
```

After:

```text
########
#.@*####
#...#P##
#...#L##
#.CG.###
########
```

### Step 6: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
########
#..*####
#...#P##
#...#L##
#.C+.###
########
```

After:

```text
########
#..*####
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
- Winning states: 1
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
- Winning regions: 1
- Initial region: r0, states=21, dist=2, internalBidirectional=44, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=6, edges=5, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=21, dist=2, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s4@1 -> s5@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 21 | 3 | 1 | 2 | 0 | 0 | s4 | yes |
| s4 | 1 | 1 | 21 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 6 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s4 | 21 | yes | yes | right | push_object:crate#1 | scripted_same_state_handoff |
| s4 | 1 | 6 | s5 | 21 | no | yes | right | pull_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=66, regions=6, solution commitments=2
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 2 | 1 | forced optimal |
| 5 | r1 | r4 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 21 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 1 | 21 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 6 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 2 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r4 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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
