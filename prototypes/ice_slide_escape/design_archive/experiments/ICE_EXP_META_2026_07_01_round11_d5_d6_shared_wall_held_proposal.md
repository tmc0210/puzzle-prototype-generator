# Experiment: ICE_EXP_META_2026_07_01_round11_d5_d6_shared_wall

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round11_d5_d6_shared_wall_held_proposal
prototype: ice_slide_escape
terminal_state: held_proposal
candidate_id: none
review_integrity: independent_review
archive_eligibility: raw_run_only
human_final_status: pending
required_action: revise_and_complete_meta_evidence
```

## Goal

本轮继续寻找更高档 meta 关：base 流程应是中后期较难 application /
challenge，meta 流程应是更后期 challenge；两条流程要有强要素复用和尽量多的
空间复用，并且逻辑链不能只是镜像或简单重复。

本轮 taste calibration 只使用带人类评语的 archive candidate：

```yaml
used:
  ICE_CAND_0020:
    lesson: 功能性 meta 拼图不是本轮下界；base/meta 单流程若都是 witness，不得因跨时间复用而拔高。
  ICE_CAND_0022:
    lesson: 扎实 meta 可有生态位，但不能作为高档目标的接受下界。
  ICE_CAND_0024:
    lesson: 强 meta 依赖共享空间/要素复用、base-time 遮蔽和未来回访时的状态不兼容诱惑。
  ICE_CAND_0029:
    lesson: 不得因比低档功能关更强就接受；base/meta 都太简单或几何交融不足必须打回。
not_reused:
  - layout
  - geometry
  - causal_chain
  - routes
  - object_placement
  - entrance_exit_relation
```

## Held Proposal

Candidate label: `TMP_d5d6_shared_wall_v4`.

```text
##################
.......#####...#..
#.*...I.#..G.#...#
#....#G.#..I...*.#
#....####........#
#.I..####........#
#....####.....#I.#
.....####.........
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
base_instance: A_or_B -> B
meta_instance: C_or_D -> D
```

## Design Claim

```yaml
terminal_claim: >
  held_proposal. The core d5/d6 reread is promising but below the requested
  high-difficulty target, and meta evidence is incomplete.
player_insight: >
  Base reads the upper middle wall as a d5 pass-through/rebound obstacle after
  clearing the left row blocker; meta rereads the adjacent middle wall as a d6
  destroy/stop obstacle after clearing the right row blocker.
causal_chain:
  base:
    - "[6,2] down -> [6,3], filling the left target and clearing row2."
    - "[2,2]* right -> d5 through [8,2], restart, d4 rebound to [11,2]."
    - "[2,5] up -> d4 rebound refills [2,2]."
  meta:
    - "[11,3] up -> [11,2], filling the right target and clearing row3."
    - "[15,3]* left -> d6 destroys [8,3], restarts, stops at [6,3]."
    - "[15,6] up -> d4 rebound refills [15,3]."
why_not_execution: >
  The route is not just execution: the same targets are filled by different ice
  across base/meta, and the same middle wall column is read through different
  mechanisms. However, each individual flow is still only three pushes and has
  a parallel rhythm, so this cannot be claimed as the requested late/high meta
  challenge.
falsification:
  - "Reject if human review treats the two flows as parallel compact study rather than high-difficulty challenge."
  - "Reject or hold if meta complete graph / missing-required proof remains unavailable."
  - "Reject if C/D -> left-side exits become relevant or if additional edge openings appear."
```

## Mechanism Scope

```yaml
central:
  - "target [6,3]: base filled by [6,2]; meta filled by [15,3]*"
  - "target [11,2]: base filled by [2,2]*; meta filled by [11,3]"
  - "middle wall column: base uses [8,2] as d5 pass-through; meta uses [8,3] as d6 destroy"
  - "source targets [2,2] and [15,3] are refilled by d4 rebound"
support:
  - "component separation keeps A/B from solving C/D"
  - "edge openings only at A/B/C/D"
incidental:
  - "right-side dead branches and high meta state count"
  - "extra lower right shaft converts one wrong refiller push into a dead branch"
```

## Evidence

Base `A=[0,7] -> B=[0,1]`:

```yaml
solver:
  found: true
  cost: 34
  pushes: 3
  events:
    - ice_stop_short:d1
    - ice_pass_through_d5:len1
    - slide_restart_after_group
    - ice_rebound_d4
graph:
  status: complete
  reachable_states: 24864
  winning_states: 1
scc:
  irreversible_steps: 3
  forcedWinPrefix: "3/3"
required_event_probe:
  required: [ice_pass_through_d5, ice_rebound_d4]
  missing_required_win_path: none
  search: complete
```

Meta `C=[17,7] -> D=[17,1]`:

```yaml
solver:
  found: true
  cost: 32
  pushes: 3
  events:
    - ice_stop_short:d1
    - ice_destroy_group_d6_plus:len1
    - slide_restart_after_group
    - ice_stop_short:d2
    - ice_rebound_d4
graph:
  status: exhausted
  reachable_states_checked: 1000001
  winning_states_seen: 1
  reason: state budget exceeded
required_event_probe:
  required: [ice_destroy_group_d6_plus, ice_rebound_d4]
  status: incomplete
