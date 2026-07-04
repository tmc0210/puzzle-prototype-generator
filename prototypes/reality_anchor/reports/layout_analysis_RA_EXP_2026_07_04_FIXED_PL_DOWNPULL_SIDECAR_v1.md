# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L downpull sidecar v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
####.#....#
#P#@SB....#
#L#.M.C...#
####GG....#
####.#....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 44
- Inputs: right down right left up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, push_object:sticky#1=2, move_sticky_rigid=3, walk=1, pull_object:crate#1=1, box_to_sticky:n1=1, pull_object:sticky#1=1, sticky_merge:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
####.#....#
#P#@SB....#
#L#.M.C...#
####GG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#.@SB...#
#L#.M.C...#
####GG....#
####.#....#
###########
```

### Step 2: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####.#....#
#P#.@SB...#
#L#.M.C...#
####GG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#..SB...#
#L#.@.C...#
####mG....#
####.#....#
###########
```

### Step 4: left

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
###########
####.#....#
#P#..SB...#
#L#..@C...#
####mG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#..SB...#
#L#.@M....#
####mG....#
####.#....#
###########
```

### Step 5: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
###########
####.#....#
#P#..SB...#
#L#.@M....#
####mG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#.@SB...#
#L#.MM....#
####GG....#
####.#....#
###########
```

### Step 6: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####.#....#
#P#.@SB...#
#L#.MM....#
####GG....#
####.#....#
###########
```

After:

```text
###########
####.#....#
#P#..SB...#
#L#.@.....#
####mm....#
####.#....#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 102088
- Legal transitions: 278108
- Event-only illegal transitions: 0
- Winning states: 9134
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 102088
- Legal transitions: 278108
- Budget: maxStates=400000
- Compressed regions: 5966
- Bidirectional transitions: 239022
- Commitment transitions: 25389
- Winning regions: 673
- Initial region: r0, states=2, dist=4, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@3 -> r6@4 -> r8@5
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=980, edges=1188, winReachable=309, winning=259, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=18
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=95620, dist=0, out=870, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 95620 | 870 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=102088, regions=5966, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r3 | 3 | 2 | 0 | 2 | multiple optimal choices |
| 3 | r3 | r6 | 2 | 1 | 1 | 1 | forced optimal |
| 4 | r6 | r8 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 9 | 2 | 2 | 0 | 2 | 2 | r3 | no | no | no |
| r3 | 3 | 2 | 1 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 4 | 1 | 1 | 2 | 2 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 5 | 0 | 29 | 5 | 5 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 2 | 0 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 2 | down | r1 | no | 3 | 2 | 2 | 0 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid |
| 3 | right | r3 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 4 | left | r6 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | pull_object:crate#1, box_to_sticky:n1 |
| 5 | up | r8 | yes | 0 | 5 | 5 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 6 | down | r8 | no | 0 | 5 | 5 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
