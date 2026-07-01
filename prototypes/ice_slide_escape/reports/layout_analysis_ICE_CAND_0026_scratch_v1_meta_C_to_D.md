# Level Analysis: ICE_CAND_0026_scratch_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0026_scratch_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
######.####
#..I.....I@
#....I...#.
..#.I..G.I#
#####.#####
#...#.....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 1379
- Inputs: left left down left left left left left down right up up right right right right right right down
- Events: push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk
- Event counts: push_ice=3, ice_blocks_ice_no_chain_push=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d2=1, walk=16, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
######.####
#..I.....I@
#....I...#.
..#.I..G.I#
#####.#####
#...#.....#
###########
```

After:

```text
######.####
#I.I.....@.
#....I...#.
..#.I..G.I#
#####.#####
#...#.....#
###########
```

### Step 6: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
######.####
#I.I.......
#....I@..#.
..#.I..G.I#
#####.#####
#...#.....#
###########
```

After:

```text
######.####
#I.I.......
#.I..@...#.
..#.I..G.I#
#####.#####
#...#.....#
###########
```

### Step 10: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
######.####
#I.I.......
#.I......#.
..#@I..G.I#
#####.#####
#...#.....#
###########
```

After:

```text
######.####
#I.I.......
#.I......#.
..#.@..*.I#
#####.#####
#...#.....#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2130
- Legal transitions: 5363
- Event-only illegal transitions: 382
- Winning states: 18
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2130
- Legal transitions: 5363
- Budget: maxStates=100000
- Compressed regions: 73
- Bidirectional transitions: 5170
- Commitment transitions: 193
- Winning regions: 18
- Initial region: r0, states=2, dist=2, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@6 -> r13@10
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=55, edges=115, winReachable=19, winning=18, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=0, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=2, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s11@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 0 | 60 | 7 | 0 | 0 | 1 | 1 | s11 | no |
| s11 | 6 | 0 | 52 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 2 | yes | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | scripted_same_state_handoff |
| s1 | 1 | 6 | s11 | 60 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2130, regions=73, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=1/3
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r2 | 1 | 6 | 1 | 1 | multiple viable choices |
| 9 | r2 | r13 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 30 | 7 | 6 | 1 | 1 | 1 | r2 | no | no | no |
| r2 | 6 | 1 | 26 | 4 | 3 | 1 | 1 | 1 | r13 | no | no | yes |
| r13 | 10 | 0 | 26 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 2 | left | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 1 | 7 | 6 | 1 | 1 | 1 | r2 | yes | yes | no | no | no | no | walk |
| 6 | left | r2 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 7 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r13 | yes | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 11 | up | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r13 | no | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
