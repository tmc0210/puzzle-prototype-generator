# Required Event Probe: ICE_CAND_0012_two_d5

## Scope

Candidate: `ICE_CAND_0012`

Question: is there any winning path for the declared solve instance with fewer
than two `ice_pass_through_d5` events?

Solve instance:

```yaml
player_start: [0, 7]
player_goal: [13, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
####..########
####.II......#
####..######.#
####..######.#
####..######.#
####..######.#
####..######.#
..I..G.#####.#
####..######.#
####GG.....I.#
##############
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
  "exploredProductStates": 4422,
  "legalTransitions": 10659,
  "eventOnlyIllegalTransitions": 123,
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

verdict_effect -> supports treating the two d5 pass-through consumptions as
central evidence, subject to the separate critic question of whether the
resulting play is interesting enough.
