# 冰块身份回放探针：ICE_EXP_META_2026_07_02_round19_v7

- 布局：prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- 方法：对 analyzer 返回的 base / meta 输入序列做带身份的单 trace 回放，并把回放事件序列与 analyzer JSON 中的事件序列比较。
- 基础流程事件回放匹配 analyzer：true
- 回访流程事件回放匹配 analyzer：true

## 初始冰块 ID

| 冰块 ID | 初始位置 | 阅读角色 |
| --- | --- | --- |
| top_right_ice | [6,1] | 上侧/右侧潜伏冰 |
| core_rebound_ice | [2,2] | base/meta 共享的核心 d4 冰 |
| right_exit_ice | [7,5] | meta 出口侧收束冰 |
| lower_cleanup_ice | [5,6] | meta 开局清理冰 |

## 基础流程 A->B 推冰 trace

| 推冰步号 | 输入 | 冰块 ID | 起点 | 距离 / 障碍 | 分支事件 | 结果 |
| ---: | --- | --- | --- | --- | --- | --- |
| 3 | right | core_rebound_ice | [2,2] | d4 vs wall at [7,2] | ice_rebound_d4 | [5,2] |

## 回访流程 C->D 推冰 trace

| 推冰步号 | 输入 | 冰块 ID | 起点 | 距离 / 障碍 | 分支事件 | 结果 |
| ---: | --- | --- | --- | --- | --- | --- |
| 3 | left | lower_cleanup_ice | [5,6] | d3 vs wall at [1,6] | ice_destroyed_d3 | destroyed |
| 14 | right | core_rebound_ice | [2,2] | d4 vs wall at [7,2] | ice_rebound_d4 | [5,2] |
| 19 | down | core_rebound_ice | [5,2] | d4 vs wall at [5,7] | ice_rebound_d4 | [5,5] |
| 26 | up | core_rebound_ice | [5,5] | d4 vs wall at [5,0] | ice_rebound_d4 | [5,2] |
| 30 | up | right_exit_ice | [7,5] | d1 vs wall at [7,3] | ice_stop_short:d1 | [7,4] |

```yaml
base_returned_trace_event_match: true
meta_returned_trace_event_match: true
base_d4_ice_ids:
  - core_rebound_ice
meta_d4_ice_ids:
  - core_rebound_ice
  - core_rebound_ice
  - core_rebound_ice
meta_three_d4_same_ice: true
base_and_meta_core_d4_same_initial_ice: true
evidence_scope: returned_trace_identity_replay
all_winning_traces_identity_claim: not_proven
```

解释：

```text
返回的 meta trace 中，三次 ice_rebound_d4 都来自 core_rebound_ice。
这块冰也是 base 一推 d4 使用的同一初始冰。该探针支持玩家侧 claim：
回访时不是碰巧又做了三次 d4，而是在旧 base 已见的核心冰/target 关系上，
为了抵达 D 进行重复重读和位置再组织。

证据边界：这是对返回解 trace 的身份回放证明，不是“所有可胜利路径都必须使用
同一冰身份模式”的全路径证明。
```
