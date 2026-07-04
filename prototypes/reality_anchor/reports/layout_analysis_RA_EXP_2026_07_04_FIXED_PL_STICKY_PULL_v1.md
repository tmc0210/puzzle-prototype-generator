# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_PL_STICKY_PULL_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
#########
####PL###
#########
#@BSG..##
#..M.MG.#
#.......#
#########
```

## Shortest Solution

- Found: yes
- Cost: 4
- Depth: 4
- Explored states: 25
- Inputs: right down right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1, walk=1, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
#########
####PL###
#########
#@BSG..##
#..M.MG.#
#.......#
#########
```

After:

```text
#########
####PL###
#########
#.@BS..##
#..C.MG.#
#.......#
#########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
####PL###
#########
#..BS..##
#.@C.MG.#
#.......#
#########
```

After:

```text
#########
####PL###
#########
#..BS..##
#..@MMG.#
#.......#
#########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
####PL###
#########
#..BS..##
#..@MMG.#
#.......#
#########
```

After:

```text
#########
####PL###
#########
#..BS..##
#...@Mm.#
#.......#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 5107
- Legal transitions: 13185
- Event-only illegal transitions: 0
- Winning states: 642
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5107
- Legal transitions: 13185
- Budget: maxStates=300000
- Compressed regions: 478
- Bidirectional transitions: 11862
- Commitment transitions: 1174
- Winning regions: 86
- Initial region: r0, states=32, dist=1, internalBidirectional=70, commitments=5, viableCommitments=5, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@3 -> r8@4
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=356, edges=646, winReachable=139, winning=66, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=35, mergingWinSccs=61
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=64, dist=1, out=5, winOut=4, deadOut=1
- SCC path: s0@0 -> s17@1 -> s311@3 -> s342@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 64 | 5 | 4 | 1 | 0 | 0 | s17 | no |
| s17 | 1 | 0 | 60 | 10 | 0 | 0 | 1 | 1 | s311 | no |
| s311 | 3 | 1 | 15 | 3 | 3 | 0 | 2 | 2 | s342 | no |
| s342 | 4 | 0 | 29 | 2 | 0 | 0 | 6 | 6 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s17 | 64 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s17 | 1 | 3 | s311 | 60 | no | no | right | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s311 | 3 | 4 | s342 | 15 | yes | no | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=5107, regions=478, solution commitments=3
- Opening: commitments=5, viable=5, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=1/3, forced viable commitments=0/3
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 5 | 0 | 1 | forced optimal |
| 2 | r1 | r4 | 0 | 7 | 0 | 0 | multiple viable choices |
| 3 | r4 | r8 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 32 | 5 | 5 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 0 | 30 | 7 | 7 | 0 | 0 | 0 | r4 | no | no | no |
| r4 | 3 | 1 | 15 | 3 | 3 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 4 | 0 | 29 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 5 | 5 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 0 | 7 | 7 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | down | r1 | no | 0 | 7 | 7 | 0 | 0 | 0 | r4 | yes | yes | no | no | no | no | walk |
| 3 | right | r4 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 4 | right | r8 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
