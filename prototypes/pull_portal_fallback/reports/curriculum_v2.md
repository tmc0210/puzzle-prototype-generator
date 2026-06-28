# Curriculum V2: pull_portal_fallback

## Summary

- Status: draft
- Target level count: 19
- Formal curriculum targets: 19
- Planned learning goals: 19
- Planned formal coverage: 19 / 19
- Hard prerequisite edges: 32
- Topological layers: 6
- Unresolved layer targets: 0

## Target Counts

| Kind | Formal Targets | Planned Goals |
| --- | ---: | ---: |
| fact | 3 | 3 |
| constraint | 0 | 0 |
| interaction | 2 | 2 |
| ability | 7 | 7 |
| pattern | 7 | 7 |

## Candidate Targets Excluded

- ability:A_choose_entry_direction_to_control_portal_exit
- pattern:P_directional_portal_exit_routing

## Non-Curricular Targets

- Assumed rules: F_player_reaches_goal_to_win, C_cannot_push_crate
- Embedded boundaries: C_pull_requires_crate_behind_player, C_pull_requires_free_destination, C_portal_occupies_cell_and_blocks_walking, C_crate_blocks_portal_exit, C_wall_blocks_portal_exit, I_blocked_exit_stops_normal_teleport, C_fallback_push_requires_free_portal_destination, C_blocked_portal_push_can_fail
- Generator guardrails: none

## Open Questions

- What happens if a portal is pushed into another portal?
- What happens to a crate being pulled when the player enters a portal?
- Are portal exits always direction-relative to the entry direction?

## Hard Target DAG

| From | To | To Kind |
| --- | --- | --- |
| A_reposition_crate_by_pulling | A_clear_choke_by_pulling_crate | ability |
| C_cannot_push_crate | A_clear_choke_by_pulling_crate | ability |
| A_reposition_crate_by_pulling | A_create_blocked_portal_exit_with_crate | ability |
| C_crate_blocks_portal_exit | A_create_blocked_portal_exit_with_crate | ability |
| F_portals_are_paired | A_create_blocked_portal_exit_with_crate | ability |
| C_blocked_portal_push_can_fail | A_predict_and_use_fallback_failure | ability |
| I_blocked_exit_pushes_entrance_portal | A_predict_and_use_fallback_failure | ability |
| A_trigger_blocked_portal_fallback | A_repeat_fallback_push_to_move_portal | ability |
| C_fallback_push_requires_free_portal_destination | A_repeat_fallback_push_to_move_portal | ability |
| C_pull_requires_crate_behind_player | A_reposition_crate_by_pulling | ability |
| C_pull_requires_free_destination | A_reposition_crate_by_pulling | ability |
| F_pull_single_crate | A_reposition_crate_by_pulling | ability |
| C_fallback_push_requires_free_portal_destination | A_trigger_blocked_portal_fallback | ability |
| I_blocked_exit_pushes_entrance_portal | A_trigger_blocked_portal_fallback | ability |
| F_portal_teleports_player_to_directional_exit | A_use_portal_to_enter_sealed_region | ability |
| F_portals_are_paired | A_use_portal_to_enter_sealed_region | ability |
| F_portals_are_paired | F_portal_teleports_player_to_directional_exit | fact |
| C_fallback_push_requires_free_portal_destination | I_blocked_exit_pushes_entrance_portal | interaction |
| F_portal_teleports_player_to_directional_exit | I_blocked_exit_pushes_entrance_portal | interaction |
| I_blocked_exit_stops_normal_teleport | I_blocked_exit_pushes_entrance_portal | interaction |
| C_crate_blocks_portal_exit | I_portal_exit_blocker_controls_entry_behavior | interaction |
| I_blocked_exit_pushes_entrance_portal | I_portal_exit_blocker_controls_entry_behavior | interaction |
| I_blocked_exit_stops_normal_teleport | I_portal_exit_blocker_controls_entry_behavior | interaction |
| A_clear_choke_by_pulling_crate | P_clear_choke_by_pulling_blocker | pattern |
| A_create_blocked_portal_exit_with_crate | P_construct_trigger_then_exploit | pattern |
| A_trigger_blocked_portal_fallback | P_construct_trigger_then_exploit | pattern |
| A_trigger_blocked_portal_fallback | P_portal_as_movable_door_or_key | pattern |
| A_predict_and_use_fallback_failure | P_push_until_jam_boundary | pattern |
| A_repeat_fallback_push_to_move_portal | P_push_until_jam_boundary | pattern |
| A_trigger_blocked_portal_fallback | P_remote_blocker_changes_portal_behavior | pattern |
| A_repeat_fallback_push_to_move_portal | P_repeated_portal_push_corridor | pattern |
| A_use_portal_to_enter_sealed_region | P_sealed_region_requires_portal_transport | pattern |

## Topological Layers

