# Level Analysis: worker_round47_non_BC_internal_d6_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: worker_round47_non_BC_internal_d6_v1_base
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
@....I...*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

## Shortest Solution

- Found: yes
- Cost: 20
- Depth: 20
- Explored states: 188
- Inputs: right right right right right right right right right down right down down left up down down right down right
- Events: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk
- Event counts: walk=17, push_ice=3, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=2, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
....@I...*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.....@...*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

### Step 9: right

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
........@*...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.........+...##........
####.####..############
####II#.#I..###########
####.......############
####**.##..############
##########..###########
```

### Step 15: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####.##################
.........G...##........
####.####..############
####II#.#I..###########
####.....@.############
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.##################
.........*...##........
####.####..############
####II#.#@..###########
####.......############
####**.##..############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 545
- Legal transitions: 1189
- Event-only illegal transitions: 102
- Winning states: 4
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 545
- Legal transitions: 1189
- Budget: maxStates=120000
- Compressed regions: 20
- Bidirectional transitions: 1158
- Commitment transitions: 31
- Winning regions: 4
- Initial region: r0, states=8, dist=3, internalBidirectional=14, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r4@9 -> r8@15
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=20, edges=29, winReachable=12, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=4, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=8, dist=3, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@9 -> s5@15

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 8 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 5 | 2 | 12 | 2 | 2 | 0 | 1 | 1 | s2 | no |
| s2 | 9 | 1 | 33 | 4 | 3 | 1 | 1 | 1 | s5 | no |
| s5 | 15 | 0 | 21 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 8 | no | no | right | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 5 | 9 | s2 | 12 | no | no | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s2 | 9 | 15 | s5 | 33 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=545, regions=20, solution commitments=3
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 3 | 2 | 0 | 1 | forced optimal |
| 8 | r1 | r4 | 2 | 2 | 0 | 1 | forced optimal |
| 14 | r4 | r8 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 8 | 2 | 2 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 5 | 2 | 12 | 2 | 2 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 9 | 1 | 33 | 4 | 3 | 1 | 1 | 1 | r8 | no | no | yes |
| r8 | 15 | 0 | 21 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 3 | 2 | 2 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | walk |
| 5 | right | r1 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 6 | right | r1 | no | 2 | 2 | 2 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 2 | 2 | 2 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 2 | 2 | 2 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | walk |
| 9 | right | r4 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 10 | down | r4 | no | 1 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r4 | no | 1 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r4 | no | 1 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r4 | no | 1 | 4 | 3 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r4 | no | 1 | 4 | 3 | 1 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | walk |
| 15 | up | r8 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 16 | down | r8 | no | 0 | 2 | 1 | 1 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r8 | no | 0 | 2 | 1 | 1 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r8 | no | 0 | 2 | 1 | 1 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r8 | no | 0 | 2 | 1 | 1 | 0 | 0 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r8 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
