# Designer Action: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
review_iteration: review_1
decision: submit_as_qualified_candidate
evidence_review: supports_with_caveats
evidence_required_action: none
puzzle_critic: pass_candidate
aesthetic_floor_4: supported_low_4
difficulty_gate: supported
base_difficulty: "2"
meta_difficulty: "3"
```

## 提交结论

v38 作为本轮合格候选提交。它使用中心几何错位修补 v34/v37 的右侧自足问题：右侧目标债仍存在，但 `x10` 封口与 `x8/x9` 绕道使主右目标 `[9,5]` 成为 meta 必经的第二目标债。

## 核心证据

- Base A `[0,5]` -> B `[11,10]`：strict gate pass，cost 24，complete graph，forbidden winning/reachable late events none。
- Meta C `[23,4]` -> D `[11,10]`：required gate pass，cost 36，complete graph，所有胜利路径覆盖 d6+、d3、d2 short-stop。
- Object debt probe：若 `[21,5]` 或 `[9,5]` 任一目标格全程不空，则完整受限搜索无胜利；`[5,5]` control 有胜利路径。
- Puzzle critic 判定审美 4 下沿可支持，base 难度 2、meta 难度 3。

## 提交边界

- B/D 同格只作为中性共享出口，不作为 aesthetic bonus。
- Object-debt claim 只声明目标格债务必要性，不声明具体冰实例身份。
- Base early/clean 只按列出的 forbidden events 解释，不扩写成无任何边界消失类事件。
