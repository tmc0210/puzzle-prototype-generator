# Designer Action 模板

`designer_action_N` 只记录 Designer 对本轮 Critic 退回意见的设计侧响应，不写 Controller 状态转换。

```yaml
assignment_ref: ""
designer_instance_id: ""
review_round_answered: 0
candidate_id: ""
exact_version_answered: ""
evidence_review_refs: []
critic_review_ref: ""

response: revise_candidate | change_structure_family | withdraw_exact | dispute_raw_packet
design_response_and_refs: []
```

规则：

- `revise_candidate` 与 `change_structure_family` 都回到同一个 candidate id；后者不默认沿用当前布局或因果结构。
- `withdraw_exact` 只放弃当前版本，不建立第二个 candidate id。
- `dispute_raw_packet` 只适用于 Controller 组入的实际布局、replay、前序、目标难度或两类校准 view 有事实错误；Designer 的亮点解释不能进入 Critic 输入。
- Critic 接受当前 exact 时不生成 Designer action，由 Controller 直接进入提交前流程。
- 响应退回后的修改留在 Designer 工作台；完成自查并发布下一 exact version 后，重跑硬证据和 Critic。
- 候选状态、review cycle、delivery 指向和待玩状态只由 Controller 写入 `candidate_ledger.yml`。
