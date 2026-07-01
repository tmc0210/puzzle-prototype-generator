# Experiment: ICE_EXP_META_2026_07_01_round10_late_dual_challenge

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round10_late_dual_challenge_failed_search
prototype: ice_slide_escape
terminal_state: failed_search
candidate_id: none
review_integrity: not_applicable_no_serious_candidate
human_final_status: pending
```

## Goal

本轮目标是寻找更高档 meta 关：base 流程本身应是游戏中后期的较难
application / challenge，meta 流程应是更后期 challenge。两条流程必须在
大面积活动空间和要素上复用，但主逻辑链要明显不同；优先追求同一目标被不同冰
填、同一冰在两流程有不同推法、同一空间在两流程被不同解释。

本轮特别采用更严格审美：不能把 base/meta 之间的伏笔复用误算为 base 自身或
meta 自身复杂度；不能把 `ICE_CAND_0020` / `ICE_CAND_0022` 这类功能性或
扎实但不高档的正例当作接受下界。

## Terminal State

failed_search.

本轮没有提交 proposal。最接近的结构族具备共享空间和多推证据，但失败在两个
硬门槛：

1. meta 不是独立不同逻辑链，而是 base 主链加一个开门前缀或后缀。
2. 四接口路由无法隔离，A/B 可以解到 C/D 或 C/D 可以回到 A/B。

因此不得包装成 `proposal_ready` 或 `proposal_ready_with_caveats`。

## Proposal Summary

none.

## Best Rejected Material

### Family R10-A: shared lower-chain plus top d6 opener

Representative layout:

```text
############
#......I.#..
.#.......*.#
#.....#..I..
#...#.#....#
#.#........#
#.#....#...#
#G.....#...#
##########.#
```

Interfaces tested:

```yaml
A: [10, 8]
B: [11, 1]
C: [11, 3]
D: [0, 2]
base_instance: A -> B
meta_instance: C -> D
```

Evidence summary:

```yaml
base_A_to_B:
  solved: true
  cost: 42
  pushes: 6
  events:
    ice_stop_short_d2: 4
    ice_rebound_d4: 1
    ice_stop_short_d1: 1
  graph:
    status: complete
    reachable_states: 94805
    winning_states: 3
  scc:
    irreversible_steps: 6
    forcedWinPrefix: 0/6
meta_C_to_D:
  solved: true
  cost: 36
  pushes: 7
  events:
    ice_stop_short_d2: 4
    ice_destroy_group_d6_plus_len1: 1
    ice_boundary_disappear_after_group: 1
    ice_rebound_d4: 1
    ice_stop_short_d1: 1
  graph:
    status: complete
    reachable_states: 94805
    winning_states: 1
  scc:
    irreversible_steps: 7
    forcedWinPrefix: 0/7
```

Why rejected:

- Base uses the lower ice at `[9,3]` through the shared maze and fills `[1,7]`.
- Meta first uses the top ice at `[7,1]` for a d6 wall break, then follows the
  same lower-ice chain to fill `[1,7]`.
- The meta d6 is real, but the player-facing meta insight is only "do the same
  lower chain after/beside an opener", not a different reinterpretation of the
  central space.
- The initial `*` at `[9,2]` remains a passive satisfied target in both flows,
  so the candidate fails the desired different target/ice reuse standard.

Routing rejection:

```yaml
observed_on_sibling_pos4_1:
  A_to_D: solved
  A_to_C: solved
  B_to_D: solved
  C_to_B: solved
  C_to_A: solved
reason:
  The top opener and lower target-fill chain are both reachable from the early
  side, so the late edge is not a valid meta-only interface.
```

Graph diagnostic reading:

- graph_fact: base and meta complete graphs both have about 95k reachable states,
  and both solved traces have 6-7 pushes.
  neutral_meaning: the layout has a nontrivial shared state space and enough
  commitment events to be worth inspecting.
  player_facing_interpretation: the player would still read the two solves as
  the same lower-chain puzzle with an extra opener, rather than two different
  uses of the same machinery.
  verdict_effect: evidence supports "promising material", but not a proposal.

- graph_fact: cross-interface solves exist in the same family.
  neutral_meaning: the selected edge interfaces are not separated by the target
  completion condition.
  player_facing_interpretation: an early player could complete the target state
  and leak into the purported late edge route.
  verdict_effect: hard routing gate fails.

## Other Explored Material

### Target-derivation base skeleton

The strongest single-flow material came from target derivation:

```text
############
#..........#
##.#.....I.#
#.....#....#
#...#.#....#
#.#........#
#.#....#...#
#G.....#...#
##########.#
```

It produced a long single-ice carry chain, but it had only one edge interface.
Adding doors and target debt created the R10-A family above: useful shared-space
material, but still not a valid meta proposal.

### Random four-interface search

Two stochastic four-interface scans were run with fixed A/B/C/D doors, random
baffles, d4 capsules, d5/d6 lanes, 2-3 targets, and 3-5 ice blocks. The hard
filter required:

- A->B and C->D both solvable.
- both flows at least 4-5 pushes.
- meta includes d5/d6/restart evidence.
- A/B must not solve C/D.
- event signatures must differ.

No candidates survived the route and difference filters.

## Archive Taste Context

Used only for calibration, not as layout inheritance:

- `ICE_CAND_0024`: positive high-meta reference for strong shared space and
  element reuse; this round's best family falls short because meta still rides
  the base lower chain.
- `ICE_CAND_0019`: positive late challenge reference for delayed stopper /
  composite-lock standards; this round's best family has some chain length but
  lacks that level of nonlocal target/stopper reinterpretation.
- `ICE_CAND_0020` and `ICE_CAND_0022`: explicitly not used as acceptance
  lower bound; they remain functional / solid references, not the target
  quality level.
- `ICE_CAND_0029`: negative calibration from designer correction; this round
  avoids accepting "better than 0020 but below 0024" as sufficient.

## Exploration Log Summary

1. Reconfirmed the current stricter meta taste: base/meta must each be judged
   separately, and cross-flow reuse alone does not upgrade a simple route.
2. Searched mined two-interface layouts for high overlap and distinct event
   profiles. Results either shared endpoints, used reciprocal paths, or had
   same-chain logic.
3. Used target-derivation material to obtain a stronger base skeleton, then
   added additional doors and target/ice debt.
4. Found R10-A/R10-B style shared-space families with 6-push base and 7-8-push
   meta evidence.
5. Rejected those families because meta was base-chain-plus-opener and route
   isolation failed.
6. Ran random four-interface generation with route and signature filters; no
   survivor.

## Review Iterations

No numbered review loop was opened because no serious candidate survived the
designer hard gates. A previous subagent id from earlier context was unavailable
in this resumed context, and no proposal-level package was sent to independent
critic. Review integrity is therefore `not_applicable_no_serious_candidate`,
not independent review.

## Required Action

```yaml
required_action: change_family
next_search_bias:
  - make one flow consume or relocate an object that the other flow must preserve
  - require different ice to fill at least one shared target
  - make route isolation part of construction, not a post-hoc scan
  - avoid families where meta is base chain plus a d6 entrance or exit opener
```

## Human Priority

none as proposal.

The R10-A family is worth remembering only as a failure material: it shows how
easy it is for "shared space + extra meta opener" to look impressive in event
counts while still violating the intended meta standard.
