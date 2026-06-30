# Level Analysis: SCRATCH_INTERLOCK_D4_D6

## Summary

- Prototype: ice_slide_escape
- Title: SCRATCH_INTERLOCK_D4_D6
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#########.####
#########.##.#
@I......##.GG#
.###########.#
.###########.#
.###########I#
.............#
##############
```

## Shortest Solution

- Found: yes
- Cost: 45
- Depth: 45
- Explored states: 211
- Inputs: down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up right right right right right right right right right up up
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=43, push_ice=2, ice_rebound_d4=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 17: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#########.####
#########.##.#
.I......##.GG#
.###########.#
.###########.#
.###########I#
............@#
##############
```

After:

```text
#########.####
#########.##.#
.I......##.G*#
.###########.#
.###########.#
.###########@#
.............#
##############
```

### Step 35: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#########.####
#########.##.#
@I......##.G*#
.###########.#
.###########.#
.###########.#
.............#
##############
```

After:

```text
#########.####
#########.##.#
.@.........**#
.###########.#
.###########.#
.###########.#
.............#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 293
- Legal transitions: 579
- Event-only illegal transitions: 9
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 293
- Legal transitions: 579
- Budget: maxStates=100000
- Compressed regions: 10
- Bidirectional transitions: 568
- Commitment transitions: 11
- Winning regions: 1
- Initial region: r0, states=17, dist=2, internalBidirectional=32, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@17 -> r7@35
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=10, edges=11, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=17, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s4@17 -> s5@35

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 17 | 2 | 1 | 1 | 0 | 0 | s4 | yes |
| s4 | 17 | 1 | 20 | 2 | 1 | 1 | 1 | 1 | s5 | yes |
| s5 | 35 | 0 | 32 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 17 | s4 | 17 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s4 | 17 | 35 | s5 | 20 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=293, regions=10, solution commitments=2
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 16 | r0 | r3 | 2 | 1 | 1 | 1 | forced optimal |
| 34 | r3 | r7 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 17 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 17 | 1 | 20 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 35 | 0 | 32 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 17 | up | r3 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 18 | down | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r3 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 35 | right | r7 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 36 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | up | r7 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
