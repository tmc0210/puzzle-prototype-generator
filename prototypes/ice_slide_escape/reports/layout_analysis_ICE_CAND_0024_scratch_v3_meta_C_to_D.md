# Level Analysis: ICE_CAND_0024_scratch_v3_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0024_scratch_v3_meta_C_to_D
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
####.IG.I......*.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##........######.#
#..#############@.
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 13415
- Inputs: up up up up up left left left left left left left left left down down right right down down left left left up up right up up right right right right right right right right down right down down left up down right down down right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk
- Event counts: walk=44, push_ice=3, ice_blocks_ice_no_chain_push=3, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_stop_short:d2=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####.IG.I......*@#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.I*........+.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##........######.#
#..#############..
```

### Step 24: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####.I*........G.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##....@...######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.I*........G.#
####.#*.#######..#
####.#....#####I.#
####.I@*#.#####..#
##........######.#
#..#############..
```

### Step 42: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####.I*........G.#
####.#*.#######..#
####.#....#####I.#
####.I.*#.#####@.#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.I*........*.#
####.#*.#######..#
####.#....#####@.#
####.I.*#.#####..#
##........######.#
#..#############..
```


## Graph Facts

- Status: complete
- Reachable states: 41214
- Legal transitions: 96498
- Event-only illegal transitions: 5530
- Winning states: 11
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 41214
- Legal transitions: 96498
- Budget: maxStates=100000
- Compressed regions: 1272
- Bidirectional transitions: 93254
- Commitment transitions: 3244
- Winning regions: 11
- Initial region: r0, states=9, dist=3, internalBidirectional=16, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@6 -> r30@24 -> r453@42
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=1272, edges=3227, winReachable=75, winning=11, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=27, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=3, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s201@6 -> s202@24 -> s250@42

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 9 | 3 | 2 | 1 | 0 | 0 | s201 | no |
| s201 | 6 | 2 | 40 | 6 | 4 | 2 | 1 | 1 | s202 | no |
| s202 | 24 | 1 | 40 | 6 | 5 | 1 | 1 | 1 | s250 | no |
| s250 | 42 | 0 | 10 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s201 | 9 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s201 | 6 | 24 | s202 | 40 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s202 | 24 | 42 | s250 | 40 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=41214, regions=1272, solution commitments=3
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 3 | 2 | 1 | 1 | forced optimal |
| 23 | r2 | r30 | 2 | 4 | 2 | 1 | forced optimal |
| 41 | r30 | r453 | 1 | 5 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 9 | 3 | 2 | 1 | 1 | 1 | r2 | no | no | yes |
| r2 | 6 | 2 | 40 | 6 | 4 | 2 | 1 | 1 | r30 | no | no | yes |
| r30 | 24 | 1 | 40 | 6 | 5 | 1 | 1 | 1 | r453 | no | no | yes |
| r453 | 42 | 0 | 10 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | walk |
| 6 | left | r2 | yes | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 7 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r2 | no | 2 | 6 | 4 | 2 | 1 | 1 | r30 | yes | yes | yes | yes | no | yes | walk |
| 24 | up | r30 | yes | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 25 | up | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | up | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | up | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | down | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | down | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | down | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r30 | no | 1 | 6 | 5 | 1 | 1 | 1 | r453 | yes | yes | yes | yes | no | yes | walk |
| 42 | up | r453 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r453 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 43 | down | r453 | no | 0 | 1 | 0 | 1 | 0 | 0 | r453 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r453 | no | 0 | 1 | 0 | 1 | 0 | 0 | r453 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | down | r453 | no | 0 | 1 | 0 | 1 | 0 | 0 | r453 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | down | r453 | no | 0 | 1 | 0 | 1 | 0 | 0 | r453 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r453 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
