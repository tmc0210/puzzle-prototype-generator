# Level Analysis: RA_SMOKE_04_BOX_TO_STICKY_MERGE

## Summary

- Prototype: reality_anchor
- Title: Box enters sticky world and merges
- Role: mechanic_witness
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#######
#..BS.#
#@C.MG#
#######
```

## Shortest Solution

- Found: yes
- Cost: 2
- Depth: 2
- Explored states: 7
- Inputs: right right
- Events: push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- Event counts: push_object:crate#1=2, force_chain:n2=1, move_sticky_rigid=1, box_to_sticky:n1=1, sticky_merge:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
#######
#..BS.#
#@C.MG#
#######
```

After:

```text
#######
#..BS.#
#.@CMG#
#######
```

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#######
#..BS.#
#.@CMG#
#######
```

After:

```text
#######
#..BS.#
#..@Mm#
#######
```


## Graph Facts

- Status: complete
- Reachable states: 50
- Legal transitions: 109
- Event-only illegal transitions: 0
- Winning states: 28
- Budget: maxStates=20000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 50
- Legal transitions: 109
- Budget: maxStates=20000
- Compressed regions: 10
- Bidirectional transitions: 96
- Commitment transitions: 13
- Winning regions: 5
- Initial region: r0, states=3, dist=2, internalBidirectional=4, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r2@2
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=10, edges=13, winReachable=10, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=2/2, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=3, dist=2, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 3 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 4 | 2 | 2 | 0 | 1 | 1 | s2 | no |
| s2 | 2 | 0 | 5 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 3 | yes | no | right | push_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 4 | yes | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=50, regions=10, solution commitments=2
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 1 | r1 | r2 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 3 | 2 | 2 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 1 | 4 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 0 | 5 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | right | r1 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 2 | right | r2 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |

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
