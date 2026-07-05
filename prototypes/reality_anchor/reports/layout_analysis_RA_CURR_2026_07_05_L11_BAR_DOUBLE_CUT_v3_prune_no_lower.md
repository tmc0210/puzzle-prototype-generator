# Level Analysis: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#......G##.#
#....@C.MM.#
#..##.....##
#..##....###
#.....BS...#
############
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 133
- Inputs: down right up left up right
- Events: walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1
- Event counts: walk=4, push_object:crate#1=2, box_to_sticky:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_object:crate#1

Before:

```text
############
#......G##.#
#.....C.MM.#
#..##.@...##
#..##....###
#.....BS...#
############
```

After:

```text
############
#.....CG##.#
#.....@.MM.#
#..##.....##
#..##....###
#.....BS...#
############
```

### Step 6: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
############
#....@CG##.#
#.......MM.#
#..##.....##
#..##....###
#.....BS...#
############
```

After:

```text
############
#.....@m##.#
#.......MM.#
#..##.....##
#..##....###
#.....BS...#
############
```


## Graph Facts

- Status: complete
- Reachable states: 32329
- Legal transitions: 94850
- Event-only illegal transitions: 0
- Winning states: 994
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 32329
- Legal transitions: 94850
- Budget: maxStates=500000
- Compressed regions: 946
- Bidirectional transitions: 91484
- Commitment transitions: 3366
- Winning regions: 29
- Initial region: r0, states=34, dist=2, internalBidirectional=90, commitments=7, viableCommitments=7, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r4@3 -> r17@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=240, edges=620, winReachable=60, winning=20, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=35, mergingWinSccs=42
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2210, dist=2, out=17, winOut=5, deadOut=12
- SCC path: s0@0 -> s210@3 -> s218@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 2210 | 17 | 5 | 12 | 0 | 0 | s210 | no |
| s210 | 3 | 1 | 850 | 5 | 4 | 1 | 1 | 1 | s218 | no |
| s218 | 6 | 0 | 170 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s210 | 2210 | no | no | up | push_object:crate#1 | has_reposition_room |
| s210 | 3 | 6 | s218 | 850 | no | no | right | push_object:crate#1, box_to_sticky:n1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=32329, regions=946, solution commitments=2
- Opening: commitments=7, viable=7, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r4 | 2 | 7 | 0 | 1 | forced optimal |
| 5 | r4 | r17 | 1 | 5 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 34 | 7 | 7 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 3 | 1 | 34 | 5 | 5 | 0 | 1 | 1 | r17 | no | no | yes |
| r17 | 6 | 0 | 34 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | walk |
| 3 | up | r4 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 4 | left | r4 | no | 1 | 5 | 5 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r4 | no | 1 | 5 | 5 | 0 | 1 | 1 | r17 | yes | yes | yes | yes | no | yes | walk |
| 6 | right | r17 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, box_to_sticky:n1 |

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
