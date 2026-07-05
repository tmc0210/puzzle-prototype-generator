# Level Analysis: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L push-pull v2
- Role: mechanic_witness
- Status: candidate
- Support: high
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
#@CG####
#...#P##
###.#L##
#C.G.###
########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 30
- Inputs: right down right down down left right right
- Events: push_object:crate#1 walk walk walk walk walk pull_object:crate#2 pull_object:crate#2
- Event counts: push_object:crate#1=1, walk=5, pull_object:crate#2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
########
#@CG####
#...#P##
###.#L##
#C.G.###
########
```

After:

```text
########
#.@*####
#...#P##
###.#L##
#C.G.###
########
```

### Step 7: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
########
#..*####
#...#P##
###.#L##
#C@G.###
########
```

After:

```text
########
#..*####
#...#P##
###.#L##
#.C+.###
########
```

### Step 8: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
########
#..*####
#...#P##
###.#L##
#.C+.###
########
```

After:

```text
########
#..*####
#...#P##
###.#L##
#..*@###
########
```


## Graph Facts

- Status: complete
- Reachable states: 51
- Legal transitions: 99
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 51
- Legal transitions: 99
- Budget: maxStates=300000
- Compressed regions: 12
- Bidirectional transitions: 86
- Commitment transitions: 13
- Winning regions: 1
- Initial region: r0, states=8, dist=4, internalBidirectional=14, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r4@6 -> r6@7 -> r8@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=12, edges=13, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=3/4, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=8, dist=4, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@6 -> s6@7 -> s7@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 8 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 8 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 6 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s6 | yes |
| s6 | 7 | 1 | 7 | 1 | 1 | 0 | 2 | 2 | s7 | yes |
| s7 | 8 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 8 | yes | no | right | push_object:crate#1 | scripted_same_state_handoff |
| s1 | 1 | 6 | s2 | 8 | no | yes | left | walk | has_reposition_room |
| s2 | 6 | 7 | s6 | 1 | yes | yes | right | pull_object:crate#2 | scripted_trivial_scc |
| s6 | 7 | 8 | s7 | 7 | yes | yes | right | pull_object:crate#2 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=51, regions=12, solution commitments=4
- Opening: commitments=3, viable=2, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=3/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 1 | 2 | multiple optimal choices |
| 5 | r1 | r4 | 3 | 1 | 0 | 1 | forced optimal |
| 6 | r4 | r6 | 2 | 1 | 0 | 1 | forced optimal |
| 7 | r6 | r8 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 8 | 3 | 2 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 3 | 8 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 6 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 7 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes |
| r8 | 8 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 2 | 1 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 2 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 3 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 6 | left | r4 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 7 | right | r6 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | pull_object:crate#2 |
| 8 | right | r8 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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
