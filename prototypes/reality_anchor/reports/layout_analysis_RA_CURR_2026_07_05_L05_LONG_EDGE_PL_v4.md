# Level Analysis: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_push_pull_anchor, K_move_object_pull, K_move_object_push

## Initial State

```text
#########
#PL..G###
#.#..####
#.##C@G##
#......##
#########
```

## Shortest Solution

- Found: yes
- Cost: 24
- Depth: 24
- Explored states: 55
- Inputs: right down left left up up up left right down down down left left left up up up right right down right down right
- Events: pull_object:crate#1 walk walk walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1
- Event counts: pull_object:crate#1=1, walk=19, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=3, push_object:push_pull_anchor=2, push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#PL..G###
#.#..####
#.##C@G##
#......##
#########
```

After:

```text
#########
#PL..G###
#.#..####
#.##.C+##
#......##
#########
```

### Step 9: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#PL@.G###
#.#..####
#.##.CG##
#......##
#########
```

After:

```text
#########
#.PL@G###
#.#..####
#.##.CG##
#......##
#########
```

### Step 19: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#@PL.G###
#.#..####
#.##.CG##
#......##
#########
```

After:

```text
#########
#.@PLG###
#.#..####
#.##.CG##
#......##
#########
```

### Step 20: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
#.@PLG###
#.#..####
#.##.CG##
#......##
#########
```

After:

```text
#########
#..@PL###
#.#..####
#.##.CG##
#......##
#########
```

### Step 24: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#...PL###
#.#..####
#.##@CG##
#......##
#########
```

After:

```text
#########
#...PL###
#.#..####
#.##.@*##
#......##
#########
```


## Graph Facts

- Status: complete
- Reachable states: 85
- Legal transitions: 168
- Event-only illegal transitions: 0
- Winning states: 15
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 85
- Legal transitions: 168
- Budget: maxStates=300000
- Compressed regions: 8
- Bidirectional transitions: 158
- Commitment transitions: 7
- Winning regions: 1
- Initial region: r0, states=10, dist=4, internalBidirectional=18, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@9 -> r4@19 -> r5@20
- Forced commitment prefix length: 2
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=8, edges=7, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=10, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@9 -> s4@19 -> s5@20

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 10 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 15 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 9 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 19 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | s5 | yes |
| s5 | 20 | 0 | 30 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 10 | yes | yes | right | pull_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 9 | s2 | 15 | no | yes | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s2 | 9 | 19 | s4 | 14 | no | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s4 | 19 | 20 | s5 | 12 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=85, regions=8, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 8 | r1 | r2 | 3 | 1 | 0 | 1 | forced optimal |
| 18 | r2 | r4 | 2 | 1 | 1 | 1 | forced optimal |
| 19 | r4 | r5 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 10 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 15 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 9 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 19 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 20 | 0 | 30 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 2 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r2 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 10 | down | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r4 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 20 | right | r5 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | down | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r5 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_push_pull_anchor

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

### K_move_object_pull

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

### K_move_object_push

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
