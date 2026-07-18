# Task-local Design Material Exploration

本合同用于 Level Design Studio 显式调用 `$sokoban-mechanism-lab` 的 `mechanism_explore` 模式，在当前关卡设计任务内持续生产局部结构语料。探索逻辑仍以 `protocol.md` 为唯一来源；本文件只定义任务内调用、状态与写入边界。

## 目录

```text
exploration/
  dispatch.yml
  lexicon.md
  lexicon_index.md
  requests/<request_id>.yml
  runs/<batch_id>/
    brief.md
    cases.yml
    cases.json
    results.json
    report.md
    explorer_notes.md
    proposed_families.md
    batch.yml
```

`dispatch.yml` 与 `requests/` 由 designer/controller 写入；`lexicon.md`、`lexicon_index.md` 和 `runs/` 由 explorer 写入。文件是稳定状态，不用聊天摘要替代。

## Dispatch

```yaml
exploration_id: ""
prototype_id: ""
required_skill: sokoban-mechanism-lab
intent: mechanism_explore
publication_scope: task_local
workspace: ""
dispatch_prompt: "使用 $sokoban-mechanism-lab，以 mechanism_explore 的 task_local 模式执行本文件。"
experience_seed: ""
player_prior: []
allowed_mechanisms: []
allowed_tools: []
source_boundary:
  allowed: []
  forbidden: []
task_lexicon_ref: ""
task_index_ref: ""
```

Designer/controller 把 `dispatch_prompt` 原样放入 fresh agent 的调用。有效 explorer artifact 同时具备显式 `$sokoban-mechanism-lab` 调用、`mechanism_explore` intent、`task_local` 发布范围和本目录合同产物；controller 据此授予材料来源身份。

## Designer request

每个请求是一个待展开的设计空间：

```yaml
request_id: ""
exploration_id: ""
design_space: ""
sampling_axes: []
current_material_refs: []
do_not_repeat: []
materialization_target: ""
```

`design_space` 描述对象、占格形状、边界、站位、动作后局面或想扩充的局部用途，例如“L 形黏块在不同墙口朝向与站位下的可动性谱”。Designer 在正式设计 artifacts 中处理完整 exact、难度、当前候选、归档比较和 family 去留。

Explorer 的 source boundary 只包含规则、runtime、工具、允许的全局结构语料和当前 task lexicon。Designer 从当前节点发现材料缺口时，先把缺口改写成与候选坐标和包装无关的局部结构空间，再写 request。

## Task lexicon

`lexicon.md` 只发布本任务可取用的正向结构材料。每项至少包含：

- 局面卡片：开始摆法、关键动作、动后局面、最小用法；
- 局部结构谱与结构旋钮；
- 可接入的形状、空位、墙口、目标袋、通道或操作位；
- 近邻对照和误用边界；
- runtime-backed 证据引用。

使用 `lexicon-format.md` 的 designer-facing 结构表达。Task lexicon 的权限止于局部结构事实与接法；完整作品判断归 Designer，全局收录裁决归 Curator。`lexicon_index.md` 只做短索引和避重。

单个 probe 没有产生可复用差异时，只留在 run 的原始结果或作为某张正向材料的近邻对照。Task lexicon 始终是正向可取用材料的当前集合。

## Batch record

每批完成后写：

```yaml
batch_id: ""
exploration_id: ""
request_ref: ""
required_skill: sokoban-mechanism-lab
intent: mechanism_explore
publication_scope: task_local
status: published
sampled_axes: []
new_material_refs: []
merged_material_refs: []
next_sampling_axes: []
raw_artifact_refs: []
```

`new_material_refs` 可以为空；它只记录本批新增不可替代材料的数量。Explorer 继续换结构轴采样，或等待下一份 request；设计空间价值、方向上限和设计停止点由 Designer 根据正式作品判断。

## 生命周期

首批应尽快发布至少一个直白、经过 runtime 验证的局面材料，designer 不需要等待整个设计空间展开完毕。后续每批读取 task lexicon 与最新 request，避开重复语料并增加结构谱覆盖。

Controller 确认设计树 `sufficient` 后停止派发新 request；正在执行的批次完成写入后结束。Explorer 的生命周期止于 task lexicon、索引和 runs；正式节点、审查、提交前工作流与人类待玩交付由 Designer/controller 完成。
