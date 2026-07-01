# Level Analysis: ICE_EXP_META_2026_07_01_round18_v3_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round18_v3_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##.#####
@....I.#
.I..G.##
####.###
#....#.#
..#...I.
#...I..#
##.#####
```

## Shortest Solution

- Found: yes
- Cost: 3
- Depth: 3
- Explored states: 7
- Inputs: down right left
- Events: walk push_ice ice_rebound_d4 walk
- Event counts: walk=2, push_ice=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##.#####
.....I.#
@I..G.##
####.###
#....#.#
..#...I.
#...I..#
##.#####
```

After:

```text
##.#####
.....I.#
.@..*.##
####.###
#....#.#
..#...I.
#...I..#
##.#####
```


## Graph Facts

- Status: complete
- Reachable states: 5417
- Legal transitions: 13527
- Event-only illegal transitions: 576
- Winning states: 18
- Budget: maxStates=30000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5417
- Legal transitions: 13527
- Budget: maxStates=30000
- Compressed regions: 204
- Bidirectional transitions: 13064
- Commitment transitions: 463
- Winning regions: 18
- Initial region: r0, states=27, dist=1, internalBidirectional=60, commitments=7, viableCommitments=6, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=204, edges=460, winReachable=36, winning=18, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=14, mergingWinSccs=20
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=27, dist=1, out=7, winOut=6, deadOut=1
- SCC path: s0@0 -> s166@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 27 | 7 | 6 | 1 | 0 | 0 | s166 | no |
| s166 | 2 | 0 | 10 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s166 | 27 | no | no | right | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5417, regions=204, solution commitments=1
- Opening: commitments=7, viable=6, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 1 | 6 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 27 | 7 | 6 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 2 | 0 | 10 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 7 | 6 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 2 | right | r1 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 3 | left | r1 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
