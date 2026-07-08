# Level Analysis: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_08_OVERSHOOT_CUT_TAIL_v1_no_top_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#...####
#@CC.G.#
###....#
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 2
- Depth: 2
- Explored states: 7
- Inputs: right right
- Events: push_object:crate#1 force_chain:n2 box_to_sticky:n1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
- Event counts: push_object:crate#1=2, force_chain:n2=2, box_to_sticky:n1=2, move_sticky_rigid=1, sticky_merge:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, box_to_sticky:n1

Before:

```text
########
#...####
#@CC.G.#
###....#
###BS###
########
```

After:

```text
########
#...####
#.@CMG.#
###....#
###BS###
########
```

### Step 2: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
########
#...####
#.@CMG.#
###....#
###BS###
########
```

After:

```text
########
#...####
#..@Mm.#
###....#
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 44
- Legal transitions: 98
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 44
- Legal transitions: 98
- Budget: maxStates=300000
- Compressed regions: 8
- Bidirectional transitions: 90
- Commitment transitions: 8
- Winning regions: 2
- Initial region: r0, states=4, dist=2, internalBidirectional=6, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=8, edges=8, winReachable=7, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=2, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=2/2, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=4, dist=2, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 4 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 5 | 2 | 2 | 0 | 1 | 1 | s2 | no |
| s2 | 2 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 4 | yes | no | right | push_object:crate#1, force_chain:n2, box_to_sticky:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 5 | yes | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=44, regions=8, solution commitments=2
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 2 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 4 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 1 | 5 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:crate#1, force_chain:n2, box_to_sticky:n1 |
| 2 | right | r2 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |

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
