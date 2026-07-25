# Designer Assignment 模板

Controller 每次只向同一个活动 Designer 分配一个明确阶段。Assignment 固定输入、candidate id、版本依据和写入范围，并在该阶段持续有效；恢复同一工作台不需要新 assignment。

```yaml
assignment_id: ""
required_skill: sokoban-level-designer
assignment_kind: experience_brief | candidate_design | revision | review_response
controller_instance_id: ""
task_root: ""
candidate_ledger_ref: ""

candidate_id: null
exact_version_basis: null

design_brief: ""
input_refs: []
allowed_output_refs: []
exploration_request_root: null
required_outputs: []
```

规则：

- `experience_brief` 不绑定 candidate；其它 assignment 必须绑定账本中的唯一 `candidate_id`。
- `design_brief` 只表达本轮体验核心、玩家关系或 Critic 的自然语言批评。
- `input_refs` 只包含 Designer 当前阶段可以读取的材料。旧 Critic、修改说明和 Designer action 不进入新 exact 的 Critic 输入。
- `allowed_output_refs` 可以是具体产物或独立的 Designer 工作目录；目录授权覆盖其后代工作文件与最终发布 artifact。局部探索 request 单独使用 task-local `exploration_request_root`。
- `required_outputs` 只描述本阶段结束时的结果，不列内部草稿、逐次 probe 或中间修订。
- `exact_version_basis` 指向本阶段所依据的最近一次已发布 exact；它不预先命名工作草稿或下一版本。
- `candidate_ledger_ref` 只供 Controller 校验候选与版本依据，不授予 Designer 写控制状态的权限。
- `review_response` 只有当前 exact 的 Critic 已明确退回后才能发出；Critic 接受时不创建该 assignment。
- 候选被接受后不再创建 Designer assignment；提交前检查与规范化由 Controller 按原型 authority docs 执行。
