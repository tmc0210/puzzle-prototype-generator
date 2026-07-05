# Level Analysis: RA_CURR_L11_SPLIT_TEMPLATE_F_box_analog

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_SPLIT_TEMPLATE_F_box_analog
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.#....###
#.@C..CG##
#....C#.##
#....CCG##
##########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 168
- Inputs: right right right left down down right
- Events: push_object:crate#1 push_object:crate#1 push_object:crate#1 force_chain:n2 walk walk walk push_object:crate#4 force_chain:n2
- Event counts: push_object:crate#1=3, force_chain:n2=2, walk=3, push_object:crate#4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.#....###
#.@C..CG##
#....C#.##
#....CCG##
##########
```

After:

```text
##########
#.#....###
#..@C.CG##
#....C#.##
#....CCG##
##########
```

### Step 2: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.#....###
#..@C.CG##
#....C#.##
#....CCG##
##########
```

After:

```text
##########
#.#....###
#...@CCG##
#....C#.##
#....CCG##
##########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
##########
#.#....###
#...@CCG##
#....C#.##
#....CCG##
##########
```

After:

```text
##########
#.#....###
#....@C*##
#....C#.##
#....CCG##
##########
```

### Step 7: right

- Legal: true
- Events: push_object:crate#4, force_chain:n2

Before:

```text
##########
#.#....###
#.....C*##
#....C#.##
#...@CCG##
##########
```

After:

```text
##########
#.#....###
#.....C*##
#....C#.##
#....@C*##
##########
```


## Graph Facts

- Status: complete
- Reachable states: 6108
- Legal transitions: 17530
- Event-only illegal transitions: 0
- Winning states: 3959
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 6108
- Legal transitions: 17530
- Budget: maxStates=300000
- Compressed regions: 332
- Bidirectional transitions: 16340
- Commitment transitions: 1190
- Winning regions: 210
- Initial region: r0, states=17, dist=2, internalBidirectional=42, commitments=6, viableCommitments=6, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r4@3 -> r27@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=142, edges=402, winReachable=142, winning=75, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=51, mergingWinSccs=126
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=102, dist=2, out=9, winOut=9, deadOut=0
- SCC path: s0@0 -> s34@2 -> s50@3 -> s58@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 102 | 9 | 9 | 0 | 0 | 0 | s34 | no |
| s34 | 2 | 2 | 17 | 2 | 2 | 0 | 1 | 1 | s50 | no |
| s50 | 3 | 1 | 18 | 1 | 1 | 0 | 2 | 2 | s58 | yes |
| s58 | 7 | 0 | 38 | 2 | 0 | 0 | 5 | 5 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s34 | 102 | no | no | right | push_object:crate#1 | has_reposition_room |
| s34 | 2 | 3 | s50 | 17 | yes | no | right | push_object:crate#1, force_chain:n2 | scripted_same_state_handoff |
| s50 | 3 | 7 | s58 | 18 | no | yes | right | push_object:crate#4, force_chain:n2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=6108, regions=332, solution commitments=4
- Opening: commitments=6, viable=6, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=1/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 6 | 0 | 2 | multiple optimal choices |
| 1 | r1 | r2 | 2 | 6 | 0 | 2 | multiple optimal choices |
| 2 | r2 | r4 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 6 | r4 | r27 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 17 | 6 | 6 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 2 | 17 | 6 | 6 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 2 | 2 | 17 | 2 | 2 | 0 | 2 | 2 | r4 | no | no | no |
| r4 | 3 | 1 | 18 | 1 | 1 | 0 | 1 | 1 | r27 | yes | yes | yes |
| r27 | 7 | 0 | 19 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 6 | 6 | 0 | 2 | 2 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 2 | 6 | 6 | 0 | 2 | 2 | r2 | yes | yes | no | no | no | no | push_object:crate#1 |
| 2 | right | r2 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | push_object:crate#1 |
| 3 | right | r4 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2 |
| 4 | left | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r27 | yes | yes | yes | yes | yes | yes | walk |
| 7 | right | r27 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#4, force_chain:n2 |

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
