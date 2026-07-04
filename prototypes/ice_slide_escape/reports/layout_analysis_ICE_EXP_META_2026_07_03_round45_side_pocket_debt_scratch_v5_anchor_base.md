# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v5_anchor_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v5_anchor_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######################
#######################
#######################
####.##################
####.##################
@....*...*...##........
####..###..############
####II###I..###########
####.......############
####*......############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 222
- Inputs: right right right right down right down down right down right right right right down
- Events: walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=14, push_ice=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 7: down

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####.@###..############
####II###I..###########
####.......############
####*......############
##########.############
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####I@###I..###########
####.......############
####*I.....############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 7865
- Legal transitions: 19499
- Event-only illegal transitions: 1002
- Winning states: 20
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7865
- Legal transitions: 19499
- Budget: maxStates=120000
- Compressed regions: 219
- Bidirectional transitions: 18838
- Commitment transitions: 661
- Winning regions: 20
- Initial region: r0, states=9, dist=1, internalBidirectional=16, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=203, edges=571, winReachable=48, winning=20, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=17, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=1, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s74@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 9 | 3 | 3 | 0 | 0 | 0 | s74 | no |
| s74 | 7 | 0 | 30 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s74 | 9 | no | no | down | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=7865, regions=219, solution commitments=1
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/1, optimal prefix=1/1, forced viable commitments=0/1
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r3 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 9 | 3 | 3 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 7 | 0 | 30 | 6 | 5 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 7 | down | r3 | yes | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 8 | down | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r3 | no | 0 | 6 | 5 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
