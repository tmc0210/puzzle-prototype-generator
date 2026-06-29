# Level Analysis: ICE_CAND_0001_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0001_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: K_ice_runtime_smoke

## Initial State

```text
#@#####.###
#.##....###
#.##.##.###
#.I..G.I..#
#######.###
#######.###
#######G###
#######.###
###########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 44
- Inputs: down down down right right right up up right right right down down up up up
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk
- Event counts: walk=14, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#.#####.###
#.##....###
#.##.##.###
#@I..G.I..#
#######.###
#######.###
#######G###
#######.###
###########
```

After:

```text
#.#####.###
#.##....###
#.##.##.###
#.@..*.I..#
#######.###
#######.###
#######G###
#######.###
###########
```

### Step 13: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#.#####.###
#.##....###
#.##.##@###
#....*.I..#
#######.###
#######.###
#######G###
#######.###
###########
```

After:

```text
#.#####.###
#.##....###
#.##.##.###
#....*.@..#
#######.###
#######.###
#######*###
#######.###
###########
```


## Graph Facts

- Status: complete
- Reachable states: 306
- Legal transitions: 621
- Event-only illegal transitions: 12
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 306
- Legal transitions: 621
- Budget: maxStates=100000
- Compressed regions: 17
- Bidirectional transitions: 598
- Commitment transitions: 23
- Winning regions: 1
- Initial region: r0, states=4, dist=2, internalBidirectional=6, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r3@13
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=17, edges=21, winReachable=3, winning=1, winSubgraph=single_win_chain
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=4, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@4 -> s7@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 4 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 4 | 1 | 14 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 13 | 0 | 20 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 4 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s1 | 4 | 13 | s7 | 14 | no | yes | down | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=306, regions=17, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Forced chain: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r3 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 4 | 1 | 14 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 13 | 0 | 20 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 5 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 13 | down | r3 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 14 | up | r3 | no | 0 | 3 | 0 | 3 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r3 | no | 0 | 3 | 0 | 3 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r3 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_ice_runtime_smoke

Ice blocks slide automatically after a successful push.

- Required events: push_ice
- Forbidden events: none
- Detector configured: true
- Returned solution covers detector: true
- Shortest bypass: none found within returned shortest-cost bound; explored=51
- Winning bypass: none found; complete search, explored=305


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
