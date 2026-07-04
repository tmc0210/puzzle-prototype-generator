# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v2

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_LOCK_v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
#########
####BS###
#########
#@PLG.#.#
#...C.G.#
#....MG.#
#########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 39
- Inputs: right right down right right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, walk=1, push_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####BS###
#########
#@PLG.#.#
#...C.G.#
#....MG.#
#########
```

After:

```text
#########
####BS###
#########
#.@PL.#.#
#...C.G.#
#....MG.#
#########
```

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
####BS###
#########
#.@PL.#.#
#...C.G.#
#....MG.#
#########
```

After:

```text
#########
####BS###
#########
#..@PL#.#
#...C.G.#
#....MG.#
#########
```

### Step 4: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
####BS###
#########
#...PL#.#
#..@C.G.#
#....MG.#
#########
```

After:

```text
#########
####BS###
#########
#...PL#.#
#...@MG.#
#....MG.#
#########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
####BS###
#########
#...PL#.#
#...@MG.#
#....MG.#
#########
```

After:

```text
#########
####BS###
#########
#...PL#.#
#....@m.#
#.....m.#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 9657
- Legal transitions: 25005
- Event-only illegal transitions: 0
- Winning states: 78
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9657
- Legal transitions: 25005
- Budget: maxStates=300000
- Compressed regions: 1026
- Bidirectional transitions: 22320
- Commitment transitions: 2592
- Winning regions: 10
- Initial region: r0, states=6, dist=3, internalBidirectional=12, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r6@4
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=549, edges=1094, winReachable=95, winning=9, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=43, mergingWinSccs=50
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2319, dist=0, out=118, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 2319 | 118 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=9657, regions=1026, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 3 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 2 | 3 | 0 | 1 | forced optimal |
| 3 | r2 | r6 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 6 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 2 | 8 | 3 | 3 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 1 | 11 | 2 | 2 | 0 | 1 | 1 | r6 | no | no | yes |
| r6 | 4 | 0 | 13 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | right | r2 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | down | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 4 | right | r6 | yes | 0 | 1 | 1 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 5 | right | r6 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
