# Level Analysis: ICE_CAND_0004_analysis

## Summary

- Prototype: ice_slide_escape
- Title: ICE CAND 0004 analysis
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########
#.G..I.#..#
####...####
#.#.I..G.##
##...#....@
#.G..I..#.#
###########
```

## Shortest Solution

- Found: yes
- Cost: 24
- Depth: 24
- Explored states: 1434
- Inputs: left left left down left left left up left up right up right right up left down down right down right right right right
- Events: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk
- Event counts: walk=21, push_ice=3, ice_rebound_d4=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#.G..I.#..#
####...####
#.#.I..G.##
##...#.....
#.G..I@.#.#
###########
```

After:

```text
###########
#.G..I.#..#
####...####
#.#.I..G.##
##...#.....
#.*..@..#.#
###########
```

### Step 11: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#.G..I.#..#
####...####
#.#@I..G.##
##...#.....
#.*.....#.#
###########
```

After:

```text
###########
#.G..I.#..#
####...####
#.#.@..*.##
##...#.....
#.*.....#.#
###########
```

### Step 16: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#.G..I@#..#
####...####
#.#....*.##
##...#.....
#.*.....#.#
###########
```

After:

```text
###########
#.*..@.#..#
####...####
#.#....*.##
##...#.....
#.*.....#.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2254
- Legal transitions: 5914
- Event-only illegal transitions: 256
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2254
- Legal transitions: 5914
- Budget: maxStates=100000
- Compressed regions: 84
- Bidirectional transitions: 5740
- Commitment transitions: 174
- Winning regions: 1
- Initial region: r0, states=20, dist=3, internalBidirectional=46, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@6 -> r13@11 -> r32@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=76, edges=148, winReachable=4, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=20, dist=2, out=5, winOut=2, deadOut=3
- SCC path: s0@0 -> s1@6 -> s40@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 20 | 5 | 2 | 3 | 0 | 0 | s1 | no |
| s1 | 6 | 1 | 54 | 7 | 1 | 6 | 1 | 1 | s40 | yes |
| s40 | 16 | 0 | 52 | 6 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 20 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 6 | 16 | s40 | 54 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2254, regions=84, solution commitments=3
- Opening: commitments=5, viable=2, dead=3, optimal=2
- Forced chain: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=0/3
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | 3 | 2 | 3 | 2 | multiple optimal choices |
| 10 | r1 | r13 | 2 | 2 | 5 | 2 | multiple optimal choices |
| 15 | r13 | r32 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 20 | 5 | 2 | 3 | 2 | 2 | r1 | no | no | no |
| r1 | 6 | 2 | 27 | 7 | 2 | 5 | 2 | 2 | r13 | no | no | no |
| r13 | 11 | 1 | 27 | 5 | 2 | 3 | 1 | 1 | r32 | no | no | yes |
| r32 | 16 | 0 | 26 | 4 | 1 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 3 | 5 | 2 | 3 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r1 | yes | 2 | 7 | 2 | 5 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 7 | left | r1 | no | 2 | 7 | 2 | 5 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 2 | 7 | 2 | 5 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 2 | 7 | 2 | 5 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 2 | 7 | 2 | 5 | 2 | 2 | r13 | yes | yes | yes | yes | no | no | walk |
| 11 | right | r13 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 12 | up | r13 | no | 1 | 5 | 2 | 3 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r13 | no | 1 | 5 | 2 | 3 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r13 | no | 1 | 5 | 2 | 3 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r13 | no | 1 | 5 | 2 | 3 | 1 | 1 | r32 | yes | yes | yes | yes | no | yes | walk |
| 16 | left | r32 | yes | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | down | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r32 | no | 0 | 4 | 1 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
