# Level Analysis: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
########################
########################
########################
####.###################
####.#################..
@....*...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

## Shortest Solution

- Found: yes
- Cost: 24
- Depth: 24
- Explored states: 855
- Inputs: right right right right right right right right down down down left left left up down right right right right down right down right
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- Event counts: walk=22, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
########################
########################
########################
####.###################
####.#################..
....@*...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

After:

```text
########################
########################
########################
####.###################
####.#################..
.....+...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

### Step 15: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
########################
########################
########################
####.###################
####.#################..
.....G...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.@.....####.......##
####**.##..#############
##########..############
```

After:

```text
########################
########################
########################
####.###################
####.#################..
.....*...*...##......*.#
#####.##..#####........#
####I@#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```


## Graph Facts

- Status: complete
- Reachable states: 1853
- Legal transitions: 4291
- Event-only illegal transitions: 354
- Winning states: 6
- Budget: maxStates=160000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1853
- Legal transitions: 4291
- Budget: maxStates=160000
- Compressed regions: 61
- Bidirectional transitions: 4162
- Commitment transitions: 129
- Winning regions: 6
- Initial region: r0, states=7, dist=2, internalBidirectional=12, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r13@15
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=61, edges=129, winReachable=17, winning=6, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=4, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=7, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s13@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 7 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 1 | 30 | 7 | 6 | 1 | 1 | 1 | s13 | no |
| s13 | 15 | 0 | 23 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 7 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 15 | s13 | 30 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1853, regions=61, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 14 | r1 | r13 | 1 | 6 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 7 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 1 | 30 | 7 | 6 | 1 | 1 | 1 | r13 | no | no | yes |
| r13 | 15 | 0 | 23 | 6 | 5 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 6 | right | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 15 | up | r13 | yes | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 16 | down | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r13 | no | 0 | 6 | 5 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
