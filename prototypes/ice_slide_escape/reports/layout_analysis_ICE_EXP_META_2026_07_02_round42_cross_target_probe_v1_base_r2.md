# Level Analysis: ICE_EXP_META_2026_07_02_round42_cross_target_probe_v1_base_r2

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round42_cross_target_probe_v1_base_r2
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4

## Initial State

```text
######.#######
######.#######
######.#######
######..######
######...#####
###...#......#
@...#.*....#..
######.#######
######.#######
######.#######
#####..#######
#####.#.######
#####..#######
######.#######
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 100
- Inputs: right right right up right right down right right up right right right down left up right right right down right
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk
- Event counts: walk=19, push_ice=2, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
######.#######
######.#######
######.#######
######..######
######...#####
###...#......#
....#@*....#..
######.#######
######.#######
######.#######
#####..#######
#####.#.######
#####..#######
######.#######
```

After:

```text
######.#######
######.#######
######.#######
######..######
######...#####
###...#......#
....#.+..I.#..
######.#######
######.#######
######.#######
#####..#######
#####.#.######
#####..#######
######.#######
```

### Step 15: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
######.#######
######.#######
######.#######
######..######
######...#####
###...#......#
....#.G..I@#..
######.#######
######.#######
######.#######
#####..#######
#####.#.######
#####..#######
######.#######
```

After:

```text
######.#######
######.#######
######.#######
######..######
######...#####
###...#......#
....#.*..@.#..
######.#######
######.#######
######.#######
#####..#######
#####.#.######
#####..#######
######.#######
```


## Graph Facts

- Status: complete
- Reachable states: 132
- Legal transitions: 292
- Event-only illegal transitions: 4
- Winning states: 1
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 132
- Legal transitions: 292
- Budget: maxStates=120000
- Compressed regions: 5
- Bidirectional transitions: 288
- Commitment transitions: 4
- Winning regions: 1
- Initial region: r0, states=8, dist=2, internalBidirectional=14, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@8 -> r3@15
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=5, edges=4, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=8, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@8 -> s2@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 8 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 8 | 1 | 37 | 2 | 1 | 1 | 1 | 1 | s2 | yes |
| s2 | 15 | 0 | 20 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s1 | 8 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 8 | 15 | s2 | 37 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=132, regions=5, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 14 | r1 | r3 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 8 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 8 | 1 | 37 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 15 | 0 | 20 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 15 | left | r3 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 16 | up | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_rebound_d4

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
