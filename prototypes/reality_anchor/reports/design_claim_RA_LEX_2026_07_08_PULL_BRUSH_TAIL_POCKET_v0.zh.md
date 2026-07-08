# Design Claim: RA_LEX_2026_07_08_PULL_BRUSH_TAIL_POCKET_v0

```yaml
candidate_id: RA_LEX_2026_07_08_PULL_BRUSH_TAIL_POCKET_v0
prototype: reality_anchor
fresh_required: true
archive_lineage_policy:
  default: fresh_required
  candidate_relation: fresh
  why_not_archive_variant: >
    本轮只使用 mechanism_lab/lexicon.md 的局部结构语料组合，不从旧 candidate、
    reports 草稿或 mechanism_lab/runs 继承布局、对象角色或求解链。
lexicon_sources_used:
  - P/L pull 抽取把手：前格门、footprint 门与扫带
  - B/S 移动边界刷产物：远程生成与门口消费
  - 固定 B/S 切割：C+M 尾巴与单格目标袋
  - 刚体黏块 + 墙口：前沿墙齿目标口/尾债消费
design_target:
  intended_role: lexicon-composition challenge
  aesthetic_score_target: ">=3, aim 4"
  difficulty_score_target: ">=3, aim 4"
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
```

## player_insight

玩家需要把 B/S anchor 当成“可被 P/L pull 抽动的远程刷线”，而不是直接处理目标物。
正确路线应先满足 pull 前格门与 B/S footprint 门，抽动 B/S 让边界刷过远处 sticky/box
材料；刷出的可分离箱格覆盖目标，同时 sticky 尾巴或更大 footprint 被墙口/目标袋消费。

## causal_chain

1. 起点提供可逆观察空间，玩家能看到目标口与 B/S 刷线关系。
2. P/L pull 抽取 B/S anchor：若玩家前格或 B/S 目标格不对，动作被门控拒绝。
3. B/S 边界跨过远处二连/三格材料，生成 `C+M`、`C+MM` 或等价尾债产物。
4. 单格目标袋只消费可分离 crate；未切/错误 footprint 会被墙齿或口宽拒绝。
5. 最终胜利必须同时依赖 `pull_object`、`anchor_boundary_shift:box_sticky`、
   `sticky_to_box` 或 `box_to_sticky`、以及 sticky 刚体/尾债消费。

## why_not_execution

难点不应来自长路线、显然的锚点按钮或重复搬运。玩家侧难点应是识别“先拉 B/S 刷线，
再让下游口袋消费刷产物”的两段因果；如果删去墙齿/目标袋仍能通关，或不拉 B/S 也能直接
推箱上目标，则该候选失败。

## required_events

- `pull_object`
- `anchor_boundary_shift:box_sticky`
- 至少一个材料转换事件：`sticky_to_box` 或 `box_to_sticky`
- 至少一个尾债/刚体消费相关事件：`move_sticky_rigid`、`sticky_merge` 或明确的
  force-chain footprint gate

## forbidden_events / scope cautions

- 不要求移动 P/L anchor；若 P/L shift 可达但不在胜路核心，应降级为 incidental。
- 不把 raw solver 最短解包装成唯一路线或人类洞见证明。
- 若复杂度主要来自 20+ 步无新机制的往返路线，则按 RA_CAND_0006 负例降级。

## falsification

- 存在不包含 B/S anchor shift 的胜路。
- 存在不使用 pull 抽动 B/S 或等价 pull-side footprint 门的胜路。
- 删除目标口墙齿或尾债 blocker 后成本下降且核心事件仍不必要，说明目标/墙齿不是结构消费。
- reviewer 发现核心事件只出现在 returned trace 而非 all-solution required gate。

## tool_questions

- 最短解是否可解且 replay 合法？
- 完整 graph 是否在预算内 complete？
- required event group 是否所有胜路必经？
- 是否存在无 B/S shift、无 pull、无材料转换或无 sticky/尾债消费的 winning bypass？
- 目标删除、对象删除/墙化、外框裁剪是否会降低成本或破坏核心链？
