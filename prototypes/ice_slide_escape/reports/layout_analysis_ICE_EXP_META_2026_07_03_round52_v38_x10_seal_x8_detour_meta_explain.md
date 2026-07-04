# Level Analysis: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain
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
####.#################.@
.....*...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

## Shortest Solution

- Found: yes
- Cost: 36
- Depth: 36
- Explored states: 10314
- Inputs: left down left down left left down down right right up up left up left left left left left left left left left left left down left down down right up down down right down right
- Events: walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk
- Event counts: walk=32, push_ice=4, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=2, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
########################
########################
########################
####.###################
####.#################..
.....*...*...##......*@#
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
.....*...*...........+.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

### Step 11: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
########################
########################
########################
####.###################
####.#################..
.....*...*...........G.#
#####.##..#####........#
####II#..I..###.....II##
####.......####......@##
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
.....*...*...........*.#
#####.##..#####........#
####II#..I..###.....I@##
####.......####.......##
####**.##..#############
##########..############
```

### Step 25: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
########################
########################
########################
####.###################
####.#################..
.....*...*@..........*.#
#####.##..#####........#
####II#..I..###.....I.##
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
.....*...+...........*.#
#####.##..#####........#
####II#..I..###.....I.##
####.......####.......##
####**.##..#############
##########..############
```

### Step 31: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
########################
########################
########################
####.###################
####.#################..
.....*...G...........*.#
#####.##..#####........#
####II#..I..###.....I.##
####.....@.####.......##
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
.....*...*...........*.#
#####.##..#####........#
####II#..@..###.....I.##
####.......####.......##
####**.##..#############
##########..############
```


## Graph Facts

- Status: complete
- Reachable states: 184683
- Legal transitions: 503104
- Event-only illegal transitions: 22456
- Winning states: 42
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 184683
- Legal transitions: 503104
- Budget: maxStates=300000
- Compressed regions: 3261
- Bidirectional transitions: 492696
- Commitment transitions: 10408
- Winning regions: 42
- Initial region: r0, states=29, dist=4, internalBidirectional=82, commitments=6, viableCommitments=3, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r21@11 -> r159@25 -> r295@31
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=3261, edges=10340, winReachable=224, winning=42, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=128, mergingWinSccs=183
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=29, dist=4, out=6, winOut=3, deadOut=3
- SCC path: s0@0 -> s1@3 -> s2@11 -> s127@25 -> s168@31

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 29 | 6 | 3 | 3 | 0 | 0 | s1 | no |
| s1 | 3 | 3 | 35 | 5 | 3 | 2 | 1 | 1 | s2 | no |
| s2 | 11 | 2 | 35 | 7 | 7 | 0 | 1 | 1 | s127 | no |
| s127 | 25 | 1 | 57 | 12 | 10 | 2 | 2 | 2 | s168 | no |
| s168 | 31 | 0 | 22 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 29 | no | no | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 3 | 11 | s2 | 35 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s2 | 11 | 25 | s127 | 35 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s127 | 25 | 31 | s168 | 57 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=184683, regions=3261, solution commitments=4
- Opening: commitments=6, viable=3, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=1/4, forced viable commitments=0/4
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 4 | 3 | 3 | 1 | forced optimal |
| 10 | r1 | r21 | 3 | 3 | 2 | 2 | multiple optimal choices |
| 24 | r21 | r159 | 2 | 7 | 0 | 1 | forced optimal |
| 30 | r159 | r295 | 1 | 10 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 29 | 6 | 3 | 3 | 1 | 1 | r1 | no | no | yes |
| r1 | 3 | 3 | 35 | 5 | 3 | 2 | 2 | 2 | r21 | no | no | no |
| r21 | 11 | 2 | 35 | 7 | 7 | 0 | 1 | 1 | r159 | no | no | yes |
| r159 | 25 | 1 | 57 | 12 | 10 | 2 | 1 | 1 | r295 | no | no | yes |
| r295 | 31 | 0 | 22 | 3 | 2 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 6 | 3 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 4 | 6 | 3 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 4 | 6 | 3 | 3 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 3 | left | r1 | yes | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 4 | down | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 3 | 5 | 3 | 2 | 2 | 2 | r21 | yes | yes | yes | yes | no | no | walk |
| 11 | up | r21 | yes | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 12 | up | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r21 | no | 2 | 7 | 7 | 0 | 1 | 1 | r159 | yes | yes | yes | yes | no | yes | walk |
| 25 | left | r159 | yes | 1 | 12 | 10 | 2 | 1 | 1 | r159 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 26 | down | r159 | no | 1 | 12 | 10 | 2 | 1 | 1 | r159 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r159 | no | 1 | 12 | 10 | 2 | 1 | 1 | r159 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r159 | no | 1 | 12 | 10 | 2 | 1 | 1 | r159 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r159 | no | 1 | 12 | 10 | 2 | 1 | 1 | r159 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r159 | no | 1 | 12 | 10 | 2 | 1 | 1 | r295 | yes | yes | yes | yes | no | yes | walk |
| 31 | up | r295 | yes | 0 | 3 | 2 | 1 | 0 | 0 | r295 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 32 | down | r295 | no | 0 | 3 | 2 | 1 | 0 | 0 | r295 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r295 | no | 0 | 3 | 2 | 1 | 0 | 0 | r295 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r295 | no | 0 | 3 | 2 | 1 | 0 | 0 | r295 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r295 | no | 0 | 3 | 2 | 1 | 0 | 0 | r295 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r295 | no | 0 | 3 | 2 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
