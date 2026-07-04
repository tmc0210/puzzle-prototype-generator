# Designer Action: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock review 1

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock
review_iteration: review_1
designer_decision: hold_for_revision
do_not_submit_as_final_candidate: true
primary_reason: >
  independent critic judged the design as 3+ / 4-, not a stable aesthetic-4
  candidate, mainly because A can reach a non-winning d6 exposure in the base
  graph and B=C lacks a return-pressure wrapper.
```

## Review Results

Evidence review:

```yaml
file: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock_review_1.md
verdict: supported_with_declared_caveats
summary: >
  Packet and evidence are internally consistent. Base winning paths are clean,
  but complete base reachable graph hits ice_destroy_group_d6_plus:len2.
```

Puzzle critic:

```yaml
file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock_review_1.md
verdict: hold_for_revision
aesthetic_band: "3+ / 4-"
difficulty_gate: pass
required_action: >
  Fix A-start complete reachable d6 exposure or downgrade; B=C cannot be used
  as a strong aesthetic claim without return-pressure wrapper evidence.
```

## Designer Reading

The v8 family is valuable because it implements the requested target-debt chain:

- base borrows both target ice and repays both targets from lower resources;
- meta reverses which target becomes debt and uses the other target ice as the
  internal d6 projectile;
- the d6 is generated inside the shared chamber, not by a right-side external
  cannon.

It is not a qualified submission because the base graph can still expose the
same d6 language before the meta visit. This weakens both the hard knowledge
gate and the player-side revelation. The next family should avoid B=C or
otherwise make the meta d6 station inaccessible from A under complete reachable
scan.
