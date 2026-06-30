# Level Analysis: ICE_CAND_0011_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0011_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.I.....#G........
#..........#######
#..........#######
#.........I#######
#..........#######
#..........#######
#..........#######
#.........I#######
##########@#######
```

## Shortest Solution

- Found: yes
- Cost: 35
- Depth: 35
- Explored states: 1061
- Inputs: up up up up up up up left left left left left left left left left up right down right right right right right right right right up right right right right right right right
- Events: push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk
- Event counts: push_ice=4, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, walk=31, ice_rebound_d4=1, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.I.....#G........
#..........#######
#..........#######
#.........I#######
#..........#######
#..........#######
#..........#######
#.........I#######
##########@#######
```

After:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.I.....#G........
#..........#######
#..........#######
#.........I#######
#..........#######
#..........#######
#..........#######
#.........@#######
##########.#######
```

### Step 5: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.I.....#G........
#..........#######
#..........#######
#.........I#######
#.........@#######
#..........#######
#..........#######
#..........#######
##########.#######
```

After:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.I.....#GI.......
#..........#######
#..........#######
#.........@#######
#..........#######
#..........#######
#..........#######
#..........#######
##########.#######
```

### Step 18: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#@I.....#GI.......
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
##########.#######
```

After:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.@.....#*I.......
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
##########.#######
```

### Step 28: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
##################
##################
##################
##################
##################
##################
##########G#######
#.......#*I.......
#.........@#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
##########.#######
```

After:

```text
##################
##################
##################
##################
##################
##################
##################
##########*#######
#.......#*@.......
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
#..........#######
##########.#######
```


## Graph Facts

- Status: complete
- Reachable states: 1180
- Legal transitions: 4014
- Event-only illegal transitions: 22
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1180
- Legal transitions: 4014
- Budget: maxStates=100000
- Compressed regions: 15
- Bidirectional transitions: 3992
- Commitment transitions: 22
- Winning regions: 1
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@5 -> r8@18 -> r13@28
- Forced commitment prefix length: 1
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=15, edges=22, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s5@5 -> s6@18 -> s7@28

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 86 | 4 | 1 | 3 | 1 | 1 | s5 | yes |
| s5 | 5 | 2 | 78 | 4 | 1 | 3 | 1 | 1 | s6 | yes |
| s6 | 18 | 1 | 78 | 1 | 1 | 0 | 1 | 1 | s7 | yes |
| s7 | 28 | 0 | 86 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_trivial_scc |
| s1 | 1 | 5 | s5 | 86 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s5 | 5 | 18 | s6 | 78 | no | yes | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s6 | 18 | 28 | s7 | 78 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1180, regions=15, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 4 | r1 | r2 | 3 | 1 | 3 | 1 | forced optimal |
| 17 | r2 | r8 | 2 | 1 | 3 | 1 | forced optimal |
| 27 | r8 | r13 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 86 | 4 | 1 | 3 | 1 | 1 | r2 | no | yes | yes |
| r2 | 5 | 2 | 78 | 4 | 1 | 3 | 1 | 1 | r8 | no | yes | yes |
| r8 | 18 | 1 | 78 | 1 | 1 | 0 | 1 | 1 | r13 | yes | yes | yes |
| r13 | 28 | 0 | 86 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 3 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 2 | up | r1 | no | 3 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 3 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 5 | up | r2 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | up | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r2 | no | 2 | 4 | 1 | 3 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 18 | right | r8 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 19 | down | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r8 | no | 1 | 1 | 1 | 0 | 1 | 1 | r13 | yes | yes | yes | yes | yes | yes | walk |
| 28 | up | r13 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 29 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r13 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
