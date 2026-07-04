# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_PULL_WINDOW_v1_box_analog

## Summary

- Prototype: reality_anchor
- Title: Fixed B/S pull window v1 box analog
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
########
########
########
#.#C.GL#
#.@...P#
#.CCG..#
########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 79
- Inputs: left down right up right right right up left
- Events: walk walk push_object:crate#2 force_chain:n2 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=7, push_object:crate#2=1, force_chain:n2=1, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: right

- Legal: true
- Events: push_object:crate#2, force_chain:n2

Before:

```text
########
########
########
#.#C.GL#
#.....P#
#@CCG..#
########
```

After:

```text
########
########
########
#.#C.GL#
#.....P#
#.@C*..#
########
```

### Step 9: left

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
########
########
########
#.#C.+L#
#.....P#
#..C*..#
########
```

After:

```text
########
########
########
#.#C@L.#
#....P.#
#..C*..#
########
```


## Graph Facts

- Status: complete
- Reachable states: 188
- Legal transitions: 433
- Event-only illegal transitions: 0
- Winning states: 17
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 188
- Legal transitions: 433
- Budget: maxStates=300000
- Compressed regions: 17
- Bidirectional transitions: 396
- Commitment transitions: 35
- Winning regions: 2
- Initial region: r0, states=12, dist=2, internalBidirectional=24, commitments=4, viableCommitments=2, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@3 -> r12@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=8, edges=10, winReachable=2, winning=2, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=51, dist=0, out=3, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 51 | 3 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=188, regions=17, solution commitments=2
- Opening: commitments=4, viable=2, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 8 | r1 | r12 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 12 | 4 | 2 | 2 | 2 | 2 | r1 | no | no | no |
| r1 | 3 | 1 | 12 | 4 | 3 | 1 | 1 | 1 | r12 | no | no | yes |
| r12 | 9 | 0 | 8 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 2 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 4 | 2 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 4 | 2 | 2 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r1 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2, force_chain:n2 |
| 4 | up | r1 | no | 1 | 4 | 3 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r1 | no | 1 | 4 | 3 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 1 | 4 | 3 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 4 | 3 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 1 | 4 | 3 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | no | yes | walk |
| 9 | left | r12 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
