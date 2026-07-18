---
name: sokoban-level-design-studio
description: 围绕一个人类体验种子，为类推箱子特定原型建立并交付一棵体验核心设计树。适用于显式启动 task-local Mechanism Lab 生产局部结构语料，由 Designer 独立制作并冻结直白 baseline，再让 fresh reviewer 先盲审节点质量、后担任体验核心教练：存活节点判断非拼接生长，未存活节点防止修订偏离原方向；随后逐次生长前序构造或后继应用，直到树充分，并完成硬证据、提交前工作流与待玩交付；不用于原型实现、通用机制挖掘或归档排版。
---

# Sokoban Level Design Studio

## 必读材料

开始前完整读取：

- `docs/17-experience-core-level-design.md`
- `docs/21-level-design-studio-standard.md`
- 当前原型 `docs/design_handoff.yml` 及其 required docs
- `../sokoban-mechanism-lab/references/task-exploration-format.md`
- `references/experience-brief-template.md`
- `references/design-tree-template.md`
- `references/submission-packet-template.md`
- `references/designer-action-template.md`
- `references/pre-submission-workflow-template.md`
- `references/human-handoff-template.md`

当前主 agent 同时承担 designer 与 controller。后台材料探索显式调用 `$sokoban-mechanism-lab` 的 `mechanism_explore` / `task_local` 模式；硬证据审查调用 `$sokoban-evidence-reviewer`；玩家侧质量门与体验核心教练调用 `$sokoban-level-reviewer`。三个独立角色都由主 agent 之外的 fresh agent 承担。

## Controller 脚本

使用 `scripts/design-tree-controller.mjs` 强制执行输入边界和状态不变量：

```text
node skills/sokoban-level-design-studio/scripts/design-tree-controller.mjs prepare-review --tree <design_tree.yml> --node <node_id> --attempt <review_attempt_id> --out <raw_packet.yml>
node skills/sokoban-level-design-studio/scripts/design-tree-controller.mjs prepare-coach --tree <design_tree.yml> --node <node_id> --quality <quality_review.yml> --out <coach_context.yml>
node skills/sokoban-level-design-studio/scripts/design-tree-controller.mjs validate-exploration --brief <experience_brief.yml>
node skills/sokoban-level-design-studio/scripts/design-tree-controller.mjs validate --tree <design_tree.yml>
```

`validate-exploration` 检查体验简报登记的 dispatch、task lexicon、索引和首批 batch record 是否来自 `$sokoban-mechanism-lab` 的 `mechanism_explore` / `task_local` 合同。`prepare-review` 只接受探索合同有效且已有独立 `supported` 硬证据的 `hard_validated` 节点，并从体验简报的规则、冻结父节点和当前节点的 exact layout/replay 组装阶段 A 白名单，不读取 submission。`prepare-coach` 接受当前节点登记且已写定的任一独立阶段 A verdict：存活时生成 `tree_decision` context，未存活时生成 `direction_guard_only` context。`validate` 还检查引用、亲缘关系、阶段顺序、exact version 与 reviewer 身份连续性；它不启动 agent、不解释教练意见，也不替 controller 修改设计树。

## 嵌套循环

```text
外层：设计树生长循环
  体验核心 -> baseline 工作节点
  或 冻结节点 + 教练方向 -> 生长工作节点
  -> 调用内层单节点设计循环
  -> 冻结节点后选择下一父节点与方向 / 退回当前设计 / 设计树充分

内层：单节点设计循环
  完整执行 docs/21 的 Design Studio Loop
  -> exact candidate -> 硬证据 -> 阶段 A -> 阶段 B -> designer_action
  -> 冻结节点 / 回到 Design Studio / 更换结构 family / 撤回工作节点
```

`Design Studio` 的完整正向流程只在 docs/21 定义，baseline 与所有生长节点共同调用；本 skill 中的状态图不能替代其中任何设计、证据读取或玩家侧重读步骤。流程路由到修订时，使用 docs/17 的“结构修订：从差异到结构责任”方法，不在本 skill 中复制修订步骤。冻结父节点只提供体验核心、作品身份和玩家关系的对照，不是默认地图底稿；是否沿用其局部结构由当前结构 family 决定。

## 启动

1. 确认这是特定原型关卡设计任务，建立任务目录与设计树账本。
2. 按 task exploration 合同写 `dispatch.yml`，立即派遣不继承设计对话的 fresh agent，并在调用 prompt 中显式写 `$sokoban-mechanism-lab`、`mechanism_explore` 和 `task_local`。只提供体验种子、玩家前序、允许机制、规则与工具入口、source boundary 和任务目录。
3. Designer 独自完成归档校准：完整读取 index/retrieval summaries、所有明确审美 1 分人评，以及若干相关正例、下界和实际布局。
4. Explorer 在 task lexicon 发布首批正向局面材料后，Designer 才开始 baseline。材料可以直白；baseline 由 Designer 独立整理成清楚、可独立游玩的关卡。
5. 保存 dispatch、task lexicon、索引与 batch refs。Designer 出现新的局部材料缺口时，写一份新的结构空间 request；每次派发都沿用同一合同，explorer artifact 只登记合同产物引用。

