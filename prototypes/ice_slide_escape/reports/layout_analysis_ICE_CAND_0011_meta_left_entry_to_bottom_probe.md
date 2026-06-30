# Level Analysis: ICE_CAND_0011_meta_left_entry_to_bottom_probe

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0011_meta_left_entry_to_bottom_probe
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
############
############
############
############
############
############
############
##########G#
@.I.....#G..
#..........#
#........G.#
#.........I#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

## Shortest Solution

- Found: yes
- Cost: 50
- Depth: 50
- Explored states: 12598
- Inputs: right down down down down right right right right right right right right right up up up left left left left left left left left left up right down right right right right right right right right up down down down down down down left up down right down down
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_boundary_disappear:d1 walk
- Event counts: walk=45, push_ice=5, ice_rebound_d4=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_boundary_disappear:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 15: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############
############
############
############
############
############
############
##########G#
..I.....#G..
#..........#
#........G.#
#.........I#
#.........@#
#........I.#
#..........#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########G#
..I.....#GI.
#..........#
#........G.#
#.........@#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

### Step 28: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
############
############
############
############
############
############
############
##########G#
.@I.....#GI.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########G#
..@.....#*I.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

### Step 38: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
############
############
############
############
############
############
############
##########G#
........#*I.
#.........@#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########*#
........#*@.
#..........#
#........G.#
#..........#
#..........#
#........I.#
#..........#
#.........I#
##########.#
```

### Step 46: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
############
############
############
############
############
############
############
##########*#
........#*..
#..........#
#........G.#
#..........#
#..........#
#........I.#
#........@.#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########*#
........#*..
#..........#
#........*.#
#..........#
#..........#
#........@.#
#..........#
#.........I#
##########.#
```

### Step 49: down

- Legal: true
- Events: push_ice, ice_boundary_disappear:d1

Before:

```text
############
############
############
############
############
############
############
##########*#
........#*..
#..........#
#........*.#
#..........#
#..........#
#..........#
#.........@#
#.........I#
##########.#
```

After:

```text
############
############
############
############
############
############
############
##########*#
........#*..
#..........#
#........*.#
#..........#
#..........#
#..........#
#..........#
#.........@#
##########.#
```


## Graph Facts

- Status: complete
- Reachable states: 14643
- Legal transitions: 50735
- Event-only illegal transitions: 444
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 14643
- Legal transitions: 50735
- Budget: maxStates=100000
- Compressed regions: 184
- Bidirectional transitions: 50180
- Commitment transitions: 555
- Winning regions: 1
- Initial region: r0, states=78, dist=5, internalBidirectional=260, commitments=8, viableCommitments=2, deadCommitments=6, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r8@15 -> r117@28 -> r147@38 -> r165@46 -> r171@49
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=181, edges=493, winReachable=12, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=6, mergingWinSccs=6
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=78, dist=5, out=8, winOut=2, deadOut=6
- SCC path: s0@0 -> s15@15 -> s33@28 -> s37@38 -> s49@46 -> s55@49

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 78 | 8 | 2 | 6 | 0 | 0 | s15 | no |
| s15 | 15 | 4 | 76 | 9 | 2 | 7 | 1 | 1 | s33 | no |
| s33 | 28 | 3 | 76 | 6 | 3 | 3 | 1 | 1 | s37 | no |
| s37 | 38 | 2 | 78 | 5 | 2 | 3 | 1 | 1 | s49 | no |
| s49 | 46 | 1 | 78 | 5 | 1 | 4 | 2 | 2 | s55 | yes |
| s55 | 49 | 0 | 80 | 4 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 15 | s15 | 78 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s15 | 15 | 28 | s33 | 76 | no | no | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s33 | 28 | 38 | s37 | 76 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s37 | 38 | 46 | s49 | 78 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s49 | 46 | 49 | s55 | 78 | no | yes | down | push_ice, ice_boundary_disappear:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=14643, regions=184, solution commitments=5
- Opening: commitments=8, viable=2, dead=6, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=1/5
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 14 | r0 | r8 | 5 | 2 | 6 | 2 | multiple optimal choices |
| 27 | r8 | r117 | 4 | 2 | 7 | 2 | multiple optimal choices |
| 37 | r117 | r147 | 3 | 3 | 3 | 3 | multiple optimal choices |
| 45 | r147 | r165 | 2 | 2 | 3 | 2 | multiple optimal choices |
| 48 | r165 | r171 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 78 | 8 | 2 | 6 | 2 | 2 | r8 | no | no | no |
| r8 | 15 | 4 | 76 | 9 | 2 | 7 | 2 | 2 | r117 | no | no | no |
| r117 | 28 | 3 | 76 | 6 | 3 | 3 | 3 | 3 | r147 | no | no | no |
| r147 | 38 | 2 | 78 | 5 | 2 | 3 | 2 | 2 | r165 | no | no | no |
| r165 | 46 | 1 | 78 | 5 | 1 | 4 | 1 | 1 | r171 | no | yes | yes |
| r171 | 49 | 0 | 80 | 4 | 0 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 5 | 8 | 2 | 6 | 2 | 2 | r8 | yes | yes | yes | yes | no | no | walk |
| 15 | up | r8 | yes | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 16 | up | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | up | r8 | no | 4 | 9 | 2 | 7 | 2 | 2 | r117 | yes | yes | yes | yes | no | no | walk |
| 28 | right | r117 | yes | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 29 | down | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r117 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r117 | no | 3 | 6 | 3 | 3 | 3 | 3 | r147 | yes | yes | yes | yes | no | no | walk |
| 38 | up | r147 | yes | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 39 | down | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | down | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | down | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | down | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | down | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | down | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r147 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | left | r147 | no | 2 | 5 | 2 | 3 | 2 | 2 | r165 | yes | yes | yes | yes | no | no | walk |
| 46 | up | r165 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r165 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 47 | down | r165 | no | 1 | 5 | 1 | 4 | 1 | 1 | r165 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r165 | no | 1 | 5 | 1 | 4 | 1 | 1 | r171 | yes | yes | yes | yes | yes | yes | walk |
| 49 | down | r171 | yes | 0 | 4 | 0 | 4 | 0 | 0 | r171 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d1 |
| 50 | down | r171 | no | 0 | 4 | 0 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
