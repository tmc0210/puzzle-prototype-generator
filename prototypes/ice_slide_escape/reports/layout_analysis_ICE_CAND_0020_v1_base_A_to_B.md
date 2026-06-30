# Level Analysis: ICE_CAND_0020_v1_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0020_v1_base_A_to_B
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
##############
@.IG#.....I...
#.########.###
..IG#......I..
##########...#
##############
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 22
- Inputs: right right left down down right left left
- Events: walk push_ice ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk
- Event counts: walk=6, push_ice=2, ice_stop_short:d1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##############
##############
.@IG#.....I...
#.########.###
..IG#......I..
##########...#
##############
```

After:

```text
##############
##############
..@*#.....I...
#.########.###
..IG#......I..
##########...#
##############
```

### Step 6: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##############
##############
...*#.....I...
#.########.###
.@IG#......I..
##########...#
##############
```

After:

```text
##############
##############
...*#.....I...
#.########.###
..@*#......I..
##########...#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 24
- Legal transitions: 44
- Event-only illegal transitions: 4
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 24
- Legal transitions: 44
- Budget: maxStates=100000
- Compressed regions: 4
- Bidirectional transitions: 40
- Commitment transitions: 4
- Winning regions: 1
- Initial region: r0, states=5, dist=2, internalBidirectional=8, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@2 -> r3@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=4, edges=4, winReachable=4, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=5, dist=2, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@2 -> s3@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 5 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 2 | 1 | 6 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 6 | 0 | 7 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 5 | no | no | right | push_ice, ice_stop_short:d1 | has_reposition_room |
| s1 | 2 | 6 | s3 | 6 | no | yes | right | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=24, regions=4, solution commitments=2
- Opening: commitments=2, viable=2, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=1/2
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 5 | r1 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 5 | 2 | 2 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 2 | 1 | 6 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 6 | 0 | 7 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 2 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 2 | 2 | 0 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 2 | right | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 3 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 7 | left | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
