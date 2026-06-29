# Ice Slide Escape 矿工设计灵感 Prior v3

状态：机制发现 + 设计灵感排序 prior。它不是质量分、验收门槛或课程覆盖证明。

本文档定义 `ice_slide_escape` 的当前矿工排序纪律。矿工仍保留一维规则探针，
但默认报告现在更偏向 designer 可拆解的二维结构：独立边缘出口、多 push 链、
混合机制链、异质 push 角色和分支 win DAG。

## 工具成熟度

```yaml
tool_id: ice_mechanic_probe_prior_v1
maturity: curated_miner
evidence_level: runtime_events_plus_complete_graph_plus_design_surface_hints
purpose: 为 designer 排序可复查的机制发现和结构灵感
not_for:
  - accepted gate
  - curriculum coverage
  - proof of teaching quality
  - proof of no bypass
  - proof of unique solution
  - proof that returned-solution events are necessary on every win path
  - proof that a low-prior mechanic is bad
```

## 硬门槛

一个 finding 进入排序列表前，必须满足：

```yaml
hard_gates:
  - layout_parses
  - explicit_player_start_present
  - explicit_player_goal_present
  - start_is_edge_cell
  - start_initially_standable
  - goal_is_edge_cell
  - solver_finds_win
  - returned_solution_replays
  - win_uses_specific_goal_cell
  - solution_has_successful_push_ice
  - solution_is_not_walk_only
  - graph_status_is_complete
```

二维样本还会拒绝 `player_start == player_goal` 的 finding。这个原型允许这种
solve instance 作为机器检查，但它对 designer 灵感帮助太低，且已有人工反馈
指出同起终点通常不是正式候选应保留的形态。

`graph_status_is_complete` 只表示当前可达状态图在预算内枚举完，足以报告状态数、
胜利状态数和 SCC 摘要。它不自动证明唯一解、不证明 no-bypass，也不证明返回解
里的机制事件对所有胜利路径必经。需要这些结论时必须进入二阶段验证。

## 标签

运行时机制标签来自返回解事件：

```yaml
runtime_tags:
  push_ice: required hard gate, no direct score weight
  short_stop_d1_d2: from ice_stop_short
  destroy_moving_ice_d3: from ice_destroyed_d3
  rebound_d4: from ice_rebound_d4
  pass_through_d5: from ice_pass_through_d5
  destroy_group_d6_plus: from ice_destroy_group_d6_plus
  restart_after_group: from slide_restart_after_group
  ice_blocks_ice_no_chain_push: direct runtime event
  boundary_disappear: from ice_boundary_disappear or ice_boundary_disappear_after_group
```

设计表面积标签来自样本形态、solve instance 和 SCC 摘要。它们只帮助排序和
阅读，不证明关卡品质：

```yaml
design_surface_tags:
  row_probe: 一维规则 witness，只适合校准距离语义
  two_dimensional_structure: 二维素材，可拆空间关系
  distinct_edge_goal: 起点和终点是不同边缘格
  same_start_goal: 同起终点；二维样本会被拒绝
  multi_push_chain: 返回解至少两次 push_ice
  mixed_mechanic_chain: 返回解包含至少三类非 walk / push_ice 机制事件
  heterogeneous_push_roles: 返回解中的 push 产生至少三类不同可观察角色
  branching_win_dag: SCC 摘要显示 win DAG 有分支
  stopper_cascade_candidate: 返回解同时含 d4、d5、d6、restart 和 ice stopper hit
```

`stopper_cascade_candidate` 不是自动好关标签。designer 必须继续证明哪个冰产物
被后续滑行消费、错序前缀是否死亡、出口路线是否只是走路尾巴。

## 默认排序

运行时基础权重：

```yaml
base_tag_weights:
  short_stop_d1_d2: 16
  destroy_moving_ice_d3: 12
  rebound_d4: 9
  pass_through_d5: 5
  destroy_group_d6_plus: 3
  restart_after_group: 8
  ice_blocks_ice_no_chain_push: 10
  boundary_disappear: -6
event_sequence_bonus:
  extra_push_ice_after_first: up_to_12
  extra_rebound_d4_after_first: up_to_8
  extra_destroy_moving_ice_d3_after_first: up_to_6
  ice_blocks_ice_no_chain_push_count: up_to_4
  mixed_non_walk_non_push_event_types_after_first: up_to_9
```

设计表面积调整：

