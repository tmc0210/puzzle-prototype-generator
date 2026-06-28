# Level Specs V2: pull_portal_fallback

## Summary

- Status: draft
- Specs: 19 / 19
- Curriculum goals covered: 19 / 19
- Uncovered goals: 0
- Blocked specs: 0

## Role Counts

- challenge: 1
- combination: 1
- discovery: 4
- guided_application: 8
- independent_application: 1
- variation_transfer: 4

## Objective Counts

- challenge: 1
- combination: 1
- guided_application: 8
- independent_application: 1
- isolate_target: 4
- variation_transfer: 4

## Graph Scope Counts

- bounded_full_graph_preferred: 10
- full_graph_required: 9

## Specs

| Spec | Role | Objective | Focus Targets | Introduces | Practices | Assesses | Graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| LS01_pull_discovery | discovery | isolate_target | fact:F_pull_single_crate | F_pull_single_crate | none | F_pull_single_crate | full_graph_required |
| LS02_reposition_crate | guided_application | guided_application | ability:A_reposition_crate_by_pulling, constraint:C_pull_requires_crate_behind_player, constraint:C_pull_requires_free_destination | C_pull_requires_crate_behind_player, C_pull_requires_free_destination, A_reposition_crate_by_pulling | F_pull_single_crate | A_reposition_crate_by_pulling | full_graph_required |
| LS03_clear_choke | guided_application | guided_application | ability:A_clear_choke_by_pulling_crate | A_clear_choke_by_pulling_crate | A_reposition_crate_by_pulling, C_cannot_push_crate | A_clear_choke_by_pulling_crate | full_graph_required |
| LS04_clear_choke_pattern | variation_transfer | variation_transfer | pattern:P_clear_choke_by_pulling_blocker | P_clear_choke_by_pulling_blocker | A_clear_choke_by_pulling_crate | P_clear_choke_by_pulling_blocker | full_graph_required |
| LS05_portal_pair | discovery | isolate_target | fact:F_portals_are_paired, constraint:C_portal_occupies_cell_and_blocks_walking | F_portals_are_paired, C_portal_occupies_cell_and_blocks_walking | none | F_portals_are_paired | full_graph_required |
| LS06_normal_teleport | discovery | isolate_target | fact:F_portal_teleports_player_to_directional_exit | F_portal_teleports_player_to_directional_exit | F_portals_are_paired | F_portal_teleports_player_to_directional_exit | full_graph_required |
| LS07_sealed_region_transport | guided_application | guided_application | ability:A_use_portal_to_enter_sealed_region | A_use_portal_to_enter_sealed_region | F_portal_teleports_player_to_directional_exit | A_use_portal_to_enter_sealed_region | full_graph_required |
| LS08_sealed_region_pattern | variation_transfer | variation_transfer | pattern:P_sealed_region_requires_portal_transport | P_sealed_region_requires_portal_transport | A_use_portal_to_enter_sealed_region | P_sealed_region_requires_portal_transport | full_graph_required |
| LS10_blocked_exit_pushes_entrance | discovery | isolate_target | interaction:I_blocked_exit_stops_normal_teleport, interaction:I_blocked_exit_pushes_entrance_portal, constraint:C_fallback_push_requires_free_portal_destination | I_blocked_exit_stops_normal_teleport, C_fallback_push_requires_free_portal_destination, I_blocked_exit_pushes_entrance_portal | F_portal_teleports_player_to_directional_exit | I_blocked_exit_pushes_entrance_portal | bounded_full_graph_preferred |
| LS11_trigger_fallback | guided_application | guided_application | ability:A_trigger_blocked_portal_fallback | A_trigger_blocked_portal_fallback | I_blocked_exit_pushes_entrance_portal | A_trigger_blocked_portal_fallback | bounded_full_graph_preferred |
| LS12_construct_blocked_exit | guided_application | guided_application | ability:A_create_blocked_portal_exit_with_crate, constraint:C_crate_blocks_portal_exit | C_crate_blocks_portal_exit, A_create_blocked_portal_exit_with_crate | A_reposition_crate_by_pulling, A_trigger_blocked_portal_fallback | A_create_blocked_portal_exit_with_crate | bounded_full_graph_preferred |
| LS13_remote_blocker_controls_entry | guided_application | guided_application | interaction:I_portal_exit_blocker_controls_entry_behavior | I_portal_exit_blocker_controls_entry_behavior | C_crate_blocks_portal_exit, I_blocked_exit_pushes_entrance_portal | I_portal_exit_blocker_controls_entry_behavior | bounded_full_graph_preferred |
| LS14_remote_blocker_pattern | variation_transfer | variation_transfer | pattern:P_remote_blocker_changes_portal_behavior | P_remote_blocker_changes_portal_behavior | A_trigger_blocked_portal_fallback | P_remote_blocker_changes_portal_behavior | bounded_full_graph_preferred |
| LS15_construct_then_exploit | combination | combination | pattern:P_construct_trigger_then_exploit | P_construct_trigger_then_exploit | A_create_blocked_portal_exit_with_crate, A_trigger_blocked_portal_fallback | P_construct_trigger_then_exploit | bounded_full_graph_preferred |
| LS16_portal_as_key | independent_application | independent_application | pattern:P_portal_as_movable_door_or_key | P_portal_as_movable_door_or_key | A_trigger_blocked_portal_fallback | P_portal_as_movable_door_or_key | bounded_full_graph_preferred |
| LS17_repeated_portal_push | guided_application | guided_application | ability:A_repeat_fallback_push_to_move_portal | A_repeat_fallback_push_to_move_portal | A_trigger_blocked_portal_fallback | A_repeat_fallback_push_to_move_portal | bounded_full_graph_preferred |
| LS18_repeated_push_corridor | variation_transfer | variation_transfer | pattern:P_repeated_portal_push_corridor | P_repeated_portal_push_corridor | A_repeat_fallback_push_to_move_portal | P_repeated_portal_push_corridor | bounded_full_graph_preferred |
| LS19_fallback_failure_prediction | guided_application | guided_application | ability:A_predict_and_use_fallback_failure, constraint:C_blocked_portal_push_can_fail | C_blocked_portal_push_can_fail, A_predict_and_use_fallback_failure | I_blocked_exit_pushes_entrance_portal | A_predict_and_use_fallback_failure | full_graph_required |
| LS20_push_until_jam | challenge | challenge | pattern:P_push_until_jam_boundary | P_push_until_jam_boundary | A_repeat_fallback_push_to_move_portal, A_predict_and_use_fallback_failure | P_push_until_jam_boundary | bounded_full_graph_preferred |

