# Level Analysis: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: PL chain end pull dual pocket v1 no right goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
##PL.#####
###.G#####
#.@CC....#
###.....##
##########
```

## Shortest Solution

- Found: yes
- Cost: 4
- Depth: 4
- Explored states: 10
- Inputs: right up right up
- Events: push_object:crate#1 force_chain:n2 walk walk pull_object:crate#1
- Event counts: push_object:crate#1=1, force_chain:n2=1, walk=2, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
##########
##PL.#####
###.G#####
#.@CC....#
###.....##
##########
```

After:

```text
##########
##PL.#####
###.G#####
#..@CC...#
###.....##
##########
```

### Step 4: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
##PL.#####
###.+#####
#...CC...#
###.....##
##########
```

After:

```text
##########
##PL@#####
###.*#####
#....C...#
###.....##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 30
- Legal transitions: 52
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 30
- Legal transitions: 52
- Budget: maxStates=300000
- Compressed regions: 8
- Bidirectional transitions: 44
- Commitment transitions: 7
- Winning regions: 2
- Initial region: r0, states=2, dist=3, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@4
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=8, edges=7, winReachable=7, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=1, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=2, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s6@2 -> s7@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 11 | 2 | 2 | 0 | 1 | 1 | s6 | no |
| s6 | 2 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | s7 | yes |
| s7 | 4 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 2 | yes | yes | right | push_object:crate#1, force_chain:n2 | scripted_same_state_handoff |
| s1 | 1 | 2 | s6 | 11 | yes | no | up | walk | scripted_same_state_handoff |
| s6 | 2 | 4 | s7 | 2 | no | yes | up | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=30, regions=8, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 2 | 2 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 11 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 4 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:crate#1, force_chain:n2 |
| 2 | up | r2 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 4 | up | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
