# Level Analysis: ICE_CAND_0018_v3_static_c_dual_stopper

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0018_v3_static_c_dual_stopper
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
################
#.GG.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###..########
#..###.#########
#.I....#########
@..#############
################
```

## Shortest Solution

- Found: yes
- Cost: 34
- Depth: 34
- Explored states: 2167
- Inputs: right right up right right right right up up right up up left up up right left down down right up right up right right right right right right up left down right right
- Events: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk
- Event counts: walk=29, push_ice=5, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=4, ice_stop_short:d2=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_pass_through_d5:len3=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
################
#.GG.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###..########
#..###.#########
#.I....#########
..@#############
################
```

After:

```text
################
#.*G.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###..########
#..###.#########
#.@....#########
...#############
################
```

### Step 11: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
################
#.*G.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###.@########
#..###.#########
#......#########
...#############
################
```

After:

```text
################
#.*G.##I.....I.#
#.#..#.*.......#
#..###.I.#######
#..###..########
#..###.@########
#..###..########
#..###.#########
#......#########
...#############
################
```

### Step 16: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
################
#.*G.##I.....I.#
#.#..#@*.......#
#..###.I.#######
#..###..########
#..###..########
#..###..########
#..###.#########
#......#########
...#############
################
```

After:

```text
################
#.*G.##I.....I.#
#.#..#.+........
#..###.I.#######
#..###..########
#..###..########
#..###..########
#..###.#########
#......#########
...#############
################
```

### Step 21: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
################
#.*G.##I.....I.#
#.#..#.G........
#..###.I.#######
#..###.@########
#..###..########
#..###..########
#..###.#########
#......#########
...#############
################
```

After:

```text
################
#.*G.##I.....I.#
#.#..#.*........
#..###.@.#######
#..###..########
#..###..########
#..###..########
#..###.#########
#......#########
...#############
################
```

### Step 31: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len3, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
################
#.*G.##I.....I@#
#.#..#.*........
#..###...#######
#..###..########
#..###..########
#..###..########
#..###.#########
#......#########
...#############
################
```

After:

```text
################
#.**.##I.....@.#
#.#..#.*........
#..###...#######
#..###..########
#..###..########
#..###..########
#..###.#########
#......#########
...#############
################
```


## Graph Facts

- Status: complete
- Reachable states: 6962
- Legal transitions: 17959
- Event-only illegal transitions: 863
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 6962
- Legal transitions: 17959
- Budget: maxStates=100000
- Compressed regions: 153
- Bidirectional transitions: 17622
- Commitment transitions: 337
- Winning regions: 1
- Initial region: r0, states=21, dist=5, internalBidirectional=50, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@3 -> r5@11 -> r14@16 -> r30@21 -> r79@31
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=153, edges=337, winReachable=9, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=1/5, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/5, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=21, dist=5, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s1@3 -> s2@11 -> s4@16 -> s7@21 -> s19@31

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 21 | 3 | 1 | 2 | 0 | 0 | s1 | yes |
| s1 | 3 | 4 | 44 | 7 | 2 | 5 | 1 | 1 | s2 | no |
| s2 | 11 | 3 | 30 | 3 | 1 | 2 | 1 | 1 | s4 | yes |
| s4 | 16 | 2 | 46 | 7 | 2 | 5 | 1 | 1 | s7 | no |
| s7 | 21 | 1 | 46 | 5 | 1 | 4 | 1 | 1 | s19 | yes |
| s19 | 31 | 0 | 47 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 21 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s1 | 3 | 11 | s2 | 44 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s2 | 11 | 16 | s4 | 30 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s4 | 16 | 21 | s7 | 46 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s7 | 21 | 31 | s19 | 46 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len3, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=6962, regions=153, solution commitments=5
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=1/5, optimal prefix=1/5, forced viable commitments=3/5
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r2 | 5 | 1 | 2 | 1 | forced optimal |
| 10 | r2 | r5 | 4 | 2 | 5 | 2 | multiple optimal choices |
| 15 | r5 | r14 | 3 | 1 | 2 | 1 | forced optimal |
| 20 | r14 | r30 | 2 | 2 | 5 | 2 | multiple optimal choices |
| 30 | r30 | r79 | 1 | 1 | 4 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 21 | 3 | 1 | 2 | 1 | 1 | r2 | no | yes | yes |
| r2 | 3 | 4 | 44 | 7 | 2 | 5 | 2 | 2 | r5 | no | no | no |
| r5 | 11 | 3 | 30 | 3 | 1 | 2 | 1 | 1 | r14 | no | yes | yes |
| r14 | 16 | 2 | 46 | 7 | 2 | 5 | 2 | 2 | r30 | no | no | no |
| r30 | 21 | 1 | 46 | 5 | 1 | 4 | 1 | 1 | r79 | no | yes | yes |
| r79 | 31 | 0 | 47 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 5 | 3 | 1 | 2 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 3 | up | r2 | yes | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 4 | right | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r2 | no | 4 | 7 | 2 | 5 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | walk |
| 11 | up | r5 | yes | 3 | 3 | 1 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 12 | up | r5 | no | 3 | 3 | 1 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r5 | no | 3 | 3 | 1 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r5 | no | 3 | 3 | 1 | 2 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r5 | no | 3 | 3 | 1 | 2 | 1 | 1 | r14 | yes | yes | yes | yes | yes | yes | walk |
| 16 | right | r14 | yes | 2 | 7 | 2 | 5 | 2 | 2 | r14 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 17 | left | r14 | no | 2 | 7 | 2 | 5 | 2 | 2 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r14 | no | 2 | 7 | 2 | 5 | 2 | 2 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r14 | no | 2 | 7 | 2 | 5 | 2 | 2 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r14 | no | 2 | 7 | 2 | 5 | 2 | 2 | r30 | yes | yes | yes | yes | no | no | walk |
| 21 | up | r30 | yes | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 22 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r30 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | up | r30 | no | 1 | 5 | 1 | 4 | 1 | 1 | r79 | yes | yes | yes | yes | yes | yes | walk |
| 31 | left | r79 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r79 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len3, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 32 | down | r79 | no | 0 | 2 | 0 | 2 | 0 | 0 | r79 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r79 | no | 0 | 2 | 0 | 2 | 0 | 0 | r79 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r79 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
