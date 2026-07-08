# Level Analysis: RA_SCRATCH_BRIDGE_RELEASE_01

## Summary

- Prototype: reality_anchor
- Title: Bridge release scratch 01
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#.G.M..##
#G@C...##
#.G.M..##
#.......#
###BS####
#########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 14797
- Inputs: down down right right up right up up left left down left right right down left
- Events: walk walk walk walk push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n2 push_object:crate#1 push_object:crate#3 push_object:crate#2 walk walk walk push_object:crate#3
- Event counts: walk=10, push_object:sticky#2=1, move_sticky_rigid=2, sticky_merge:n1=1, push_object:sticky#1=1, force_chain:n2=1, sticky_to_box:n2=1, push_object:crate#1=1, push_object:crate#3=2, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid, sticky_merge:n1

Before:

```text
#########
#.G.M..##
#G.C...##
#.G.M..##
#...@...#
###BS####
#########
```

After:

```text
#########
#.G.M..##
#G.CM..##
#.G.@..##
#.......#
###BS####
#########
```

### Step 9: left

- Legal: true
- Events: push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2

Before:

```text
#########
#.G.M@.##
#G.CM..##
#.G....##
#.......#
###BS####
#########
```

After:

```text
#########
#.GC@..##
#GCC...##
#.G....##
#.......#
###BS####
#########
```

### Step 10: left

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#.GC@..##
#GCC...##
#.G....##
#.......#
###BS####
#########
```

After:

```text
#########
#.*@...##
#GCC...##
#.G....##
#.......#
###BS####
#########
```

### Step 11: down

- Legal: true
- Events: push_object:crate#3

Before:

```text
#########
#.*@...##
#GCC...##
#.G....##
#.......#
###BS####
#########
```

After:

```text
#########
#.*....##
#GC@...##
#.GC...##
#.......#
###BS####
#########
```

### Step 12: left

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
#.*....##
#GC@...##
#.GC...##
#.......#
###BS####
#########
```

After:

```text
#########
#.*....##
#*@....##
#.GC...##
#.......#
###BS####
#########
```

### Step 16: left

- Legal: true
- Events: push_object:crate#3

Before:

```text
#########
#.*....##
#*.....##
#.GC@..##
#.......#
###BS####
#########
```

After:

```text
#########
#.*....##
#*.....##
#.*@...##
#.......#
###BS####
#########
```


## Graph Facts

- Status: complete
- Reachable states: 50178
- Legal transitions: 151675
- Event-only illegal transitions: 0
- Winning states: 4
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 50178
- Legal transitions: 151675
- Budget: maxStates=300000
- Compressed regions: 2303
- Bidirectional transitions: 138000
- Commitment transitions: 13675
- Winning regions: 4
- Initial region: r0, states=22, dist=6, internalBidirectional=56, commitments=10, viableCommitments=8, deadCommitments=2, progressCommitments=6, optimalCommitments=6
- Solution region path: r0@0 -> r16@5 -> r83@9 -> r242@10 -> r352@11 -> r481@12 -> r1072@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=335, edges=1301, winReachable=8, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=3, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=7348, dist=1, out=49, winOut=4, deadOut=45
- SCC path: s0@0 -> s158@12 -> s160@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 7348 | 49 | 4 | 45 | 0 | 0 | s158 | no |
| s158 | 12 | 1 | 126 | 8 | 1 | 7 | 3 | 3 | s160 | yes |
| s160 | 16 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 12 | s158 | 7348 | no | no | left | push_object:crate#2 | has_reposition_room |
| s158 | 12 | 16 | s160 | 126 | no | yes | left | push_object:crate#3 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=50178, regions=2303, solution commitments=6
- Opening: commitments=10, viable=8, dead=2, optimal=6
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r16 | 6 | 8 | 2 | 6 | multiple optimal choices |
| 8 | r16 | r83 | 5 | 4 | 1 | 1 | forced optimal |
| 9 | r83 | r242 | 4 | 4 | 2 | 2 | multiple optimal choices |
| 10 | r242 | r352 | 3 | 3 | 3 | 1 | forced optimal |
| 11 | r352 | r481 | 2 | 6 | 2 | 2 | multiple optimal choices |
| 15 | r481 | r1072 | 1 | 3 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 22 | 10 | 8 | 2 | 6 | 6 | r16 | no | no | no |
| r16 | 5 | 5 | 22 | 5 | 4 | 1 | 1 | 1 | r83 | no | no | yes |
| r83 | 9 | 4 | 22 | 6 | 4 | 2 | 2 | 2 | r242 | no | no | no |
| r242 | 10 | 3 | 22 | 6 | 3 | 3 | 1 | 1 | r352 | no | no | yes |
| r352 | 11 | 2 | 22 | 8 | 6 | 2 | 2 | 2 | r481 | no | no | no |
| r481 | 12 | 1 | 21 | 6 | 3 | 3 | 1 | 1 | r1072 | no | no | yes |
| r1072 | 16 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 10 | 8 | 2 | 6 | 6 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 6 | 10 | 8 | 2 | 6 | 6 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 6 | 10 | 8 | 2 | 6 | 6 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 6 | 10 | 8 | 2 | 6 | 6 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 6 | 10 | 8 | 2 | 6 | 6 | r16 | yes | yes | yes | yes | no | no | walk |
| 5 | up | r16 | yes | 5 | 5 | 4 | 1 | 1 | 1 | r16 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid, sticky_merge:n1 |
| 6 | right | r16 | no | 5 | 5 | 4 | 1 | 1 | 1 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r16 | no | 5 | 5 | 4 | 1 | 1 | 1 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r16 | no | 5 | 5 | 4 | 1 | 1 | 1 | r83 | yes | yes | yes | yes | no | yes | walk |
| 9 | left | r83 | yes | 4 | 6 | 4 | 2 | 2 | 2 | r242 | yes | yes | yes | yes | no | no | push_object:sticky#1, force_chain:n2, move_sticky_rigid, sticky_to_box:n2 |
| 10 | left | r242 | yes | 3 | 6 | 3 | 3 | 1 | 1 | r352 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 11 | down | r352 | yes | 2 | 8 | 6 | 2 | 2 | 2 | r481 | yes | yes | yes | yes | no | no | push_object:crate#3 |
| 12 | left | r481 | yes | 1 | 6 | 3 | 3 | 1 | 1 | r481 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 13 | right | r481 | no | 1 | 6 | 3 | 3 | 1 | 1 | r481 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r481 | no | 1 | 6 | 3 | 3 | 1 | 1 | r481 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r481 | no | 1 | 6 | 3 | 3 | 1 | 1 | r1072 | yes | yes | yes | yes | no | yes | walk |
| 16 | left | r1072 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#3 |

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
