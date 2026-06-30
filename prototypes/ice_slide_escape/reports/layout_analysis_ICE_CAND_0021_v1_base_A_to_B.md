# Level Analysis: ICE_CAND_0021_v1_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0021_v1_base_A_to_B
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
###############
@.I.G*#.....I..
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 16
- Inputs: right right left down down down down left
- Events: walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk
- Event counts: walk=7, push_ice=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
###############
###############
.@I.G*#.....I..
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
..@.**#.....I..
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```


## Graph Facts

- Status: complete
- Reachable states: 16
- Legal transitions: 29
- Event-only illegal transitions: 1
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 16
- Legal transitions: 29
- Budget: maxStates=100000
- Compressed regions: 2
- Bidirectional transitions: 28
- Commitment transitions: 1
- Winning regions: 1
- Initial region: r0, states=7, dist=1, internalBidirectional=12, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=2, edges=1, winReachable=2, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=7, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 7 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 0 | 9 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 7 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=16, regions=2, solution commitments=1
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/1, optimal prefix=1/1, forced viable commitments=1/1
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 0 | 9 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 3 | left | r1 | no | 0 | 0 | 0 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 0 | 0 | 0 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 0 | 0 | 0 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 0 | 0 | 0 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 0 | 0 | 0 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
