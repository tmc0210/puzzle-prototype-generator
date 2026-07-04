# Level Analysis: worker_round54_lshape_v4_meta_explain

## Summary

- Prototype: ice_slide_escape
- Title: worker_round54_lshape_v4_meta_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########@########
###########I########
###########.########
###########.########
####.....##.########
..#.*....##.########
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
- Cost: 23
- Depth: 23
- Explored states: 61
- Inputs: down down down down down down down down down right down right down right right right right up left down right right right
- Events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk
- Event counts: push_ice=3, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_stop_short:d2=1, walk=20, ice_rebound_d4=2, ice_blocks_ice_no_chain_push=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: down

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
###########@########
###########I########
###########.########
###########.########
####.....##.########
..#.*....##.########
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
###########@########
###########.########
###########.########
####.....##.########
..#.*....##.########
....##.####.########
######.####.########
######.####.########
######.####..#######
######.####I.*....##
######.######.......
######.#############
######.#############
```

### Step 12: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.########
###########.########
###########.########
###########.########
####.....##.########
..#.*....##.########
....##.####.########
######.####.########
######.####.########
######.####..#######
######.####I@*....##
######.######.......
######.#############
######.#############
```

After:

```text
###########.########
###########.########
###########.########
###########.########
####.....##.########
..#.*....##.########
....##.####.########
######.####.########
######.####.########
######.####..#######
######.####I.+..I.##
######.######.......
######.#############
######.#############
```

### Step 19: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###########.########
###########.########
###########.########
###########.########
####.....##.########
..#.*....##.########
....##.####.########
######.####.########
######.####.########
######.####..#######
######.####I.G..I@##
######.######.......
######.#############
######.#############
```

After:

```text
###########.########
###########.########
###########.########
###########.########
####.....##.########
..#.*....##.########
....##.####.########
######.####.########
######.####.########
######.####..#######
######.####I.*..@.##
######.######.......
######.#############
######.#############
```


## Graph Facts

- Status: complete
- Reachable states: 82
- Legal transitions: 181
- Event-only illegal transitions: 11
- Winning states: 1
- Budget: maxStates=240000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 82
- Legal transitions: 181
- Budget: maxStates=240000
- Compressed regions: 6
- Bidirectional transitions: 176
- Commitment transitions: 5
- Winning regions: 1
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@12 -> r4@19
- Forced commitment prefix length: 2
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=6, edges=5, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@12 -> s4@19

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 12 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 12 | 1 | 23 | 2 | 1 | 1 | 1 | 1 | s4 | yes |
| s4 | 19 | 0 | 11 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | down | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2 | scripted_trivial_scc |
| s1 | 1 | 12 | s2 | 12 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s2 | 12 | 19 | s4 | 23 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=82, regions=6, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 11 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 18 | r2 | r4 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 12 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 12 | 1 | 23 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 19 | 0 | 11 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | down | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2 |
| 2 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 12 | right | r2 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | down | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r2 | no | 1 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 19 | left | r4 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 20 | down | r4 | no | 0 | 1 | 0 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r4 | no | 0 | 1 | 0 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r4 | no | 0 | 1 | 0 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r4 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
