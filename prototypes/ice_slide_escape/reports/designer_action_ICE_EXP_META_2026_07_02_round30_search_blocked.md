# Designer Action: ICE_EXP_META_2026_07_02_round30_search_blocked

```yaml
review_iteration: round30_search
prototype: ice_slide_escape
designer_role: lead_designer
review_loop_state: revise_required
required_action: change_family_or_structural_redesign
proposal_ready: false
```

## Context

round29 `fresh_return_gate_v1` 已有完整机器证据，但独立 puzzle critic 在 review_2 中要求结构性修改：

- base 被读成两个同构 borrow/repay 小门，难度不足。
- meta 像 lower lane 加 final return gate，不是强同结构重读。
- `B=C / D=A` 缺少足够 return pressure。

因此 round29 不能作为最终候选提交。

## Round30 Explored Candidates

### L 型共享中庭 / d4 target debt

```yaml
source_layout: prototypes/ice_slide_escape/reports/worker_fresh_chain3_d4_target_debt_v3_layout.txt
A: [0, 7]
B: [21, 5]
C: [6, 0]
D: [5, 21]
```

优点：

- 所有 ice 都在 target 上，且无裸 `I` / `G`。
- edge floor 只有四个接口。
- A->B 与 C->D 均可解，完整图为 5950 states / 1 win。
- base 与 meta 的 required `ice_rebound_d4` 检查均 pass。
- base 可达扫描未命中 d5 / restart / d6 / boundary forbidden events。
- 初始 `*` 作为障碍时，A->B 与 C->D 纯步行均不可达；把 `*` 当地板时可达。

阻塞问题：

- edge scan 发现 risky internal non-target pairs：
  - A->C cost 23
  - A->D cost 27
- A->D 的短解只消费下方 S 目标债，说明 A 起点能抢走 meta 竖臂。
- Laplace 子代理尝试单格、二格、三格局部修复和新增单个 `*`，未找到同时保留 A->B / C->D 且消除 A->C / A->D 的变体。
- 结构原因：C->D 需要开放 `[6,7]..[6,10]` 竖向 d4 滑道；一旦开放，A 在解上方债务后也能进入下竖井。

结论：硬证据有价值，但接口泄漏阻塞正式提交。

### 同出口退路 / 顶部目标门

```yaml
A: [0, 7]
B: [21, 5]
C: [6, 0]
D: [21, 5]
```

优点：

- A->B 与 C->D 可解。
- A->C 与 C->A 不可解。
- 所有 ice 都在 target 上，初始目标冰封锁起终点纯步行路径。

阻塞问题：

- `B=D` 同格，meta 读作“换入口去同一出口”。
- 独立 critic 判定 `not_worth_formal_review` / `reject_or_change_family`。
- 两条流程都是同质 4 次 d4 target-door 应用，没有足够证据支撑至少一条难度 4 或审美 4 保底。

结论：接口较干净，但 meta-first 价值不足，不能作为 round30 正式候选。

### Ampere Y-gate 基线

优点：

- all-target d4 硬门槛可运行。
- base/meta required d4 与 forbidden reachable 检查可过。

阻塞问题：

- `B=D` 同出口汇流。
- meta 仍是同类 d4 债务链，未形成异质角色重读。
- 子代理明确标记为不可当最终候选提交。

## Current Decision

不提交 proposal_ready 候选。当前最诚实的状态是：

```yaml
status: blocked_by_design_quality
latest_valid_review_loop_state: revise_required
next_step: change_family_or_build_larger_one-way_shared_structure
```

下一轮应避免继续小修 L 型下竖井，改做更大结构：

- C 入口需要可恢复目标门，且最终状态阻断 A->C。
- meta 竖臂需要类似单向目标门，阻断 A->D，同时不破坏 C->D。
- 至少一个目标/冰必须在 A->B 与 C->D 中承担不同核心角色，而不是只共享 d4 target-door 语法。
