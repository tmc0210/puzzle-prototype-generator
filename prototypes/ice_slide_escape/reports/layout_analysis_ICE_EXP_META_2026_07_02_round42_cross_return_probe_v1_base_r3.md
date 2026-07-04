# Level Analysis: ICE_EXP_META_2026_07_02_round42_cross_return_probe_v1_base_r3

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round42_cross_return_probe_v1_base_r3
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4

## Initial State

```text
##############
##############
##############
######..######
#######..#####
######.......#
@...#.*....#..
###....#######
#####..#######
#####..#######
#####..#######
#####.#.######
#####..#######
##############
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 149
- Inputs: right right right down right right up right up right right right right down left up right right right down right
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
##############
##############
##############
######..######
#######..#####
######.......#
....#@*....#..
###....#######
#####..#######
#####..#######
#####..#######
#####.#.######
#####..#######
##############
```

After:

```text
##############
##############
##############
######..######
#######..#####
######.......#
....#.+..I.#..
###....#######
#####..#######
#####..#######
#####..#######
#####.#.######
#####..#######
##############
```

### Step 15: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##############
##############
##############
######..######
#######..#####
######.......#
....#.G..I@#..
###....#######
#####..#######
#####..#######
#####..#######
#####.#.######
#####..#######
##############
```

After:

```text
##############
##############
##############
######..######
#######..#####
######.......#
....#.*..@.#..
###....#######
#####..#######
#####..#######
#####..#######
#####.#.######
#####..#######
##############
```


## Graph Facts

- Status: complete
- Reachable states: 245
- Legal transitions: 588
- Event-only illegal transitions: 10
- Winning states: 1
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 245
- Legal transitions: 588
- Budget: maxStates=120000
- Compressed regions: 8
- Bidirectional transitions: 580
- Commitment transitions: 8
- Winning regions: 1
- Initial region: r0, states=18, dist=2, internalBidirectional=40, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@8 -> r4@15
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=5, edges=4, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=105, dist=0, out=4, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 105 | 4 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=245, regions=8, solution commitments=2
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r1 | 2 | 1 | 1 | 1 | forced optimal |
| 14 | r1 | r4 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 18 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 8 | 1 | 35 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 15 | 0 | 17 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 8 | right | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 9 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 15 | left | r4 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 16 | up | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r4 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

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
