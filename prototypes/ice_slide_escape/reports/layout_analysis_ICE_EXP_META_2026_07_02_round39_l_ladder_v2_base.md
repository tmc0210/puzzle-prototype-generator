# Level Analysis: ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######@############
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
########..#.*....###
########..##........
#########.##########
#########.##########
```

## Shortest Solution

- Found: yes
- Cost: 34
- Depth: 34
- Explored states: 674
- Inputs: down down down down down down down right down down down right down down left up up right right right down right down right right right right up left down right right right right
- Events: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk
- Event counts: walk=30, push_ice=4, ice_rebound_d4=4

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 9: down

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

### Step 16: up

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

### Step 22: right

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
########*.##########
########..##########
########....########
########..#@*....###
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
########*.##########
########..##########
########....########
########..#.+..I.###
########..##........
#########.##########
#########.##########
```

### Step 29: left

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
########*.##########
########..##########
########....########
########..#.G..I@###
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
########*.##########
########..##########
########....########
########..#.*..@.###
########..##........
#########.##########
#########.##########
```


## Graph Facts

- Status: complete
- Reachable states: 979
- Legal transitions: 2367
- Event-only illegal transitions: 84
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 979
- Legal transitions: 2367
- Budget: maxStates=300000
- Compressed regions: 42
- Bidirectional transitions: 2308
- Commitment transitions: 59
- Winning regions: 1
- Initial region: r0, states=17, dist=4, internalBidirectional=38, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@9 -> r5@16 -> r12@22 -> r27@29
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=42, edges=59, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=17, dist=4, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s2@9 -> s7@16 -> s8@22 -> s10@29

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 17 | 2 | 1 | 1 | 0 | 0 | s2 | yes |
| s2 | 9 | 3 | 31 | 4 | 2 | 2 | 1 | 1 | s7 | no |
| s7 | 16 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | s8 | yes |
| s8 | 22 | 1 | 26 | 3 | 1 | 2 | 2 | 2 | s10 | yes |
| s10 | 29 | 0 | 12 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 9 | s2 | 17 | no | yes | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s2 | 9 | 16 | s7 | 31 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s7 | 16 | 22 | s8 | 14 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s8 | 22 | 29 | s10 | 26 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=979, regions=42, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=3/4
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r2 | 4 | 1 | 1 | 1 | forced optimal |
| 15 | r2 | r5 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 21 | r5 | r12 | 2 | 1 | 1 | 1 | forced optimal |
| 28 | r12 | r27 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 17 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 9 | 3 | 31 | 4 | 2 | 2 | 2 | 2 | r5 | no | no | no |
| r5 | 16 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | r12 | no | yes | yes |
| r12 | 22 | 1 | 26 | 3 | 1 | 2 | 1 | 1 | r27 | no | yes | yes |
| r27 | 29 | 0 | 12 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 9 | down | r2 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 10 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | walk |
| 16 | up | r5 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | up | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r5 | no | 2 | 2 | 1 | 1 | 1 | 1 | r12 | yes | yes | yes | yes | yes | yes | walk |
| 22 | right | r12 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 23 | down | r12 | no | 1 | 3 | 1 | 2 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r12 | no | 1 | 3 | 1 | 2 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r12 | no | 1 | 3 | 1 | 2 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r12 | no | 1 | 3 | 1 | 2 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r12 | no | 1 | 3 | 1 | 2 | 1 | 1 | r12 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | up | r12 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | yes | yes | yes | yes | yes | yes | walk |
| 29 | left | r27 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 30 | down | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
