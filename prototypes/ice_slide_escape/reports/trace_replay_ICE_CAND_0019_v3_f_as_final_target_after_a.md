# Trace Replay: ICE_CAND_0019_v3_f_as_final_target_after_a

状态：`explain-layout`、required probe、all-edge start probe 均完整通过；另有
坐标事实探针补充检查 F/A/E/C 的时序 claim。该报告只汇总可复核 trace；质量
结论以后续 reviewer / critic 为准。

```yaml
player_start: [0, 9]
player_goal: [15, 3]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0019_scratch_v3_f_as_final_target_after_a.txt
layout_analysis_ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v3_f_as_final_target_after_a.md
required_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v3_precise_required_probe.md
all_edge_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v3_all_edge_starts.md
object_fact_probe_ref: prototypes/ice_slide_escape/reports/object_fact_probe_ICE_CAND_0019_v3_f_as_final_target_after_a.md
```

## ASCII View

```text
################
#...GGGI.....I.#
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
   `slide_restart_after_group`, then stops at `[4,1]`. This fills the first
   top target and becomes A's later stopper.
2. Step 10 `up`: E at `[7,6]` is pre-positioned to `[7,4]` by using D at
   `[7,3]` as a temporary stopper. E is not a target refill here; it is a
   delayed stopper for C.
3. Step 15 `right`: D at `[7,3]` sacrifices itself with
   `ice_destroy_group_d6_plus:len1`, opening the edge goal wall at `[15,3]`
   and vacating the `[7,3]` target.
4. Step 25 `left`: A at `[13,1]` uses the preserved F at `[7,1]` as the d5
   obstacle, restarts, then stops against B at `[4,1]` and lands on target
   `[5,1]`.
5. Step 31 `left`: F, after serving as A's d5 obstacle, moves from `[7,1]`
   to `[6,1]`, filling the third top target and clearing the square above C.
6. Step 32 `down`: C at `[7,2]` moves down to `[7,3]`, using the pre-positioned
   E at `[7,4]` as stopper and refilling the target vacated by D.

The central timing is F: if F is used too early as an apparent top-door move,
the `[6,1]` target and A's d5 setup cannot both be satisfied. If F is never
moved after A consumes it, C cannot be pushed down. E's early move is also
deferred in meaning: it waits at `[7,4]` until C needs a final stopper.

## Evidence Boundary

- `layout_analysis` completed at the default budget: 50528 reachable states,
  140744 legal transitions, and 1 winning state.
- `start_comparison_ICE_CAND_0019_v3_precise_required_probe` found no complete
  search winning path missing the declared required event families.
- `start_comparison_ICE_CAND_0019_v3_all_edge_starts` found only `[0,9]` as an
  initial standable edge start for goal `[15,3]`.
- `object_fact_probe_ICE_CAND_0019_v3_f_as_final_target_after_a` found no
  complete-search winning path missing any of the declared coordinate facts.
- Required-event evidence proves event-family necessity. The object-fact probe
  is stronger than event-only evidence, but still uses coordinate facts rather
  than engine-level persistent ice identities.
