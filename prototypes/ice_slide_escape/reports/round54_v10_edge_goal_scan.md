# round54 v10 edge-goal scan

- layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal_layout.txt
- declared: {"A":[0,6],"B":[7,0],"C":[10,0],"D":[0,10]}
- start_validity: {"A":{"valid":true},"B":{"valid":true},"C":{"valid":true},"D":{"valid":true}}
- scanned_edge_goals: 48
- hit_counts: {"target_pair":2,"ignored_internal_reverse":1}
- risky_pairs: 0
- ignored_internal_reverse_pairs: 1

## Risky Pairs

- none

## Ignored Internal Reverse Pairs

- C 10,0 -> B cost=21 events=push_ice,ice_pass_through_d5:len2,slide_restart_after_group,ice_stop_short:d2,ice_blocks_ice_no_chain_push,ice_rebound_d4 classification=ignored_internal_reverse verdict_effect=none

## Target Pairs Found

- A 0,6 -> B cost=19 events=push_ice,ice_blocks_ice_no_chain_push,ice_rebound_d4 classification=target_pair
- C 10,0 -> D cost=34 events=push_ice,ice_pass_through_d5:len2,slide_restart_after_group,ice_stop_short:d2,ice_blocks_ice_no_chain_push,ice_rebound_d4,ice_destroy_group_d6_plus:len1,ice_boundary_disappear:d1 classification=target_pair required_like=true
