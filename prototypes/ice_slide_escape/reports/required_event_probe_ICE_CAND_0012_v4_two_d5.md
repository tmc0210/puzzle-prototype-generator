# Required Event Probe: ICE_CAND_0012_v4_two_d5

## Scope

Candidate: `ICE_CAND_0012_v4_base`

Question: is there any winning path for the declared solve instance with fewer
than two `ice_pass_through_d5` events?

Solve instance:

```yaml
player_start: [0, 7]
player_goal: [14, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
..I..G.######.#
#.....#######.#
####GG.....I..#
###############
```

## Method

Product-state BFS over physical runtime state plus `d5Count`, where
`d5Count` counts events whose id starts with `ice_pass_through_d5`.

The search only expands states with `d5Count <= 1`. A winning state reached
with `d5Count <= 1` would be a counterexample to the double-d5 necessity claim.
Transitions reaching `d5Count >= 2` are counted but not expanded because they
cannot later become a fewer-than-two-d5 counterexample.

## Result

```json
{
  "foundCounterexample": false,
  "counterexample": null,
  "searchStatus": "complete",
  "exploredProductStates": 9194,
  "legalTransitions": 24190,
  "eventOnlyIllegalTransitions": 262,
  "skippedTransitionsReachingTwoOrMoreD5": 12,
  "maxDepth": 200
}
```

## Reading

graph_fact -> complete product-state search over the fewer-than-two-d5 slice
found no winning path.

neutral_meaning -> within the declared solve instance and runtime, a win cannot
be obtained before the second d5 pass-through event.

player_facing_interpretation -> the second d5 is not only present in the
returned solution; it is part of the necessary mechanism chain.

verdict_effect -> supports treating the two d5 pass-through uses as central
evidence, subject to the separate critic question of whether the opening
choices and mid-chain handoff now read as player-facing decisions rather than
scripted execution.
