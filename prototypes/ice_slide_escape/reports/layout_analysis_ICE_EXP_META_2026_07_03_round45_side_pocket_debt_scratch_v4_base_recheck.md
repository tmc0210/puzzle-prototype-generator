# Level Analysis: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v4_base_recheck

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v4_base_recheck
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
####.......############
##########.############
```

## Shortest Solution

- Found: yes
- Cost: 15
- Depth: 15
- Explored states: 346
- Inputs: right right right right down down down right down right right right right right down
- Events: walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- Event counts: walk=14, push_ice=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: down

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
####@.###..############
####II###I..###########
####.......############
####.......############
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
####@I###I..###########
####.......############
####I......############
##########.############
```


## Graph Facts

- Status: complete
- Reachable states: 19229
- Legal transitions: 48111
- Event-only illegal transitions: 1930
- Winning states: 75
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 19229
- Legal transitions: 48111
- Budget: maxStates=80000
- Compressed regions: 524
- Bidirectional transitions: 46198
- Commitment transitions: 1913
- Winning regions: 75
- Initial region: r0, states=9, dist=1, internalBidirectional=16, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r2@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=473, edges=1605, winReachable=148, winning=68, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=53, mergingWinSccs=112
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=9, dist=1, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s340@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 9 | 3 | 3 | 0 | 0 | 0 | s340 | no |
| s340 | 6 | 0 | 31 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s340 | 9 | no | no | down | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=19229, regions=524, solution commitments=1
- Opening: commitments=3, viable=3, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/1, optimal prefix=0/1, forced viable commitments=0/1
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: near-discovery shape; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r2 | 1 | 3 | 0 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 9 | 3 | 3 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 6 | 0 | 31 | 6 | 6 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | walk |
| 6 | down | r2 | yes | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 7 | down | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r2 | no | 0 | 6 | 6 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
