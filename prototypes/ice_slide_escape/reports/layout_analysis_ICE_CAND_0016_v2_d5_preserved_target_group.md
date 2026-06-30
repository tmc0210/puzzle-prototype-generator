# Level Analysis: ICE_CAND_0016_v2_d5_preserved_target_group

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0016_v2_d5_preserved_target_group
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#.*GG#.I...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#.I....########
@......########
###############
```

## Shortest Solution

- Found: yes
- Cost: 44
- Depth: 44
- Explored states: 16400
- Inputs: right up up up up up up up up right left down down down down down down down down right up up up up up up right right right right up up right down right right right right right up left right right right
- Events: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk
- Event counts: walk=40, push_ice=4, ice_stop_short:d2=1, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_pass_through_d5:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
###############
#@*GG#.I...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#.I....########
.......########
###############
```

After:

```text
###############
#.+G*#.I...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#.I....########
.......########
###############
```

### Step 21: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###############
#.GG*#.I...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#.I....########
..@....########
###############
```

After:

```text
###############
#.*G*#.I...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#.@....########
.......########
###############
```

### Step 33: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
###############
#.*G*#@I...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#......########
.......########
###############
```

After:

```text
###############
#.*G*#.@...I...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#......########
.......########
###############
```

### Step 41: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
#.*G*#.....I@..
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#......########
.......########
###############
```

After:

```text
###############
#.***#.....@...
#.#..#........#
#......########
#......########
#......########
#......########
#......########
#......########
.......########
###############
```


## Graph Facts

- Status: complete
- Reachable states: 20603
- Legal transitions: 64613
- Event-only illegal transitions: 1218
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 20603
- Legal transitions: 64613
- Budget: maxStates=100000
- Compressed regions: 322
- Bidirectional transitions: 63512
- Commitment transitions: 1101
- Winning regions: 1
- Initial region: r0, states=63, dist=4, internalBidirectional=188, commitments=9, viableCommitments=3, deadCommitments=6, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r11@10 -> r58@21 -> r224@33 -> r293@41
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=297, edges=935, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=126, dist=4, out=10, winOut=2, deadOut=8
- SCC path: s0@0 -> s189@10 -> s270@21 -> s276@33 -> s277@41

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 126 | 10 | 2 | 8 | 0 | 0 | s189 | no |
| s189 | 10 | 3 | 126 | 9 | 2 | 7 | 1 | 1 | s270 | no |
| s270 | 21 | 2 | 63 | 5 | 1 | 4 | 1 | 1 | s276 | yes |
| s276 | 33 | 1 | 64 | 4 | 1 | 3 | 2 | 2 | s277 | yes |
| s277 | 41 | 0 | 64 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 10 | s189 | 126 | no | no | right | push_ice, ice_stop_short:d2 | has_reposition_room |
| s189 | 10 | 21 | s270 | 126 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s270 | 21 | 33 | s276 | 63 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s276 | 33 | 41 | s277 | 64 | no | yes | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=20603, regions=322, solution commitments=4
- Opening: commitments=9, viable=3, dead=6, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 9 | r0 | r11 | 4 | 3 | 6 | 2 | multiple optimal choices |
| 20 | r11 | r58 | 3 | 3 | 4 | 2 | multiple optimal choices |
| 32 | r58 | r224 | 2 | 1 | 4 | 1 | forced optimal |
| 40 | r224 | r293 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 63 | 9 | 3 | 6 | 2 | 2 | r11 | no | no | no |
| r11 | 10 | 3 | 63 | 7 | 3 | 4 | 2 | 2 | r58 | no | no | no |
| r58 | 21 | 2 | 63 | 5 | 1 | 4 | 1 | 1 | r224 | no | yes | yes |
| r224 | 33 | 1 | 64 | 4 | 1 | 3 | 1 | 1 | r293 | no | yes | yes |
| r293 | 41 | 0 | 64 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r0 | no | 4 | 9 | 3 | 6 | 2 | 2 | r11 | yes | yes | yes | yes | no | no | walk |
| 10 | right | r11 | yes | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 11 | left | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r11 | no | 3 | 7 | 3 | 4 | 2 | 2 | r58 | yes | yes | yes | yes | no | no | walk |
| 21 | up | r58 | yes | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 22 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r58 | no | 2 | 5 | 1 | 4 | 1 | 1 | r224 | yes | yes | yes | yes | yes | yes | walk |
| 33 | right | r224 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 34 | down | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r224 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | up | r224 | no | 1 | 4 | 1 | 3 | 1 | 1 | r293 | yes | yes | yes | yes | yes | yes | walk |
| 41 | left | r293 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r293 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 42 | right | r293 | no | 0 | 0 | 0 | 0 | 0 | 0 | r293 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r293 | no | 0 | 0 | 0 | 0 | 0 | 0 | r293 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r293 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
