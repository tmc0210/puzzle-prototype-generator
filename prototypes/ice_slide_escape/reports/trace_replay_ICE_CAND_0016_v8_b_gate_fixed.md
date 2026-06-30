# Trace Replay: ICE_CAND_0016_v8_b_gate_fixed

状态：手工设计版本经 `explain-layout` 与 `compare-starts-layout` 验证。该报告只汇总
可复核 trace；质量结论以后续 reviewer / critic 为准。

```yaml
player_start: [0, 9]
player_goal: [14, 2]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0016_scratch_v8_b_gate_fixed.txt
layout_analysis_ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0016_v8_b_gate_fixed.md
required_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_precise_required_probe.md
all_edge_probe_ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_all_edge_starts.md
```

## ASCII View

```text
###############
#.*GG#.I...I..#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.I....########
@..############
###############
```

## Known Solution

```text
right up up up up up up up up right
left down down down down down down down down right
up right right right right up up up up up up
right down left down down right up up left up up
right right down right right right right up left down right right right
```

Cost: 55 inputs. Push count: 6.

## Core Pushes

1. Step 10 `right`: initial target ice at `[2,1]` moves to `[4,1]` by
   `ice_stop_short:d2`.
2. Step 21 `up`: B at `[2,8]` uses `ice_pass_through_d5:len1` and
   `slide_restart_after_group`, then stops at `[2,1]`.
3. Step 32 `right`: D at `[7,2]` sacrifices itself with
   `ice_destroy_group_d6_plus:len1` and opens the edge goal wall at `[14,2]`.
4. Step 38 `up`: E at `[7,4]` uses C as an ice stopper and stops at `[7,2]`
   with `ice_blocks_ice_no_chain_push` and `ice_stop_short:d2`.
5. Step 43 `right`: C at `[7,1]` disappears by `ice_destroyed_d3`, preserving A.
6. Step 51 `left`: A at `[11,1]` uses `ice_pass_through_d5:len2` through the
   wall plus the old target ice, restarts, then stops against B at `[2,1]`.

Final target coverage is `[2,1]`, `[3,1]`, `[4,1]`, and `[7,2]`, with the
player on `[14,2]`.

## Evidence Boundary

- `layout_analysis` found the 55-input solution and snapshots, but its default
  graph budget was exhausted at 100000 states.
- `start_comparison_ICE_CAND_0016_v8_precise_required_probe` reran with
  `--max-states 300000 --graph-max-states 300000`; graph status was complete,
  with 112043 reachable states and 1 winning state.
- The required-event probe found no complete-search winning path missing any
  declared core event family.
- The all-edge start probe found only the declared start `[0,9]` as a passing
  edge-start instance for goal `[14,2]`.
