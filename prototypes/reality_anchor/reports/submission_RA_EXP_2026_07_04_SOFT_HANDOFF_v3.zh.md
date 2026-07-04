# Submission: RA_EXP_2026_07_04_SOFT_HANDOFF_v3

```yaml
candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
prototype: reality_anchor
status: proposal_ready_with_caveats
archive_eligibility: human_pending
review_integrity: independent_review
latest_review_iteration: review_2
open_required_action_after_latest_review: none
```

## ASCII

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########
```

## Solution

```text
down up right right down left down left down left up right left
```

## Key Snapshots

```text
Step 0
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########

Step 2 after up: P/L pulled into upper target corridor
#########
####C@..#
###GPL..#
####...M#
####..BS#
#########

Step 8 after left: M pulled across B/S boundary and becomes crate
#########
####....#
###GPLC.#
####.@C.#
####..BS#
#########

Step 10 after left: B/S pulled; box_to_sticky + sticky_merge
#########
####....#
###G.GM.#
####PLM.#
####@BS.#
#########

Step 11 after up: P/L repositions for final coverage
#########
####....#
###GPLM.#
####@.M.#
####.BS.#
#########

Step 13 after left: final win
#########
####....#
###PL*..#
####@C..#
####.BS.#
#########
```

## Evidence Summary

```yaml
solver:
  found: true
  cost: 13
  depth: 13
  explored_states: 356
graph:
  status: complete
  reachable_states: 2828
  legal_transitions: 6093
  winning_states: 1
event_probe_core6:
  status: complete
  found_bypass: false
  required_groups:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_rigid_move
    - sticky_merge
```

## Review Summary

```yaml
evidence_review:
  artifact: evidence_review_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
puzzle_critic:
  artifact: puzzle_critic_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
  verdict: supports_with_noncore_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
```

## Critic Conclusion 摘要

critic 认为 v3 实质修复了 v2 的 padding / tail-button 问题：13 步中只有 4 个 walk，P/L 在第 2、9、11、13 步都改变局面；B/S 的材料换相不是孤立事件，第 10 步 merge 后由末段 sticky 刚体与 P/L 共同收束。保留 caveat 是 SCC 仍显示短链脚本化风险，因此适合作为较低难度 challenge，而不是开放规划型高难关。

## Artifact Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review2.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
- prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.zh.md
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_core6.md
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/levels.yml
```
