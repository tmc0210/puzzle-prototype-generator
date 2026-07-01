# Level Analysis: ICE_EXP_META_2026_07_01_round17_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round17_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
.......#########..
#.I.....#..*.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######......@
##################
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 88
- Inputs: left up up up left right up up up right
- Events: walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk
- Event counts: walk=9, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.I.....#..*.##..#
#....####..*...#.#
#....IG##......I@#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.I.....#..*.##..#
#....####..*...#.#
#....I*........@.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```


## Graph Facts

- Status: complete
- Reachable states: 42652
- Legal transitions: 114923
- Event-only illegal transitions: 5592
- Winning states: 12
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 42652
- Legal transitions: 114923
- Budget: maxStates=300000
- Compressed regions: 1236
- Bidirectional transitions: 111434
- Commitment transitions: 3489
- Winning regions: 12
- Initial region: r0, states=35, dist=1, internalBidirectional=84, commitments=8, viableCommitments=7, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=1110, edges=3069, winReachable=60, winning=12, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=27, mergingWinSccs=36
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=35, dist=1, out=8, winOut=7, deadOut=1
- SCC path: s0@0 -> s922@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 35 | 8 | 7 | 1 | 0 | 0 | s922 | no |
| s922 | 5 | 0 | 38 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s922 | 35 | no | no | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=42652, regions=1236, solution commitments=1
- Opening: commitments=8, viable=7, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 1 | 7 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 35 | 8 | 7 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 5 | 0 | 38 | 6 | 6 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 8 | 7 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 1 | 8 | 7 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 1 | 8 | 7 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 1 | 8 | 7 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 1 | 8 | 7 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 5 | left | r1 | yes | 0 | 6 | 6 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 6 | right | r1 | no | 0 | 6 | 6 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 0 | 6 | 6 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 0 | 6 | 6 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r1 | no | 0 | 6 | 6 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 0 | 6 | 6 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
