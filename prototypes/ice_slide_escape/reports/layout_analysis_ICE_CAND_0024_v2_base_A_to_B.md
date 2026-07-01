# Level Analysis: ICE_CAND_0024_v2_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0024_v2_base_A_to_B
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
##################
#######.##########
####.IG.#......*.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##........######.#
#@.#############..
```

## Shortest Solution

- Found: yes
- Cost: 35
- Depth: 35
- Explored states: 8409
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
#######.##########
####.IG.#......*.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##.....@..######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.IGI#......*.#
####.#G.#######..#
####.#....#####I.#
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
#######.##########
####@IGI#......*.#
####.#G.#######..#
####.#....#####I.#
####.IIG#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.@*I#......*.#
####.#G.#######..#
####.#....#####I.#
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
#######.##########
####..*I#......*.#
####.#G.#######..#
####.#....#####I.#
####.IIG#.#####..#
##....@...######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####..*I#......*.#
####.#*.#######..#
####.#....#####I.#
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
#######.##########
####..*I#......*.#
####.#*.#######..#
####.#....#####I.#
####@I.G#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####..*I#......*.#
####.#*.#######..#
####.#....#####I.#
####.@.*#.#####..#
##........######.#
#..#############..
```


## Graph Facts

- Status: complete
- Reachable states: 18057
- Legal transitions: 44269
- Event-only illegal transitions: 2789
- Winning states: 2
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 18057
- Legal transitions: 44269
- Budget: maxStates=100000
- Compressed regions: 822
- Bidirectional transitions: 41960
- Commitment transitions: 2309
- Winning regions: 2
- Initial region: r0, states=24, dist=4, internalBidirectional=50, commitments=6, viableCommitments=1, deadCommitments=5, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@8 -> r59@17 -> r219@25 -> r341@30
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=819, edges=2289, winReachable=8, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=24, dist=4, out=6, winOut=1, deadOut=5
- SCC path: s0@0 -> s192@8 -> s193@17 -> s199@25 -> s201@30

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 24 | 6 | 1 | 5 | 0 | 0 | s192 | yes |
| s192 | 8 | 3 | 23 | 5 | 1 | 4 | 1 | 1 | s193 | yes |
| s193 | 17 | 2 | 23 | 3 | 2 | 1 | 1 | 1 | s199 | no |
| s199 | 25 | 1 | 23 | 3 | 2 | 1 | 1 | 1 | s201 | no |
| s201 | 30 | 0 | 23 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s192 | 24 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s192 | 8 | 17 | s193 | 23 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s193 | 17 | 25 | s199 | 23 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s199 | 25 | 30 | s201 | 23 | no | no | right | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=18057, regions=822, solution commitments=4
- Opening: commitments=6, viable=1, dead=5, optimal=1
- Win-continuation prefix: viable prefix=2/4, optimal prefix=4/4, forced viable commitments=2/4
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r3 | 4 | 1 | 5 | 1 | forced optimal |
| 16 | r3 | r59 | 3 | 1 | 4 | 1 | forced optimal |
| 24 | r59 | r219 | 2 | 2 | 1 | 1 | forced optimal |
| 29 | r219 | r341 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 24 | 6 | 1 | 5 | 1 | 1 | r3 | no | yes | yes |
| r3 | 8 | 3 | 23 | 5 | 1 | 4 | 1 | 1 | r59 | no | yes | yes |
| r59 | 17 | 2 | 23 | 3 | 2 | 1 | 1 | 1 | r219 | no | no | yes |
| r219 | 25 | 1 | 23 | 3 | 2 | 1 | 1 | 1 | r341 | no | no | yes |
| r341 | 30 | 0 | 23 | 3 | 1 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 4 | 6 | 1 | 5 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
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
| 24 | right | r59 | no | 2 | 3 | 2 | 1 | 1 | 1 | r219 | yes | yes | yes | yes | no | yes | walk |
| 25 | up | r219 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r219 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 26 | down | r219 | no | 1 | 3 | 2 | 1 | 1 | 1 | r219 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r219 | no | 1 | 3 | 2 | 1 | 1 | 1 | r219 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r219 | no | 1 | 3 | 2 | 1 | 1 | 1 | r219 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | up | r219 | no | 1 | 3 | 2 | 1 | 1 | 1 | r341 | yes | yes | yes | yes | no | yes | walk |
| 30 | right | r341 | yes | 0 | 3 | 1 | 2 | 0 | 0 | r341 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 31 | down | r341 | no | 0 | 3 | 1 | 2 | 0 | 0 | r341 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r341 | no | 0 | 3 | 1 | 2 | 0 | 0 | r341 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r341 | no | 0 | 3 | 1 | 2 | 0 | 0 | r341 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r341 | no | 0 | 3 | 1 | 2 | 0 | 0 | r341 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r341 | no | 0 | 3 | 1 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
