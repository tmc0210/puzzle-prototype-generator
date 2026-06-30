# ICE_CAND_0015 v2 Trace Replay

状态：手工 trace 经 runtime replay 与 `explain-layout` 验证。该报告证明存在一条
胜利路径；强制性证据见 required-event probe。

```yaml
candidate_id: ICE_CAND_0015
variant: v2_target_eject_gated_pocket
player_start: [0, 1]
player_goal: [14, 1]
input_count: 36
push_count: 4
runtime_replay_win: true
initial_standable_edge_cells:
  - [0, 1]
  - [14, 1]
```

## Layout

```text
###############
..*G.#..I...I..
###..#.#......#
#......########
#......########
#......########
#......########
#......########
#.I....########
#......########
###############
```

## Input Trace

```text
RRRDDDDDDDDLUUUUUURRRRUURRDRRRRRULRR
```

Expanded:

```text
right right right down down down down down down down down left up up up up up up right right right right up up right right down right right right right right up left right right
```

## Key Pushes

1. Target-eject push from `[2,1]` right:
   `ice_stop_short:d2`

   The initial ice starts on the left target. The first real commitment moves it
   off that correct-looking target to `[4,1]`, where it becomes part of the
   final obstacle group.

2. Refill / stopper push from `[2,8]` up:
   `ice_pass_through_d5:len1 -> slide_restart_after_group -> ice_stop_short:d1`

   The lower ice can now pass through `[2,2]` and land on `[2,1]`, refilling
   the target and becoming the final stopper.

3. C clear from `[8,1]` right:
   `ice_blocks_ice_no_chain_push -> ice_destroyed_d3`

   C dies while A at `[12,1]` remains. This also opens the only route into the
   right-side pocket needed to stand behind A.

4. A final push from `[12,1]` left:
   `ice_destroy_group_d6_plus:len2 -> slide_restart_after_group -> ice_blocks_ice_no_chain_push -> ice_stop_short:d1`

   A destroys the wall plus the ejected target ice at `[5,1]`/`[4,1]`, restarts,
   then uses the refilled `[2,1]` ice as stopper and lands on `[3,1]`.

## Evidence Boundary

```text
Runtime / explain-layout supports the stated 36-input, 4-push win.
Complete graph: 3072 reachable states, 9583 legal transitions, 1 winning state.
Precise required-event probe found no winning path missing:
ice_stop_short:d2, ice_pass_through_d5:len1, slide_restart_after_group,
ice_destroyed_d3, ice_destroy_group_d6_plus:len2.
All-edge scan found only two standable edge starts: declared start [0,1] and
declared goal [14,1]. The goal-as-start non-target pair is solvable with a
shorter different route, so it remains an endpoint-interface caveat.
```