- L0: F_portals_are_paired, F_pull_single_crate
- L1: A_reposition_crate_by_pulling, F_portal_teleports_player_to_directional_exit
- L2: A_clear_choke_by_pulling_crate, A_create_blocked_portal_exit_with_crate, A_use_portal_to_enter_sealed_region, I_blocked_exit_pushes_entrance_portal
- L3: A_predict_and_use_fallback_failure, A_trigger_blocked_portal_fallback, I_portal_exit_blocker_controls_entry_behavior, P_clear_choke_by_pulling_blocker, P_sealed_region_requires_portal_transport
- L4: A_repeat_fallback_push_to_move_portal, P_construct_trigger_then_exploit, P_portal_as_movable_door_or_key, P_remote_blocker_changes_portal_behavior
- L5: P_push_until_jam_boundary, P_repeated_portal_push_corridor

## Curriculum Goals

| Unit | Goal | Target | Roles | Support | Hard Prerequisites | Blocked |
| --- | --- | --- | --- | --- | --- | --- |
| pull_foundations | G_pull_single_crate | fact:F_pull_single_crate | discovery, review | high | none | no |
| pull_foundations | G_reposition_crate_by_pulling | ability:A_reposition_crate_by_pulling | guided_application, independent_application | medium | F_pull_single_crate, C_pull_requires_crate_behind_player, C_pull_requires_free_destination | no |
| pull_foundations | G_clear_choke_by_pulling | ability:A_clear_choke_by_pulling_crate | guided_application, independent_application | medium | A_reposition_crate_by_pulling, C_cannot_push_crate | no |
| pull_foundations | G_clear_choke_pattern | pattern:P_clear_choke_by_pulling_blocker | variation_transfer | low | A_clear_choke_by_pulling_crate | no |
| portal_basics | G_portals_are_paired | fact:F_portals_are_paired | discovery | high | none | no |
| portal_basics | G_normal_teleport | fact:F_portal_teleports_player_to_directional_exit | discovery, guided_application | high | F_portals_are_paired | no |
| portal_basics | G_use_portal_to_enter_sealed_region | ability:A_use_portal_to_enter_sealed_region | guided_application, independent_application | medium | F_portals_are_paired, F_portal_teleports_player_to_directional_exit | no |
| portal_basics | G_sealed_region_pattern | pattern:P_sealed_region_requires_portal_transport | variation_transfer | low | A_use_portal_to_enter_sealed_region | no |
| blocked_exit | G_blocked_exit_pushes_entrance | interaction:I_blocked_exit_pushes_entrance_portal | discovery, guided_application | high | F_portal_teleports_player_to_directional_exit, I_blocked_exit_stops_normal_teleport, C_fallback_push_requires_free_portal_destination | no |
| blocked_exit | G_trigger_blocked_portal_fallback | ability:A_trigger_blocked_portal_fallback | guided_application, independent_application | medium | I_blocked_exit_pushes_entrance_portal, C_fallback_push_requires_free_portal_destination | no |
| constructed_triggers | G_create_blocked_portal_exit_with_crate | ability:A_create_blocked_portal_exit_with_crate | guided_application, independent_application | medium | A_reposition_crate_by_pulling, C_crate_blocks_portal_exit, F_portals_are_paired | no |
| constructed_triggers | G_portal_exit_blocker_controls_entry | interaction:I_portal_exit_blocker_controls_entry_behavior | guided_application, variation_transfer | medium | C_crate_blocks_portal_exit, I_blocked_exit_stops_normal_teleport, I_blocked_exit_pushes_entrance_portal | no |
| constructed_triggers | G_remote_blocker_pattern | pattern:P_remote_blocker_changes_portal_behavior | variation_transfer | low | A_trigger_blocked_portal_fallback | no |
| constructed_triggers | G_construct_trigger_then_exploit | pattern:P_construct_trigger_then_exploit | combination, challenge | low | A_create_blocked_portal_exit_with_crate, A_trigger_blocked_portal_fallback | no |
| portal_repositioning | G_portal_as_movable_door_or_key | pattern:P_portal_as_movable_door_or_key | independent_application, variation_transfer | low | A_trigger_blocked_portal_fallback | no |
| portal_repositioning | G_repeat_fallback_push_to_move_portal | ability:A_repeat_fallback_push_to_move_portal | guided_application, independent_application | medium | A_trigger_blocked_portal_fallback, C_fallback_push_requires_free_portal_destination | no |
| portal_repositioning | G_repeated_portal_push_corridor | pattern:P_repeated_portal_push_corridor | variation_transfer, combination | low | A_repeat_fallback_push_to_move_portal | no |
| portal_repositioning | G_predict_and_use_fallback_failure | ability:A_predict_and_use_fallback_failure | guided_application, independent_application | medium | I_blocked_exit_pushes_entrance_portal, C_blocked_portal_push_can_fail | no |
| portal_repositioning | G_push_until_jam_boundary | pattern:P_push_until_jam_boundary | challenge | none | A_repeat_fallback_push_to_move_portal, A_predict_and_use_fallback_failure | no |

## Coverage Gaps

- Unplanned formal targets: none
- Blocked goals: none

