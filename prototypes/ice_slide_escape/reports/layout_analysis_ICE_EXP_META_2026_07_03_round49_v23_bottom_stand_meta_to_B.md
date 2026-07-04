# Level Analysis: ICE_EXP_META_2026_07_03_round49_v23_bottom_stand_meta_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round49_v23_bottom_stand_meta_to_B
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
####.#################@
.....*...*...##......II
#####.###..###########.
####II#.#I..###########
####.......############
####**.##..############
#########...###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 63
- Inputs: down left left left left left left left left left left left left down down down down down right
- Events: push_ice ice_stop_short:d1 push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: push_ice=2, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, walk=17

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#######################
#######################
#######################
####.##################
####.#################@
.....*...*...##......II
#####.###..###########.
####II#.#I..###########
####.......############
####**.##..############
#########...###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...##......I@
#####.###..###########I
####II#.#I..###########
####.......############
####**.##..############
#########...###########
```

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...##......I@
#####.###..###########I
####II#.#I..###########
####.......############
####**.##..############
#########...###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...........@.
#####.###..###########I
####II#.#I..###########
####.......############
####**.##..############
#########...###########
```


## Graph Facts

- Status: complete
- Reachable states: 1440
- Legal transitions: 3161
- Event-only illegal transitions: 235
- Winning states: 7
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1440
- Legal transitions: 3161
- Budget: maxStates=120000
- Compressed regions: 38
- Bidirectional transitions: 3076
- Commitment transitions: 85
- Winning regions: 7
- Initial region: r0, states=1, dist=2, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=38, edges=83, winReachable=21, winning=7, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=8, mergingWinSccs=10
- Handoff scriptiness: scope=returned_solution, scripted=2/2, trivial=1, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 0 | 32 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | down | push_ice, ice_stop_short:d1 | scripted_trivial_scc |
| s1 | 1 | 2 | s2 | 2 | yes | yes | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=1440, regions=38, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 17 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 17 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 0 | 32 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_ice, ice_stop_short:d1 |
| 2 | left | r2 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 3 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r2 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
