# Level Analysis: ICE_CAND_0016_v1_choice_target_eject

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0016_v1_choice_target_eject
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#.*G.#..I...I..
#.#..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
@......########
###############
```

## Shortest Solution

- Found: yes
- Cost: 26
- Depth: 26
- Explored states: 2067
- Inputs: right up up up up up up right right right right right up up right right down right right right right right up left right right
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- Event counts: walk=24, push_ice=2, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 16: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
###############
#.*G.#.@I...I..
#.#..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
.......########
###############
```

After:

```text
###############
#.*G.#..@...I..
#.#..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
.......########
###############
```

### Step 24: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###############
#.*G.#......I@.
#.#..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
.......########
###############
```

After:

```text
###############
#.**........@..
#.#..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
.......########
###############
```


## Graph Facts

- Status: complete
- Reachable states: 9483
- Legal transitions: 29672
- Event-only illegal transitions: 352
- Winning states: 14
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9483
- Legal transitions: 29672
- Budget: maxStates=100000
- Compressed regions: 155
- Bidirectional transitions: 29268
- Commitment transitions: 404
- Winning regions: 14
- Initial region: r0, states=51, dist=2, internalBidirectional=158, commitments=7, viableCommitments=7, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r21@16 -> r63@24
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=143, edges=361, winReachable=41, winning=13, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=14, mergingWinSccs=25
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=102, dist=2, out=8, winOut=8, deadOut=0
- SCC path: s0@0 -> s3@16 -> s6@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 102 | 8 | 8 | 0 | 0 | 0 | s3 | no |
| s3 | 16 | 1 | 126 | 9 | 8 | 1 | 1 | 1 | s6 | no |
| s6 | 24 | 0 | 128 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 16 | s3 | 102 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s3 | 16 | 24 | s6 | 126 | no | no | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9483, regions=155, solution commitments=2
- Opening: commitments=7, viable=7, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 15 | r0 | r21 | 2 | 7 | 0 | 1 | forced optimal |
| 23 | r21 | r63 | 1 | 7 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 51 | 7 | 7 | 0 | 1 | 1 | r21 | no | no | yes |
| r21 | 16 | 1 | 63 | 8 | 7 | 1 | 1 | 1 | r63 | no | no | yes |
| r63 | 24 | 0 | 64 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r0 | no | 2 | 7 | 7 | 0 | 1 | 1 | r21 | yes | yes | yes | yes | no | yes | walk |
| 16 | right | r21 | yes | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 17 | down | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r21 | no | 1 | 8 | 7 | 1 | 1 | 1 | r63 | yes | yes | yes | yes | no | yes | walk |
| 24 | left | r63 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r63 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 25 | right | r63 | no | 0 | 4 | 4 | 0 | 0 | 0 | r63 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r63 | no | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
