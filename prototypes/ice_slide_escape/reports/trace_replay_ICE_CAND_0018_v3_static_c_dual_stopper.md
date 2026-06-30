# Trace Replay: ICE_CAND_0018_v3_static_c_dual_stopper

状态：`explain-layout`、required probe、all-edge start probe 均完整通过。该报告只
汇总可复核 trace；质量结论以后续 reviewer / critic 为准。

```yaml
player_start: [0, 9]
player_goal: [15, 2]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0018_scratch_v3_static_c_dual_stopper.txt
layout_analysis_ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0018_v3_static_c_dual_stopper.md
required_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_precise_required_probe.md
all_edge_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_all_edge_starts.md
```

## ASCII View

```text
################
#.GG.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###..########
#..###.#########
#.I....#########
@..#############
################
```

## Known Solution

```text
right right up
right right right right up up right up
up left up up right
left down down right up
right up right right right right right right up
left down right right
```

Cost: 34 inputs. Push count: 5.

## Core Pushes

1. Step 3 `up`: B at `[2,8]` uses `ice_pass_through_d5:len1` and
   `slide_restart_after_group`, then stops at `[2,1]`.
2. Step 11 `up`: E at `[7,5]` is pre-positioned to `[7,3]` by using D at
   `[7,2]` as the temporary stopper.
3. Step 16 `right`: D at `[7,2]` sacrifices itself with
   `ice_destroy_group_d6_plus:len1` and opens the edge goal wall at `[15,2]`.
4. Step 21 `up`: E at `[7,3]` now uses C at `[7,1]` as the second stopper and
   lands on target `[7,2]`.
5. Step 31 `left`: A at `[13,1]` uses `ice_pass_through_d5:len3` through
   C + two walls, restarts, then stops against B at `[2,1]` and lands on
   target `[3,1]`.

C at `[7,1]` is never pushed. It is deliberately preserved because it is both
E's second stopper and final A's d5 first obstacle. D is likewise not just a
goal opener: it is E's first stopper before it is sacrificed.

## Evidence Boundary

- `layout_analysis` completed at the default budget: 6962 reachable states and
  1 winning state.
- `start_comparison_ICE_CAND_0018_v3_precise_required_probe` found no complete
  search winning path missing any declared required event family.
- `start_comparison_ICE_CAND_0018_v3_all_edge_starts` found only `[0,9]` as an
  initial standable edge start for goal `[15,2]`.
- Required-event evidence proves event-family necessity, not object-level
  all-winning-path uniqueness.
