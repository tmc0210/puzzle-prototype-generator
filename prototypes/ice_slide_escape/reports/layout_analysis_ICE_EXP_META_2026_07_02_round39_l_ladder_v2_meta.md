# Level Analysis: ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######.############
#######.############
#######.############
@...###.############
###.*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

## Shortest Solution

- Found: yes
- Cost: 28
- Depth: 28
- Explored states: 677
- Inputs: right right right down right down right right right right up left down down down right down down down right down down left up down right down down
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=24, push_ice=4, ice_rebound_d4=4

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.############
#######.############
#######.############
....###.############
###@*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

After:

```text
#######.############
#######.############
#######.############
....###.############
###.+..I.###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

### Step 12: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.############
#######.############
#######.############
....###.############
###.G..I@###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

After:

```text
#######.############
#######.############
#######.############
....###.############
###.*..@.###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

### Step 17: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######.@###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

After:

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########+.##########
########..##########
########....########
########I.#.*....###
########..##........
#########.##########
#########.##########
```

### Step 24: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########G.##########
########..##########
########....########
########I.#.*....###
########@.##........
#########.##########
#########.##########
```

After:

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########@.#.*....###
########..##........
#########.##########
#########.##########
```


## Graph Facts

- Status: complete
- Reachable states: 2526
- Legal transitions: 6063
- Event-only illegal transitions: 203
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2526
- Legal transitions: 6063
- Budget: maxStates=300000
- Compressed regions: 106
- Bidirectional transitions: 5904
- Commitment transitions: 159
- Winning regions: 1
- Initial region: r0, states=5, dist=4, internalBidirectional=8, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r4@12 -> r11@17 -> r28@24
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=106, edges=159, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=5, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s3@12 -> s25@17 -> s45@24

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 3 | 18 | 4 | 2 | 2 | 1 | 1 | s3 | no |
| s3 | 12 | 2 | 17 | 2 | 1 | 1 | 1 | 1 | s25 | yes |
| s25 | 17 | 1 | 31 | 4 | 1 | 3 | 2 | 2 | s45 | yes |
| s45 | 24 | 0 | 14 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 5 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 5 | 12 | s3 | 18 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s3 | 12 | 17 | s25 | 17 | no | yes | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s25 | 17 | 24 | s45 | 31 | no | yes | up | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2526, regions=106, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=3/4
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 11 | r1 | r4 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 16 | r4 | r11 | 2 | 1 | 1 | 1 | forced optimal |
| 23 | r11 | r28 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 3 | 18 | 4 | 2 | 2 | 2 | 2 | r4 | no | no | no |
| r4 | 12 | 2 | 17 | 2 | 1 | 1 | 1 | 1 | r11 | no | yes | yes |
| r11 | 17 | 1 | 31 | 4 | 1 | 3 | 1 | 1 | r28 | no | yes | yes |
| r28 | 24 | 0 | 14 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | down | r1 | no | 3 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 3 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 3 | 4 | 2 | 2 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 12 | left | r4 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | down | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r4 | no | 2 | 2 | 1 | 1 | 1 | 1 | r11 | yes | yes | yes | yes | yes | yes | walk |
| 17 | down | r11 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 18 | down | r11 | no | 1 | 4 | 1 | 3 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r11 | no | 1 | 4 | 1 | 3 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r11 | no | 1 | 4 | 1 | 3 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r11 | no | 1 | 4 | 1 | 3 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r11 | no | 1 | 4 | 1 | 3 | 1 | 1 | r11 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r11 | no | 1 | 4 | 1 | 3 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 24 | up | r28 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r28 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 25 | down | r28 | no | 0 | 2 | 0 | 2 | 0 | 0 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r28 | no | 0 | 2 | 0 | 2 | 0 | 0 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r28 | no | 0 | 2 | 0 | 2 | 0 | 0 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r28 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
