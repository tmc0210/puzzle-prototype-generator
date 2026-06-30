# Meta Probe: ICE_CAND_0012_v4_open_c_left_d6_before_d4

## Scope

Human review of `ICE_CAND_0012` accepted the base as a flawed positive example
and asked for a further meta attempt record. This probe tests one small
structural redesign hypothesis:

```text
Open the top cell above C's left-side approach so a later / alternate interface
can reach C early and try d6 before the base d4 -> d5 chain.
```

Variant layout:

```text
####...########
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

Changed from v4: row 0 opens `[6,0]`.

## Checked Pairs

```yaml
base_preserve_pair:
  start: [0, 7]
  goal: [14, 1]
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_open_c_left_base_preserve.md
meta_pair:
  start: [6, 0]
  goal: [0, 7]
  report: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_open_c_left_to_left.md
```

Both pairs are solvable and cover the required event families. The base pair is
still solvable, but its SCC shape changes from one-win-continuation to
`branching_win_dag`.

## D6-Before-D4 Probe

Custom product search constrained out any path that triggers `ice_rebound_d4`
before seeing `ice_destroy_group_d6_plus`.

```json
[
  {
    "id": "base_left_to_right",
    "foundD6BeforeD4Win": true,
    "cost": 70,
    "explored": 12831,
    "legal": 33463
  },
  {
    "id": "meta_top_to_left",
    "foundD6BeforeD4Win": true,
    "cost": 75,
    "explored": 14002,
    "legal": 36512
  }
]
```

## Reading

graph_fact -> opening `[6,0]` creates solvable routes where d6 can occur before
d4 for both the base pair and the meta pair.

neutral_meaning -> the edit exposes real ordering freedom and is not merely a
new entrance that replays the shortest base ordering.

player_facing_interpretation -> there is genuine meta design material here:
the same C ice can become an early route-opening action before the double-d5
target-state chain.

verdict_effect -> record as `promising_meta_space`, but do not promote this
variant: the same edit also gives the base pair a d6-first branch, which risks
polluting the accepted base reading.

## Classification

```yaml
classification: promising_meta_space_with_base_pollution_risk
recommended_for_current_candidate: false
reason: >
  This proves the human-suggested meta space exists, but the attempted edit
  changes base agency to branching_win_dag and permits d6-first base solutions.
  A future meta pass should separate the alternate interface more cleanly or
  gate d6-first ordering so it belongs to the meta instance without weakening
  the base reading.
```
