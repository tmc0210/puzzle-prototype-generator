# Trace Replay: ICE_CAND_0019_v2_false_top_door_lower_route

状态：`explain-layout`、required probe、all-edge start probe 均完整通过。该报告只
汇总可复核 trace；质量结论以后续 reviewer / critic 为准。

```yaml
player_start: [0, 9]
player_goal: [15, 3]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_v2_false_top_door_lower_route.txt
layout_analysis_ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v2_false_top_door_lower_route.md
required_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v2_precise_required_probe.md
all_edge_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v2_all_edge_starts.md
```

## ASCII View

```text
################
#...GG.I.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
@.......########
################
```

## Known Solution

```text
right right right right up
up right right right up
up left up up right
right right right right right right right up up
left left left left left left left down
up right right right right right right right down down right
```

Cost: 43 inputs. Push count: 6.

## Core Pushes

1. Step 5 `up`: B at `[4,8]` uses `ice_pass_through_d5:len1` and
   `slide_restart_after_group`, then stops at `[4,1]`. This fills the left
   top target and becomes A's later stopper.
2. Step 10 `up`: E at `[7,6]` is pre-positioned to `[7,4]` by using D at
   `[7,3]` as a temporary stopper. E is not the target refill; it becomes C's
   later stopper.
3. Step 15 `right`: D at `[7,3]` sacrifices itself with
   `ice_destroy_group_d6_plus:len1`, opening the edge goal wall at `[15,3]`
   and vacating the `[7,3]` target.
4. Step 25 `left`: A at `[13,1]` uses the preserved F at `[7,1]` as the d5
   obstacle, restarts, then stops against B at `[4,1]` and lands on target
   `[5,1]`.
5. Step 31 `left`: F, after serving as A's d5 obstacle, moves from `[7,1]`
   to `[6,1]`. This clears the square above C rather than serving as a final
   target filler.
6. Step 32 `down`: C at `[7,2]` moves down to `[7,3]`, using the pre-positioned
   E at `[7,4]` as stopper and refilling the target vacated by D.

The central timing is F: pushing it early as a top-door convenience destroys
the later A d5 setup, but leaving it forever blocks C's final downward push.
F must therefore be preserved through A, then moved only after A has consumed
it as an obstacle. E's early move is also deferred in meaning: it is placed not
to cover the target, but to become C's stopper after D has been sacrificed.

## Evidence Boundary

- `layout_analysis` completed at the default budget: 50528 reachable states,
  140744 legal transitions, and 7 winning states.
- `start_comparison_ICE_CAND_0019_v2_precise_required_probe` found no complete
  search winning path missing the declared required event families.
- `start_comparison_ICE_CAND_0019_v2_all_edge_starts` found only `[0,9]` as an
  initial standable edge start for goal `[15,3]`.
- Required-event evidence proves event-family necessity, not object-level
  all-winning-path uniqueness. Object names B/C/D/E/F/A are trace labels.