## Evidence Summary

| Spec | Solver Evidence | LLM Player Evidence | Event Requirements | Object Participation |
| --- | --- | --- | --- | --- |
| LS01_pull_discovery | solvable, player_win_standard, returned_solution_covers_target_events | forms_target_hypothesis, uses_target_hypothesis_to_finish | winning_solution.required=pull_crate | none |
| LS02_reposition_crate | solvable, player_win_standard, returned_solution_covers_target_events | applies_known_target_without_relearning, forms_subgoal_chain | winning_solution.required=pull_crate | winning_solution.object=crate role=moved min=1 event=pull_crate |
| LS03_clear_choke | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, forms_subgoal_chain | all_winning_paths.required=pull_crate | none |
| LS04_clear_choke_pattern | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, applies_known_target_without_relearning | all_winning_paths.required=pull_crate | none |
| LS05_portal_pair | solvable, player_win_standard, returned_solution_covers_target_events | forms_target_hypothesis, uses_target_hypothesis_to_finish | winning_solution.required=portal_enter+portal_teleport | none |
| LS06_normal_teleport | solvable, player_win_standard, returned_solution_covers_target_events | forms_target_hypothesis, uses_target_hypothesis_to_finish | winning_solution.required=portal_enter+portal_teleport | none |
| LS07_sealed_region_transport | solvable, player_win_standard, all_winning_paths_cover_target_events | applies_known_target_without_relearning, forms_subgoal_chain | all_winning_paths.required=portal_enter+portal_teleport | none |
| LS08_sealed_region_pattern | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, applies_known_target_without_relearning | all_winning_paths.required=portal_enter+portal_teleport | none |
| LS10_blocked_exit_pushes_entrance | solvable, player_win_standard, expected_trace_covers_target_events | forms_target_hypothesis, uses_target_hypothesis_to_finish | winning_solution.required=portal_enter+portal_exit_blocked+portal_fallback_push | none |
| LS11_trigger_fallback | solvable, player_win_standard, returned_solution_covers_target_events | applies_known_target_without_relearning, forms_subgoal_chain | winning_solution.required=portal_exit_blocked+portal_fallback_push | none |
| LS12_construct_blocked_exit | solvable, player_win_standard, all_winning_paths_cover_target_events | forms_subgoal_chain, applies_known_target_without_relearning | all_winning_paths.required=pull_crate+portal_exit_blocked+portal_fallback_push | none |
| LS13_remote_blocker_controls_entry | solvable, player_win_standard, all_winning_paths_cover_target_events | forms_subgoal_chain, identifies_bottleneck | all_winning_paths.required=pull_crate+portal_exit_blocked+portal_fallback_push | none |
| LS14_remote_blocker_pattern | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, applies_known_target_without_relearning | all_winning_paths.required=portal_exit_blocked+portal_fallback_push | none |
| LS15_construct_then_exploit | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, forms_subgoal_chain | all_winning_paths.required=pull_crate+portal_exit_blocked+portal_fallback_push | none |
| LS16_portal_as_key | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, forms_subgoal_chain | all_winning_paths.required=portal_fallback_push | none |
| LS17_repeated_portal_push | solvable, player_win_standard, returned_solution_covers_target_events | forms_subgoal_chain, applies_known_target_without_relearning | winning_solution.required=portal_fallback_push | none |
| LS18_repeated_push_corridor | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, forms_subgoal_chain | all_winning_paths.required=portal_fallback_push | none |
| LS19_fallback_failure_prediction | solvable, player_win_standard, expected_trace_covers_target_events | observes_old_model_failure, revises_rule_model, applies_known_target_without_relearning | probe_trace.required=portal_exit_blocked+portal_fallback_failed | none |
| LS20_push_until_jam | solvable, player_win_standard, all_winning_paths_cover_target_events | identifies_bottleneck, forms_subgoal_chain | all_winning_paths.required=portal_fallback_push; probe_trace.required=portal_fallback_failed | none |

## Coverage Gaps

- Uncovered curriculum goals: none
- Blocked specs: none

