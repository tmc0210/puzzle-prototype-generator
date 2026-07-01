# Level Analysis: ICE_EXP_META_2026_07_02_round22_v2_patch_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round22_v2_patch_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########
#....#....#
#.####....#
#.G..I.####
#I..I....##
#.#####@###
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 512
- Inputs: up left left left up left left left down right right right right right up left down right right right right right
- Events: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk
- Event counts: walk=18, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_boundary_disappear:d1=1, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear_after_group=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###########
#....#....#
#.####....#
#.G..I.####
#I..I@...##
#.#####.###
```

After:

```text
###########
#....#....#
#.####....#
#.G..I.####
#II.@....##
#.#####.###
```

### Step 9: down

- Legal: true
- Events: push_ice, ice_boundary_disappear:d1

Before:

```text
###########
#....#....#
#.####....#
#@G..I.####
#II......##
#.#####.###
```

After:

```text
###########
#....#....#
#.####....#
#.G..I.####
#@I......##
#.#####.###
```

### Step 10: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group

Before:

```text
###########
#....#....#
#.####....#
#.G..I.####
#@I......##
#.#####.###
```

After:

```text
###########
#....#....#
#.####....#
#.G..I.####
#.@........
#.#####.###
```

### Step 16: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########
#....#....#
#.####....#
#.G..I@####
#..........
#.#####.###
```

After:

```text
###########
#....#....#
#.####....#
#.*..@.####
#..........
#.#####.###
```


## Graph Facts

- Status: complete
- Reachable states: 772
- Legal transitions: 1899
- Event-only illegal transitions: 65
- Winning states: 1
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 772
- Legal transitions: 1899
- Budget: maxStates=80000
- Compressed regions: 34
- Bidirectional transitions: 1850
- Commitment transitions: 49
- Winning regions: 1
- Initial region: r0, states=14, dist=4, internalBidirectional=32, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@4 -> r8@9 -> r11@10 -> r18@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=32, edges=45, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=14, dist=3, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@4 -> s4@9 -> s5@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 14 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 4 | 2 | 25 | 3 | 1 | 2 | 1 | 1 | s4 | yes |
| s4 | 9 | 1 | 27 | 4 | 1 | 3 | 1 | 1 | s5 | yes |
| s5 | 10 | 0 | 60 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 14 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s1 | 4 | 9 | s4 | 25 | no | yes | down | push_ice, ice_boundary_disappear:d1 | has_reposition_room |
| s4 | 9 | 10 | s5 | 27 | yes | yes | right | push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=772, regions=34, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r2 | 4 | 1 | 1 | 1 | forced optimal |
| 8 | r2 | r8 | 3 | 1 | 2 | 1 | forced optimal |
| 9 | r8 | r11 | 2 | 1 | 3 | 1 | forced optimal |
| 15 | r11 | r18 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 14 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 4 | 3 | 25 | 3 | 1 | 2 | 1 | 1 | r8 | no | yes | yes |
| r8 | 9 | 2 | 27 | 4 | 1 | 3 | 1 | 1 | r11 | no | yes | yes |
| r11 | 10 | 1 | 30 | 2 | 1 | 1 | 1 | 1 | r18 | no | yes | yes |
| r18 | 16 | 0 | 30 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 4 | left | r2 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 5 | up | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 3 | 3 | 1 | 2 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 9 | down | r8 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | push_ice, ice_boundary_disappear:d1 |
| 10 | right | r11 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, ice_boundary_disappear_after_group |
| 11 | right | r11 | no | 1 | 2 | 1 | 1 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r11 | no | 1 | 2 | 1 | 1 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r11 | no | 1 | 2 | 1 | 1 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r11 | no | 1 | 2 | 1 | 1 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r11 | no | 1 | 2 | 1 | 1 | 1 | 1 | r18 | yes | yes | yes | yes | yes | yes | walk |
| 16 | left | r18 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | down | r18 | no | 0 | 2 | 1 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r18 | no | 0 | 2 | 1 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r18 | no | 0 | 2 | 1 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r18 | no | 0 | 2 | 1 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r18 | no | 0 | 2 | 1 | 1 | 0 | 0 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r18 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
