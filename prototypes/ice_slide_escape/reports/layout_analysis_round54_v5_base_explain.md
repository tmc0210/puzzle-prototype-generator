# Level Analysis: round54_v5_base_explain

## Summary

- Prototype: ice_slide_escape
- Title: round54_v5_base_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#......#
@.#.*....*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

## Shortest Solution

- Found: yes
- Cost: 20
- Depth: 20
- Explored states: 536
- Inputs: right up right right down right right up right right right down left down left down down down down down
- Events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk
- Event counts: walk=18, push_ice=2, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#@*....*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

After:

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#.+..I.*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

### Step 13: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#.G..I@*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```

After:

```text
#######.####
#######I####
#######.####
#######.####
#######.####
#...#......#
..#.*..@.*.#
#...#...#.##
######.##.##
######..#.##
#.........##
######.#####
######.#####
```


## Graph Facts

- Status: complete
- Reachable states: 6561
- Legal transitions: 15619
- Event-only illegal transitions: 292
- Winning states: 2
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 6561
- Legal transitions: 15619
- Budget: maxStates=200000
- Compressed regions: 159
- Bidirectional transitions: 15246
- Commitment transitions: 373
- Winning regions: 2
- Initial region: r0, states=9, dist=2, internalBidirectional=18, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@6 -> r6@13
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=127, edges=266, winReachable=5, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@6 -> s11@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 9 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 6 | 1 | 86 | 10 | 2 | 8 | 1 | 1 | s11 | no |
| s11 | 13 | 0 | 102 | 8 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 9 | no | yes | right | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s1 | 6 | 13 | s11 | 86 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=6561, regions=159, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r6 | 1 | 3 | 6 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 9 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 6 | 1 | 43 | 9 | 3 | 6 | 1 | 1 | r6 | no | no | yes |
| r6 | 13 | 0 | 34 | 6 | 3 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r1 | yes | 1 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 7 | right | r1 | no | 1 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 1 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 1 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 1 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 1 | 9 | 3 | 6 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r1 | no | 1 | 9 | 3 | 6 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 13 | left | r6 | yes | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 14 | down | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r6 | no | 0 | 6 | 3 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
