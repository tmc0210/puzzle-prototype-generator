# Level Analysis: RA_LEX_2026_07_08_PL_VACATE_RECOVER_v2

## Summary

- Prototype: reality_anchor
- Title: PL vacate recover v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
##PL#..##
###..G.##
#.@CCG..#
#########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 20
- Inputs: right up right right up right down down left right
- Events: push_object:crate#1 force_chain:n2 walk walk walk pull_object:crate#2 walk walk walk walk pull_object:crate#2
- Event counts: push_object:crate#1=1, force_chain:n2=1, walk=7, pull_object:crate#2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
#########
##PL#..##
###..G.##
#.@CCG..#
#########
```

After:

```text
#########
##PL#..##
###..G.##
#..@C*..#
#########
```

### Step 5: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
#########
##PL#..##
###..+.##
#...C*..#
#########
```

After:

```text
#########
##PL#@.##
###..*.##
#...CG..#
#########
```

### Step 10: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
#########
##PL#..##
###..*.##
#...C+..#
#########
```

After:

```text
#########
##PL#..##
###..*.##
#....*@.#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 20
- Legal transitions: 33
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 20
- Legal transitions: 33
- Budget: maxStates=300000
- Compressed regions: 7
- Bidirectional transitions: 26
- Commitment transitions: 6
- Winning regions: 1
- Initial region: r0, states=2, dist=5, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@5 -> r5@9 -> r6@10
- Forced commitment prefix length: 2
- Forced viable prefix length: 5
- Forced optimal prefix length: 5

### SCC Irreversible Progress

- Shape: sccs=7, edges=6, winReachable=6, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=5, forcedWinPrefix=5/5, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=3/5, trivial=1, sameEntryExit=3, forcedScripted=3, maxRun=2
- Initial SCC: s0, states=2, dist=5, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s4@5 -> s5@9 -> s6@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 3 | 7 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 5 | 2 | 5 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 10 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 2 | yes | yes | right | push_object:crate#1, force_chain:n2 | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 3 | yes | yes | up | walk | scripted_same_state_handoff |
| s2 | 2 | 5 | s4 | 7 | no | yes | up | pull_object:crate#2 | has_reposition_room |
| s4 | 5 | 9 | s5 | 5 | no | yes | left | walk | has_reposition_room |
| s5 | 9 | 10 | s6 | 1 | yes | yes | right | pull_object:crate#2 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=20, regions=7, solution commitments=5
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=5/5, optimal prefix=5/5, forced viable commitments=5/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 4 | r2 | r3 | 3 | 1 | 1 | 1 | forced optimal |
| 8 | r3 | r5 | 2 | 1 | 0 | 1 | forced optimal |
| 9 | r5 | r6 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 4 | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 3 | 7 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 5 | 2 | 5 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 10 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2 |
| 2 | up | r2 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r2 | no | 3 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r2 | no | 3 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 5 | up | r3 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 6 | right | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r3 | no | 2 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 9 | left | r5 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r6 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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
