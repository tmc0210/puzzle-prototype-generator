# Level Analysis: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########@##########
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
- Explored states: 83
- Inputs: down left left left left left left left down down down down down down down down down down down down down down down
- Events: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=21, push_ice=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: left

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
##########.##########
###...I@...##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
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
###...@....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
###.#II......#......#
###.#.###############
###.#.###############
###.#################
###.#################
#####################
```

### Step 9: down

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
##########.##########
###@.......##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
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
###........##########
###@######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
###.#.###############
###.#.###############
###.#II......#......#
###.#.###############
###.#.###############
###.#################
###.#################
###.#################
```


## Graph Facts

- Status: complete
- Reachable states: 298
- Legal transitions: 589
- Event-only illegal transitions: 15
- Winning states: 3
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 298
- Legal transitions: 589
- Budget: maxStates=120000
- Compressed regions: 8
- Bidirectional transitions: 580
- Commitment transitions: 9
- Winning regions: 3
- Initial region: r0, states=11, dist=2, internalBidirectional=20, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r2@9
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=8, edges=9, winReachable=5, winning=3, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=11, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 11 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 1 | 15 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 9 | 0 | 37 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 11 | no | yes | left | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s2 | 15 | no | yes | down | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=298, regions=8, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 14 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 14 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 8 | r1 | r2 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 11 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 1 | 15 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 9 | 0 | 37 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 6 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 9 | down | r2 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 10 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r2 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
