# ICE_CAND_0023_v4 edge pair scan

- Method: per-start complete reachable-graph enumeration; records exact edge player cells after all targets are occupied.
- Layout: prototypes/ice_slide_escape/reports/ICE_CAND_0023_v4_shared_rebound_crossbar_layout.txt
- Starts: A=[0,2], B=[0,4], C=[13,2], D=[13,4]
- Edge goals in board: 44
- Start-goal instances represented: 176
- Solved pairs: 8
- ABCD -> non-ABCD solved: 0
- A/B -> C/D solved: 0
- Exhausted start graphs: none

## Start Graphs

| Start | Status | States | Legal transitions | Event-only illegal | Solved edge goals |
| --- | --- | ---: | ---: | ---: | --- |
| A [0,2] | complete | 173931 | 531445 | 24578 | [0,2], [0,4] |
| B [0,4] | complete | 173931 | 531445 | 24578 | [0,2], [0,4] |
| C [13,2] | complete | 260 | 560 | 24 | [13,2], [13,4] |
| D [13,4] | complete | 260 | 560 | 24 | [13,2], [13,4] |

## Solved Pairs

| Start | Goal | Cost | Events | Inputs |
| --- | --- | ---: | --- | --- |
| A [0,2] | [0,2] | 22 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right right down right down down down down down right up up up left left left up right up up left left |
| A [0,2] | [0,4] | 20 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right right down right down down down down down right up up up left left left up right left left |
| B [0,4] | [0,2] | 22 | push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right down down down down right right right up up up left left left up right up left up right left left |
| B [0,4] | [0,4] | 22 | push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 | right up up right down right down down down down down right up up up left left left up right left left |
| C [13,2] | [13,2] | 20 | push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left down down left down right down down left up up right up left right up up left right right |
| C [13,2] | [13,4] | 18 | push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left left right down down left down right down down left up up right up left right right |
| D [13,4] | [13,2] | 18 | push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left left down right down down left up up right up left right up up left right right |
| D [13,4] | [13,4] | 20 | push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 push_ice ice_stop_short:d2 push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 | left up up left right down down left down right down down left up up right up left right right |

## Gate Details

- non_selected_solved: none
- A_or_B_to_C_or_D: none
