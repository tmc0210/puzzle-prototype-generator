# Level Analysis: RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S cut v1
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 10
- Inputs: up up left up up right
- Events: push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk push_object:crate#1
- Event counts: push_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n1=1, walk=3, push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

After:

```text
########
########
##B..G##
##S.M###
###.M###
####@###
####.###
########
```

### Step 2: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
########
########
##B..G##
##S.M###
###.M###
####@###
####.###
########
```

After:

```text
########
########
##B.CG##
##S.M###
###.@###
####.###
####.###
########
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
########
########
##B@CG##
##S.M###
###..###
####.###
####.###
########
```

After:

```text
########
########
##B.@*##
##S.M###
###..###
####.###
####.###
########
```


## Graph Facts

- Status: complete
- Reachable states: 41
- Legal transitions: 85
- Event-only illegal transitions: 0
- Winning states: 32
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 41
- Legal transitions: 85
- Budget: maxStates=300000
- Compressed regions: 8
- Bidirectional transitions: 78
- Commitment transitions: 7
- Winning regions: 5
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@6
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=8, edges=7, winReachable=8, winning=5, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=1, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 1 | 6 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 6 | 0 | 7 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | up | push_object:sticky#1, move_sticky_rigid | scripted_trivial_scc |
| s1 | 1 | 2 | s2 | 2 | yes | yes | up | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 | scripted_same_state_handoff |
| s2 | 2 | 6 | s3 | 6 | no | yes | right | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=41, regions=8, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 5 | r2 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 1 | 6 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 6 | 0 | 7 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:sticky#1, move_sticky_rigid |
| 2 | up | r2 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 3 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r3 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
