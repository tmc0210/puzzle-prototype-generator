# round54 v5 edge-goal scan

- scanned_edge_goals: 46
- hit_counts: {"risky_internal_non_target":2,"target_pair":2,"ignored_internal_reverse":1}
- risky_pairs: 2
- ignored_internal_reverse_pairs: 1

## Risky Pairs

- A 0,6 -> C cost=19 events=push_ice,ice_blocks_ice_no_chain_push,ice_rebound_d4,ice_boundary_disappear:d1 classification=risky_internal_non_target
- B 6,12 -> C cost=13 events=push_ice,ice_boundary_disappear:d1 classification=risky_internal_non_target

## Ignored Internal Reverse Pairs

- C 7,0 -> B cost=13 events=push_ice,ice_destroy_group_d6_plus:len1,slide_restart_after_group,ice_stop_short:d2 verdict_effect=none

## Target Pairs Found

- A 0,6 -> B cost=20 events=push_ice,ice_blocks_ice_no_chain_push,ice_rebound_d4
- C 7,0 -> D cost=33 events=push_ice,ice_destroy_group_d6_plus:len1,slide_restart_after_group,ice_stop_short:d2,ice_blocks_ice_no_chain_push,ice_rebound_d4,ice_boundary_disappear_after_group
