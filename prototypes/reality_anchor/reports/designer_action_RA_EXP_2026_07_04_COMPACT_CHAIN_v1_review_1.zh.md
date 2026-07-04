# Designer Action: RA_EXP_2026_07_04_COMPACT_CHAIN_v1 / review_1

```yaml
candidate_version: RA_EXP_2026_07_04_COMPACT_CHAIN_v1
review_iteration: review_1
evidence_review_artifact: evidence_review_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review_1.md
puzzle_critic_artifact: puzzle_critic_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review_1.md
decision: revise_claim
next_review_iteration: review_2
layout_changed: false
evidence_rerun_required: false
```

## Review Result

Evidence reviewer 结论：

```yaml
verdict: unknown
review_loop_state: revise_required
required_action: downgrade_or_hold
```

Reviewer 支持的硬证据：

- 返回解存在且包含六个核心事件组。
- combined probe 与六个 individual probes 均 `complete` 且未找到 winning bypass。
- graph / agency / SCC 证据完整。
- packet 没有声明唯一路线、对象实例必要性、逐目标覆盖身份固定或改性材料直接覆盖目标。

Reviewer 打回点：

- `材料链必须先被消费，P/L 才能完成终局覆盖` 被写成了全胜路顺序/因果 claim；当前 probe 只能证明事件组必经，不能证明所有胜路中的 temporal order / happens-before。
- `P/L 终局收束` 只能由返回 trace 支持，不能声明为所有胜路中的终局顺序。
- SCC/solver 事实不能直接升级为玩家洞见证明。

Puzzle critic 结论：

```yaml
verdict: supports_with_noncore_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
```

critic 可接受当前 lower-burden 定位下 P/L 作为终局收束锚，但要求不要把 P/L 包装成与 B/S 等权的主矛盾，也不要把 graph 数字当成玩家侧质量证明。

## Action

不改 layout，改 claim 和 packet：

- 全胜路层面只声明六个事件组必经。
- 返回解层面展示材料转换、B/S 位移、sticky merge、P/L pull 的顺序。
- 玩家侧 claim 改成“短链读法 / 事件组都必须被处理”，不声明所有胜路固定顺序或固定目标覆盖身份。
- `allowed_exposure_through` 改为 brief context，不作为可被 evidence reviewer 硬证明的 exposure gate。
- 保留无分数策略：clean archive 只有一个人类正例，没有负例/下界。

