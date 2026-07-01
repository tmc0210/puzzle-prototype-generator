# Experiment: ICE_EXP_META_2026_07_01_round12_d5_d6_line_semantics

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round12_d5_d6_line_semantics_structural_redesign_needed
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
candidate_id: none
review_integrity: self_review_only
archive_eligibility: raw_run_only
human_final_status: pending
required_action: change_or_deepen_family
```

## Goal

继续从 round11 的 d5/d6 shared-wall seed 出发，尝试 reviewer 建议的方向 3：
让同一中墙 / 同一滑行线在 base 与 meta 中产生不同终止语义，而不是继续做左右互填
或 connector。

## Taste Context

沿用上一轮校准：`ICE_CAND_0020` / `0022` 只能作为低档功能性/扎实拼图参考，
不能作为本轮接受下界；`ICE_CAND_0024` 的强空间与要素复用仍是目标；`ICE_CAND_0029`
作为过度接受弱 meta 的负例。

## Best Technical Seed: v14

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#G##..I...*.#
#....######.###..#
#.I..######......#
#....##########I.#
.....##########...
###############.##
###############.##
##################
```

Interfaces:

```yaml
A: [0, 7]
B: [0, 1]
C: [17, 7]
D: [17, 1]
base: A -> B
meta: C -> D
```

Design delta from round11 v4:

```yaml
change:
  - "meta row has a two-cell wall group [7,3],[8,3]"
  - "d6 source destroys both cells and then stops at [6,3]"
effect:
  - "the d6 action no longer opens walk access into the left base region"
  - "the ice at [6,3] blocks the destroyed-wall mouth"
  - "ordinary solver finds the meta solution quickly, unlike v5/v6"
```

Evidence:

```yaml
base_A_to_B:
  solved: true
  graph: complete
  reachable_states: 24390
  winning_states: 1
  pushes: 3
  core_events:
    - ice_stop_short:d1
    - ice_pass_through_d5:len1
    - slide_restart_after_group
    - ice_rebound_d4
  scc:
    irreversible_steps: 3
    forcedWinPrefix: "3/3"
meta_C_to_D:
  solved: true
  solver_explored_states_before_win: 5242
  graph: exhausted
  reachable_states_checked: 300001
  winning_states_seen: 2
  pushes: 3
  core_events:
    - ice_stop_short:d1
    - ice_destroy_group_d6_plus:len2
    - slide_restart_after_group
    - ice_rebound_d4
```

Graph interpretation:

```yaml
graph_fact: "v14 meta solver finds a win after 5242 explored states, but full graph exhausts at 300001 states"
neutral_meaning: "the intended route is discoverable, but complete necessity and bypass checks remain unproven"
player_facing_interpretation: "the d6 two-wall mouth-closing idea is promising, but the right-side state space still has too many legal dead branches"
verdict_effect: "use as structural seed only; cannot become proposal_ready"
```

## Failed Deepening: v15 / v16

Attempted to make `[11,3]` a target debt so meta becomes four pushes:

```yaml
intended_meta_chain:
  - "[11,3]* up -> [11,2]"
  - "[15,3]* left -> d6 destroy [7,3],[8,3], stop at [6,3]"
  - "[15,6] up -> d4 refill [15,3]"
  - "[11,5] up -> refill [11,3]"
```

Results:

```yaml
v15:
  graph: complete
  reachable_states: 36512
  wins: 0
  failure: "[11,6] stand was unavailable, so [11,3] debt could not be refilled"
v16:
  graph: exhausted
  reachable_states_checked: 300001
  wins_seen: 0
  failure: "opening a lower route to [11,6] disconnected access to the first stand [11,4] / reintroduced heavy right-side branching"
```

## Verdict

`v14` is cleaner than round11 v4 as a technical seed because the d6 action changes wall
semantics without opening the base side to walking. However it remains only a 3-push base /
3-push meta compact study. The first serious deepening attempt either becomes unsolvable or
reintroduces graph explosion.

Terminal state is therefore `structural_redesign_needed`, not held proposal and not proposal.

## Next Concrete Direction

The next attempt should not add a second right-side debt by opening more corridor. Instead,
make the fourth meta commitment happen on the same d6 mouth:

```yaml
preferred_next_change:
  - "after d6 stops at [6,3], use that stopped ice as a stopper for a second right-side projectile"
  - "avoid any new lower route to [11,6]"
  - "keep the destroyed wall mouth blocked by ice to prevent walk crossover"
```

This preserves the useful part of v14 while avoiding v15/v16's right-side debt trap.
