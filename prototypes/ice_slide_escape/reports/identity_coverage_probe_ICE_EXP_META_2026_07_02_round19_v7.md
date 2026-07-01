# 身份覆盖全路径探针：ICE_EXP_META_2026_07_02_round19_v7

- 布局：prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- 方法：使用身份保持模拟器进行 product search。状态键包含玩家位置、每个命名冰块的位置/死亡、墙状态，以及已覆盖的核心身份事件计数。
- 搜索目标：寻找胜利路径反例，即 base 不使用 `core_rebound_ice` 的 d4，或 meta 未使用 `core_rebound_ice` 三次 d4 / 未使用 d3。

```yaml
base_returned_trace_core_d4: 1
meta_returned_trace_core_d4: 3
meta_returned_trace_d3: 1
base_counterexample_search_status: complete
base_product_states_visited: 780
base_identity_state_keys: 651
base_winning_paths_observed: 4
base_good_winning_paths_observed: 4
meta_counterexample_search_status: complete
meta_product_states_visited: 1480
meta_identity_state_keys: 1070
meta_winning_paths_observed: 2
meta_good_winning_paths_observed: 2
```

## 结果

| Instance | 反例搜索 | Product states | Identity states | 观察到的 winning 覆盖数 | 结论 |
| --- | --- | ---: | ---: | ---: | --- |
| A->B | complete | 780 | 651 | 4 | 未找到缺少 `core_rebound_ice` d4 的胜利路径 |
| C->D | complete | 1480 | 1070 | 2 | 未找到缺少 `core_rebound_ice` 三次 d4 + d3 的胜利路径 |

## 证据边界

```text
本探针是按当前机制规则复写的身份保持搜索，用于补足 runtime 状态键不保留冰身份的问题。
它在深度 140 / 200000 product-state 预算内完成搜索；若后续 runtime 规则改变，应重新运行。
它仍不是独立 critic verdict，只能支持“同一核心冰三次 d4 是胜利路径要求的一部分”的硬证据。
```
