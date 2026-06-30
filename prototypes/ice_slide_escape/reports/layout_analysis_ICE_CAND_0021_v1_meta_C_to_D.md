# Level Analysis: ICE_CAND_0021_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0021_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
###############
..I.G*#.....I.@
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```

## Shortest Solution

- Found: yes
- Cost: 18
- Depth: 18
- Explored states: 123
- Inputs: left left down right down down left up up right up left down down down down right right
- Events: walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk
- Event counts: walk=15, push_ice=3, ice_pass_through_d5:len2=2, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=2, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###############
###############
..I.G*#.....I@.
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```

After:

```text
###############
###############
..IIG*#.....@..
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```

### Step 8: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
###############
###############
..IIG*#........
#.##########..#
#.##########I.#
#.##########@.#
..##########...
###############
```

After:

```text
###############
###############
..IIG*#.....I..
#.##########..#
#.##########@.#
#.##########..#
..##########...
###############
```

### Step 12: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###############
###############
..IIG*#.....I@.
#.##########..#
#.##########..#
#.##########..#
..##########...
###############
```

After:

```text
###############
###############
..II**#.....@..
#.##########..#
#.##########..#
#.##########..#
..##########...
###############
```


## Graph Facts

- Status: complete
- Reachable states: 123
- Legal transitions: 284
- Event-only illegal transitions: 12
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 123
- Legal transitions: 284
- Budget: maxStates=100000
- Compressed regions: 9
- Bidirectional transitions: 274
- Commitment transitions: 10
- Winning regions: 1
- Initial region: r0, states=10, dist=3, internalBidirectional=20, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r5@8 -> r8@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=9, edges=10, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=10, dist=3, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@2 -> s6@8 -> s7@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 10 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 2 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | s6 | yes |
| s6 | 8 | 1 | 11 | 1 | 1 | 0 | 2 | 2 | s7 | yes |
| s7 | 12 | 0 | 17 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 10 | no | no | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s1 | 2 | 8 | s6 | 16 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s6 | 8 | 12 | s7 | 11 | no | yes | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=123, regions=9, solution commitments=3
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=2/3
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 2 | 1 | 1 | forced optimal |
| 7 | r1 | r5 | 2 | 1 | 1 | 1 | forced optimal |
| 11 | r5 | r8 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 10 | 3 | 2 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 2 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 8 | 1 | 11 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes |
| r8 | 12 | 0 | 17 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 3 | 3 | 2 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 2 | left | r1 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 3 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 8 | up | r5 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 9 | up | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 12 | left | r8 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 13 | down | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r8 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
