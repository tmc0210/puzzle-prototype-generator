# ICE_CAND_0023_v2 edge pair scan

- Layout: prototypes/ice_slide_escape/reports/ICE_CAND_0023_v2_shared_crossbar_layout.txt
- Starts: A=[0,2], B=[0,4], C=[13,2], D=[13,4]
- Edge goals checked: 42
- Start-goal instances checked: 168
- Solved pairs: 8
- ABCD -> non-ABCD solved: 0
- A/B -> C/D solved: 0
- Exhausted unsolved checks: 0

## Solved Pairs

| Start | Goal | Cost | Events | Inputs |
| --- | --- | ---: | --- | --- |
| A [0,2] | [0,2] | 16 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right right up right right down down left left left down right up up left left |
| A [0,2] | [0,4] | 14 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right right up right right down down left left left down right left left |
| B [0,4] | [0,2] | 18 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right up up right up right right down down left left left down right up up left left |
| B [0,4] | [0,4] | 16 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right up up right up right right down down left left left down right left left |
| C [13,2] | [13,2] | 20 | push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left down down left down right down down left up up right up left right up up left right right |
| C [13,2] | [13,4] | 18 | push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left left right down down left down right down down left up up right up left right right |
| D [13,4] | [13,2] | 18 | push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left left down right down down left up up right up left right up up left right right |
| D [13,4] | [13,4] | 20 | push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left up up left right down down left down right down down left up up right up left right right |

## Gate Details

- non_selected_solved: none
- A_or_B_to_C_or_D: none
