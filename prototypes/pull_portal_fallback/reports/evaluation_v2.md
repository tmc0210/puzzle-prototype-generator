# Evaluation V2: pull_portal_fallback

## Summary

- Status: pending
- Specs: 19
- Candidate bindings: 7
- Metric pass: 111
- Metric fail: 0
- Metric unknown: 62

## Spec Gate Summary

| Spec | Role | Status | Static Failures | Pending Runtime Metrics | Event Requirements | Object Participation |
| --- | --- | --- | ---: | ---: | --- | --- |
| LS01_pull_discovery | discovery | pass | 0 | 0 | winning_solution: required=[pull_crate] | none |
| LS02_reposition_crate | guided_application | pass | 0 | 0 | winning_solution: required=[pull_crate] | winning_solution: object=crate role=moved min_distinct=1 event_type=pull_crate |
| LS03_clear_choke | guided_application | pending | 0 | 5 | all_winning_paths: required=[pull_crate] | none |
| LS04_clear_choke_pattern | variation_transfer | pending | 0 | 5 | all_winning_paths: required=[pull_crate] | none |
| LS05_portal_pair | discovery | pass | 0 | 0 | winning_solution: required=[portal_enter, portal_teleport] | none |
| LS06_normal_teleport | discovery | pass | 0 | 0 | winning_solution: required=[portal_enter, portal_teleport] | none |
| LS07_sealed_region_transport | guided_application | pending | 0 | 1 | all_winning_paths: required=[portal_enter, portal_teleport] | none |
| LS08_sealed_region_pattern | variation_transfer | pending | 0 | 5 | all_winning_paths: required=[portal_enter, portal_teleport] | none |
| LS10_blocked_exit_pushes_entrance | discovery | pass | 0 | 0 | winning_solution: required=[portal_enter, portal_exit_blocked, portal_fallback_push] | none |
| LS11_trigger_fallback | guided_application | pass | 0 | 0 | winning_solution: required=[portal_exit_blocked, portal_fallback_push] | none |
| LS12_construct_blocked_exit | guided_application | pending | 0 | 5 | all_winning_paths: required=[pull_crate, portal_exit_blocked, portal_fallback_push] | none |
| LS13_remote_blocker_controls_entry | guided_application | pending | 0 | 5 | all_winning_paths: required=[pull_crate, portal_exit_blocked, portal_fallback_push] | none |
| LS14_remote_blocker_pattern | variation_transfer | pending | 0 | 5 | all_winning_paths: required=[portal_exit_blocked, portal_fallback_push] | none |
| LS15_construct_then_exploit | combination | pending | 0 | 5 | all_winning_paths: required=[pull_crate, portal_exit_blocked, portal_fallback_push] | none |
| LS16_portal_as_key | independent_application | pending | 0 | 5 | all_winning_paths: required=[portal_fallback_push] | none |
| LS17_repeated_portal_push | guided_application | pending | 0 | 5 | winning_solution: required=[portal_fallback_push] | none |
| LS18_repeated_push_corridor | variation_transfer | pending | 0 | 5 | all_winning_paths: required=[portal_fallback_push] | none |
| LS19_fallback_failure_prediction | guided_application | pending | 0 | 5 | probe_trace: required=[portal_exit_blocked, portal_fallback_failed] | none |
| LS20_push_until_jam | challenge | pending | 0 | 6 | all_winning_paths: required=[portal_fallback_push]; probe_trace: required=[portal_fallback_failed] | none |

## Pending Runtime Evidence

- LS01_pull_discovery: none
- LS02_reposition_crate: none
- LS03_clear_choke candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS03_clear_choke solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS03_clear_choke candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS03_clear_choke candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS03_clear_choke event_requirement:all_winning_paths (full_graph): required=[pull_crate] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS04_clear_choke_pattern candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS04_clear_choke_pattern solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS04_clear_choke_pattern candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS04_clear_choke_pattern candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS04_clear_choke_pattern event_requirement:all_winning_paths (full_graph): required=[pull_crate] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS05_portal_pair: none
- LS06_normal_teleport: none
- LS07_sealed_region_transport event_requirement:all_winning_paths (full_graph): required=[portal_enter, portal_teleport] requires a complete product graph proving no winning bypass.
- LS08_sealed_region_pattern candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS08_sealed_region_pattern solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS08_sealed_region_pattern candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS08_sealed_region_pattern candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS08_sealed_region_pattern event_requirement:all_winning_paths (full_graph): required=[portal_enter, portal_teleport] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS10_blocked_exit_pushes_entrance: none
- LS11_trigger_fallback: none
- LS12_construct_blocked_exit candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS12_construct_blocked_exit solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS12_construct_blocked_exit candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS12_construct_blocked_exit candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS12_construct_blocked_exit event_requirement:all_winning_paths (full_graph): required=[pull_crate, portal_exit_blocked, portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS13_remote_blocker_controls_entry candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS13_remote_blocker_controls_entry solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS13_remote_blocker_controls_entry candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS13_remote_blocker_controls_entry candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS13_remote_blocker_controls_entry event_requirement:all_winning_paths (full_graph): required=[pull_crate, portal_exit_blocked, portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS14_remote_blocker_pattern candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS14_remote_blocker_pattern solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS14_remote_blocker_pattern candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS14_remote_blocker_pattern candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS14_remote_blocker_pattern event_requirement:all_winning_paths (full_graph): required=[portal_exit_blocked, portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS15_construct_then_exploit candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS15_construct_then_exploit solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS15_construct_then_exploit candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS15_construct_then_exploit candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS15_construct_then_exploit event_requirement:all_winning_paths (full_graph): required=[pull_crate, portal_exit_blocked, portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS16_portal_as_key candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS16_portal_as_key solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS16_portal_as_key candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS16_portal_as_key candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS16_portal_as_key event_requirement:all_winning_paths (full_graph): required=[portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS17_repeated_portal_push candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS17_repeated_portal_push solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS17_repeated_portal_push candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS17_repeated_portal_push candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS17_repeated_portal_push event_requirement:winning_solution (trace): required=[portal_fallback_push] requires the canonical winning solution trace to satisfy the event predicate, but no candidate is bound to the spec.
- LS18_repeated_push_corridor candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS18_repeated_push_corridor solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS18_repeated_push_corridor candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS18_repeated_push_corridor candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS18_repeated_push_corridor event_requirement:all_winning_paths (full_graph): required=[portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS19_fallback_failure_prediction candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS19_fallback_failure_prediction solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS19_fallback_failure_prediction candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS19_fallback_failure_prediction candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS19_fallback_failure_prediction event_requirement:probe_trace (trace): required=[portal_exit_blocked, portal_fallback_failed] requires a replayed probe trace satisfying the event predicate, but no candidate is bound to the spec.
- LS20_push_until_jam candidate_bound_to_spec (unknown): No generated candidate level is bound to this spec yet.
- LS20_push_until_jam solvable (unknown): A concrete generated level is required before runtime search can prove solvability.
- LS20_push_until_jam candidate_player_win_standard (unknown): A concrete generated level is required before checking that it did not override the player-facing win condition.
- LS20_push_until_jam candidate_no_event_win (unknown): A concrete generated level is required before checking that no event-win fixture is used.
- LS20_push_until_jam event_requirement:all_winning_paths (full_graph): required=[portal_fallback_push] requires a complete product graph proving no winning bypass, but no candidate is bound to the spec.
- LS20_push_until_jam event_requirement:probe_trace (trace): required=[portal_fallback_failed] requires a replayed probe trace satisfying the event predicate, but no candidate is bound to the spec.

