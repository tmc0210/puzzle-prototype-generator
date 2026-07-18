# Opening Comfort / 开局缓冲

状态：`reality_anchor` 原型专属的提交前检查 / feedback-routed revision 检查。它不是通用 Sokoban 规则；但一旦 Reality Anchor handoff 声明并触发它，必须在提交给人类查看或加入待玩列表前执行并记录结果；它不进入 reviewer / critic packet。

设计 taste：

```text
玩家开局不应第一步就被迫或被自然诱导进入关键不可逆承诺。预期难度 3 / 4 的关卡通常应允许玩家在核心区域外一两步观察、站位和读图。
```

图和 SCC 关联：

- 查看 initial SCC，而不是只看初始状态。
- `initial_scc_size` 表示开局可逆观察空间大小。
- `initial_scc_exit_count` 表示开局区域有哪些不可逆承诺点。
- `initial_exit_source_distances` 表示从真实初始状态到每个不可逆出口源状态的最短距离。
- `initial_win_exit_source_distances` 表示从真实初始状态到每个仍可通关的不可逆出口源状态的最短距离。
- `dead_exits_before_first_win_exit` 表示玩家在到达第一个可胜利不可逆出口前，会先接触到多少个死路不可逆出口。

重要区别：

```text
存在距离 0 的不可逆出口
  不一定坏。

真实起点没有任何可逆观察空间，或最自然第一步就是关键不可逆动作
  往往会让开局显得贴脸、粗糙或误触惩罚过强。
```

进一步区别：

```text
nearest_irreversible_exit_distance
  衡量玩家多久会遇到第一个不可逆承诺。

nearest_win_reaching_exit_distance
  衡量玩家多久会遇到第一个正确方向的不可逆承诺。

两者差距很大，或正确出口前有多个 dead exits
  可能代表“先看锁、试错、再找钥匙”的戏剧化开局；
  也可能代表早期惩罚过重。
```

设计使用：

- Discovery / witness 可以故意贴脸触发机制。
- 预期难度 3 / 4 的关卡更常需要 `nearest irreversible exit >= 1` 或至少有非平凡 initial SCC。
- 这类问题特别适合 LLM 精修：
  - 微调玩家起点；
  - 给起点附近开一格可逆观察空间；
  - 移动起点使玩家先看到核心结构再做承诺；
  - 保持核心因果链和关键对象位置不变，避免把精修变成重做关卡。
- 精修后必须重跑 solver / SCC，确认可解性、目标事件必要性和核心链条没有被破坏。

更好的实践不是只在原起点附近试一两个位置，而是枚举 initial SCC 中所有可作为玩家起点的状态：

```text
原始关卡
-> 完整图
-> initial SCC
-> 对 initial SCC 中的每个玩家位置生成起点候选
-> 重新运行 solver / analyzer
-> 比较 opening comfort、核心链条、目标事件和读题顺序
```

候选起点报告至少应包含：

```text
candidate_start_position
shortest_solution_delta
initial_scc_size
initial_exit_source_distances
initial_win_exit_source_distances
dead_exits_before_first_win_exit
first_step_legal_events
whether_core_chain_preserved
```

这类枚举仍然不是自动选美。它给 lead designer / LLM 提供一组可验证候选：有的起点更温和，有的起点先展示目标 / 锁结构但会暴露早期 dead exits。最终选择应结合关卡阶段、玩家模型和设计意图。
