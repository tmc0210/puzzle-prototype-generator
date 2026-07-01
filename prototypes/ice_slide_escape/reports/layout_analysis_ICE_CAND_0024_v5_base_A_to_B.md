# Level Analysis: ICE_CAND_0024_v5_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0024_v5_base_A_to_B
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
##################
#######...########
####.IG.#......*.#
####.#G.#######..#
####.#.....####I.#
####.II*#.#####..#
##........######.#
#@.#############..
```

## Shortest Solution

- Found: yes
- Cost: 35
- Depth: 35
- Explored states: 9894
- Inputs: right up right right right right right up down left left left up up up up right left down down down down right right up down left left up right down left left left down
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk
- Event counts: walk=31, push_ice=4, ice_rebound_d4=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##################
##################
#######...########
####.IG.#......*.#
####.#G.#######..#
####.#.....####I.#
####.II*#.#####..#
##.....@..######.#
#..#############..
```

After:

```text
##################
##################
#######...########
####.IGI#......*.#
####.#G.#######..#
####.#.....####I.#
####.II+#.#####..#
##........######.#
#..#############..
```

### Step 17: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##################
##################
#######...########
####@IGI#......*.#
####.#G.#######..#
####.#.....####I.#
####.IIG#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######...########
####.@*I#......*.#
####.#G.#######..#
####.#.....####I.#
####.IIG#.#####..#
##........######.#
#..#############..
```

### Step 25: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
##################
#######...########
####..*I#......*.#
####.#G.#######..#
####.#.....####I.#
####.IIG#.#####..#
##....@...######.#
#..#############..
```

After:

```text
##################
##################
#######...########
####..*I#......*.#
####.#*.#######..#
####.#.....####I.#
####.I@G#.#####..#
##........######.#
#..#############..
```

### Step 30: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
##################
#######...########
####..*I#......*.#
####.#*.#######..#
####.#.....####I.#
####@I.G#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######...########
####..*I#......*.#
####.#*.#######..#
####.#.....####I.#
####.@.*#.#####..#
##........######.#
#..#############..
```


## Graph Facts

- Status: complete
- Reachable states: 67224
- Legal transitions: 160311
- Event-only illegal transitions: 10218
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 67224
- Legal transitions: 160311
- Budget: maxStates=100000
- Compressed regions: 2667
- Bidirectional transitions: 152754
- Commitment transitions: 7557
- Winning regions: 2
- Initial region: r0, states=33, dist=4, internalBidirectional=68, commitments=7, viableCommitments=1, deadCommitments=6, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@8 -> r59@17 -> r229@25 -> r373@30
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=2658, edges=7497, winReachable=8, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=33, dist=4, out=7, winOut=1, deadOut=6
- SCC path: s0@0 -> s1481@8 -> s1482@17 -> s1488@25 -> s1490@30

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 33 | 7 | 1 | 6 | 0 | 0 | s1481 | yes |
| s1481 | 8 | 3 | 24 | 5 | 1 | 4 | 1 | 1 | s1482 | yes |
| s1482 | 17 | 2 | 24 | 3 | 2 | 1 | 1 | 1 | s1488 | no |
| s1488 | 25 | 1 | 24 | 3 | 2 | 1 | 1 | 1 | s1490 | no |
| s1490 | 30 | 0 | 24 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s1481 | 33 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s1481 | 8 | 17 | s1482 | 24 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1482 | 17 | 25 | s1488 | 24 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s1488 | 25 | 30 | s1490 | 24 | no | no | right | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=67224, regions=2667, solution commitments=4
- Opening: commitments=7, viable=1, dead=6, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=4/4, forced viable commitments=2/4
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r3 | 4 | 1 | 6 | 1 | forced optimal |
| 16 | r3 | r59 | 3 | 1 | 4 | 1 | forced optimal |
| 24 | r59 | r229 | 2 | 2 | 1 | 1 | forced optimal |
| 29 | r229 | r373 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 33 | 7 | 1 | 6 | 1 | 1 | r3 | no | yes | yes |
| r3 | 8 | 3 | 24 | 5 | 1 | 4 | 1 | 1 | r59 | no | yes | yes |
| r59 | 17 | 2 | 24 | 3 | 2 | 1 | 1 | 1 | r229 | no | no | yes |
| r229 | 25 | 1 | 24 | 3 | 2 | 1 | 1 | 1 | r373 | no | no | yes |
| r373 | 30 | 0 | 24 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 4 | 7 | 1 | 6 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 8 | up | r3 | yes | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | down | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r3 | no | 3 | 5 | 1 | 4 | 1 | 1 | r59 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r59 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 18 | left | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r59 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r229 | yes | yes | yes | yes | no | yes | walk |
| 25 | up | r229 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r229 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 26 | down | r229 | no | 1 | 3 | 2 | 1 | 1 | 1 | r229 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r229 | no | 1 | 3 | 2 | 1 | 1 | 1 | r229 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r229 | no | 1 | 3 | 2 | 1 | 1 | 1 | r229 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | up | r229 | no | 1 | 3 | 2 | 1 | 1 | 1 | r373 | yes | yes | yes | yes | no | yes | walk |
| 30 | right | r373 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r373 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 31 | down | r373 | no | 0 | 3 | 1 | 2 | 0 | 0 | r373 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r373 | no | 0 | 3 | 1 | 2 | 0 | 0 | r373 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r373 | no | 0 | 3 | 1 | 2 | 0 | 0 | r373 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r373 | no | 0 | 3 | 1 | 2 | 0 | 0 | r373 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r373 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
