# 单候选流程账本

本文件只记录唯一候选已发布的 exact 与流程状态。Designer 工作布局不进入账本；设计判断、硬证据和 Critic 原文保存在各自 artifact 中。

```yaml
design_task_id: ""
experience_brief_ref: ""
critic_stage_difficulty_calibration:
  view_refs: []    # 当前目标之前课程阶段的难度校准投影
  source_archive_refs: []
critic_cross_stage_aesthetic_calibration:
  view_refs: []    # 其余 clean archive 的审美投影
  source_archive_refs: []
task_state: briefing | designing | reviewing | pre_submission | ready_for_playtest

candidate:
  candidate_id: ""
  exact_version: null  # 最近一次已发布 exact；首次发布前为空
  candidate_state: designing | hard_validated | accepted
  designer_assignment_ref: null
  layout_ref: null
  canonical_trace_ref: null
  submission_packet_ref: null
  evidence_review_refs: []
  critic_instance_id: null
  critic_base_ref: null
  critic_review_ref: null
  reviewed_exact_version: null
  delivery_exact_version: null
  pre_submission_check_ref: null
  pre_submission_state: not_started | incomplete | completed
  playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject

review_cycles:
  - cycle_id: ""
    exact_version: ""
    review_attempt_id: ""
    critic_instance_id: ""
    critic_base_ref: ""
    critic_review_ref: ""
    evidence_review_refs: []
    designer_action_ref: null
    controller_recorded_outcome: accept_candidate | return_to_design | change_structure_family | withdraw_exact | dispute_packet

attempts:
  - attempt_id: ""
    exact_version: ""
    status: revised | withdrawn | rejected_mechanical | rejected_identity | rejected_no_experience | returned_by_critic | accepted
    artifact_refs: []
```

账本始终只有一个 `candidate` 对象。每个 exact version 只使用一名 fresh Critic，一次读取后写一篇最终批评，不增加投票轮。Critic 接受时由 Controller 直接登记 `accept_candidate`，不要求 Designer 伪造确认动作；Critic 退回时才产生 `designer_action_ref`。

`attempts` 登记已经发布并得到明确结果的 exact。候选被接受后才能进入提交前流程；最终只能有一个 `delivery_exact_version`。若提交前规范化使 delivery 与 reviewed exact 不同，`submission_packet_ref`、`evidence_review_refs` 和 Critic refs 仍绑定 `reviewed_exact_version`，delivery 的 layout、replay 与保持证据只由 `pre_submission_check_ref` 承担。