```yaml
design_surface_adjustments:
  row_probe: -14
  two_dimensional_structure: +8
  distinct_edge_goal: +8
  same_start_goal: -18
  solution_cost_lte_2: -8
  second_push: +6
  third_or_later_push: +6
  mixed_mechanic_chain: +8
  heterogeneous_push_roles: +8
  stopper_cascade_candidate: +18
  branching_win_dag: +5
  initial_win_reachable_outgoing_gte_2: +4
  initial_dead_outgoing_gte_2: +4
  fully_forced_single_win_chain: -4
```

这些数字仍然只是搜索偏好。它们的目标是把 designer 更可能拆出结构关系的
finding 放到前面，而不是判断最终关卡质量。

## 采样器形态

当前采样器包含：

```yaml
samplers:
  - row_probes:
      purpose: 校准 d1/d2、d3、d4、d5、d6 和 ice stopper 的最小规则语义
      design_use: 不要直接当作布局灵感
  - two_dimensional_capsule_rooms:
      purpose: 生成小型二维房间、目标、障碍和多 push 材料
      change_in_v3: 默认雕出独立 edge start / edge goal
```

报告选择时，同一个 sample index 默认只保留最高分 finding，避免同图换出口刷屏。
单个 generator 也有软上限，避免某一种样本形态淹没报告。

## LLM 调用建议

CLI 默认调用会自动生成随机 seed，避免 agent 多次裸调用时反复看到同一批样本。
报告会打印实际 seed；需要复现时再显式传 `--seed`。

默认探索：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 72 --max-findings 12
```

复现某次报告：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --seed 271828 --iterations 72 --max-findings 12
```

LLM / designer 可以多次调用矿工寻找灵感。每次应记录 seed、排名前几名的
`start / goal`、带 `S / X` 标记的布局，以及自己从 finding 中抽出的结构假设；
不要只记录分数。

PowerShell 连跑三次示例：

```text
1..3 | ForEach-Object { npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 72 --max-findings 6 }
```

寻找 d4 / d5 / d6 handoff 灵感：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 96 --max-findings 16 --weight stopper_cascade_candidate=30 --weight mixed_mechanic_chain=12 --weight two_dimensional_structure=8 --graph-max-states 60000 --max-states 60000
```

只想看二维素材、压低一维 witness：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 96 --max-findings 16 --weight two_dimensional_structure=12 --weight row_probe=-30
```

探索低默认优先级分支时，显式改权重：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight pass_through_d5=20 --weight restart_after_group=8
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight destroy_group_d6_plus=20 --weight restart_after_group=8
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight boundary_disappear=18
```

只想先让 miner 按“返回解机制越多越靠前”排序：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 72 --max-findings 6 --weight row_probe=-500 --weight two_dimensional_structure=20 --weight multi_push_chain=120 --weight mixed_mechanic_chain=240 --weight heterogeneous_push_roles=500 --weight short_stop_d1_d2=100 --weight destroy_moving_ice_d3=100 --weight rebound_d4=100 --weight pass_through_d5=100 --weight destroy_group_d6_plus=100 --weight restart_after_group=100 --weight ice_blocks_ice_no_chain_push=100 --weight boundary_disappear=100
```

负权重只能降低排序，不能当作禁止机制的 hard ban。若本轮设计要求“只能用某些
机制，不能触发另一些机制”，应先用 miner 找候选，再对具体 layout 跑
`compare-starts-layout` 的 required / forbidden event 检查。

例如：目标候选必须使用 d4 rebound，不能触发 d3 destroy、d5 pass-through、
d6 group destroy、restart 或 boundary disappearance：

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape candidate.txt --player-goal x,y --starts a,b --required-events ice_rebound_d4 --forbidden-events ice_destroyed_d3,ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group --max-states 12000 --max-depth 100 --graph-max-states 12000
```

如果报告中：

```text
机器闸门: pass
缺少 required events 的胜利路径: 未找到；完整搜索
触发 forbidden events 的胜利路径: 未找到；完整搜索
```

才可以把它读作“当前预算内，所有胜利路径都满足 required / forbidden 约束”。
如果图或 product search 超预算，结论是 `unknown`，不能降级成 pass。

## 报告解读

高 `rankingPriorScore` 应读作：

```text
这个 finding 符合当前机制发现 / 设计灵感搜索偏好，值得 designer 复查。
```

不要读作：

```text
这是好关。
这已经教学成功。
这没有 bypass。
这个分支比低分分支更适合最终流程。
```

正式候选仍然必须按具体 experiment brief 运行 explain、start comparison、
required / forbidden event 检查、prefix probe、critic loop 和人工审美判断。
