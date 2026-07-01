# ICE_EXP_002 2026-06-29 Round 2 Failed Search

```yaml
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
run_id: ICE_EXP_002_2026_06_29_round2
terminal_state: failed_search
controller: llm_controller
candidate_records_written:
  - ICE_CAND_0003
proposal_ready_candidates: []
held_candidates:
  - ICE_CAND_0003
rejected_or_not_entered_candidates: []
review_integrity:
  ICE_CAND_0003: independent_review
notes: >
  本轮没有 proposal_ready 候选。ICE_CAND_0003 机制范围干净但被 critic held；
  后续三段链结构有更强因果潜力，但没有通过 forbidden-reachable fatal gate，因此没有作为
  serious candidate 入库。
```

## Human Calibration Applied

```text
- reachable d5 是致命问题，不是 caveat。
- 绕远路或浅 dead end 不能被包装成实际思考量。
- 玩家按直觉看到什么就推什么能过的结构，应按低挑战打回。
```

## Serious Candidate Outcome

### ICE_CAND_0003

```yaml
status: held_proposal
layout_ref: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0003.md
mechanic_scope: clean
independent_evidence_reviewer: present
independent_puzzle_critic: present
review_loop_state: held_proposal
```

Outcome:

```text
工具证据支持顺序门：先 B-down d4 到 [8,5]，再 A-up d4 到 [5,3]。起点比较
中 [1,8]、[2,8]、[3,8]、[4,8] 全部无 d5/d6/restart/boundary report hits。
但是 critic 判断它仍是两推 role-flip witness，不满足 late d4 pre-d5
capstone。
```

## Non-Serious Structural Attempts

这些尝试没有通过 serious candidate 入口条件，因此不写候选记录，不进入
proposal review。

```yaml
attempts:
  - attempt_id: C3_short_entry
    family: central_target_gate
    layout_delta: opened a shorter left-edge entry into the ICE_CAND_0003 structure
    validation_summary: solvable and report-clean in scratch probe
    abandon_reason: only reduced walking; did not address critic's role-fit or two-push witness attack

  - attempt_id: D4_chain3_open
    family: third_d4_consumes_second_d4_product
    layout_delta: added a lower C ice so A's d4 target ice becomes the obstacle for C-up d4
    validation_summary: solvable with three d4 rebounds and three targets
    fatal_gate_result: failed
    report_hits:
      - ice_boundary_disappear
      - ice_boundary_disappear_after_group
      - ice_pass_through_d5
      - ice_destroy_group_d6_plus
    abandon_reason: reachable forbidden-reachable hits are fatal under this experiment

  - attempt_id: D4_chain3_sealed
    family: third_d4_consumes_second_d4_product
    layout_delta: added wall border / left edge wrapper to remove direct boundary loss
    validation_summary: solvable with three d4 rebounds
    fatal_gate_result: failed
    report_hits:
      - ice_pass_through_d5
      - ice_destroy_group_d6_plus
      - ice_boundary_disappear_after_group
    abandon_reason: sealing removed some boundary cases but not reachable d5/d6

  - attempt_id: D4_chain3_gated
    family: third_d4_consumes_second_d4_product
    layout_delta: made C pusher reachable only after A moves
    validation_summary: first version unsolved because B or A d4 lane was accidentally shortened
    fatal_gate_result: not_reached
    abandon_reason: repaired locally into later gated variants

  - attempt_id: D4_chain3_gated2
    family: third_d4_consumes_second_d4_product
    layout_delta: restored B d4 lane and kept A-origin gate to C pusher
    validation_summary: solvable with three d4 rebounds; graph complete
    fatal_gate_result: failed
    report_hits:
      - ice_boundary_disappear
      - ice_boundary_disappear_after_group
      - ice_pass_through_d5
      - ice_destroy_group_d6_plus
    abandon_reason: side loop allowed wrong C/A states that reached forbidden future mechanisms

  - attempt_id: D4_chain3_gated4
    family: third_d4_consumes_second_d4_product
    layout_delta: shortened central horizontal lane and blocked C-right shove while preserving B/A d4 lanes
    validation_summary: solvable with three d4 rebounds; initial SCC out=4, winOut=1, deadOut=3
    fatal_gate_result: failed
    report_hits:
      - ice_boundary_disappear:d3
      - ice_boundary_disappear_after_group
      - ice_pass_through_d5:len1
      - ice_pass_through_d5:len2
      - ice_pass_through_d5:len3
      - ice_destroy_group_d6_plus:len1
      - ice_destroy_group_d6_plus:len2
    abandon_reason: remaining d5/d6 hits required further walling that was already eroding readability
```

## Failure Distribution

```yaml
failure_distribution:
  clean_but_too_witness_like:
    count: 1
    examples:
      - ICE_CAND_0003
    notes: >
      Hard-scope evidence clean, but critic held it as two-push single-chain role-flip witness.

  structural_high_potential_but_forbidden_polluted:
    count: 1
    examples:
      - D4_chain3 family
    notes: >
      Three-d4 chain created real later consumption: B preserves the gate, A becomes
      the obstacle, C consumes A. However every solvable version exposed reachable
      d5/d6/boundary forbidden-reachable transitions.

  local_repairs_not_new_family:
    count: 4
    examples:
      - C3_short_entry
      - D4_chain3_sealed
      - D4_chain3_gated2
      - D4_chain3_gated4
    notes: >
      These changed starts, walls, or local lanes. They did not produce a
      proposal-ready candidate.

  unsolved_or_broken_repairs:
    count: 2
    examples:
      - D4_chain3_gated
      - D4_chain3_gated3
    notes: >
      Repairs accidentally shortened required d4 lanes into d3 or blocked the
      intended route.

  proposal_ready:
    count: 0
```

## Terminal Decision

```yaml
terminal_state: failed_search
reason: >
  No candidate both passed the hard forbidden-reachable scope and survived the critic's
  capstone role-fit attack. The only clean serious candidate is held, not ready.
```
