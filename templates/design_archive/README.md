# 设计归档模板

这些模板在 `docs/21` 的单关设计流程外增加一层人类引导的归档记录合约。

使用条件：某个原型已经具备基本 runtime / solver / analyzer 支持，人类设计师希望探索哪些规则事实、motif、能力或模式值得继续设计，而不是让 LLM 自动拥有完整知识 / 课程 / 关卡流程。

推荐顺序：

```text
1. 编写或选择一个 experiment brief。
2. 给 LLM designer 使用 designer prompt addendum。
3. 按 docs/21 和 docs/20 运行设计 / analyzer / reviewer / critic 循环。
4. 收集人类设计师的自由评语。
5. 按 `docs/29-design-archive-contract.md` 运行 archive pass。
6. 保存或更新 candidate record 和 archive index。
```

候选记录是短审美校准卡；index 只是检索层。工具命令、完整 review loop、SCC
表和探索流水账默认留在 experiment ledger / reports，通过路径引用，不粘进候选
记录主体。

归档应保持干净：可以保留设计差、审美上被拒绝、机制 claim 失败的关卡，但不应保留因为流程错误、证据不可复现、误标 positive reference 等原因产生的记录。此类记录应清理后重跑实验。

维护命令：

```text
npx tsx src/cli.ts archive-remove-candidate <prototype-path> <candidate-id>
npx tsx src/cli.ts archive-remove-candidate <prototype-path> <candidate-id> --apply
```

不带 `--apply` 时只预览；带 `--apply` 才会更新 index 并删除候选文件。可以用 `--keep-file` 只移除 index entry。

模板：

```text
DESIGNER_PROMPT_ADDENDUM.md
ARCHIVE_PASS_PROMPT.md
CANDIDATE_RECORD.template.md
EXPERIMENT_RUN_PROMPT.template.md
```
