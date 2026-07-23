# 设计归档模板

这些模板连接 `docs/21` 的体验核心单关工作室与人类引导的归档记录合约。

使用条件：某个原型已经具备基本 runtime / solver / analyzer 支持，人类设计师希望探索哪些规则事实、motif、能力或模式值得继续设计。

推荐顺序：

```text
1. 编写或选择一个 experiment brief。
2. 用 `EXPERIMENT_RUN_PROMPT.template.md` 提供本轮特有信息，并调用 `$sokoban-level-design-studio`。
3. Controller 派遣后台 Explorer，Designer 并行完成规则和人类归档校准；材料足够后制作唯一完整单关候选。
4. 每个 exact version 强制填写送审包并完成独立硬证据审查；fresh reviewer 先盲读实际关卡，再作为体验核心教练接受当前候选或保护同候选修订方向。
5. 候选被接受后运行原型专属提交前工作流，按实际 artifact 只加入一个 delivery version 并重建 playable。
6. 收集人类设计师的试玩状态与自由评语。
7. 只有 `ready_for_archive` 版本按 `docs/29-design-archive-contract.md` 运行 archive pass。
8. 保存或更新 candidate record 和 archive index。
```

候选记录是短审美校准卡；index 只是检索层。工具命令、完整设计循环、SCC
表和探索流水账不粘进候选记录主体。生成式 reports 和 mechanism lab runs 默认
不是归档读取路径；需要时重新运行或读取当前任务明确指定的 ledger。

归档应保持干净：可以保留设计差、审美上被拒绝、机制 claim 失败的关卡，但不应保留因为流程错误、证据不可复现、误标 positive reference 等原因产生的记录。此类记录应删除后重跑实验。

维护命令：

```text
npx tsx src/cli.ts archive-remove-candidate <prototype-path> <candidate-id>
npx tsx src/cli.ts archive-remove-candidate <prototype-path> <candidate-id> --apply
```

不带 `--apply` 时只预览；带 `--apply` 才会更新 index 并删除候选文件。可以用 `--keep-file` 只移除 index entry。

模板：

```text
ARCHIVE_PASS_PROMPT.md
CANDIDATE_RECORD.template.md
EXPERIMENT_RUN_PROMPT.template.md
```
