# Candle Sokoban Designer 合同

状态：当前 Candle Sokoban 特定原型关卡设计权威入口。

本合同只定义当前原型的规则、设计输入边界和硬证据要求。完整单关必须通过
`$sokoban-level-design-studio` 启动；本文件不替代体验简报、玩家前序或单关审查。

## 权威来源

按以下顺序解释事实：

1. `src/prototypes/candle_sokoban/mechanics.ts`：实际状态转移与结算权威；
2. `prototypes/candle_sokoban/mechanic.yml`：runtime 事件名称权威；
3. `prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml`：机制暴露硬门；
4. 当前 exact version 的原始 replay、完整可达图与审计 artifact。

`knowledge.yml` 与 `curriculum.yml` 仅为通用包 schema 的兼容占位，禁止作为规则、
玩家知识、课程顺序、关卡要求或审查证据。`levels.yml` 中所有关卡都是 runtime
诊断探针，不是课程关、设计模板或审美校准样本。

## 正式关卡合同

- 胜利条件固定为：玩家存活，并在完整回合结算后点亮全部火盆。
- 正式候选不得使用 `event_occurs` 胜利条件。
- `global_burn_cycle` 固定为 `5`。
- 初始布局不得依赖静默点火、灭火或点盆；解析器会拒绝这种布局。
- 无效输入不产生合法 runtime edge，也不推进倒计时。
- undo 是 playable 操作能力，不属于 puzzle runtime、机制暴露或完整可达图。

## ASCII 与对象

```text
@       玩家
#       墙
o / O   未点亮 / 已点亮火盆
111r    向右、未点燃的多格蜡烛
L222    向左、已点燃的多格蜡烛
u r d l 单格未点燃蜡烛
U R D L 单格已点燃蜡烛
```

数字 `1` 到 `9` 只用于区分不同的多格蜡烛。大小写表示是否点燃。蜡烛 cap
方向之外相邻一格是逻辑烛芯投影，不单独占实体，也不直接画在 ASCII 中。

## 单次行动结算

每次合法行动按以下顺序结算：

1. 玩家走动、沿轴推动一格，或从侧面触发完整滚动；
2. 轴推后结算一次接触；滚动则每个小步分别结算接触，直到下一步被实体阻挡；
3. 接触结算先熄灭被墙或其他烛身遮住的已燃烛芯；
4. 已点亮火盆与外露已燃烛芯作为火源，递归结算同格点火与点盆；
5. 全局倒计时推进一次；从 `1` 进入燃烧边界时，所有此刻仍点燃的蜡烛一起
   从烛芯端缩短一格，单格蜡烛燃尽消失；
6. 结算玩家死亡，再检查全部火盆是否点亮。

滚动距离不改变行动成本：多格滚动仍只推进一次全局倒计时。滚动中间小步发生的
点盆、点火和灭火都真实改变后续小步，但不会让滚动提前停止。

## 机制暴露硬门

每个设计任务必须声明 `allowed_exposure_through`，其值来自
`mechanic_exposure_sequence.yml` 的一个 `branch`。

- 每个 branch 表示一个玩家可理解、可独立设计的机制家族，不表示单个诊断事件；
- 同一家族中自然共现的来源标签、边界结算标签和组合摘要合并在同一 branch；
- 该 branch 及之前家族的事件允许可达；
- 所有更晚 branch 家族的事件在当前 exact version 的全部可达边上必须完全不可达；
- 只检查规范解、最短解或抽样路径不构成通过；
- 只有 graph `complete` 且没有 later-event hit 才是 `pass`；
- graph `exhausted` 且未命中只能是 `unknown`；
- 任意 later event 已命中时，即使图未完整也可直接判 `fail`。

当前家族顺序固定为：`basic_candle_manipulation`、`wall_dousing`、
`shared_fire_and_reignition`、`body_concealment_and_reexposure`、
`retreating_flame_transfer`、`rolling_contact_chain`。

侧滚属于基础操控，不单独占据课程门；基础阶段允许用一步终局、火盆实体挡块或无墙边界
短暂遮蔽墙体灭火，但 `wall_dousing` 必须紧随其后，不得要求多个后续阶段长期规避这一
自然边界结果。墙体灭火与烛身灭火分别放置：前者是封闭地图中轴推的早期自然结果，后者
要求多蜡烛空间关系，并进一步带来可逆遮蔽和未燃重曝。

详细 runtime 事件仍保留作机械证据，但只有上述六个玩家知识家族取得课程阶段身份。

使用 Candle 专属 exposure audit 保存 JSON。送交 Evidence Reviewer 的 artifact 必须
包含 exact version、layout digest、暴露序列 digest、完整节点键与原始边事件。

事件出现只证明机制可达，不证明它必经、被有效使用、有难度或值得做成关卡。
这些更强声明必须由当前 exact 的解族、对象参与、作品身份证据和独立审查分别支持。

## 原型专属审美校准
原型机制和步数计算相关，因此：
1. 长步行或解法中高步行比例不构成负面审美
2. 原地来回移动消耗倒计时不构成负面审美

## 设计来源边界

允许：

- 本合同列出的权威来源；
- 当前任务由 `$sokoban-mechanism-lab` 以 `mechanism_explore/task_local` 正式发布的
  lexicon 与原始 runtime evidence；
- Controller 为当前阶段明确提供的完整玩家前序和 clean archive 校准视图。

禁止：

- `knowledge.yml`、`curriculum.yml`；
- `levels.yml` 诊断探针作为布局模板、候选或审美正例；
- `mechanism_lab/cases.yml` 作为已发布设计语料；
- 旧 Candle 报告、旧候选、未归档 review 或外部知识文档，除非人类在当前 brief
  中逐项授权。

## 工具边界

当前已实现：runtime adapter、ASCII parser/renderer、solver、完整图枚举、
layout analyzer、runtime-backed playable、诊断 probes 与 exposure audit。

当前未实现：Candle 专属 miner、candidate factory、PuzzleScript exporter/checker。
这些缺口不阻塞人工单关设计，也不得用其它原型导出的 PuzzleScript 结果替代
Candle runtime 证据。

解族等价、对象责任和作品身份依赖候选的具体结构，允许 Designer 为当前任务写
task-local 诊断脚本；它们必须引用当前 exact，并把原始输出交给 Evidence Reviewer。

## 提交前机械规范化

候选经 Critic 接受后，Designer 停止工作。Controller 按
`redundant_element_prune.md` 穷举整根蜡烛与单个火盆，并只从有限结构类别提取普通空地
候选；只应用取得完整保持证明的规范化，不逐格扫描全部普通空地，也不移动或比较玩家起点。

蜡烛即使自行产生点燃、缩短或燃尽事件也必须接受整根删除反事实。比较时使用对象擦除
投影；只有跨对象、路线、倒数或胜利影响才构成机械职责，纯粹的自发事件数量不构成职责。

任何普通空地改墙都必须额外证明新墙没有在完整可达图中制造新的遮芯灭火、复燃、
点盆、缩短或来源归因。反事实失败或证据不足时保留原样，不产生设计修订或新的独立审查。
