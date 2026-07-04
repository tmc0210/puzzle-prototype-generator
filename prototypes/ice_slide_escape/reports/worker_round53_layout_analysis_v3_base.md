# Level Analysis: worker_round53_v3_base

## Summary

- Prototype: ice_slide_escape
- Title: worker_round53_v3_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########
.#......I.
#######..#
@...*...##
####.....#
####I....#
####......
####.....#
##########
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 129
- Inputs: right right right right down right down down left up down right right right right right
- Events: walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk
- Event counts: walk=14, push_ice=2, ice_destroyed_d3=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: right

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
##########
.#......I.
#######..#
...@*...##
####.....#
####I....#
####......
####.....#
##########
```

After:

```text
##########
.#......I.
#######..#
....+...##
####.....#
####I....#
####......
####.....#
##########
```

### Step 10: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##########
.#......I.
#######..#
....G...##
####.....#
####I....#
####@.....
####.....#
##########
```

After:

```text
##########
.#......I.
#######..#
....*...##
####.....#
####@....#
####......
####.....#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 294
- Legal transitions: 813
- Event-only illegal transitions: 12
- Winning states: 2
- Budget: maxStates=50000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 294
- Legal transitions: 813
- Budget: maxStates=50000
- Compressed regions: 9
- Bidirectional transitions: 802
- Commitment transitions: 11
- Winning regions: 2
- Initial region: r0, states=4, dist=2, internalBidirectional=6, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@4 -> r3@10
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=9, edges=11, winReachable=5, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=4, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@4 -> s3@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 4 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 4 | 1 | 36 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 10 | 0 | 32 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 4 | s1 | 4 | no | yes | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s1 | 4 | 10 | s3 | 36 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=294, regions=9, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 9 | r1 | r3 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 4 | 1 | 36 | 3 | 2 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 10 | 0 | 32 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 4 | right | r1 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 5 | down | r1 | no | 1 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 1 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 1 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 1 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 1 | 3 | 2 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 10 | up | r3 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 11 | down | r3 | no | 0 | 2 | 1 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 0 | 2 | 1 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r3 | no | 0 | 2 | 1 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r3 | no | 0 | 2 | 1 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r3 | no | 0 | 2 | 1 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r3 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
