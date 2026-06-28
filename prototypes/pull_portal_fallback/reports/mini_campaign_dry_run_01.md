# Mini Campaign Dry Run 01

This is a process-validation artifact, not an accepted level pack.

Goal: manually define a small set of temporary level slots, let the LLM designer produce or reuse candidate layouts, run the formal analyzer, then classify each candidate as current-slot material, saved variant, or rejected/needs replacement.

## Slot Summary

| Slot | Intended role | Candidate | Classification | Notes |
| --- | --- | --- | --- | --- |
| S01 | Pull discovery | `dry_s01_pull_discovery` | provisional witness | Clear pull event, but pull is not counterfactually necessary because walking to the goal would still work if pull were disabled. Suitable as a visible event witness only. |
| S02 | Portal discovery | `dry_s02_portal_discovery` | on-spec | Compact, one win state, teleport is necessary. Good discovery slot. |
| S03 | Pull + portal side-switch application | `dry_s03_side_switch_application` | on-spec | Compact and strong. Pull and teleport are both necessary; fallback is not necessary. |
| S04 | Fallback discovery | `dry_s04_fallback_discovery` | provisional witness | Fallback is necessary, but the solution is a straight repeated-push corridor and has two win states. Works as an early witness, weak as a player-facing puzzle. |
| S05 | Repeated fallback application | `dry_s05_repeated_fallback_application` | needs replacement | Also a straight repeated-push corridor. It verifies repeated fallback but does not add much thinking over S04. |
| S06 | Pull + teleport + fallback combination | `dry_s06_hard_chain_combination` | save as advanced variant | Strong causal chain and all three mechanisms are necessary, but graph has 1231 states and 14 winning states. Needs future solution-family analysis before campaign placement. |
| S07 | Reuse-strengthened challenge | `dry_s07_reuse_fallback_challenge` | on-spec challenge | Excellent compact challenge. Pull, teleport, and fallback are all necessary; one win state; no target bypass. |
| V01 | Emerged directional pull variant | `dry_variant_directional_pull_challenge` | save as sibling variant | Strong pull + directional-portal challenge. Does not use fallback, so it belongs in a different branch than S07. |

## Analyzer Metrics

| Candidate | Cost | States | Win states | Key event counts | Counterfactual result |
| --- | ---: | ---: | ---: | --- | --- |
| `dry_s01_pull_discovery` | 1 | 2 | 1 | `pull_crate=1` | pull not necessary; target event covered |
| `dry_s02_portal_discovery` | 3 | 5 | 1 | `portal_teleport=1` | teleport necessary |
| `dry_s03_side_switch_application` | 15 | 23 | 1 | `portal_teleport=2`, `pull_crate=5` | pull and teleport necessary; fallback not necessary |
| `dry_s04_fallback_discovery` | 7 | 20 | 2 | `fallback=3` | fallback necessary; teleport not necessary |
| `dry_s05_repeated_fallback_application` | 9 | 27 | 2 | `fallback=4` | fallback necessary; teleport not necessary |
| `dry_s06_hard_chain_combination` | 23 | 1231 | 14 | `pull_crate=4`, `fallback=5`, `portal_teleport=1` | pull, teleport, fallback all necessary |
| `dry_s07_reuse_fallback_challenge` | 18 | 58 | 1 | `pull_crate=7`, `fallback=1`, `portal_teleport=1` | pull, teleport, fallback all necessary |
| `dry_variant_directional_pull_challenge` | 18 | 37 | 1 | `pull_crate=3`, `portal_teleport=4` | pull and teleport necessary; fallback not necessary |

All listed candidates had no target-event bypass according to the current analyzer. This is a necessary evidence check, not a complete quality proof.

## Current Mini Campaign Shape

The dry run suggests this provisional campaign spine:

1. S01 pull witness, or replace with a better pull discovery that makes the pull visually deliberate.
2. S02 portal discovery.
3. S03 pull + portal side-switch application.
4. S04 fallback witness.
5. Replace S05 with a real fallback application that is not merely a longer S04.
6. S07 compact pull + portal + fallback challenge.

Saved for later:

- S06 as an advanced combination/challenge, pending solution-family analysis.
- V01 as a sibling challenge for a directional portal/pull branch.

## Process Lessons

- Discovery slots may accept event witnesses that are not counterfactually necessary, but the report must label them as witnesses rather than hard application levels.
- Repeated straight-line fallback is easy to generate and easy to verify, but weak as puzzle design. Future designer instructions should avoid treating "more repeated pushes" as application depth by default.
- The strongest result came from reuse-strengthening: existing A/B/C elements gained additional causal responsibility without adding objects or broad empty space.
- The design process should preserve off-spec high-quality results as variants instead of forcing them into the current slot.
- The next tool gap is not more generation; it is solution-family / win-state analysis and object-configuration graph compression.

## Report Links

- [S01 pull discovery](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s01_pull_discovery.md)
- [S02 portal discovery](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s02_portal_discovery.md)
- [S03 side-switch application](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s03_side_switch_application.md)
- [S04 fallback discovery](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s04_fallback_discovery.md)
- [S05 repeated fallback application](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s05_repeated_fallback_application.md)
- [S06 hard-chain combination](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s06_hard_chain_combination.md)
- [S07 reuse fallback challenge](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_s07_reuse_fallback_challenge.md)
- [V01 directional pull variant](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_variant_directional_pull_challenge.md)
