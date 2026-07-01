# Level Analysis: ICE_EXP_META_2026_07_01_round14_v27_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round14_v27_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......*.#
##*.I.#####I###..#
#.....#####.###I.#
.....######......@
##################
```

## Shortest Solution

- Found: yes
- Cost: 40
- Depth: 40
- Explored states: 52613
- Inputs: left up up up left left left left left up down right right right right down right down down left left left left left up up down down right right right right up up right up up up up right
- Events: walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d1 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk
- Event counts: walk=36, push_ice=4, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......*@#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#*........+.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

### Step 10: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#*....@...G.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*...I.#..*.##..#
#....#.##..+...#.#
#....#*........G.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

### Step 26: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
.......#########..
#.*...I.#..*.##..#
#....#.##..G...#.#
#....#*........G.#
##*.I.#####I###..#
#.....#####@###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*...I.#..*.##..#
#....#.##..*...#.#
#....#*........G.#
##*.I.#####@###..#
#.....#####.###I.#
.....######.......
##################
```

### Step 33: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
.......#########..
#.*...I.#..*.##..#
#....#.##..*...#.#
#....#*........G.#
##*.I.#####.###..#
#.....#####.###I.#
.....######....@..
##################
```

After:

```text
##################
.......#########..
#.*...I.#..*.##..#
#....#.##..*...#.#
#....#*........*.#
##*.I.#####.###..#
#.....#####.###@.#
.....######.......
##################
```


## Graph Facts

- Status: exhausted
- Reachable states: 1000001
- Legal transitions: 2342259
- Event-only illegal transitions: 119406
- Winning states: 1
- Budget: maxStates=1000000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 1000001
- Legal transitions: 2342258
- Budget: maxStates=1000000
- Reason: state budget exceeded
- Metrics: unavailable because the reachable graph was not fully enumerated.

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
