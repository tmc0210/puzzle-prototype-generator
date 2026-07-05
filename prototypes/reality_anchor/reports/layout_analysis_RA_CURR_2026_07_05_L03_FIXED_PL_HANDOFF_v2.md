# Level Analysis: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L handoff v2
- Role: mechanic_witness
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#########
#@C..#P##
#....#L##
#.##G####
#....####
#########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 38
- Inputs: right right down right down down
- Events: push_object:crate#1 push_object:crate#1 walk walk pull_object:crate#1 pull_object:crate#1
- Event counts: push_object:crate#1=2, walk=2, pull_object:crate#1=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#########
#@C..#P##
#....#L##
#.##G####
#....####
#########
```

After:

```text
#########
#########
#.@C.#P##
#....#L##
#.##G####
#....####
#########
```

### Step 2: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
#########
#########
#.@C.#P##
#....#L##
#.##G####
#....####
#########
```

After:

```text
#########
#########
#..@C#P##
#....#L##
#.##G####
#....####
#########
```

### Step 5: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#########
#...C#P##
#...@#L##
#.##G####
#....####
#########
```

After:

```text
#########
#########
#....#P##
#...C#L##
#.##+####
#....####
#########
```

### Step 6: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
#########
#########
#....#P##
#...C#L##
#.##+####
#....####
#########
```

After:

```text
#########
#########
#....#P##
#....#L##
#.##*####
#...@####
#########
```


## Graph Facts

- Status: complete
- Reachable states: 130
- Legal transitions: 294
- Event-only illegal transitions: 0
- Winning states: 13
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 130
- Legal transitions: 294
- Budget: maxStates=300000
- Compressed regions: 10
- Bidirectional transitions: 272
- Commitment transitions: 14
- Winning regions: 1
- Initial region: r0, states=13, dist=4, internalBidirectional=28, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r4@5 -> r5@6
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=6, edges=6, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=26, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@2 -> s2@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 26 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 2 | 1 | 13 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 5 | 0 | 26 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 26 | no | yes | right | push_object:crate#1 | has_reposition_room |
| s1 | 2 | 5 | s2 | 13 | no | yes | down | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=130, regions=10, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=4/4, forced viable commitments=3/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 1 | 1 | forced optimal |
| 1 | r1 | r2 | 3 | 2 | 0 | 1 | forced optimal |
| 4 | r2 | r4 | 2 | 1 | 0 | 1 | forced optimal |
| 5 | r4 | r5 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 13 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 1 | 3 | 13 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 2 | 2 | 13 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 5 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes |
| r5 | 6 | 0 | 25 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 2 | right | r2 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 3 | down | r2 | no | 2 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r2 | no | 2 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 5 | down | r4 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | pull_object:crate#1 |
| 6 | down | r5 | yes | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
