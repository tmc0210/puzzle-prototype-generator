# ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour 对象债务探针

## 范围

- Prototype: `ice_slide_escape`
- Layout: `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt`
- Meta start: `[23, 4]`
- Goal: `[11, 10]`
- Win condition: player at goal and every target filled.

## 探针方法

在完整 BFS 中额外加入一个约束：若某个指定目标格在任一后继状态中没有冰，则丢弃该后继。若该受限图完整搜索无胜利，则说明所有胜利路径都必须让该目标格至少空过一次，也就是必须产生该目标债务。

## 结果

```yaml
avoid_empty_target_21_5:
  target: [21, 5]
  found_winning_path: false
  explored_states: 619
  legal_transitions_seen: 1940
  status: complete_no_win
  interpretation: "Meta 必须借出右侧目标冰；右目标债不是可选动作。"

avoid_empty_target_9_5:
  target: [9, 5]
  found_winning_path: false
  explored_states: 3785
  legal_transitions_seen: 11764
  status: complete_no_win
  interpretation: "Meta 必须让主右目标空过；x10 封口与 x8 绕道使该目标成为进入终点下层的真实门。"

control_avoid_empty_target_5_5:
  target: [5, 5]
  found_winning_path: true
  cost: 36
  interpretation: "该探针不是把所有上排目标都强制成债务；它区分了 v38 的实际必要债务对象。"
```

## 证据边界

- 该探针证明的是“目标格至少空过一次”的必要性，不证明具体冰实例身份。
- 对象叙事仍应以返回 trace 为主；all-solution 层面只声明 `[21,5]` 与 `[9,5]` 两个目标格的债务必要性。
