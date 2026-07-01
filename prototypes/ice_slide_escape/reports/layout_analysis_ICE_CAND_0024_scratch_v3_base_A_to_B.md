# Level Analysis: ICE_CAND_0024_scratch_v3_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0024_scratch_v3_base_A_to_B
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
##################
#######.##########
####.IG.I......*.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##........######.#
#@.#############..
```

## Shortest Solution

- Found: yes
- Cost: 35
- Depth: 35
- Explored states: 16429
- Inputs: right up right right right right right up down left left left up up up up right left down down down down right right up down left left up right down left left left down
- Events: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk
- Event counts: walk=31, push_ice=4, ice_rebound_d4=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_stop_short:d2=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##################
##################
#######.##########
####.IG.I......*.#
####.#G.#######..#
####.#....#####I.#
####.II*#.#####..#
##.....@..######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.IGII......*.#
####.#G.#######..#
####.#....#####I.#
####.II+#.#####..#
##........######.#
#..#############..
```

### Step 17: right

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##################
##################
#######.##########
####@IGII......*.#
####.#G.#######..#
####.#....#####I.#
####.IIG#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####.@*II......*.#
####.#G.#######..#
####.#....#####I.#
####.IIG#.#####..#
##........######.#
#..#############..
```

### Step 25: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####..*II......*.#
####.#G.#######..#
####.#....#####I.#
####.IIG#.#####..#
##....@...######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####..*II......*.#
####.#*.#######..#
####.#....#####I.#
####.I@G#.#####..#
##........######.#
#..#############..
```

### Step 30: right

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
##################
#######.##########
####..*II......*.#
####.#*.#######..#
####.#....#####I.#
####@I.G#.#####..#
##........######.#
#..#############..
```

After:

```text
##################
##################
#######.##########
####..*II......*.#
####.#*.#######..#
####.#....#####I.#
####.@.*#.#####..#
##........######.#
#..#############..
```


## Graph Facts

- Status: exhausted
- Reachable states: 100001
- Legal transitions: 236182
- Event-only illegal transitions: 13743
- Winning states: 2
- Budget: maxStates=100000
- Reason: state budget exceeded

## Agency Facts

- Status: exhausted
- Compression rule: bidirectional_edges
- Reachable states: 100001
- Legal transitions: 236181
- Budget: maxStates=100000
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
