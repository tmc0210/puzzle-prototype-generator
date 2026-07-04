# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_ANCHOR_TRANSITIONS_v0

```yaml
prototype: reality_anchor
candidate_family: fixed_anchor_transitions
archive_lineage_policy: fresh_required
target_count: 2-3
role: challenge
intended_campaign_position: mid_game_transition
allowed_knowledge_context: two_anchor_introduction
score_claim_allowed: false
```

## Brief

本系列目标是产出 2-3 个中期过渡关卡：同关出现 P/L 与 B/S 两种锚点，但其中一个锚点固定。固定可以通过墙隔离表达；这不是审美扣分，而是用于让玩家在“两个锚点都需要反复腾挪”的后期关之前，先理解双锚同场的规则背景。

## Archive Calibration Boundary

`RA_CAND_0001` 是当前唯一 clean human-reviewed 正例，可用于非分数口味校准：机制多样、设计密度高、要素强耦合、玩家视角矛盾明显。它不授权复用布局、对象角色、路线或因果链。当前没有 clean human-reviewed 负例/下界，因此本系列不输出数值审美或难度结论。

## Player Insight

玩家应读到：

- 固定锚点不是“装饰物”，而是稳定的规则分界或固定 pull/push 背景。
- 移动锚点是本关唯一需要实际腾挪的锚点，承担一次或少数几次清晰状态改变。
- 两个锚点的关系是过渡型：一个锚点提供固定约束，另一个锚点把目标覆盖、材料转换或 pull/push 行为带到终点。
- 解题负担应低于后期双锚互锁：路线 6-15 步优先；可以有短强制段，但非 walk 事件应形成可读因果链。

## Candidate Families

### 固定 B/S，移动 P/L

固定 B/S 用墙隔离，仍把棋盘分成 box/sticky 两侧。玩家需要用移动 P/L 或 pull/push 机制把 crate / sticky 送过固定材料边界，触发 `box_to_sticky` 或 `sticky_to_box`；P/L 至少发生一次 `anchor_boundary_shift:push_pull` 或承担目标覆盖。

### 固定 P/L，移动 B/S

固定 P/L 用墙隔离，仍把棋盘分成 push/pull 两侧。玩家需要在固定 pull/push 背景下移动 B/S，触发材料归一化或 sticky 整理；B/S 至少发生一次 `anchor_boundary_shift:box_sticky`。

## Required Evidence If Submitted

每个候选至少需要：

- 同关存在 P/L 与 B/S。
- fixed anchor 的对应 `anchor_boundary_shift:*` 在完整可达扫描中不出现。
- fixed anchor 的规则效果在所有胜路中必经：
  - 固定 B/S：`material_normalization` 必经。
  - 固定 P/L：`pull_event` 或明确的 fixed push/pull side 关键动作必经，优先用 `pull_event`。
- movable anchor 的 shift 在所有胜路中必经。
- 返回 trace 展示固定锚点效果与移动锚点动作之间的玩家可读因果关系。
- 完整 graph 未耗尽；不声明唯一路线、对象实例必要性、逐目标覆盖身份固定或全胜路事件顺序。

## Falsification

- 固定锚点在可达图中可以移动。
- 固定锚点对应规则事件只出现在返回解，而不是所有胜路必经。
- 移动锚点的 shift 可被绕过。
- critic 认为固定锚点完全像装饰，没有玩家侧读法。
- critic 认为关卡只靠最近可推/可拉物体局部执行，缺少短链 payoff。

## Tool Questions

- `search_fixed_anchor_transition.ts`：找固定 B/S 或固定 P/L 的候选素材。
- `explain-layout` / `explain-level`：验证 solver、graph、SCC、关键快照。
- `probe_fixed_anchor_candidate.ts`：验证固定锚点不移动、核心事件组 all-solution 必经、可达事件统计。
- `trace_layout.ts`：输出关键步骤 snapshot。

