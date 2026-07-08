# Level Analysis: RA_LEX_2026_07_07_RATCHET_SPLIT_BRIDGE_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_RATCHET_SPLIT_BRIDGE_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
###G##...#
##G.MMLP@#
#...M....#
#...MM####
#.BS######
##########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 106
- Inputs: up left down right down left left left down left up
- Events: walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 sticky_split:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- Event counts: walk=6, push_object:push_pull_anchor=5, anchor_boundary_shift:push_pull=5, force_chain:n2=3, move_sticky_rigid=3, sticky_to_box:n3=1, sticky_split:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
###G##.@.#
##G.MMLP.#
#...M....#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##G.MM.@.#
#...M.LP.#
#...MM####
#.BS######
##########
```

### Step 6: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
###G##...#
##G.MM...#
#...M.LP@#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##G.MM...#
#...MLP@.#
#...MM####
#.BS######
##########
```

### Step 7: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
##########
###G##...#
##G.MM...#
#...MLP@.#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##GMM....#
#..MLP@..#
#..MM.####
#.BS######
##########
```

### Step 8: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1

Before:

```text
##########
###G##...#
##GMM....#
#..MLP@..#
#..MM.####
#.BS######
##########
```

After:

```text
##########
###G##...#
##*M.....#
#.CLP@...#
#.CM..####
#.BS######
##########
```

### Step 11: up

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
##########
###G##...#
##*M.....#
#.CLP....#
#.CM@.####
#.BS######
##########
```

After:

```text
##########
###m##...#
##*LP....#
#.C.@....#
#.CM..####
#.BS######
##########
```


## Graph Facts

- Status: complete
- Reachable states: 359
- Legal transitions: 919
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 359
- Legal transitions: 919
- Budget: maxStates=300000
- Compressed regions: 62
- Bidirectional transitions: 824
- Commitment transitions: 95
- Winning regions: 2
- Initial region: r0, states=7, dist=5, internalBidirectional=12, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r3@3 -> r9@6 -> r16@7 -> r18@8 -> r26@11
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=44, edges=62, winReachable=12, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=5, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=21, dist=4, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s12@6 -> s13@7 -> s20@8 -> s26@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 21 | 4 | 2 | 2 | 0 | 0 | s12 | no |
| s12 | 6 | 3 | 9 | 1 | 1 | 0 | 2 | 2 | s13 | yes |
| s13 | 7 | 2 | 10 | 2 | 2 | 0 | 2 | 2 | s20 | no |
| s20 | 8 | 1 | 14 | 3 | 2 | 1 | 2 | 2 | s26 | no |
| s26 | 11 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s12 | 21 | no | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s12 | 6 | 7 | s13 | 9 | yes | yes | left | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | scripted_same_state_handoff |
| s13 | 7 | 8 | s20 | 10 | yes | no | left | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 | scripted_same_state_handoff |
| s20 | 8 | 11 | s26 | 14 | no | no | up | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=359, regions=62, solution commitments=5
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r3 | 5 | 3 | 1 | 2 | multiple optimal choices |
| 5 | r3 | r9 | 4 | 2 | 0 | 1 | forced optimal |
| 6 | r9 | r16 | 3 | 1 | 0 | 1 | forced optimal |
| 7 | r16 | r18 | 2 | 2 | 0 | 1 | forced optimal |
| 10 | r18 | r26 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 7 | 4 | 3 | 1 | 2 | 2 | r3 | no | no | no |
| r3 | 3 | 4 | 6 | 2 | 2 | 0 | 1 | 1 | r9 | no | no | yes |
| r9 | 6 | 3 | 9 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes |
| r16 | 7 | 2 | 10 | 2 | 2 | 0 | 1 | 1 | r18 | no | no | yes |
| r18 | 8 | 1 | 14 | 3 | 2 | 1 | 1 | 1 | r26 | no | no | yes |
| r26 | 11 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 5 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 5 | 4 | 3 | 1 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 3 | down | r3 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 4 | right | r3 | no | 4 | 2 | 2 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r3 | no | 4 | 2 | 2 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | no | yes | walk |
| 6 | left | r9 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 7 | left | r16 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |
| 8 | left | r18 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 |
| 9 | down | r18 | no | 1 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r18 | no | 1 | 3 | 2 | 1 | 1 | 1 | r26 | yes | yes | yes | yes | no | yes | walk |
| 11 | up | r26 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |

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
