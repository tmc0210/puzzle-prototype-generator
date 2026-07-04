# Fresh Design Claim: RA_EXP_2026_07_04_PHASE_FERRY_v0

```yaml
prototype: reality_anchor
claim_id: RA_EXP_2026_07_04_PHASE_FERRY_v0
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  clean_archive_context:
    positive_anchor:
      - RA_CAND_0001
    negative_anchor_none_found: true
  candidate_relation: fresh
  forbidden_source_use:
    - 不从 RA_CAND_0001 的布局骨架、上方封脸 M、下方把手、右侧 P/L 收尾因果链派生。
    - 不从 RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2 的水平 lockstep / 连续右推 B/S 收束链派生。
```

## 设计目标

后期 support-none challenge；同关同时存在且实际使用一个 P/L 和一个 B/S。
允许使用 Reality Anchor 当前全部规则。因可用归档校准仍只有一个正例，本轮不输出
数值审美或难度结论。

## Player Insight

玩家侧目标是读出“材料渡运”而不是单纯把物体推到目标上：B/S 的位置决定某个材料
在箱/黏之间转换并被临时组成可移动刚体；P/L 则让玩家在另一侧把已经制造出的材料
状态回拉或收束。两个锚点的作用应前后相扣，而不是各自完成一个独立小任务。

## Causal Chain

1. 早段必须移动 B/S，让至少一个物体经历 `box_to_sticky` 或 `sticky_to_box`，形成材料债务。
2. 中段必须出现 `sticky_merge`，把材料债务转成新的刚体关系。
3. P/L 的移动或 pull 事件必须改变玩家能施力的位置或方向，承担后续收束责任。
4. 终局目标覆盖应同时消耗材料重组结果和 P/L / B/S 中至少一个锚点的位置变化。

## Required / Forbidden Evidence

```yaml
required_winning_path_events:
  - anchor_boundary_shift:push_pull
  - anchor_boundary_shift:box_sticky
  - pull_object
  - material_normalization
  - sticky_merge
  - move_sticky_rigid
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
nonclaims:
  - 不声明唯一路线。
  - 不声明对象实例在所有胜路中必经。
  - 不声明逐目标覆盖对象身份。
```

## Why Not Execution

如果候选成立，困难应来自材料状态和施力区域的互相消费：玩家必须先制造可被后续
P/L 或 B/S 位置利用的材料关系，再用另一锚点完成收束。单纯长走位、连续同向推锚点、
或两个锚点各做各的，都应被 critic 视作失败或降级。

## Falsification

- 全事件组探针发现任一 required group 可被胜路绕过。
- critic 认为 B/S 与 P/L 没有同一因果链，只是并列展示。
- critic 认为材料转换只是 returned trace 装饰，玩家可靠局部最近动作执行取胜。
- 布局骨架或因果链过近于 RA_CAND_0001 或 DUAL_LOCKSTEP_v2。
