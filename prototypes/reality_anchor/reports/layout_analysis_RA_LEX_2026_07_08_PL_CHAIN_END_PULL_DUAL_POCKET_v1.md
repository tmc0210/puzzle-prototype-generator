# Level Analysis: RA_LEX_2026_07_08_PL_CHAIN_END_PULL_DUAL_POCKET_v1

## Summary

- Prototype: reality_anchor
- Title: PL chain end pull dual pocket v1
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
#.@CC.G..#
###.....##
##########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 30
- Inputs: right down right right right up right down left left left left up up right up
- Events: push_object:crate#1 force_chain:n2 walk walk walk walk walk pull_object:crate#2 walk walk walk walk walk walk walk walk pull_object:crate#1
- Event counts: push_object:crate#1=1, force_chain:n2=1, walk=13, pull_object:crate#2=1, pull_object:crate#1=1

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
#.@CC.G..#
###.....##
##########
```

After:

```text
##########
##PL.#####
###.G#####
#..@CCG..#
###.....##
##########
```

### Step 7: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
##PL.#####
###.G#####
#...CC+..#
###.....##
##########
```

After:

```text
##########
##PL.#####
###.G#####
#...C.*@.#
###.....##
##########
```

### Step 16: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
##PL.#####
###.+#####
#...C.*..#
###.....##
##########
```

After:

```text
##########
##PL@#####
###.*#####
#.....*..#
###.....##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 30
- Legal transitions: 52
- Event-only illegal transitions: 0
- Winning states: 1
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
- Winning regions: 1
- Initial region: r0, states=2, dist=4, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@7 -> r6@14 -> r7@16
- Forced commitment prefix length: 1
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=8, edges=7, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=2, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@7 -> s4@14 -> s5@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 7 | 2 | 10 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 14 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 2 | yes | yes | right | push_object:crate#1, force_chain:n2 | scripted_same_state_handoff |
| s1 | 1 | 7 | s2 | 11 | no | yes | right | pull_object:crate#2 | has_reposition_room |
| s2 | 7 | 14 | s4 | 10 | no | yes | up | walk | has_reposition_room |
| s4 | 14 | 16 | s5 | 2 | no | yes | up | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=30, regions=8, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 6 | r1 | r4 | 3 | 1 | 1 | 1 | forced optimal |
| 13 | r4 | r6 | 2 | 1 | 1 | 1 | forced optimal |
| 15 | r6 | r7 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 11 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 7 | 2 | 10 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 14 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes |
| r7 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2 |
| 2 | down | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 3 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 7 | right | r4 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 8 | down | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 14 | up | r6 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r6 | no | 1 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 16 | up | r7 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
