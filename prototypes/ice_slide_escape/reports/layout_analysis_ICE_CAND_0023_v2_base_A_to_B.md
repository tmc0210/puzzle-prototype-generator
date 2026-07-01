# Level Analysis: ICE_CAND_0023_v2_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0023_v2_base_A_to_B
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#....#########
@.IGI#.....I..
#....#######.#
..IGG#.....I..
###########..#
###########I.#
###########..#
##############
```

## Shortest Solution

- Found: yes
- Cost: 14
- Depth: 14
- Explored states: 1107
- Inputs: right right up right right down down left left left down right left left
- Events: walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk
- Event counts: walk=11, push_ice=3, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
.@IGI#.....I..
#....#######.#
..IGG#.....I..
###########..#
###########I.#
###########..#
##############
```

After:

```text
##############
#....#########
..@*I#.....I..
#....#######.#
..IGG#.....I..
###########..#
###########I.#
###########..#
##############
```

### Step 6: down

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##############
#...@#########
...*I#.....I..
#....#######.#
..IGG#.....I..
###########..#
###########I.#
###########..#
##############
```

After:

```text
##############
#....#########
...*@#.....I..
#....#######.#
..IG*#.....I..
###########..#
###########I.#
###########..#
##############
```

### Step 12: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#....#########
...*.#.....I..
#....#######.#
.@IG*#.....I..
###########..#
###########I.#
###########..#
##############
```

After:

```text
##############
#....#########
...*.#.....I..
#....#######.#
..@**#.....I..
###########..#
###########I.#
###########..#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 1703
- Legal transitions: 4609
- Event-only illegal transitions: 386
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1703
- Legal transitions: 4609
- Budget: maxStates=100000
- Compressed regions: 112
- Bidirectional transitions: 4318
- Commitment transitions: 291
- Winning regions: 1
- Initial region: r0, states=15, dist=3, internalBidirectional=32, commitments=8, viableCommitments=1, deadCommitments=7, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r12@6 -> r77@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=112, edges=291, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=15, dist=3, out=8, winOut=1, deadOut=7
- SCC path: s0@0 -> s1@2 -> s2@6 -> s4@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 15 | 8 | 1 | 7 | 0 | 0 | s1 | yes |
| s1 | 2 | 2 | 15 | 6 | 1 | 5 | 1 | 1 | s2 | yes |
| s2 | 6 | 1 | 15 | 6 | 1 | 5 | 1 | 1 | s4 | yes |
| s4 | 12 | 0 | 15 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 15 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1 | 2 | 6 | s2 | 15 | no | yes | down | push_ice, ice_stop_short:d2 | has_reposition_room |
| s2 | 6 | 12 | s4 | 15 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1703, regions=112, solution commitments=3
- Opening: commitments=8, viable=1, dead=7, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 3 | 1 | 7 | 1 | forced optimal |
| 5 | r1 | r12 | 2 | 1 | 5 | 1 | forced optimal |
| 11 | r12 | r77 | 1 | 1 | 5 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 15 | 8 | 1 | 7 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 2 | 15 | 6 | 1 | 5 | 1 | 1 | r12 | no | yes | yes |
| r12 | 6 | 1 | 15 | 6 | 1 | 5 | 1 | 1 | r77 | no | yes | yes |
| r77 | 12 | 0 | 15 | 4 | 0 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 8 | 1 | 7 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 8 | 1 | 7 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 2 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 3 | up | r1 | no | 2 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 2 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r1 | no | 2 | 6 | 1 | 5 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | walk |
| 6 | down | r12 | yes | 1 | 6 | 1 | 5 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 7 | down | r12 | no | 1 | 6 | 1 | 5 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r12 | no | 1 | 6 | 1 | 5 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r12 | no | 1 | 6 | 1 | 5 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r12 | no | 1 | 6 | 1 | 5 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r12 | no | 1 | 6 | 1 | 5 | 1 | 1 | r77 | yes | yes | yes | yes | yes | yes | walk |
| 12 | right | r77 | yes | 0 | 4 | 0 | 4 | 0 | 0 | r77 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 13 | left | r77 | no | 0 | 4 | 0 | 4 | 0 | 0 | r77 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r77 | no | 0 | 4 | 0 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
