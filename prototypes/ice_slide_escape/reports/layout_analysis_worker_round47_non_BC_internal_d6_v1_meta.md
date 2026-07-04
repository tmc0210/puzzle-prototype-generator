# Level Analysis: worker_round47_non_BC_internal_d6_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: worker_round47_non_BC_internal_d6_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########@.###########
```

## Shortest Solution

- Found: yes
- Cost: 45
- Depth: 45
- Explored states: 1902
- Inputs: up up up up up left down right down down left left left left left left up up up right left down down down right right right right right up up right up right right right right right right right right right right right right
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=41, push_ice=4, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_rebound_d4=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_boundary_disappear:d8=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...*@..##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...+...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

### Step 17: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....I...G...##........
####.####..############
####II#.#I..###########
####@......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....I...G...##........
####.####..############
####@I#.#I..###########
####.......############
####**.##..############
##########..###########
```

### Step 20: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
....@I...G...##........
####.####..############
####.I#.#I..###########
####.......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.....@...G.............
####.####..############
####.I#.#I..###########
####.......############
####**.##..############
##########..###########
```

### Step 30: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####I##################
.........G.............
####.####..############
####.I#.#I..###########
####.....@.############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####I##################
.........*.............
####.####..############
####.I#.#@..###########
####.......############
####**.##..############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 1904
- Legal transitions: 4168
- Event-only illegal transitions: 391
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1904
- Legal transitions: 4168
- Budget: maxStates=120000
- Compressed regions: 60
- Bidirectional transitions: 4022
- Commitment transitions: 146
- Winning regions: 2
- Initial region: r0, states=20, dist=4, internalBidirectional=40, commitments=4, viableCommitments=3, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@6 -> r28@17 -> r42@20 -> r58@30
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=60, edges=136, winReachable=18, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=9, mergingWinSccs=10
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=20, dist=4, out=4, winOut=3, deadOut=1
- SCC path: s0@0 -> s24@6 -> s29@17 -> s31@20 -> s32@30

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 20 | 4 | 3 | 1 | 0 | 0 | s24 | no |
| s24 | 6 | 3 | 24 | 4 | 1 | 3 | 1 | 1 | s29 | yes |
| s29 | 17 | 2 | 31 | 5 | 2 | 3 | 2 | 2 | s31 | no |
| s31 | 20 | 1 | 42 | 3 | 2 | 1 | 1 | 1 | s32 | no |
| s32 | 30 | 0 | 42 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s24 | 20 | no | no | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s24 | 6 | 17 | s29 | 24 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s29 | 17 | 20 | s31 | 31 | no | no | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 | has_reposition_room |
| s31 | 20 | 30 | s32 | 42 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1904, regions=60, solution commitments=4
- Opening: commitments=4, viable=3, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=1/4
- Endgame tail: 15 step(s) after first entering a winning region
- Reading hints: 15 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 4 | 3 | 1 | 2 | multiple optimal choices |
| 16 | r2 | r28 | 3 | 1 | 3 | 1 | forced optimal |
| 19 | r28 | r42 | 2 | 2 | 3 | 1 | forced optimal |
| 29 | r42 | r58 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 20 | 4 | 3 | 1 | 2 | 2 | r2 | no | no | no |
| r2 | 6 | 3 | 24 | 4 | 1 | 3 | 1 | 1 | r28 | no | yes | yes |
| r28 | 17 | 2 | 31 | 5 | 2 | 3 | 1 | 1 | r42 | no | no | yes |
| r42 | 20 | 1 | 42 | 3 | 2 | 1 | 1 | 1 | r58 | no | no | yes |
| r58 | 30 | 0 | 42 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 4 | 4 | 3 | 1 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 6 | left | r2 | yes | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 7 | down | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r2 | no | 3 | 4 | 1 | 3 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 17 | up | r28 | yes | 2 | 5 | 2 | 3 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 18 | up | r28 | no | 2 | 5 | 2 | 3 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r28 | no | 2 | 5 | 2 | 3 | 1 | 1 | r42 | yes | yes | yes | yes | no | yes | walk |
| 20 | right | r42 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_boundary_disappear:d8 |
| 21 | left | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r42 | no | 1 | 3 | 2 | 1 | 1 | 1 | r58 | yes | yes | yes | yes | no | yes | walk |
| 30 | up | r58 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 31 | up | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | r58 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r58 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
