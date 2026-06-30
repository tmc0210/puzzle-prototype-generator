# Level Analysis: ICE_CAND_0013_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0013_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
.I.I.....#G*#
.#.########.#
...........@#
```

## Shortest Solution

- Found: yes
- Cost: 32
- Depth: 32
- Explored states: 264
- Inputs: up up down down left left left left left left left left left up up right left down down left left up up right right right right right right right right right
- Events: walk push_ice ice_boundary_disappear:d0 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk
- Event counts: walk=29, push_ice=3, ice_boundary_disappear:d0=1, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d2=1, ice_destroy_group_d6_plus:len1=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: up

- Legal: true
- Events: push_ice, ice_boundary_disappear:d0

Before:

```text
.I.I.....#G*#
.#.########@#
............#
```

After:

```text
.I.I.....#G+#
.#.########.#
............#
```

### Step 16: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
.I@I.....#GG#
.#.########.#
............#
```

After:

```text
.I.@.....#G*#
.#.########.#
............#
```

### Step 24: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
@I.......#G*#
.#.########.#
............#
```

After:

```text
.@........**#
.#.########.#
............#
```


## Graph Facts

- Status: complete
- Reachable states: 436
- Legal transitions: 889
- Event-only illegal transitions: 6
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 436
- Legal transitions: 889
- Budget: maxStates=100000
- Compressed regions: 19
- Bidirectional transitions: 860
- Commitment transitions: 29
- Winning regions: 1
- Initial region: r0, states=17, dist=3, internalBidirectional=32, commitments=4, viableCommitments=1, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r7@16 -> r11@24
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=19, edges=29, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=17, dist=3, out=4, winOut=1, deadOut=3
- SCC path: s0@0 -> s8@2 -> s10@16 -> s12@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 17 | 4 | 1 | 3 | 0 | 0 | s8 | yes |
| s8 | 2 | 2 | 19 | 3 | 1 | 2 | 1 | 1 | s10 | yes |
| s10 | 16 | 1 | 23 | 3 | 1 | 2 | 1 | 1 | s12 | yes |
| s12 | 24 | 0 | 25 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s8 | 17 | no | yes | up | push_ice, ice_boundary_disappear:d0 | has_reposition_room |
| s8 | 2 | 16 | s10 | 19 | no | yes | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s10 | 16 | 24 | s12 | 23 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=436, regions=19, solution commitments=3
- Opening: commitments=4, viable=1, dead=3, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 1 | 3 | 1 | forced optimal |
| 15 | r1 | r7 | 2 | 1 | 2 | 1 | forced optimal |
| 23 | r7 | r11 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 17 | 4 | 1 | 3 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 2 | 19 | 3 | 1 | 2 | 1 | 1 | r7 | no | yes | yes |
| r7 | 16 | 1 | 23 | 3 | 1 | 2 | 1 | 1 | r11 | no | yes | yes |
| r11 | 24 | 0 | 25 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | up | r1 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d0 |
| 3 | down | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r1 | no | 2 | 3 | 1 | 2 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 16 | right | r7 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 17 | left | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | walk |
| 24 | right | r11 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 25 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r11 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
