# Level Analysis: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v1_meta
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
#######################
#####.###.#############
.....*...*...##......I@
#####.###.#############
#####.###...###########
#####I###I..###########
#####.......###########
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 109
- Inputs: left left left left left left left left left left left left left down down right down down left up down right down
- Events: push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk
- Event counts: push_ice=3, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=2, walk=20, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...*...##......I@
#####.###.#############
#####.###...###########
#####I###I..###########
#####.......###########
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...*...........@.
#####.###.#############
#####.###...###########
#####I###I..###########
#####.......###########
##########.############
```

### Step 13: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...*@............
#####.###.#############
#####.###...###########
#####I###I..###########
#####.......###########
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...+.............
#####.###.#############
#####.###...###########
#####I###I..###########
#####.......###########
##########.############
```

### Step 20: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...G.............
#####.###.#############
#####.###...###########
#####I###I..###########
#####....@..###########
##########.############
```

After:

```text
#######################
#######################
#######################
#######################
#####.###.#############
.....*...*.............
#####.###.#############
#####.###...###########
#####I###@..###########
#####.......###########
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 1778
- Legal transitions: 3905
- Event-only illegal transitions: 57
- Winning states: 3
- Budget: maxStates=160000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1778
- Legal transitions: 3905
- Budget: maxStates=160000
- Compressed regions: 53
- Bidirectional transitions: 3822
- Commitment transitions: 83
- Winning regions: 3
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@13 -> r6@20
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=53, edges=83, winReachable=10, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=2/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@13 -> s34@20

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 13 | 1 | 32 | 4 | 3 | 1 | 1 | 1 | s34 | no |
| s34 | 20 | 0 | 15 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_trivial_scc |
| s1 | 1 | 13 | s2 | 13 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s2 | 13 | 20 | s34 | 32 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1778, regions=53, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 3 step(s) after first entering a winning region
- Reading hints: first 2 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 3 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 19 | r2 | r6 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 13 | 1 | 32 | 4 | 3 | 1 | 1 | 1 | r6 | no | no | yes |
| r6 | 20 | 0 | 15 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 2 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 13 | left | r2 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 14 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 20 | up | r6 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 21 | down | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