## Designer 的委派边界

只把以下工作派给 explorer：

- 围绕指定对象、形状、墙口、边界、站位或动作后局面展开结构谱；
- 手摆局部 patch，运行 runtime、短 replay、有限状态图或反事实工具；
- 提取“开始摆法 -> 关键动作 -> 动后局面 -> 最小用法”的正向设计语料；
- 比较近邻变体、合并重复材料，并列出下一批可采样的结构轴。

Designer 自己完成：

- 从人类种子定义体验核心、作品身份和当前节点的设计问题；
- 从材料中提取核心逻辑，修改坐标、形状、对象关系与消费方式；
- 设计完整 layout、包装、节奏、开局、高潮和结束；
- 从玩家侧读取当前 exact，判断审美缺点、难度、family 去留与是否送审；
- 对 explorer 没有直接给出的结构自行手画和继续设计。

Request 必须是待展开的局部设计空间，例如“L 形黏块在不同墙口朝向与站位下的可动性谱”。难度目标、完整候选、当前 exact、family 去留和作品比较留在 Designer 的正式设计循环中。先把当前候选暴露的问题抽象成与其坐标和包装无关的结构关系，再委派采样。

Explorer 每批汇报新增材料数量与结构轴覆盖。新增为零时，Designer 继续给出新的结构轴、改造已有材料或自行构造。显式遵守 task exploration 合同的 `$sokoban-mechanism-lab` 产物具有 explorer artifact 身份；Designer artifacts 承载完整布局、推荐、评价和方向结论。

## Baseline

一次只推进一个工作节点。以首批局部结构语料、体验核心和作品身份作为节点 brief 建立 baseline 工作节点，然后进入单节点设计循环。不得因为它直白、接近某张材料卡或仍有扩展空间而强行增加内容。

阶段 B 确认 baseline 与体验核心一致后，将 exact version 冻结为根节点，并按教练的一段自然语言意见继续外层循环；若教练判断树已充分，停止生长。

冻结根节点后不可覆盖它。Baseline 可扩展不是阶段 A 缺点，教练也不能以“还能做得更复杂”为由拒绝根节点。

## 逐节点生长

教练每次只给一个最高优先关系。Controller 以教练指定的冻结节点和该方向建立新的工作节点，再进入同一个单节点设计循环。当前节点只实现：

- 让玩家主动构造核心前置局面的 `construct_prefix`；或
- 让核心结果反向约束此前构造的 `apply_suffix`。

机制不是第三个并列方向。可以自然增加允许机制，也可以采用教练点名的具体机制，但它必须改变当前前序选择或后继反约束；若主要体验转成机制碰撞，另开体验核心，不挂入当前树。

阶段 A raw packet 同时含冻结父节点与当前子节点的实际 artifact，但不含拟议方向或 designer 解释。阶段 A verdict 写定后，阶段 B 才知道 intended growth；未存活时只判断继续修订会不会把这个方向优化掉。

阶段 A 存活且阶段 B 接受时冻结子节点。阶段 A 未存活时，方向保持 note 不能冻结节点：方向仍在则按质量缺点修订，方向丢失则回到冻结父节点与原 brief 更换 family 或撤回。阶段 B 认为新增段落拼接时，丢弃或继续修订工作节点，父节点保持有效；失败尝试只进日志，不伪装成树节点。

Designer 不把教练意见改写成填空任务。保留它的自然语言判断，从中理解一个玩家关系并独立设计布局；不得为了过检而按 deadend 数量、步数或机制数量施工。

## Designer action 与重审

每轮独立审查后填写 `designer_action_N`。修订当前结构或更换结构 family 都回到当前工作节点的 Design Studio；形成新 exact version 后继续内层循环。

不把旧 reviewer、designer action 或修改说明传给新阶段 A。`reject_candidate` 只关闭当前工作节点，不影响冻结父节点。

当教练明确说不再存在具体、非拼接、仍由原核心主导的方向，或继续增加内容只会让核心退为材料时，把 `tree_state` 设为 `sufficient`。不机械要求树同时拥有前序和后继分支。

## 提交前工作流与待玩交付

设计树充分后，对每个冻结节点逐项处理 `design_handoff.yml` 中所有 `kind: pre_submission_check`。读取 authority docs，实际判断适用性、执行规定动作并保存 artifact；不适用项也记录可核验依据。

只读 workflow 保留 review。若 workflow 改变 exact version，只有 authority docs 预先允许该类变换保留 review且本次满足全部边界时，才能直接作为 delivery version；其它变化必须为该节点形成新 exact version，重跑必要硬证据、阶段 A 与阶段 B。不要覆盖冻结 artifact。

完成后必须同时：

- 把各 delivery version 写入 `studio/levels.yml` 或 `levels.yml`；
- 加入 `playable_queue.yml`，状态为 `pending_playtest`；
- 重建 playable 并确认每个 source/id 可解析；
- 按 `human-handoff-template.md` 输出设计树亲缘关系、节点差异和 artifact refs。

只有人类试玩可以填写 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。简报、YAML 自报状态或文件存在不能替代实际交付。
