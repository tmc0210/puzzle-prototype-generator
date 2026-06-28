# Prototype Audit: pull_portal_fallback

## Summary

- MVP gate complete: no
- Levels: 20 / 20
- Accepted levels: 0 / 20
- Passing levels: 20 / 20
- Certified curriculum levels: 0 / 20
- Knowledge coverage (certified): 0 / 9
- Versioned web assets: yes
- Player win standard: player_on_goal
- Quality scorer implemented: no
- Level role contract issues: 11
- Player model: present
- Curriculum v2: present

## Role Counts

- boundary: 5
- challenge: 3
- combination: 2
- discovery: 3
- guided_application: 3
- independent_application: 1
- review: 1
- variation_transfer: 2

## Cost Curve

| Level | Role | Cost | Solver Explored | Graph Status | Reachable States |
| --- | --- | ---: | ---: | --- | ---: |
| L01 | discovery | 1 | 2 | complete | 4 |
| L02 | boundary | 5 | 16 | complete | 28 |
| L03 | guided_application | 2 | 3 | complete | 4 |
| L04 | discovery | 2 | 5 | complete | 12 |
| L05 | discovery | 2 | 5 | complete | 121 |
| L06 | guided_application | 8 | 157 | exhausted | 100001 |
| L07 | combination | 5 | 23 | complete | 34848 |
| L08 | boundary | 1 | 3 | complete | 2 |
| L09 | guided_application | 7 | 12 | complete | 20 |
| L10 | combination | 8 | 57 | complete | 37909 |
| L11 | variation_transfer | 9 | 17 | complete | 27 |
| L12 | boundary | 4 | 6 | complete | 5 |
| L13 | review | 3 | 4 | complete | 6 |
| L14 | boundary | 1 | 3 | complete | 2 |
| L15 | independent_application | 3 | 4 | complete | 5 |
| L16 | variation_transfer | 4 | 6 | complete | 6 |
| L17 | boundary | 1 | 2 | complete | 1 |
| L18 | challenge | 11 | 22 | complete | 44 |
| L19 | challenge | 4 | 6 | complete | 9 |
| L20 | challenge | 8 | 171 | exhausted | 100001 |

## Curriculum Goal Coverage

| Track | Knowledge | Roles | Target | Certified Levels | Status |
| --- | --- | --- | ---: | --- | --- |
| basics | K_pull_single_crate | discovery, review | 2 | none | GAP 0/2 |
| basics | K_cannot_push_crate | boundary | 2 | none | GAP 0/2 |
| basics | K_pull_opens_path | guided_application, independent_application, variation_transfer | 2 | none | GAP 0/2 |
| portals | K_portal_teleports_player | discovery, guided_application, independent_application | 2 | none | GAP 0/2 |
| blocked_exit | K_blocked_portal_stops_teleport | discovery | 1 | none | GAP 0/1 |
| blocked_exit | K_blocked_portal_pushes_entrance | discovery, guided_application | 3 | none | GAP 0/3 |
| blocked_exit | K_blocked_portal_push_can_fail | boundary | 1 | none | GAP 0/1 |
| constructed_triggers | K_use_crate_to_block_portal_exit | guided_application, independent_application, variation_transfer | 3 | none | GAP 0/3 |
| constructed_triggers | K_move_portal_to_open_path | guided_application, independent_application, variation_transfer, combination, challenge | 4 | none | GAP 0/4 |
| finale | K_pull_opens_path, K_use_crate_to_block_portal_exit, K_move_portal_to_open_path | combination, challenge | 3 | none | GAP 0/3 |

## Design Gate Limits

- Event-occurs win levels: L04 (discovery:portal_teleport), L05 (discovery:portal_fallback_push), L06 (guided_application:portal_fallback_push), L07 (combination:portal_fallback_push), L08 (boundary:portal_fallback_failed), L10 (combination:portal_fallback_push), L12 (boundary:portal_fallback_failed), L14 (boundary:push_crate_failed), L17 (boundary:portal_fallback_failed), L19 (challenge:portal_fallback_failed), L20 (challenge:portal_fallback_push)
- Accepted win-standard violations: none
- Informal semantics: K_pull_opens_path:crate_moved_from_blocking_cell_and_player_later_crosses_that_cell, K_use_crate_to_block_portal_exit:crate_blocks_paired_portal_exit_before_portal_enter, K_move_portal_to_open_path:portal_position_change_enables_later_goal_access

