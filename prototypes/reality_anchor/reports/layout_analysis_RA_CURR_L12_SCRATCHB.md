# Level Analysis: RA_CURR_L12_SCRATCHB

## Summary

- Prototype: reality_anchor
- Title: scratchB
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
###PL####
###BS####
#..C@...#
#...M.G.#
#########
```

## Shortest Solution

- Found: yes
- Cost: 3
- Depth: 3
- Explored states: 6
- Inputs: right right right
- Events: pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
- Event counts: pull_object:crate#1=1, box_to_sticky:n1=1, sticky_merge:n1=1, pull_object:sticky#1=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1

Before:

```text
#########
###PL####
###BS####
#..C@...#
#...M.G.#
#########
```

After:

```text
#########
###PL####
###BS####
#...M@..#
#...M.G.#
#########
```

### Step 2: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
###PL####
###BS####
#...M@..#
#...M.G.#
#########
```

After:

```text
#########
###PL####
###BS####
#....M@.#
#....MG.#
#########
```

### Step 3: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
#########
###PL####
###BS####
#....M@.#
#....MG.#
#########
```

After:

```text
#########
###PL####
###BS####
#.....M@#
#.....m.#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 7
- Legal transitions: 11
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7
- Legal transitions: 11
- Budget: maxStates=300000
- Compressed regions: 4
- Bidirectional transitions: 6
- Commitment transitions: 5
- Winning regions: 1
- Initial region: r0, states=1, dist=3, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@3
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=4, edges=3, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=3/3, trivial=1, sameEntryExit=3, forcedScripted=3, maxRun=3
- Initial SCC: s0, states=1, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@3

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | s3 | yes |
| s3 | 3 | 0 | 2 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 | scripted_trivial_scc |
| s1 | 1 | 2 | s2 | 2 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |
| s2 | 2 | 3 | s3 | 2 | yes | yes | right | pull_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=7, regions=4, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 2 | r2 | r3 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 1 | 2 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 3 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | pull_object:crate#1, box_to_sticky:n1, sticky_merge:n1 |
| 2 | right | r2 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | pull_object:sticky#1, move_sticky_rigid |
| 3 | right | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_runtime_smoke

Reality Anchor v0 runtime smoke behavior is executable through the registered adapter.

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
