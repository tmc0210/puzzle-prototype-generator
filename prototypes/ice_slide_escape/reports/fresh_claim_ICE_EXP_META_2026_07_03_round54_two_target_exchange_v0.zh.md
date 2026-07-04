# ICE_EXP_META_2026_07_03_round54_two_target_exchange_v0 fresh claim

```yaml
candidate_family: two_target_exchange_d6_internalized
prototype: ice_slide_escape
design_mode: meta_first_design
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
```

## 设计目标

- A/B/C/D 全部分离。
- 所有目标初始均有冰；目标覆盖同时作为路径锁。
- base 使用 d6 前或更早知识，完整可达扫描不得命中 d5 pass、restart、d6+。
- meta 使用 d6+/restart，但 d6 不能只是打开接近角；d6 产物或破坏结果必须被后续核心动作消费。
- 避免多个 spare 补位冰；允许二目标，但第二目标必须同时承担 base 障碍 / meta 替代物 / D 门状态之一。

## Fresh Design Claim

```yaml
player_insight: >
  玩家需要理解两个目标冰之间的角色交换，而不是重复 target-debt 补位。
  base 中，目标冰 T1 作为通道门被移开并回封；目标冰 T2 作为 T1 的反弹障碍或
  stopper 参与回封，而不是被独立“补回”。meta 中，d6+/restart 改变 T2 或其位置，
  使 T1 的回封条件和 D 的可达条件同时发生变化。

causal_chain:
  base:
    - "T1 初始封住 A->B 主通道；推走 T1 释放路线但制造唯一 target debt。"
    - "T2 初始覆盖另一个目标，同时提供 T1 回封所需的反弹/stopper 几何。"
    - "T1 回封后，玩家位于 B 侧；D 不应在 base 胜利状态可达。"
  meta:
    - "C 侧先用 d6+/restart 改写 T2 或 T2 附近障碍，使 T2 的原 base 角色失效或转移。"
    - "d6 产物或被释放的 T2 必须成为 T1 回封或 D 开门所需状态；若 d6 后只 walk 到门核，则失败。"
    - "最终到 D 需要两个条件：目标重新覆盖，且 meta-only 状态打开 D。"

why_not_execution: >
  若 meta 解法是“d6 开入口 -> 原样做 base 门核 -> 走 D”，则失败。
  若某个冰只承担单纯补位，或两个目标分别完成两个独立小步骤，则失败。
  若 D 对 A/B 可达，或者 B/D 只是开放区相邻边缘点，则接口失败。

required_or_forbidden_events:
  base_required_winning_events:
    - ice_rebound_d4
    - "or ice_destroyed_d3/ice_stop_short if concrete layout changes, but no d5/restart/d6+"
  base_forbidden_if_seen_anywhere:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  meta_required_winning_events:
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
    - "a reused early event such as ice_rebound_d4 or ice_stop_short"

falsification:
  - "存在 C->D 胜利路径含 d6/restart，但 d6 后产物/破坏结果不被后续 push 或 D 门状态消费，则 meta claim 失败。"
  - "存在 A->D、B->D 或接口外 edge goal 胜利路径抢走 D，则接口 claim 失败。"
  - "base 可达事件扫描命中 d5/restart/d6+，则 base 窗口失败。"
  - "returned solution 中出现两个以上同构 target-debt 回填步骤，则审美 claim 失败。"
```

## 本轮工具问题

1. 是否能在 2 个目标、2-4 枚冰内形成 base 门核与 meta D 二条件门？
2. d6 产物是否能被 runtime trace 证明参与后续核心动作，而非停在无关位置？
3. D 是否能放在回封后的玩家侧，同时不让 A/B 在 base 状态抢到？
4. 是否存在比局部 v4 更强的 cross-visit role switch，而不是 d6 opener + base replay？
