# Level Analysis: ICE_CAND_0016_v3_goal_wall_d6_gate

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0016_v3_goal_wall_d6_gate
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#.*GG#.I...I..#
#.#..#.I......#
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
- Cost: 47
- Depth: 47
- Explored states: 40486
- Inputs: right up up up up up up up up right left down down down down down down down down right up up up up up up right right right right up up right left down right right right right right right up left down right right right
- Events: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk
- Event counts: walk=42, push_ice=5, ice_stop_short:d2=1, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_pass_through_d5:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
###############
#@*GG#.I...I..#
#.#..#.I......#
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
#.+G*#.I...I..#
#.#..#.I......#
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
#.GG*#.I...I..#
#.#..#.I......#
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
#.*G*#.I...I..#
#.#..#.I......#
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
#.*G*#@I...I..#
#.#..#.I......#
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
#.*G*#.@...I..#
#.#..#.I......#
#......########
#......########
#......########
#......########
#......########
#......########
.......########
###############
```

### Step 36: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#.*G*#.....I..#
#.#..#@I......#
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
#.*G*#.....I..#
#.#..#.@.......
#......########
#......########
#......########
#......########
#......########
#......########
.......########
###############
```

### Step 43: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
#.*G*#.....I@.#
#.#..#.........
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
#.***#.....@..#
#.#..#.........
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
- Reachable states: 49118
- Legal transitions: 153625
- Event-only illegal transitions: 3089
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 49118
- Legal transitions: 153625
- Budget: maxStates=100000
- Compressed regions: 869
- Bidirectional transitions: 151004
- Commitment transitions: 2621
- Winning regions: 1
- Initial region: r0, states=50, dist=5, internalBidirectional=156, commitments=8, viableCommitments=4, deadCommitments=4, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r11@10 -> r93@21 -> r509@33 -> r578@36 -> r781@43
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=812, edges=2387, winReachable=14, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=8, mergingWinSccs=8
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=100, dist=5, out=9, winOut=3, deadOut=6
- SCC path: s0@0 -> s507@10 -> s746@21 -> s756@33 -> s765@36 -> s767@43

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 100 | 9 | 3 | 6 | 0 | 0 | s507 | no |
| s507 | 10 | 4 | 100 | 8 | 3 | 5 | 1 | 1 | s746 | no |
| s746 | 21 | 3 | 50 | 4 | 2 | 2 | 1 | 1 | s756 | no |
| s756 | 33 | 2 | 62 | 6 | 2 | 4 | 2 | 2 | s765 | no |
| s765 | 36 | 1 | 64 | 4 | 1 | 3 | 3 | 3 | s767 | yes |
| s767 | 43 | 0 | 64 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 10 | s507 | 100 | no | no | right | push_ice, ice_stop_short:d2 | has_reposition_room |
| s507 | 10 | 21 | s746 | 100 | no | no | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s746 | 21 | 33 | s756 | 50 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s756 | 33 | 36 | s765 | 62 | no | no | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s765 | 36 | 43 | s767 | 64 | no | yes | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=49118, regions=869, solution commitments=5
- Opening: commitments=8, viable=4, dead=4, optimal=3
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 9 | r0 | r11 | 5 | 4 | 4 | 3 | multiple optimal choices |
| 20 | r11 | r93 | 4 | 4 | 2 | 3 | multiple optimal choices |
| 32 | r93 | r509 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 35 | r509 | r578 | 2 | 2 | 4 | 2 | multiple optimal choices |
| 42 | r578 | r781 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 50 | 8 | 4 | 4 | 3 | 3 | r11 | no | no | no |
| r11 | 10 | 4 | 50 | 6 | 4 | 2 | 3 | 3 | r93 | no | no | no |
| r93 | 21 | 3 | 50 | 4 | 2 | 2 | 2 | 2 | r509 | no | no | no |
| r509 | 33 | 2 | 62 | 6 | 2 | 4 | 2 | 2 | r578 | no | no | no |
| r578 | 36 | 1 | 64 | 4 | 1 | 3 | 1 | 1 | r781 | no | yes | yes |
| r781 | 43 | 0 | 64 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r0 | no | 5 | 8 | 4 | 4 | 3 | 3 | r11 | yes | yes | yes | yes | no | no | walk |
| 10 | right | r11 | yes | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 11 | left | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r11 | no | 4 | 6 | 4 | 2 | 3 | 3 | r93 | yes | yes | yes | yes | no | no | walk |
| 21 | up | r93 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 22 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r93 | no | 3 | 4 | 2 | 2 | 2 | 2 | r509 | yes | yes | yes | yes | no | no | walk |
| 33 | right | r509 | yes | 2 | 6 | 2 | 4 | 2 | 2 | r509 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 34 | left | r509 | no | 2 | 6 | 2 | 4 | 2 | 2 | r509 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r509 | no | 2 | 6 | 2 | 4 | 2 | 2 | r578 | yes | yes | yes | yes | no | no | walk |
| 36 | right | r578 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r578 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 37 | right | r578 | no | 1 | 4 | 1 | 3 | 1 | 1 | r578 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r578 | no | 1 | 4 | 1 | 3 | 1 | 1 | r578 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r578 | no | 1 | 4 | 1 | 3 | 1 | 1 | r578 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r578 | no | 1 | 4 | 1 | 3 | 1 | 1 | r578 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r578 | no | 1 | 4 | 1 | 3 | 1 | 1 | r578 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | up | r578 | no | 1 | 4 | 1 | 3 | 1 | 1 | r781 | yes | yes | yes | yes | yes | yes | walk |
| 43 | left | r781 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r781 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 44 | down | r781 | no | 0 | 0 | 0 | 0 | 0 | 0 | r781 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r781 | no | 0 | 0 | 0 | 0 | 0 | 0 | r781 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r781 | no | 0 | 0 | 0 | 0 | 0 | 0 | r781 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r781 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
