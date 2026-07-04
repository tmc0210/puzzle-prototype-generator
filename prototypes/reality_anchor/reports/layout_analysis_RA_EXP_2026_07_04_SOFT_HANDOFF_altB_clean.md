# Level Analysis: RA_EXP_2026_07_04_SOFT_HANDOFF_altB_clean

## Summary

- Prototype: reality_anchor
- Title: Soft handoff altB clean
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#######
##.@..#
#P..C.#
#LGB..#
#M#SG.#
#######
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 113
- Inputs: right down down right up left left left down right
- Events: walk push_object:crate#1 push_object:crate#1 box_to_sticky:n1 pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=5, push_object:crate#1=2, box_to_sticky:n1=1, pull_object:box_sticky_anchor=1, force_chain:n2=1, anchor_boundary_shift:box_sticky=1, move_sticky_rigid=2, pull_object:sticky#2=1, sticky_to_box:n1=1, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
#######
##..@.#
#P..C.#
#LGB..#
#M#SG.#
#######
```

After:

```text
#######
##....#
#P..@.#
#LGBC.#
#M#SG.#
#######
```

### Step 3: down

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
#######
##....#
#P..@.#
#LGBC.#
#M#SG.#
#######
```

After:

```text
#######
##....#
#P....#
#LGB@.#
#M#Sm.#
#######
```

### Step 4: right

- Legal: true
- Events: pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
#######
##....#
#P....#
#LGB@.#
#M#Sm.#
#######
```

After:

```text
#######
##....#
#P....#
#LG.B@#
#M#.SM#
#######
```

### Step 5: up

- Legal: true
- Events: pull_object:sticky#2, move_sticky_rigid, sticky_to_box:n1

Before:

```text
#######
##....#
#P....#
#LG.B@#
#M#.SM#
#######
```

After:

```text
#######
##....#
#P...@#
#LG.BC#
#M#.S.#
#######
```

### Step 10: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#######
##....#
#P....#
#L+.BC#
#M#.S.#
#######
```

After:

```text
#######
##....#
#.P...#
#.L@BC#
#M#.S.#
#######
```


## Graph Facts

- Status: complete
- Reachable states: 224
- Legal transitions: 529
- Event-only illegal transitions: 0
- Winning states: 60
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 224
- Legal transitions: 529
- Budget: maxStates=300000
- Compressed regions: 29
- Bidirectional transitions: 468
- Commitment transitions: 55
- Winning regions: 8
- Initial region: r0, states=10, dist=3, internalBidirectional=20, commitments=5, viableCommitments=5, deadCommitments=0, progressCommitments=4, optimalCommitments=4
- Solution region path: r0@0 -> r2@2 -> r4@4 -> r18@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=19, edges=29, winReachable=13, winning=8, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=56, dist=0, out=9, winOut=0, deadOut=0
- SCC path: s0@0 -> s12@2 -> s17@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 56 | 9 | 0 | 0 | 0 | 0 | s12 | no |
| s12 | 2 | 1 | 12 | 2 | 1 | 1 | 1 | 1 | s17 | yes |
| s17 | 4 | 0 | 45 | 1 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s12 | 56 | no | no | down | push_object:crate#1 | has_reposition_room |
| s12 | 2 | 4 | s17 | 12 | no | yes | right | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=224, regions=29, solution commitments=3
- Opening: commitments=5, viable=5, dead=0, optimal=4
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r2 | 3 | 5 | 0 | 4 | multiple optimal choices |
| 3 | r2 | r4 | 2 | 1 | 1 | 1 | forced optimal |
| 9 | r4 | r18 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 10 | 5 | 5 | 0 | 4 | 4 | r2 | no | no | no |
| r2 | 2 | 2 | 12 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 1 | 12 | 2 | 2 | 0 | 1 | 1 | r18 | no | no | yes |
| r18 | 10 | 0 | 10 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 5 | 0 | 4 | 4 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 5 | 5 | 0 | 4 | 4 | r2 | yes | yes | yes | yes | no | no | walk |
| 2 | down | r2 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 3 | down | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | push_object:crate#1, box_to_sticky:n1 |
| 4 | right | r4 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 5 | up | r4 | no | 1 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#2, move_sticky_rigid, sticky_to_box:n1 |
| 6 | left | r4 | no | 1 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r4 | no | 1 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r4 | no | 1 | 2 | 2 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r4 | no | 1 | 2 | 2 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r18 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
