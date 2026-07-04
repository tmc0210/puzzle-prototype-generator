# fresh design claim: round49 decoupled C-side projectile

```yaml
prototype: ice_slide_escape
date: 2026-07-03
family: decoupled_c_side_projectile_plus_base_target_debt
archive_lineage_policy: fresh_required
starting_context:
  useful_prior_fact: "v14 证明 base 双目标债务可以 strict-clean；v12/v17 证明把左目标同时作为 meta d6 projectile 会造成 base reachable 泄露。"
  reuse_boundary: "只继承失败分析和 hard-gate 事实，不把既有候选作为合格提交。"
```

## Player Insight

Base A->B 的读法仍是目标债务链：入口到出口被目标冰封住，玩家必须先借走目标冰开路，再用下层冰补回；补回左目标又依赖先处理右目标，形成两个目标之间的状态债务。

Meta C->D 不再把左目标本身当 d6 炮弹。C 位于右侧封闭腔，那里有一个 base 不可触达的独立 projectile。Meta 首先用该 projectile 以 d6 摧毁右墙组，打开回到主结构的通路；随后在被改写后的主结构里处理目标债务并到达 D。

## Causal Chain

1. Base 从 A 进入，推开左/右目标冰，制造目标债务。
2. Base 必须用下层冰补回右目标，再补回左目标，才能到 B。
3. Base 不能接触 C 侧 projectile，因此完整可达图不应出现 d6/d5/restart。
4. Meta 从 C 侧先使用独立 projectile d6 打开右墙。
5. Meta 进入主结构后仍需处理目标覆盖和出口抵达，至少包含 d6 + d3 + stop。

## Why Not Execution

玩家需要把“目标冰是临时可借资源”和“目标债必须补回”作为状态逻辑来读，而不是只执行一串明显推法。Meta 的关键差异来自 C 侧 projectile 改写右墙，而不是反向入口复刻 base。

## Required / Forbidden Events

Base intended:

- required winning: `ice_destroyed_d3`, `ice_stop_short`
- forbidden winning: `ice_destroy_group_d6_plus`, `ice_pass_through_d5`, `slide_restart_after_group`
- forbidden reachable: `ice_destroy_group_d6_plus`, `ice_pass_through_d5`, `slide_restart_after_group`

Meta intended:

- required winning: `ice_destroy_group_d6_plus`, `ice_destroyed_d3`, `ice_stop_short`

## Falsification

- 若 base complete reachable 仍能触发 d6/d5/restart，则 C-side projectile 没有真正隔离。
- 若 meta 只需 d6 开墙后走路，不需要目标债或 stop/d3，则 claim 过薄，需要改结构。
- 若 meta 的 d6 只是外部钥匙，与 base 主结构没有交互，审美不达标。
