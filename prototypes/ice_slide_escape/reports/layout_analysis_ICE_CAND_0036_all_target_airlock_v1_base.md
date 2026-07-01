# Level Analysis: ICE_CAND_0036_all_target_airlock_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE CAND 0036 All Target Airlock v1 Base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: K_ice_runtime_smoke, K_explicit_edge_goal

## Initial State

```text
#####*####*####
#####..........
#####.####.###.
#####.####.###.
#####.####.###.
#####*....*....
@.....###..####
#####*####*####
###############
```

## Shortest Solution

- Found: yes
- Cost: 43
- Depth: 43
- Explored states: 1249
- Inputs: right right right right right up right right right right down right up right right right right up up up up left left left left down up left left left left left down up right right right right right right right right right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=39, push_ice=4, ice_blocks_ice_no_chain_push=4, ice_rebound_d4=4

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#####*####*####
#####..........
#####.####.###.
#####.####.###.
#####.####.###.
#####*....*....
.....@###..####
#####*####*####
###############
```

After:

```text
#####*####*####
#####..........
#####I####.###.
#####.####.###.
#####.####.###.
#####+....*....
......###..####
#####*####*####
###############
```

### Step 13: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#####*####*####
#####..........
#####I####.###.
#####.####.###.
#####.####.###.
#####G....*....
......###.@####
#####*####*####
###############
```

After:

```text
#####*####*####
#####..........
#####I####I###.
#####.####.###.
#####.####.###.
#####G....+....
......###..####
#####*####*####
###############
```

### Step 26: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#####*####*####
#####.....@....
#####I####I###.
#####.####.###.
#####.####.###.
#####G....G....
......###..####
#####*####*####
###############
```

After:

```text
#####*####*####
#####..........
#####I####@###.
#####.####.###.
#####.####.###.
#####G....*....
......###..####
#####*####*####
###############
```

### Step 33: down

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#####*####*####
#####@.........
#####I####.###.
#####.####.###.
#####.####.###.
#####G....*....
......###..####
#####*####*####
###############
```

After:

```text
#####*####*####
#####..........
#####@####.###.
#####.####.###.
#####.####.###.
#####*....*....
......###..####
#####*####*####
###############
```


## Graph Facts

- Status: complete
- Reachable states: 3052
- Legal transitions: 6430
- Event-only illegal transitions: 223
- Winning states: 1
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3052
- Legal transitions: 6430
- Budget: maxStates=200000
- Compressed regions: 99
- Bidirectional transitions: 6182
- Commitment transitions: 248
- Winning regions: 1
- Initial region: r0, states=6, dist=4, internalBidirectional=10, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@6 -> r4@13 -> r19@26 -> r33@33
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=96, edges=229, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=6, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@6 -> s2@13 -> s11@26 -> s13@33

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 6 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 6 | 3 | 15 | 3 | 1 | 2 | 1 | 1 | s2 | yes |
| s2 | 13 | 2 | 35 | 6 | 2 | 4 | 1 | 1 | s11 | no |
| s11 | 26 | 1 | 20 | 5 | 1 | 4 | 1 | 1 | s13 | yes |
| s13 | 33 | 0 | 23 | 5 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 6 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s1 | 6 | 13 | s2 | 15 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s2 | 13 | 26 | s11 | 35 | no | no | down | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s11 | 26 | 33 | s13 | 20 | no | yes | down | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=3052, regions=99, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=2/4, forced viable commitments=3/4
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r4 | 3 | 1 | 2 | 1 | forced optimal |
| 25 | r4 | r19 | 2 | 2 | 4 | 2 | multiple optimal choices |
| 32 | r19 | r33 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 6 | 3 | 15 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 13 | 2 | 35 | 6 | 2 | 4 | 2 | 2 | r19 | no | no | no |
| r19 | 26 | 1 | 20 | 5 | 1 | 4 | 1 | 1 | r33 | no | yes | yes |
| r33 | 33 | 0 | 23 | 5 | 0 | 5 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 6 | up | r1 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 7 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 3 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 13 | up | r4 | yes | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 14 | right | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r4 | no | 2 | 6 | 2 | 4 | 2 | 2 | r19 | yes | yes | yes | yes | no | no | walk |
| 26 | down | r19 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 27 | up | r19 | no | 1 | 5 | 1 | 4 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r19 | no | 1 | 5 | 1 | 4 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r19 | no | 1 | 5 | 1 | 4 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r19 | no | 1 | 5 | 1 | 4 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r19 | no | 1 | 5 | 1 | 4 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r19 | no | 1 | 5 | 1 | 4 | 1 | 1 | r33 | yes | yes | yes | yes | yes | yes | walk |
| 33 | down | r33 | yes | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 34 | up | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | r33 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r33 | no | 0 | 5 | 0 | 5 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_ice_runtime_smoke

Ice blocks slide automatically after a successful push.

- Required events: push_ice
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=1280
- Winning bypass: none found; complete search, explored=2897

### K_explicit_edge_goal

A solve instance uses one explicit edge start and one explicit edge goal.

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
