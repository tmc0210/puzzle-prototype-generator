# Level Analysis: ICE_CAND_0005_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0005_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#########.####
#########.####
@I......##.GG#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########I#
.............#
##############
```

## Shortest Solution

- Found: yes
- Cost: 55
- Depth: 55
- Explored states: 145
- Inputs: down down down down down down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=53, push_ice=2, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d2=2, ice_destroy_group_d6_plus:len2=1, ice_blocks_ice_no_chain_push=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 22: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
#########.####
#########.####
.I......##.GG#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########I#
............@#
##############
```

After:

```text
#########.####
#########.####
.I......##.G*#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########@#
.............#
##############
```

### Step 45: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#########.####
#########.####
@I......##.G*#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.............#
##############
```

After:

```text
#########.####
#########.####
.@.........**#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.............#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 168
- Legal transitions: 330
- Event-only illegal transitions: 2
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 168
- Legal transitions: 330
- Budget: maxStates=100000
- Compressed regions: 5
- Bidirectional transitions: 326
- Commitment transitions: 4
- Winning regions: 1
- Initial region: r0, states=22, dist=2, internalBidirectional=42, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@22 -> r4@45
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=5, edges=4, winReachable=3, winning=1, winSubgraph=single_win_chain
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=22, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s3@22 -> s4@45

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 22 | 2 | 1 | 1 | 0 | 0 | s3 | yes |
| s3 | 22 | 1 | 28 | 1 | 1 | 0 | 1 | 1 | s4 | yes |
| s4 | 45 | 0 | 40 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 22 | s3 | 22 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s3 | 22 | 45 | s4 | 28 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=168, regions=5, solution commitments=2
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Forced chain: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 21 | r0 | r2 | 2 | 1 | 1 | 1 | forced optimal |
| 44 | r2 | r4 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 22 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 22 | 1 | 28 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 45 | 0 | 40 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 22 | up | r2 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 23 | down | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | left | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 45 | right | r4 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 46 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | right | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | up | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | up | r4 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
