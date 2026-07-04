# Level Analysis: worker_round54_lshape_v4_base_explain

## Summary

- Prototype: ice_slide_escape
- Title: worker_round54_lshape_v4_base_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########.########
###########I########
###########.########
###########.########
####.....##.########
@.#.*....##.########
....##.####.########
######.####.########
######.#############
######.####..#######
######.####..*....##
######.######.......
######.#############
######.#############
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 85
- Inputs: down right right right up right up right right right right down left left down down down down down down down down
- Events: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk
- Event counts: walk=20, push_ice=2, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.########
###########I########
###########.########
###########.########
####.....##.########
..#@*....##.########
....##.####.########
######.####.########
######.#############
######.####..#######
######.####..*....##
######.######.......
######.#############
######.#############
```

After:

```text
###########.########
###########I########
###########.########
###########.########
####.....##.########
..#.+..I.##.########
....##.####.########
######.####.########
######.#############
######.####..#######
######.####..*....##
######.######.......
######.#############
######.#############
```

### Step 13: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.########
###########I########
###########.########
###########.########
####.....##.########
..#.G..I@##.########
....##.####.########
######.####.########
######.#############
######.####..#######
######.####..*....##
######.######.......
######.#############
######.#############
```

After:

```text
###########.########
###########I########
###########.########
###########.########
####.....##.########
..#.*..@.##.########
....##.####.########
######.####.########
######.#############
######.####..#######
######.####..*....##
######.######.......
######.#############
######.#############
```


## Graph Facts

- Status: complete
- Reachable states: 90
- Legal transitions: 204
- Event-only illegal transitions: 5
- Winning states: 1
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 90
- Legal transitions: 204
- Budget: maxStates=200000
- Compressed regions: 5
- Bidirectional transitions: 200
- Commitment transitions: 4
- Winning regions: 1
- Initial region: r0, states=7, dist=2, internalBidirectional=14, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@6 -> r3@13
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=5, edges=4, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=7, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@6 -> s3@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 7 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 6 | 1 | 24 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 13 | 0 | 17 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 7 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 6 | 13 | s3 | 24 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=90, regions=5, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r3 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 7 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 6 | 1 | 24 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 13 | 0 | 17 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 7 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 13 | left | r3 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 14 | left | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r3 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