```

Routing:

```yaml
edge_openings: [[0,1], [0,7], [17,1], [17,7]]
A_or_B_to_D:
  status: complete_fail
  reachable_states: 24864
  wins: 0
A_or_B_to_B:
  status: complete_pass
  required_d5_d4: complete_pass
C_or_D_to_D:
  status: solved_but_graph_incomplete
C_or_D_to_B:
  status: no_solution_seen_but_graph_incomplete
non_ABCD_edge_openings: none
```

Graph reading examples:

```yaml
base_scc:
  graph_fact: "complete graph; solution irreversible path has 3 steps and forcedWinPrefix=3/3"
  neutral_meaning: "every winning continuation must take the same three irreversible commitments"
  player_facing_interpretation: "the three core pushes are not optional cleanup; they define the route"
  verdict_effect: "supports base mechanical validity, but not high difficulty by itself"
meta_graph:
  graph_fact: "solver found a d6+d4 win, but full graph exhausted at 1,000,001 states"
  neutral_meaning: "there is at least one intended meta route, but bypass and missing-required questions remain open"
  player_facing_interpretation: "the returned route is plausible, yet the designer cannot claim necessity"
  verdict_effect: "blocks proposal_ready; terminal state must remain held_proposal"
```

## Review Loop

```yaml
review_1:
  reviewer: Lagrange
  review_integrity: independent
  recommendation: hold
  required_action: revise + complete_meta_evidence
  major_attacks:
    - "meta graph exhausted; returned d6+d4 is not a complete necessity proof"
    - "base and meta each only have 3 pushes"
    - "flow rhythm is parallel: clear row, cross wall, refill"
    - "d5/d6 wall reread is good, but may read as adjacent-row study rather than high-difficulty meta"
    - "opening dead branches may be either readable feedback or enumeration punishment"
designer_action_1:
  result: did_not_close_review_loop
  action:
    - "tested icepillar variant; rejected due 2-push central-ice bypass"
    - "tested v5 with extra right-source debt; hand replay solved but solver found no win at 1,000,001 states"
  retained_candidate: TMP_d5d6_shared_wall_v4
  required_action_after_action: revise_and_complete_meta_evidence
```

## Rejected / Follow-up Variants

### Icepillar Variant

Changed the middle wall cells to ice to avoid dynamic wall destruction.

Rejected because the player can directly push the central ice into `[11,2]`,
collapsing base/meta into two-push bypasses.

### V5 Extra Right Debt

```text
##################
.......#####...#..
#.*...I.#..G.#...#
#....#G.#..*...*.#
#....####........#
#.I..####..I.....#
#....####.....#I.#
.....####.........
###############.##
###############.##
##################
```

Manual meta route exists:

```yaml
meta_pushes:
  - "[11,3]* up -> [11,2]"
  - "[15,3]* left -> d6 destroy [8,3], stop at [6,3]"
  - "[11,5] up -> refill [11,3]"
  - "[15,6] up -> d4 rebound refill [15,3]"
```

Rejected / held out because the ordinary solver found no win at 1,000,001
states. It is aesthetically a better direction than v4, but evidence is too weak
for serious submission.

Additional macro-push check:

```yaml
macro_solver:
  base:
    status: complete
    macro_states: 756
    wins: 1
    pushes: 3
  meta:
    status: exhausted
    macro_states_checked: 300001
    wins_seen: 7
    first_win_pushes: 4
    first_win_chain:
      - "[11,3]* up -> [11,2]"
      - "[15,3]* left -> d6 destroy [8,3], stop at [6,3]"
      - "[15,6] up -> d4 rebound refill [15,3]"
      - "[11,5] up -> refill [11,3]"
```

The macro check confirms the four-push route exists and is a stronger aesthetic
direction than v4, but it still does not close the evidence gap. The ordinary
solver cannot find the win at high budget, and even the macro graph does not
complete. Keep this as a redesign seed, not a candidate.

## Next Structural Directions

Independent reviewer suggested three non-final directions for the next round:

1. Same wall column where base uses d5 to create a later stopper, while meta uses
   d6 to open a station and then consumes that stopper.
2. Base creates a completed target state that later acts as a stopper; meta
   revisit treats that completed state as a rules object rather than merely as
   a filled target. V5 is a partial attempt in this family.
3. Shared wall changes the termination semantics of one sliding line: base must
   route an over-travel / rebound, while meta d6 changes the same line into a
   short-stop fill.

Reviewer preference was direction 3, because it is least likely to collapse into
left/right mirrored target filling.

## Exploration Log Summary

- Started from a double-exchange, route-isolated family with strong target role
  exchange. It produced good hand traces but ordinary graph search exploded and
  routing / completeness evidence was poor.
- Shifted to a compact d5/d6 shared-wall reread to reduce state space and make
  the mechanism contrast more explicit.
- v4 achieved complete base evidence and A/B -> C/D route rejection, but meta
  graph remained incomplete and both flows were too short for the target brief.
- v5 increased meta depth to four pushes but failed solver discovery at high
  budget.

## Human Review Priority

This is worth human review only as a structural seed, not as an acceptance
candidate. The most valuable question is whether the d5/d6 adjacent-wall reread
core is worth a structural redesign that makes the meta half deeper and fully
verifiable.
