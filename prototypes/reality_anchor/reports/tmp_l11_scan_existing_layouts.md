# L11 Existing Layout Scan

budget: maxStates=1000000 maxDepth=120 hardLimit=1000000
files=57

interesting=38

## RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1

file=RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_layout.txt
solve=true status=found cost=18
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=26154 missing=n/a

```text
############
#......@##.#
#.....C.MM.#
#..##...GG##
#..##..G####
#.....BS...#
############
```
inputs=left left down right up right down left down down left down right up up up right down
events=walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

## RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y3x8

file=RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y3x8_layout.txt
solve=true status=found cost=18
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=26154 missing=n/a

```text
############
#......@##.#
#.....C.MM.#
#..##....G##
#..##..G####
#.....BS...#
############
```
inputs=left left down right up right down left down down left down right up up up right down
events=walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

## RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y3x9

file=RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y3x9_layout.txt
solve=true status=found cost=18
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=26154 missing=n/a

```text
############
#......@##.#
#.....C.MM.#
#..##...G.##
#..##..G####
#.....BS...#
############
```
inputs=left left down right up right down left down down left down right up up up right down
events=walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

## RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_layout.txt
solve=true status=found cost=15
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=284 missing=n/a

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
####G####
#########
```
inputs=up right up left up right down right down down up right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_lower_goal

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_lower_goal_layout.txt
solve=true status=found cost=13
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=194 missing=n/a

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
#########
#########
```
inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_top_goal

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_top_goal_layout.txt
solve=true status=found cost=10
shortestCore=false postCutCratePush=true

```text
#########
##....###
##.BS#..#
##.C.MM.#
#.@#...##
####G####
#########
```
inputs=up right up left up right down right down down
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1

## RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt
solve=true status=found cost=22
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=6331 missing=n/a

```text
###########
###########
###..######
###.CCC####
###...G####
#...G.#####
#.....BS@##
###########
```
inputs=left left left up up left left up up right down left down down left down right up up up right down
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

## RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_right_goal

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_right_goal_layout.txt
solve=true status=found cost=16
shortestCore=false postCutCratePush=true

```text
###########
###########
###..######
###.CCC####
###....####
#...G.#####
#.....BS@##
###########
```
inputs=left left left up left left left down right up up up up right down down
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk push_object:crate#1 push_object:crate#1

## RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_layout.txt
solve=true status=found cost=36
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=41639 missing=n/a

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##MG####
#.@########
###########
```
inputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down right right right down left
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1

## RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1_layout.txt
solve=true status=found cost=13
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=221 missing=n/a

```text
#########
#....G#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```
inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1_no_top_goal

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v1_no_top_goal_layout.txt
solve=true status=found cost=13
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=221 missing=n/a

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```
inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v2

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_JOIN_CUT_v2_layout.txt
solve=true status=found cost=13
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=221 missing=n/a

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```
inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v1_layout.txt
solve=true status=found cost=28
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=234377 missing=post_sticky_to_box_push_object:crate

```text
###########
###########
###@.######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```
inputs=right down left down right down right right right right down left left up up left down left left up up up right down left down right right
events=walk push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
bypassInputs=right down left down right down right right right right down left left up up left right up left down down right down left left up left up right down left left left down right right up up right right down right down left up up left left up up right down down
bypassEvents=walk push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v2

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v2_layout.txt
solve=true status=found cost=27
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=231118 missing=post_sticky_to_box_push_object:crate

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```
inputs=down left down right down right right right right down left left up up left down left left up up up right down left down right right
events=push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
bypassInputs=down left down right down right right right right down left left up up left right up left down down right down left left up left up right down left left left down right right up up right right down right down left up up left left up up right down down
bypassEvents=push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid

## RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_layout.txt
solve=true status=found cost=10
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=594 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```
inputs=down right right right up left up left left down
events=walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
bypassInputs=down right right right up left up left down right down left up up left
bypassEvents=walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

## RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_lower_goal

file=RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1_no_lower_goal_layout.txt
solve=true status=found cost=5
shortestCore=false postCutCratePush=true

```text
#########
#G.C.#..#
##@BS..M#
#...M..M#
#########
```
inputs=right right up left left
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:crate#1 push_object:crate#1

## RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_M

file=RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_M_layout.txt
solve=true status=found cost=28
shortestCore=false postCutCratePush=true

```text
###########
#....@....#
#....##...#
#...CMM#..#
#....GG#..#
#...G..#..#
#...BS....#
###########
```
inputs=left down down left down right down right right up left right up left left up left down up left down left down right right up right down
events=walk walk push_object:crate#1 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 push_object:crate#2 force_chain:n2 walk walk push_object:crate#2 walk walk push_object:crate#1 walk walk push_object:crate#1 force_chain:n3 box_to_sticky:n1 push_object:crate#1 force_chain:n3 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk push_object:crate#1

## RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N_compressed

file=RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N_compressed_layout.txt
solve=true status=found cost=22
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=215869 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
###########
#.........#
#....##...#
#...CCC#..#
#....GG#..#
#...G..#..#
#.....BS@.#
###########
```
inputs=left left left up up left left up up right down left down down left down right up up up right down
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1
bypassInputs=left left left up up left left up up right down down left down left down right up up up up up right right right right down right down down down down left left up
bypassEvents=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N

file=RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_N_layout.txt
solve=true status=found cost=22
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=215869 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
###########
#.........#
#....##...#
#...CCC#..#
#....GG#..#
#...G..#..#
#.....BS@.#
###########
```
inputs=left left left up up left left up up right down left down down left down right up up up right down
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1
bypassInputs=left left left up up left left up up right down down left down left down right up up up up up right right right right down right down down down down left left up
bypassEvents=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_O

file=RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_O_layout.txt
solve=true status=found cost=22
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=6511 missing=n/a

```text
###########
###########
###..######
###.CCC####
###..GG####
#...G.#####
#.....BS@##
###########
```
inputs=left left left up up left left up up right down left down down left down right up up up right down
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

## RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_P

file=RA_CURR_L11_BAR_CARRY_CUT_TEMPLATE_P_layout.txt
solve=true status=found cost=22
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=6331 missing=n/a

```text
###########
###########
###..######
###.CCC####
###...G####
#...G.#####
#.....BS@##
###########
```
inputs=left left left up up left left up up right down left down down left down right up up up right down
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk push_object:crate#1

## RA_CURR_L11_CARRY_CUT_TEMPLATE_H

file=RA_CURR_L11_CARRY_CUT_TEMPLATE_H_layout.txt
solve=true status=found cost=38
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=218103 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##M..G.#
#.@########
###########
```
inputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down down right down right right up left
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk push_object:crate#1
bypassInputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down down right down right left up up up left left left down left down down down right up up up left up right right right down down right down right right up left
bypassEvents=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:sticky#2 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_L11_CARRY_CUT_TEMPLATE_I

file=RA_CURR_L11_CARRY_CUT_TEMPLATE_I_layout.txt
solve=true status=found cost=36
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=233840 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##MG...#
#.@########
###########
```
inputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down right right right down left
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1
bypassInputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down down right down right left up up up left left left down left down down down right up up up left up right right right down right right right down left right right down left
bypassEvents=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:sticky#2 move_sticky_rigid

## RA_CURR_L11_CARRY_CUT_TEMPLATE_J

file=RA_CURR_L11_CARRY_CUT_TEMPLATE_J_layout.txt
solve=true status=found cost=36
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=41639 missing=n/a

```text
###########
#.........#
#.........#
#..#......#
#.B#.G.C..#
#.S##MG####
#.@########
###########
```
inputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down right right right down left
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk walk push_object:crate#1

## RA_CURR_L11_CORRIDOR_CARRY_CUT_TEMPLATE_K

file=RA_CURR_L11_CORRIDOR_CARRY_CUT_TEMPLATE_K_layout.txt
solve=true status=found cost=38
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=247598 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
############
#..........#
#..........#
#..#.......#
#.B#.G.C...#
#.S##M..G###
#.@#########
############
```
inputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down down right down right right up left
events=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk push_object:crate#1
bypassInputs=up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down down right down right left up up up left left left down left down down down right up up up left up right right right down down right down right right up left
bypassEvents=push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:sticky#2 move_sticky_rigid push_object:sticky#2 move_sticky_rigid sticky_merge:n1 walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk walk walk push_object:sticky#2 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_L11_SPLIT_TEMPLATE_A

file=RA_CURR_L11_SPLIT_TEMPLATE_A_layout.txt
solve=true status=found cost=10
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=576 missing=sticky_merge,move_sticky_rigid

```text
#########
#..BS...#
#.@C.MG#.
#...M#.#.
#...MMG#.
#########
```
inputs=up right left down right right left down down right
events=walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
bypassInputs=up right right down right left left down down right
bypassEvents=walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#2 box_to_sticky:n1 walk push_object:crate#1 walk walk push_object:crate#3 force_chain:n2 box_to_sticky:n1

## RA_CURR_L11_SPLIT_TEMPLATE_B

file=RA_CURR_L11_SPLIT_TEMPLATE_B_layout.txt
solve=true status=found cost=11
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=1201 missing=sticky_merge,move_sticky_rigid

```text
##########
#.#.BS...#
#.@C..MG.#
#....M#..#
#....MMG.#
##########
```
inputs=right up right left down right right left down down right
events=push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1
bypassInputs=right up right right down right left left down down right
bypassEvents=push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#2 box_to_sticky:n1 walk push_object:crate#1 walk walk push_object:crate#3 force_chain:n2 box_to_sticky:n1

## RA_CURR_L11_SPLIT_TEMPLATE_D

file=RA_CURR_L11_SPLIT_TEMPLATE_D_layout.txt
solve=true status=found cost=9
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=860 missing=n/a

```text
#########
#.#.BS.##
#.@C.MG##
#....M###
#....MMG#
#########
```
inputs=right up right left down right down down right
events=push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n3 walk walk push_object:crate#1 force_chain:n2 box_to_sticky:n1 walk walk push_object:crate#3 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

## RA_CURR_L11_SPLIT_TEMPLATE_F

file=RA_CURR_L11_SPLIT_TEMPLATE_F_layout.txt
solve=true status=found cost=11
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=1814 missing=n/a

```text
##########
#.#.BS.###
#.@C..MG##
#....M#.##
#....MMG##
##########
```
inputs=right up right left down right right left down down right
events=push_object:crate#1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk walk push_object:crate#1 push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:crate#2 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1

## RA_CURR_L11_app_scratchA

file=RA_CURR_L11_app_scratchA_layout.txt
solve=true status=found cost=15
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=3024 missing=sticky_merge,sticky_to_box,post_sticky_to_box_push_object:crate

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#...G...#
#########
```
inputs=up right up left up right down right down down up right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#2 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
bypassInputs=down right right up up right left up left left down right up right down down right right up
bypassEvents=walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

