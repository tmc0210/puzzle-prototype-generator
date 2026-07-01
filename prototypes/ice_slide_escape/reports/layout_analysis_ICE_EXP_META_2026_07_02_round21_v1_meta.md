# Level Analysis: ICE_EXP_META_2026_07_02_round21_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round21_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########
######.###
######.###
##.....###
..I###.###
#.I..G.#.#
#......#.#
#.....I..#
######@###
```

## Shortest Solution

- Found: yes
- Cost: 20
- Depth: 20
- Explored states: 358
- Inputs: up up left left left left left up right down right right right right up up up up up up
- Events: push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk
- Event counts: push_ice=2, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, walk=18, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
##########
######.###
######.###
##.....###
..I###.###
#.I..G.#.#
#......#.#
#.....I..#
######@###
```

After:

```text
######.###
######.###
######.###
##.....###
..I###.###
#.I..G.#.#
#......#.#
#.....@..#
######.###
```

### Step 9: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
######.###
######.###
######.###
##.....###
..I###.###
#@I..G.#.#
#......#.#
#........#
######.###
```

After:

```text
######.###
######.###
######.###
##.....###
..I###.###
#.@..*.#.#
#......#.#
#........#
######.###
```


## Graph Facts

- Status: complete
- Reachable states: 820
- Legal transitions: 2121
- Event-only illegal transitions: 44
- Winning states: 3
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 820
- Legal transitions: 2121
- Budget: maxStates=120000
- Compressed regions: 26
- Bidirectional transitions: 2080
- Commitment transitions: 41
- Winning regions: 3
- Initial region: r0, states=1, dist=2, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@9
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=23, edges=34, winReachable=4, winning=3, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/1, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 0 | 66 | 4 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | up | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=820, regions=26, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 11 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 11 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 8 | r1 | r4 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 33 | 2 | 1 | 1 | 1 | 1 | r4 | no | yes | yes |
| r4 | 9 | 0 | 33 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | up | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 2 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 9 | right | r4 | yes | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 10 | down | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r4 | no | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
