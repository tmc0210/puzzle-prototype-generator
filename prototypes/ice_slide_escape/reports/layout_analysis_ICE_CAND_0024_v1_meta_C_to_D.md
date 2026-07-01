# Level Analysis: ICE_CAND_0024_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0024_v1_meta_C_to_D
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
####.IG.#.....*..#
####.#G.#.....I..#
####.#..######I..#
####.II*######...#
##......########.#
#..#############@.
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 524
- Inputs: up up up up up left left right down left right down down left up down right right down down right
- Events: walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk
- Event counts: walk=18, push_ice=3, ice_pass_through_d5:len1=2, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 7: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####.IG.#.....*@.#
####.#G.#.....I..#
####.#..######I..#
####.II*######...#
##......########.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.I*.#.....+..#
####.#G.#.....I..#
####.#..######I..#
####.II*######...#
##......########.#
#..#############..
```

### Step 10: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####.I*.#.....G..#
####.#G.#.....I@.#
####.#..######I..#
####.II*######...#
##......########.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.I*.#.....G..#
####.#*.#.....@..#
####.#..######I..#
####.II*######...#
##......########.#
#..#############..
```

### Step 15: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####.I*.#.....G..#
####.#*.#........#
####.#..######I..#
####.II*######@..#
##......########.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.I*.#.....*..#
####.#*.#........#
####.#..######@..#
####.II*######...#
##......########.#
#..#############..
```


## Graph Facts

- Status: complete
- Reachable states: 806
- Legal transitions: 2196
- Event-only illegal transitions: 66
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 806
- Legal transitions: 2196
- Budget: maxStates=100000
- Compressed regions: 35
- Bidirectional transitions: 2148
- Commitment transitions: 48
- Winning regions: 1
- Initial region: r0, states=12, dist=3, internalBidirectional=28, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@7 -> r5@10 -> r16@15
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=35, edges=48, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=12, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@7 -> s25@10 -> s26@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 12 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 7 | 2 | 23 | 2 | 1 | 1 | 1 | 1 | s25 | yes |
| s25 | 10 | 1 | 24 | 2 | 1 | 1 | 2 | 2 | s26 | yes |
| s26 | 15 | 0 | 24 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s1 | 12 | no | no | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s1 | 7 | 10 | s25 | 23 | no | yes | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s25 | 10 | 15 | s26 | 24 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=806, regions=35, solution commitments=3
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=2/3
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r2 | 3 | 2 | 0 | 2 | multiple optimal choices |
| 9 | r2 | r5 | 2 | 1 | 1 | 1 | forced optimal |
| 14 | r5 | r16 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 12 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 7 | 2 | 23 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 10 | 1 | 24 | 2 | 1 | 1 | 1 | 1 | r16 | no | yes | yes |
| r16 | 15 | 0 | 24 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 3 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 7 | left | r2 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 8 | right | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 10 | left | r5 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 11 | right | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r5 | no | 1 | 2 | 1 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | walk |
| 15 | up | r16 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 16 | down | r16 | no | 0 | 2 | 0 | 2 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r16 | no | 0 | 2 | 0 | 2 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r16 | no | 0 | 2 | 0 | 2 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r16 | no | 0 | 2 | 0 | 2 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r16 | no | 0 | 2 | 0 | 2 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r16 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