## Level Role Contracts

| Level | Role | Severity | Issue |
| --- | --- | --- | --- |
| L04 | discovery | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L05 | discovery | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L06 | guided_application | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L07 | combination | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L08 | boundary | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L10 | combination | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L12 | boundary | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L14 | boundary | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L17 | boundary | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L19 | challenge | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |
| L20 | challenge | warning | event_occurs win condition marks this as a fixture-style witness, not a normal player-facing curriculum level. |

## Player Model

- Facts: 4
- Constraints: 8
- Interactions: 3
- Abilities: 8
- Ability candidates: 1
- Patterns: 8
- Pattern candidates: 1
- References: ok
- Open questions: What happens if a portal is pushed into another portal?; What happens to a crate being pulled when the player enters a portal?; Are portal exits always direction-relative to the entry direction?
- Candidate references: P_directional_portal_exit_routing requires candidate ability A_choose_entry_direction_to_control_portal_exit

## Curriculum V2

- Status: draft
- Units: 5
- Goals: 19
- Assumed known: F_player_reaches_goal_to_win, C_cannot_push_crate
- Target counts: ability:7, fact:3, interaction:2, pattern:7
- Role counts: challenge:2, combination:2, discovery:4, guided_application:10, independent_application:8, review:1, variation_transfer:6
- Topological layers: L0[C_cannot_push_crate, C_crate_blocks_portal_exit, C_fallback_push_requires_free_portal_destination, C_portal_occupies_cell_and_blocks_walking, F_player_reaches_goal_to_win, F_portals_are_paired, F_pull_single_crate] -> L1[C_pull_requires_crate_behind_player, C_pull_requires_free_destination, F_portal_teleports_player_to_directional_exit] -> L2[A_reposition_crate_by_pulling, A_use_portal_to_enter_sealed_region, I_blocked_exit_stops_normal_teleport] -> L3[A_clear_choke_by_pulling_crate, A_create_blocked_portal_exit_with_crate, I_blocked_exit_pushes_entrance_portal, P_sealed_region_requires_portal_transport] -> L4[A_trigger_blocked_portal_fallback, C_blocked_portal_push_can_fail, I_portal_exit_blocker_controls_entry_behavior, P_clear_choke_by_pulling_blocker] -> L5[A_predict_and_use_fallback_failure, A_repeat_fallback_push_to_move_portal, P_construct_trigger_then_exploit, P_portal_as_movable_door_or_key, P_remote_blocker_changes_portal_behavior] -> L6[P_push_until_jam_boundary, P_repeated_portal_push_corridor]
- Unresolved layer targets: none

- No curriculum v2 ordering issues.

- No curriculum v2 goals are blocked by open questions.

## Artifacts

- OK runtime report: `reports/evaluation.json`
- OK web playable: `playable/index.html`
- OK web playable data: `playable/data.json`
- OK PuzzleScript Next export: `game.ps`

## Notes

- Quality scorer is not implemented; evaluator only checks runtime reachability and event coverage.
- Knowledge and curriculum coverage count only certified levels: status accepted, evaluator pass, and matching player-facing win standard.
- Not all levels are accepted.
- Uncovered knowledge: K_pull_single_crate, K_cannot_push_crate, K_pull_opens_path, K_portal_teleports_player, K_blocked_portal_stops_teleport, K_blocked_portal_pushes_entrance, K_blocked_portal_push_can_fail, K_use_crate_to_block_portal_exit, K_move_portal_to_open_path.
- 10 curriculum goal(s) are under target; see Curriculum Goal Coverage.

## Advisory Notes

- 3 knowledge item(s) include informal semantics; these do not participate in evaluator proof.
- 11 level(s) use event_occurs win conditions; these are fixture witnesses. Accepted player-facing levels must use 'player_on_goal' unless the prototype spec changes.
- 11 role contract warning(s) found; see Level Role Contracts.
- Player model present: 4 facts, 8 constraints, 3 interactions, 8 abilities, 8 patterns.
- Player model has 1 ability candidate(s) and 1 pattern candidate(s); candidates should not be used as formal curriculum targets without confirmation.
- Player model has 3 open question(s) that may block future runtime or curriculum generalization.
- Curriculum v2 present: 5 units, 19 learning goals.

