# Designer Action: L11/L12/L13 Human Rejection

```yaml
date: 2026-07-05
review_integrity: human_review
designer_action: reject_or_change_family
affected_candidates:
  - RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1
  - RA_CURR_2026_07_05_L12_FIXED_PARALLEL_DUAL_JOIN_v1
  - RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2
archive_eligibility: reject_do_not_archive
```

## Human Feedback

L11 is rejected for both quality and process: it is judged to be a copied/variant structure of an existing level, violating the strict fresh-required rule. It also still fails the desired sticky/box standard.

L12 and L13 are rejected because they are too simple and do not produce a meaningful player-side insight into the interleaved worlds. Merely triggering analyzer-visible mechanics is not enough. Sticky material must create unique reachability, meaningful structure, or real separation; P/L must do more than act as a removable or trivial movement convenience.

## Controller Action

All three candidates are removed from `playable_levels.yml` and marked `rejected` in `levels.yml`. Redesign resumes from L11 with a fresh causal family and stricter player-facing gates.
