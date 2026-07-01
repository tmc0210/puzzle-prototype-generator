# Level Analysis: ICE_EXP_META_2026_07_02_round21_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round21_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########
######.###
######.###
##.....###
@.I###.###
#.I..G.#.#
#......#.#
#.....I..#
######.###
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 108
- Inputs: right down right down down right right right right down
- Events: walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d2 walk
- Event counts: walk=8, push_ice=2, ice_rebound_d4=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##########
######.###
######.###
##.....###
..I###.###
#@I..G.#.#
#......#.#
#.....I..#
######.###
```

After:

```text
##########
######.###
######.###
##.....###
..I###.###
#.@..*.#.#
#......#.#
#.....I..#
######.###
```

### Step 9: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##########
######.###
######.###
##.....###
..I###.###
#....*.#.#
#......#.#
#....@I..#
######.###
```

After:

```text
##########
######.###
######.###
##.....###
..I###.###
#....*.#.#
#......#.#
#.....@.I#
######.###
```


## Graph Facts

- Status: complete
- Reachable states: 2529
- Legal transitions: 6780
- Event-only illegal transitions: 184
- Winning states: 6
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2529
- Legal transitions: 6780
- Budget: maxStates=120000
- Compressed regions: 88
- Bidirectional transitions: 6586
- Commitment transitions: 194
- Winning regions: 6
- Initial region: r0, states=26, dist=2, internalBidirectional=64, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r1@3 -> r9@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=79, edges=169, winReachable=9, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=3, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=52, dist=1, out=6, winOut=4, deadOut=2
- SCC path: s0@0 -> s17@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 52 | 6 | 4 | 2 | 0 | 0 | s17 | no |
| s17 | 9 | 0 | 58 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 9 | s17 | 52 | no | no | right | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2529, regions=88, solution commitments=2
- Opening: commitments=4, viable=3, dead=1, optimal=3
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 2 | 3 | 1 | 3 | multiple optimal choices |
| 8 | r1 | r9 | 1 | 5 | 1 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 26 | 4 | 3 | 1 | 3 | 3 | r1 | no | no | no |
| r1 | 3 | 1 | 26 | 6 | 5 | 1 | 2 | 2 | r9 | no | no | no |
| r9 | 9 | 0 | 29 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 3 | 1 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 4 | 3 | 1 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 4 | 3 | 1 | 3 | 3 | r1 | yes | yes | yes | yes | no | no | walk |
| 3 | right | r1 | yes | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 4 | down | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 6 | 5 | 1 | 2 | 2 | r9 | yes | yes | yes | yes | no | no | walk |
| 9 | right | r9 | yes | 0 | 4 | 3 | 1 | 0 | 0 | r9 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 10 | down | r9 | no | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
