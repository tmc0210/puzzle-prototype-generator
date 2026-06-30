# ICE_CAND_0014 v7 Trace Replay

状态：手工 trace 经 runtime replay 验证。该报告证明存在一条胜利路径，不证明无
bypass 或最短性。

```yaml
candidate_id: ICE_CAND_0014
variant: v7_temp_stopper_open_k
player_start: [0, 9]
player_goal: [14, 3]
input_count: 124
push_count: 8
runtime_replay_win: true
initial_standable_edge_cells:
  - [0, 9]
```

## Layout

```text
###############
#.GGG#......I.#
###GG.#.....I.#
##....I.......#
##.I.########.#
##.G..........#
##...########.#
##...########.#
##III########.#
@.............#
###############
```

## Input Trace

```text
RRUDRRRRRRRRRRRUUUUUUUULRDDDDLLLLLLLLLLUDRRRRRRRRRRUUULRDDDDDDDLLLLLLLLLUDRRRRRRRRRUUUUUULLLLLLLLLLDDDDDDLULUUUUURRRRRRRRRRRR
```

## Key Pushes

1. B up from `[2,8]`:
   `ice_pass_through_d5:len1 -> slide_restart_after_group -> ice_stop_short:d1`

   B lands on `[2,1]`, covering the first target and creating the stopper for
   C.

2. C left from `[12,1]`:
   `ice_destroy_group_d6_plus:len1 -> slide_restart_after_group -> ice_blocks_ice_no_chain_push -> ice_stop_short:d2`

   C destroys `[5,1]`, restarts, consumes B as stopper, and lands on `[3,1]`.

3. D up from `[3,4]`:
   `ice_blocks_ice_no_chain_push -> ice_stop_short:d2`

   D uses C as stopper and lands on `[3,2]`.

4. E left from `[12,2]`:
   `ice_pass_through_d5:len1 -> slide_restart_after_group -> ice_blocks_ice_no_chain_push -> ice_stop_short:d2`

   E passes through `[6,2]`, restarts, consumes D as stopper, and lands on
   `[4,2]`.

5. F up from `[4,8]`:
   `ice_blocks_ice_no_chain_push -> ice_pass_through_d5:len1 -> slide_restart_after_group -> ice_stop_short:d1`

   F uses E as the d5 obstacle group, passes through it, and lands on `[4,1]`.

6. H left from `[6,3]`:
   `ice_rebound_d4`

   H is pushed away from the edge goal and rebounds to `[3,3]`. This is a
   temporary stopper, not a final target cover.

7. K up from `[3,8]`:
   `ice_blocks_ice_no_chain_push -> ice_rebound_d4`

   K uses temporary H at `[3,3]` as its obstacle and rebounds to `[3,5]`,
   covering the added target.

8. H right from `[3,3]`:
   `ice_destroy_group_d6_plus:len1 -> ice_boundary_disappear_after_group`

   The temporary stopper is sacrificed to destroy the explicit edge-goal wall
   at `[14,3]`; the player then walks to `[14,3]`.

## Evidence Boundary

```text
Runtime replay supports existence of the stated 8-push win.
Analyzer shortest-solution search exhausted at 100000 states without finding a win.
compare-starts required-event probe exhausted at 200000 states.
Therefore no-bypass, all-winning-path, and shortest-path claims remain unknown.
```
