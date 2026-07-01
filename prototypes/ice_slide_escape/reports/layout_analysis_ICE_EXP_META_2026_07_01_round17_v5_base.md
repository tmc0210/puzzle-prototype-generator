# Level Analysis: ICE_EXP_META_2026_07_01_round17_v5_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round17_v5_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
#################
@.I.GG#.....I.I..
#.###..######.#.#
#....I.######.#.#
#......######*I.#
#.###########.#.#
..###########....
#################
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 496
- Inputs: right down down down right right right right up left left left left up up right left down down down down down left
- Events: walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk
- Event counts: walk=21, push_ice=2, ice_stop_short:d2=2, ice_blocks_ice_no_chain_push=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 9: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#################
#################
..I.GG#.....I.I..
#.###..######.#.#
#....I.######.#.#
#....@.######*I.#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..I.G*#.....I.I..
#.###..######.#.#
#....@.######.#.#
#......######*I.#
#.###########.#.#
..###########....
#################
```

### Step 16: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#################
#################
.@I.G*#.....I.I..
#.###..######.#.#
#......######.#.#
#......######*I.#
#.###########.#.#
..###########....
#################
```

After:

```text
#################
#################
..@.**#.....I.I..
#.###..######.#.#
#......######.#.#
#......######*I.#
#.###########.#.#
..###########....
#################
```


## Graph Facts

- Status: complete
- Reachable states: 571
- Legal transitions: 1412
- Event-only illegal transitions: 30
- Winning states: 1
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 571
- Legal transitions: 1412
- Budget: maxStates=200000
- Compressed regions: 26
- Bidirectional transitions: 1362
- Commitment transitions: 50
- Winning regions: 1
- Initial region: r0, states=22, dist=2, internalBidirectional=48, commitments=5, viableCommitments=2, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r4@9 -> r19@16
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=22, edges=31, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=44, dist=2, out=5, winOut=1, deadOut=4
- SCC path: s0@0 -> s14@9 -> s15@16

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 44 | 5 | 1 | 4 | 0 | 0 | s14 | yes |
| s14 | 9 | 1 | 20 | 1 | 1 | 0 | 1 | 1 | s15 | yes |
| s15 | 16 | 0 | 22 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 9 | s14 | 44 | no | yes | up | push_ice, ice_stop_short:d2 | has_reposition_room |
| s14 | 9 | 16 | s15 | 20 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=571, regions=26, solution commitments=2
- Opening: commitments=5, viable=2, dead=3, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r4 | 2 | 2 | 3 | 1 | forced optimal |
| 15 | r4 | r19 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 22 | 5 | 2 | 3 | 1 | 1 | r4 | no | no | yes |
| r4 | 9 | 1 | 20 | 1 | 1 | 0 | 1 | 1 | r19 | yes | yes | yes |
| r19 | 16 | 0 | 22 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 2 | 5 | 2 | 3 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | walk |
| 9 | up | r4 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 10 | left | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r4 | no | 1 | 1 | 1 | 0 | 1 | 1 | r19 | yes | yes | yes | yes | yes | yes | walk |
| 16 | right | r19 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 17 | left | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r19 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
