# Process Correction: v38 review_1 无效

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
invalidated_review_iteration: review_1
correction_reason: >
  review_1 的 evidence reviewer 与 puzzle critic 虽由 subagent 产生，但 controller
  调用消息未显式要求使用 `$sokoban-evidence-reviewer` / `$sokoban-puzzle-critic`
  或 repo-local skill + template。根据
  `skills/sokoban-design-review-loop/SKILL.md`，这种自由 prompt 产物即使字段完整，
  也按 `review_integrity: missing` 处理。
previous_designer_action_status: invalid_for_closure
current_required_action: rerun_review_2_with_repo_local_skills_and_templates
```

## 影响

- `evidence_review_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review_1.md` 不再作为有效 independent evidence reviewer artifact 使用。
- `puzzle_critic_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review_1.md` 不再作为有效 independent puzzle critic artifact 使用。
- `designer_action_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review_1.zh.md` 中的 `submit_as_qualified_candidate` 结论撤回，等待 review_2。

## 修正动作

- 已读取 `skills/sokoban-design-review-loop/SKILL.md`。
- 已读取 repo-local reviewer / critic skills 与 templates。
- 已生成标准候选包：
  `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_review2_standard.zh.md`
- review_2 将显式要求 reviewer / critic 使用对应 skill 或 repo-local skill + template。
