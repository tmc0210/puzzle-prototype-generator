# Designer Action: ICE_EXP_META_2026_07_02_round31_search_notes

```yaml
review_iteration: round31_search
prototype: ice_slide_escape
designer_role: lead_designer
review_loop_state: structural_redesign_needed
required_action: continue_search
proposal_ready: false
```

## Search Result

本轮继续 round30 后的结构搜索，仍未得到可提交候选。没有生成正式 `candidate_packet`，也没有把任何候选送入 proposal-ready review。

## New Evidence From This Pass

### Distinct Four-Interface d4 Families

Hooke 与本地复核都显示：只要 A 侧能进入共享中庭并 C->D 需要同一条竖向 d4 滑道，A->D 很容易复现。

失败模式：

- A->B 与 C->D 均可解。
- all-target-on-ice 与 pure-walk lock 可满足。
- 但 A->C / A->D 会作为 risky internal non-target pair 出现。

代表失败：

```yaml
layout_family: L_shared_courtyard
blocking_pairs:
  - A->C
  - A->D
root_cause: >
  C->D 需要开放竖向滑道；A 解开中心门后可以进入同一滑道，
  从而抢走 meta 出口。
```

### Same-Exit Workarounds

把 `D` 合到 `B` 可以减少接口泄漏，但独立 critic 已判定不值得正式送审：

```yaml
verdict: not_worth_formal_review
required_action: reject_or_change_family
reason: >
  B=D 读作换入口去同一出口，meta-first 重读不足；两条流程仍是同质 d4 target-door 应用。
```

### Pauli Hard-Clean Baseline

Pauli 找到一个 hard-clean 的 all-target-on-ice 变体：

- A->B / C->D 可解。
- base required d4 与 forbidden reachable 检查可过。
- A->C / A->D / B->C / B->D 完整搜索不可解。
- edge floor 只有 A/B/C/D。

不采用原因：

- 结构仍像 round28 的上下镜像链家族。
- meta 异质性主要来自 no-chain d4 锚点，而不是强角色重读。
- 审美自评只有 3+/4-，不足以稳送“审美 4 保底追 5”。

### Shifted Airlock / Static-Anchor Reuse

本地测试了一个有价值的新原语：

```yaml
idea: >
  base 把某个 target ice 当作 d4 静态障碍；
  meta 从上方或侧面把同一 target ice 横向借走作为入口门。
```

最小测试中：

- base A->B 可解，保持 all-target-on-ice airlock 语法。
- C->B 可解但太短，只用了顶部目标门加少量 d4。
- C->A 不通，说明它还不是完整 return/meta 流程。

保留价值：

- 这是目前最接近“同一目标冰在 base/meta 中承担不同角色”的新原语。
- 下一轮应围绕它构造第二个可恢复出口门，而不是回到镜像链。

## Next Structural Direction

```yaml
next_family: double_recoverable_role_gate
requirements:
  - base_static_anchor: target ice in base is a d4 obstacle, not moved
  - meta_entry_gate: same target ice is borrowed/restored as a gate
  - meta_exit_gate: second recoverable gate leaves C->D player on D side after all targets are restored
  - A_side_block: A cannot reach the meta exit gate's operative side
  - no_same_exit_shortcut: avoid B=D unless there is strong external return pressure
```

本轮结论：继续搜索，不提交候选。
