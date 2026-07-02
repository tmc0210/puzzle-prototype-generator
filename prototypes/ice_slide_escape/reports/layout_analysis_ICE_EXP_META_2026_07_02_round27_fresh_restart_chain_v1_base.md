# Level Analysis: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########.##########
###...I....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
@.....*...*##########
#####.###############
###.#.###############
###.#II......#......#
###.#.###############
###.#.###############
###.#################
###.#################
#####################
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 183
- Inputs: right right right right right down down down right right right right right right right right right right right right right right right
- Events: walk walk walk walk walk walk walk push_ice ice_stop_short:d2 push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=21, push_ice=2, ice_stop_short:d2=1, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: down

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##########.##########
###...I....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#@###############
###.#II......#......#
###.#.###############
###.#.###############
###.#################
###.#################
#####################
```

After:

```text
##########.##########
###...I....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
###.#@I......#......#
###.#.###############
###.#I###############
###.#################
###.#################
#####################
```

### Step 9: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
##########.##########
###...I....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
###.#@I......#......#
###.#.###############
###.#I###############
###.#################
###.#################
#####################
```

After:

```text
##########.##########
###...I....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
###.#.@..............
###.#.###############
###.#I###############
###.#################
###.#################
#####################
```


## Graph Facts

- Status: complete
- Reachable states: 262
- Legal transitions: 520
- Event-only illegal transitions: 20
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 262
- Legal transitions: 520
- Budget: maxStates=120000
- Compressed regions: 12
- Bidirectional transitions: 500
- Commitment transitions: 20
- Winning regions: 2
- Initial region: r0, states=13, dist=2, internalBidirectional=24, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@8 -> r4@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=12, edges=20, winReachable=6, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=13, dist=2, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s2@8 -> s3@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 13 | 3 | 2 | 1 | 0 | 0 | s2 | no |
| s2 | 8 | 1 | 15 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 9 | 0 | 30 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s2 | 13 | no | no | down | push_ice, ice_stop_short:d2 | has_reposition_room |
| s2 | 8 | 9 | s3 | 15 | yes | no | right | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=262, regions=12, solution commitments=2
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 14 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 14 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r2 | 2 | 2 | 1 | 1 | forced optimal |
| 8 | r2 | r4 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 13 | 3 | 2 | 1 | 1 | 1 | r2 | no | no | yes |
| r2 | 8 | 1 | 15 | 3 | 2 | 1 | 1 | 1 | r4 | no | no | yes |
| r4 | 9 | 0 | 30 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 2 | 3 | 2 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | walk |
| 8 | down | r2 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | push_ice, ice_stop_short:d2 |
| 9 | right | r4 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 10 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