## RA_CURR_L11_app_scratchB

file=RA_CURR_L11_app_scratchB_layout.txt
solve=true status=found cost=15
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=3253 missing=sticky_merge,sticky_to_box,post_sticky_to_box_push_object:crate

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#.@#....#
#...G...#
#########
```
inputs=up right up left up right down right down down up right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid
bypassInputs=down right right up up right left up left left down right up right down down right right up
bypassEvents=walk walk walk walk walk push_object:sticky#1 move_sticky_rigid walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk walk push_object:crate#1 box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#2 move_sticky_rigid

## RA_CURR_L11_app_scratchC

file=RA_CURR_L11_app_scratchC_layout.txt
solve=true status=found cost=15
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=284 missing=n/a

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
####G####
#########
```
inputs=up right up left up right down right down down up right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1 walk push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_L11_app_scratchC_no_lower_goal

file=RA_CURR_L11_app_scratchC_no_lower_goal_layout.txt
solve=true status=found cost=13
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=194 missing=n/a

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
#########
#########
```
inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## RA_CURR_L11_app_scratchC_no_top_goal

file=RA_CURR_L11_app_scratchC_no_top_goal_layout.txt
solve=true status=found cost=10
shortestCore=false postCutCratePush=true

```text
#########
##....###
##.BS#..#
##.C.MM.#
#.@#...##
####G####
#########
```
inputs=up right up left up right down right down down
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:crate#1

## RA_CURR_L11_hit1

file=RA_CURR_L11_hit1_layout.txt
solve=true status=found cost=10
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=594 missing=push_object:crate,post_sticky_to_box_push_object:crate

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```
inputs=down right right right up left up left left down
events=walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:crate#1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
bypassInputs=down right right right up left up left down right down left up up left
bypassEvents=walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1

## RA_CURR_L11_hit2

file=RA_CURR_L11_hit2_layout.txt
solve=true status=found cost=9
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=85 missing=n/a

```text
#########
#.#.BS.M#
##C..M..#
#.@.GM.##
#########
```
inputs=right up up right down right right down left
events=walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#2 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk push_object:crate#2

## RA_CURR_L11_hit3

file=RA_CURR_L11_hit3_layout.txt
solve=true status=found cost=13
shortestCore=true postCutCratePush=true
hardBypass=false status=complete explored=221 missing=n/a

```text
#########
#....G#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```
inputs=up right up left up right down right down right down right up
events=walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk push_object:crate#1 push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid

## tmp_l11_start_variant_1

file=tmp_l11_start_variant_1_layout.txt
solve=true status=found cost=27
shortestCore=true postCutCratePush=true
hardBypass=true status=found explored=231118 missing=post_sticky_to_box_push_object:crate

```text
###########
###########
###.@######
###.CCC####
###...G####
#...G....##
#.....BS.##
###########
```
inputs=down left down right down right right right right down left left up up left down left left up up up right down left down right right
events=push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk walk walk walk walk walk push_object:crate#1 force_chain:n2 walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
bypassInputs=down left down right down right right right right down left left up up left right up left down down right down left left up left up right down left left left down right right up up right right down right down left up up left left up up right down down
bypassEvents=push_object:crate#1 walk walk push_object:crate#3 walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n2 walk walk push_object:sticky#1 force_chain:n2 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 walk walk walk walk walk walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
