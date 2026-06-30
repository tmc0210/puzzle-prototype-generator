# Level Analysis: ICE_CAND_0008_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0008_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
##############
.I......##.G##
@.....I..G.G##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####I##
#####.........
```

## Shortest Solution

- Found: yes
- Cost: 55
- Depth: 55
- Explored states: 604
- Inputs: up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- Events: walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=52, push_ice=3, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=2, ice_stop_short:d2=1, ice_pass_through_d5:len1=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_stop_short:d2

Before:

```text
##############
##############
@I......##.G##
......I..G.G##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####I##
#####.........
```

After:

```text
##############
##############
.@.........*##
......I..G.G##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####I##
#####.........
```

### Step 22: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
##############
...........*##
......I..G.G##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####I##
#####......@..
```

After:

```text
##############
##############
...........*##
......I..G.*##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####@##
#####.........
```

### Step 38: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
##############
##############
...........*##
.....@I..G.*##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.........
```

After:

```text
##############
##############
...........*##
......@..*.*##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.........
```


## Graph Facts

- Status: complete
- Reachable states: 653
- Legal transitions: 1530
- Event-only illegal transitions: 39
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 653
- Legal transitions: 1530
- Budget: maxStates=100000
- Compressed regions: 16
- Bidirectional transitions: 1500
- Commitment transitions: 30
- Winning regions: 1
- Initial region: r0, states=36, dist=3, internalBidirectional=78, commitments=4, viableCommitments=1, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r7@22 -> r12@38
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=16, edges=24, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=36, dist=3, out=4, winOut=1, deadOut=3
- SCC path: s0@0 -> s10@2 -> s12@22 -> s13@38

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 36 | 4 | 1 | 3 | 0 | 0 | s10 | yes |
| s10 | 2 | 2 | 38 | 2 | 1 | 1 | 1 | 1 | s12 | yes |
| s12 | 22 | 1 | 43 | 2 | 1 | 1 | 1 | 1 | s13 | yes |
| s13 | 38 | 0 | 43 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s10 | 36 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s10 | 2 | 22 | s12 | 38 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s12 | 22 | 38 | s13 | 43 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=653, regions=16, solution commitments=3
- Opening: commitments=4, viable=1, dead=3, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 17 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 17 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 1 | 3 | 1 | forced optimal |
| 21 | r1 | r7 | 2 | 1 | 1 | 1 | forced optimal |
| 37 | r7 | r12 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 36 | 4 | 1 | 3 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 2 | 38 | 2 | 1 | 1 | 1 | 1 | r7 | no | yes | yes |
| r7 | 22 | 1 | 43 | 2 | 1 | 1 | 1 | 1 | r12 | no | yes | yes |
| r12 | 38 | 0 | 43 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_stop_short:d2 |
| 3 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r1 | no | 2 | 2 | 1 | 1 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 22 | up | r7 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 23 | down | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r7 | no | 1 | 2 | 1 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | walk |
| 38 | right | r12 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 39 | left | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | down | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | right | r12 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
