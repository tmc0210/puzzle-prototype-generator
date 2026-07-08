# Level Analysis: RA_LEX_2026_07_07_RATCHET_SPLIT_BRIDGE_v1_no_top_goal

## Summary

- Prototype: reality_anchor
- Title: Ratchet split bridge v1 no top goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
###.##...#
##G.MMLP@#
#...M....#
#...MM####
#.BS######
##########
```

## Shortest Solution

- Found: yes
- Cost: 2
- Depth: 2
- Explored states: 9
- Inputs: left left
- Events: push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 sticky_split:n1
- Event counts: push_object:push_pull_anchor=2, force_chain:n2=2, anchor_boundary_shift:push_pull=2, move_sticky_rigid=2, sticky_to_box:n3=1, sticky_split:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
##########
###.##...#
##G.MMLP@#
#...M....#
#...MM####
#.BS######
##########
```

After:

```text
##########
###.##...#
##GMMLP@.#
#..M.....#
#..MM.####
#.BS######
##########
```

### Step 2: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1

Before:

```text
##########
###.##...#
##GMMLP@.#
#..M.....#
#..MM.####
#.BS######
##########
```

After:

```text
##########
###.##...#
##*MLP@..#
#.C......#
#.CM..####
#.BS######
##########
```


## Graph Facts

- Status: complete
- Reachable states: 64
- Legal transitions: 146
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 64
- Legal transitions: 146
- Budget: maxStates=500000
- Compressed regions: 16
- Bidirectional transitions: 124
- Commitment transitions: 22
- Winning regions: 3
- Initial region: r0, states=7, dist=2, internalBidirectional=12, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=12, edges=14, winReachable=8, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=4, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=2/2, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=2
- Initial SCC: s0, states=21, dist=2, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s1@1 -> s2@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 21 | 4 | 2 | 2 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 9 | 4 | 2 | 2 | 1 | 1 | s2 | no |
| s2 | 2 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 21 | yes | no | left | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 9 | yes | no | left | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=64, regions=16, solution commitments=2
- Opening: commitments=4, viable=3, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 3 | 1 | 1 | forced optimal |
| 1 | r1 | r2 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 7 | 4 | 3 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 1 | 9 | 4 | 2 | 2 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 3 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | left | r1 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |
| 2 | left | r2 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 |

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
