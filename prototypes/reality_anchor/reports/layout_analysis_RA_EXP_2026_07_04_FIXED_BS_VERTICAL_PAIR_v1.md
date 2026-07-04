# Level Analysis: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_BS_VERTICAL_PAIR_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
###########
####BS#####
###########
#@PLG.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 765
- Inputs: right right down down right right up right right right
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:sticky#1 move_sticky_rigid walk pull_object:crate#1 box_to_sticky:n1 pull_object:sticky#1 move_sticky_rigid sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid
- Event counts: push_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=2, walk=4, push_object:sticky#1=1, move_sticky_rigid=3, pull_object:crate#1=1, box_to_sticky:n1=1, pull_object:sticky#1=2, sticky_merge:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
####BS#####
###########
#@PLG.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

After:

```text
###########
####BS#####
###########
#.@PL.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
####BS#####
###########
#.@PL.....#
#...C..G..#
#....M.G..#
#.........#
###########
```

After:

```text
###########
####BS#####
###########
#..@PL....#
#...C..G..#
#....M.G..#
#.........#
###########
```

### Step 6: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####BS#####
###########
#...PL....#
#...C..G..#
#...@M.G..#
#.........#
###########
```

After:

```text
###########
####BS#####
###########
#...PL....#
#...C..G..#
#....@MG..#
#.........#
###########
```

### Step 8: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1

Before:

```text
###########
####BS#####
###########
#...PL....#
#...C@.G..#
#.....MG..#
#.........#
###########
```

After:

```text
###########
####BS#####
###########
#...PL....#
#....M@G..#
#.....MG..#
#.........#
###########
```

### Step 9: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
###########
####BS#####
###########
#...PL....#
#....M@G..#
#.....MG..#
#.........#
###########
```

After:

```text
###########
####BS#####
###########
#...PL....#
#.....M+..#
#.....MG..#
#.........#
###########
```

### Step 10: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
###########
####BS#####
###########
#...PL....#
#.....M+..#
#.....MG..#
#.........#
###########
```

After:

```text
###########
####BS#####
###########
#...PL....#
#......m@.#
#......m..#
#.........#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 367744
- Legal transitions: 1131974
- Event-only illegal transitions: 0
- Winning states: 192
- Budget: maxStates=800000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 367744
- Legal transitions: 1131974
- Budget: maxStates=800000
- Compressed regions: 14428
- Bidirectional transitions: 1016272
- Commitment transitions: 90572
- Winning regions: 8
- Initial region: r0, states=28, dist=4, internalBidirectional=76, commitments=6, viableCommitments=6, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r35@7 -> r51@8 -> r7@9 -> r132@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=891, edges=2829, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=232286, dist=0, out=441, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 232286 | 441 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=367744, regions=14428, solution commitments=6
- Opening: commitments=6, viable=6, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/6, optimal prefix=2/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 6 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 3 | 6 | 0 | 1 | forced optimal |
| 6 | r2 | r35 | 2 | 9 | 0 | 1 | multiple viable choices |
| 7 | r35 | r51 | 3 | 2 | 0 | 1 | forced optimal |
| 8 | r51 | r7 | 2 | 2 | 0 | 1 | forced optimal |
| 9 | r7 | r132 | 1 | 5 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 28 | 6 | 6 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 3 | 29 | 6 | 6 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 2 | 61 | 9 | 9 | 0 | 1 | 1 | r35 | no | no | no |
| r35 | 7 | 3 | 1 | 2 | 2 | 0 | 1 | 1 | r51 | no | no | yes |
| r51 | 8 | 2 | 1 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 9 | 1 | 63 | 5 | 5 | 0 | 1 | 1 | r132 | no | no | yes |
| r132 | 10 | 0 | 32 | 5 | 5 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 6 | 6 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 3 | 6 | 6 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | right | r2 | yes | 2 | 9 | 9 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | down | r2 | no | 2 | 9 | 9 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r2 | no | 2 | 9 | 9 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 2 | 9 | 9 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r2 | no | 2 | 9 | 9 | 0 | 1 | 1 | r35 | yes | yes | no | no | no | no | push_object:sticky#1, move_sticky_rigid |
| 7 | up | r35 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r51 | yes | yes | yes | yes | no | yes | walk |
| 8 | right | r51 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | pull_object:crate#1, box_to_sticky:n1 |
| 9 | right | r7 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r132 | yes | yes | yes | yes | no | yes | pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 10 | right | r132 | yes | 0 | 5 | 5 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
