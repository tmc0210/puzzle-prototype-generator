# Level Analysis: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L handoff v1
- Role: mechanic_witness
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
########
#@C.#P##
#..G#L##
#.....##
########
```

## Shortest Solution

- Found: yes
- Cost: 4
- Depth: 4
- Explored states: 20
- Inputs: right down right down
- Events: push_object:crate#1 walk walk pull_object:crate#1
- Event counts: push_object:crate#1=1, walk=2, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
########
########
#@C.#P##
#..G#L##
#.....##
########
```

After:

```text
########
########
#.@C#P##
#..G#L##
#.....##
########
```

### Step 4: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
########
########
#..C#P##
#..+#L##
#.....##
########
```

After:

```text
########
########
#...#P##
#..*#L##
#..@..##
########
```


## Graph Facts

- Status: complete
- Reachable states: 88
- Legal transitions: 203
- Event-only illegal transitions: 0
- Winning states: 10
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 88
- Legal transitions: 203
- Budget: maxStates=300000
- Compressed regions: 8
- Bidirectional transitions: 182
- Commitment transitions: 11
- Winning regions: 1
- Initial region: r0, states=10, dist=2, internalBidirectional=20, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@4
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=8, edges=9, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=10, dist=2, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@1 -> s2@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 10 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 10 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 4 | 0 | 18 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 10 | yes | yes | right | push_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 4 | s2 | 10 | no | yes | down | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=88, regions=8, solution commitments=2
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 2 | 1 | forced optimal |
| 3 | r1 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 10 | 3 | 1 | 2 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 1 | 10 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 0 | 18 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 2 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 4 | down | r3 | yes | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
