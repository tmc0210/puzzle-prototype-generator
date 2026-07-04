# Designer Action: RA_EXP_2026_07_04_SOFT_HANDOFF_v2 review_1

```yaml
candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v2
review_iteration: review_1
evidence_reviewer:
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
puzzle_critic:
  verdict: revise_required
  review_loop_state: revise_required
  required_action: structural_revision
designer_action: revise_structure
next_review_required: true
```

## 处理结论

v2 不作为合格候选提交。硬证据门槛通过，但 critic 指出玩家侧结构不足：

- 12 步中 walk 占比高，开局走到左入口更像 padding。
- B/S 的材料换相链条清楚，但进入链条后过于线性。
- P/L 几乎只作为最终目标覆盖按钮，没有在 B/S 换相前或换相中施加约束。
- required event gates 证明事件必要，不证明玩家必须理解“先 B/S、后 P/L”的洞察。

## 下一版修改方向

```yaml
revision_target:
  role: lower_difficulty_challenge
  keep:
    - 双锚点各一个
    - 比 PHASE_FERRY_v8 更短、更少回返
    - 完整图可穷尽
  change:
    - 缩短纯走位入口
    - 让 P/L 在中前段参与，不只尾部覆盖目标
    - 让 B/S 换相前后至少被 P/L 位置或推拉侧限制解释
    - 保留 12-18 步左右的低一档难度，但减少 guided-application 读感
  evidence_target:
    - all-solution: push_pull_anchor_shift
    - all-solution: box_sticky_anchor_shift
    - all-solution: pull_event
    - all-solution: material_normalization
    - prefer: sticky_rigid_move
    - optional: sticky_merge
```

修改 layout、核心机制使用与 design_claim 后，必须重跑 solver/analyzer/probe 并进入 review_2。
