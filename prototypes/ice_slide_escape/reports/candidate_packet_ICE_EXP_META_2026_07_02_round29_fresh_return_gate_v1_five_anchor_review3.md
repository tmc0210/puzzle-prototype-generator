# Candidate Packet Addendum: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1 review_3_five_anchor

```yaml
review_iteration: 3
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1
review_input_type: candidate_version
base_packet_ref: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1.md
purpose: >
  User-requested critic rerun with exactly one relevant human-reviewed archive
  calibration example for each human aesthetic score from 1 through 5.
standard_process_note: >
  The default candidate-packet guidance caps archive_taste_context at 4 examples.
  This addendum intentionally exceeds that default because the user explicitly
  requested a 1/2/3/4/5 calibration sweep. The extra examples are for score
  calibration only and do not authorize archive-variant work.
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  reuse_boundary: >
    Archive examples may be used only as human taste anchors and failure-mode
    calibration. Do not reward copied geometry, copied interface tricks, copied
    causal chains, or archive status labels.
```

## Candidate Under Review

Use the full packet at:

```text
prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1.md
```

The current candidate claims:

```yaml
special_requirements:
  - every target initially has ice
  - every ice starts on a target
  - initial target ice seals the direct start-to-goal path
  - base latest reachable knowledge must be required on every winning path
  - both flows difficulty >= 3
  - at least one flow difficulty >= 4
  - aesthetic target >= 4, pursue 5
interfaces:
  A: [0, 3]
  B: [20, 3]
  C: [20, 3]
  D: [0, 3]
```

Prior independent evidence review supports the machine facts. This review is a
puzzle-critic retest of player-facing quality, target fit, score calibration,
and the existing review_2 attacks.

## Five-Anchor Archive Taste Context

Use exactly these five human-reviewed clean archive examples as calibration.
They are selected by human aesthetic score, one per score 1-5.

```yaml
examples:
  - anchor_score: 1
    candidate_id: ICE_CAND_0015
    path: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0015.md
    human_aesthetic_score: 1
    human_difficulty_score: 2
    relevance: >
      Negative target-state / target-eject calibration. The machine-supported
      chain exists, but human review rejected the claimed insight because the
      unique corridor naturally triggers the supposed "push away a correct
      target ice" idea. Use this to test whether round29's all-target-on-ice
      contradiction is actually player-facing, or merely a forced local door.

  - anchor_score: 2
    candidate_id: ICE_CAND_0020
    path: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0020.md
    human_aesthetic_score: 2
    human_difficulty_score: 1
    relevance: >
      Functional meta connector / overclaim calibration. It satisfies a route
      scheduling meta need, but base and meta are simple witnesses, and the
      cross-visit reuse mostly appears only in retrospect. Use this to attack
      overclaim in round29 if B=C / D=A is functional rather than meaningful.

  - anchor_score: 3
    candidate_id: ICE_CAND_0022
    path: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0022.md
    human_aesthetic_score: 3
    human_difficulty_score: 3
    relevance: >
      Accepted meta lower-bound calibration. Base is light and low-pollution,
      while meta is a solid double-debt chain; human review still warned that
      base/meta each lack insight and that space/object interweaving is limited.
      Use this as the "qualified but not high-aesthetic" baseline.

  - anchor_score: 4
    candidate_id: ICE_CAND_0034
    path: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
    human_aesthetic_score: 4
    human_difficulty_score: 2
    human_difficulty_detail: "base 2-, meta about 3"
    relevance: >
      Meta-first 4-point calibration. The value comes from revisiting and
      disturbing lower structure so the meta route is not a full replay of base.
      It also warns that clean geometry and a real meta disturbance can still
      have modest difficulty.

  - anchor_score: 5
    candidate_id: ICE_CAND_0035
    path: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
    human_aesthetic_score: 5
    human_difficulty_score: 4
    relevance: >
      Same-cell return / B=C calibration. Human review gave 5 only because
      return pressure makes the first exit naturally become a revisit entrance,
      and the same local structure changes meaning after reset. Use this as a
      strict positive boundary: B=C, D-wall, or return shape alone earns nothing.
```

## Requested Critic Questions

```yaml
questions:
  - Does round29 still satisfy aesthetic >= 4 when calibrated against all five anchors?
  - Does round29 satisfy both-flow difficulty >= 3 and at least one flow >= 4?
  - Does the all-target-on-ice contradiction survive the ICE_CAND_0015 failure-mode attack?
  - Does B=C / D=A survive the ICE_CAND_0020 and ICE_CAND_0035 return-pressure attacks?
  - Does round29 land closer to score 3, score 4, or score 5 under this expanded calibration?
  - Should review_2's structural_revision remain, be softened to caveats, or be overturned?
```

## Output Contract

The critic should write:

```text
prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_review_3_five_anchor.md
```

Follow `skills/sokoban-design-review-loop/references/puzzle-critic-template.md`.
Do not run solver/analyzer tools, do not add new evidence, and do not act as
final controller. The critic may reference review_1/review_2 for contrast, but
the verdict must be based on the full candidate packet plus this five-anchor
archive context.
