# worker_round54_horizontal failed search attempt 1

```yaml
status: failed_search_material
candidate_found: false
reviewer_called: false
critic_called: false
write_scope_obeyed: true
family: horizontal_d6_direct_rewrite_T1_T2_core
archive_lineage_policy: fresh_required
fresh_claim_ref: prototypes/ice_slide_escape/reports/worker_round54_horizontal_fresh_claim.zh.md
```

## 任务约束复述

- 只探索 family B：横向 `d6+/restart` 必须直接改写 T1/T2 门核。
- 不复用 archive 布局、接口、对象角色或主因果链。
- A/B/C/D 全分离。
- 所有 target 初始都有冰。
- base 必须 d6 前或更早；完整可达扫描不得命中 `ice_pass_through_d5`、
  `slide_restart_after_group`、`ice_destroy_group_d6_plus`。
- meta 必须用 `ice_destroy_group_d6_plus` 和 `slide_restart_after_group`。
- d6 必须破坏或替代 base 的反弹障碍、目标冰或 D 门状态；不能只是打开接近角后
  复做 base。
- 偏好 1-2 个目标、2-4 枚冰，避免 spare 补位。

本轮没有进入 evidence reviewer / puzzle critic，也没有组装 candidate packet。

## archive 校准边界

本轮只使用 archive 的人类评语做审美/失败边界：

- `ICE_CAND_0037`：人类审美 1。重复 target-door / 目标债步骤、接口外溢，即使
  工具和 critic 曾经过宽接受，也必须视为核心失败。
- `ICE_CAND_0024`：人类审美 5。高分来自 base/meta 共用中间空间和大量要素、
  base-time lure 与 meta 回访兑现，而不是一条 d6 key 线。
- `ICE_CAND_0034`：人类审美 4。meta 至少要扰乱并改写下方结构，不能完全复刻
  base 的简单 d1+d4。
- `ICE_CAND_0015`：机器支持的“先破坏正确 target 状态”如果被唯一通路自然强迫，
  玩家没有实际洞见，仍然只是线性开锁。

这些只作校准；本轮没有复用旧布局。

## 子结构尝试

### F1：竖向早期目标门核 + 横向 d6 key 线

假设：

- base 用单个目标冰做早期门：目标初始占据并封路，base 通过 d1/d2/d3/d4 或
  boundary 调整后再满足目标。
- meta 从隔离 C pocket 横向发射 d6，摧毁同一区域附近的墙/冰，并让 d6 后产物
  进入 T1/T2 门核。

内存搜索摘要：

```yaml
generated: 1393
syntactic_1_or_2_targets_2_to_4_ice: 1227
base_solvable: 1215
base_no_late_complete: 332
meta_solvable: 145
meta_all_wins_require_d6_restart: 78
A_or_B_to_D_risk_clean: 12
kept_as_candidate: 0
```

失败原因：

- 保留 meta-only d6 pocket 时，base 常常退化成 pure walk，因为所有 target 初始
  已满足且门核没有真正封住 A->B。
- 强行让目标封路后，C 的 d6 要么只是打开右侧接近角，要么 d6 产物停在通道中
  成为无后续消费的钥匙。
- 一旦把 D 放到 d6 后可达空间，meta 往往变成“一推 d6 + walk”；把 D 放回核心
  后，C->D 又经常不可解。

### F2：单目标 d4 出门/回封门核 + 横向 d6 打右反弹障碍

抽象门核：

```text
O_L .. T .. .. .. O_R ...... P C
```

- base：目标冰 `T` 右推 d4 借 `O_R` 反弹离开目标；玩家绕到右侧后左推同一冰，
  借 `O_L` d4 回封。
- meta：从右侧横向推 `P`，以 d6 摧毁 `O_R`，希望破坏 base 的右反弹障碍并改变
  同一门核。

内存搜索摘要：

```yaml
generated: 10000
syntactic: 5363
base_solvable: 977
base_has_at_least_2_pushes: 7
base_no_late_complete: 3
meta_solvable: 2
meta_all_wins_require_d6_restart: 0
kept_as_candidate: 0
```

所有 base 成立的 near-miss 都卡在 meta：

- C 侧 d6 摧毁 `O_R` 后，d6 产物自然落在 `T+2` 附近，通常把目标右侧通道堵死。
- 如果 D 在右侧，meta 变成 d6 后纯走路或一推 key。
- 如果 D 在左/上侧，回封目标后玩家通常留在右侧，无法抵达 D；若让 D 在替换站位
  附近，又会过早可达。

### F3：二目标小核 + 横向 d6 projectile 参与目标债

假设：

- 目标数 1-2，冰数 2-4。
- 横向 d6 线由 meta-only pocket 发射。
- 另一个目标冰或核心冰在 base 中承担早期门角色，meta 中被 d6 破坏或重解释。

缩小预算内存搜索摘要：

```yaml
generated: 6000
syntactic: 5663
base_solvable: 3251
base_has_at_least_2_pushes: 15
base_no_late_complete: 0
kept_as_candidate: 0
```

base no-late 全部失败的主要原因：

- 当 d6 launcher 和中央目标债空间连通时，base 可达扫描大量命中
  `ice_destroy_group_d6_plus` / `slide_restart_after_group` / `ice_pass_through_d5`。
- 将 launcher 做成严格 meta-only pocket 后，base 可以干净，但 meta 难以先接触
  目标债再回到 launcher；d6 通常只能作为单次开路动作。

## 最小几何矛盾

当前 family B 的最小矛盾不是“找不到 d6”，而是三条要求互相拉扯：

1. **base no-late 要求 d6 launcher 与 A/B 可达域隔离。**  
   只要横向 d6 发射位和中央目标债空间连通，base 完整可达扫描很容易命中 d5 /
   restart / d6+。这在二目标随机小核里反复出现。

2. **meta 洞见要求 d6 launcher 与 T1/T2 门核强耦合。**  
   如果 C pocket 只通过一次 d6 打开外墙，d6 就变成钥匙；如果 d6 后产物没有继续
   作为 stopper、反弹障碍、目标覆盖物或 D 门状态被消费，就不满足本轮 family。

3. **单目标 d4 出门/回封几何与横向 d6 替换反弹障碍天然错位。**  
   对于 `T` 右推 d4 / 左推 d4 回封门核，右反弹障碍位置是 `T+5`。从右侧横向
   d6 摧毁这个障碍后，restart 段会把 d6 产物放到 `T+2` 附近或继续越过目标。
   这既不能自然补回 `T`，又容易堵住玩家绕到目标另一侧的路线。若把 D 放在产物
   可达侧，又退化成 d6 key；若把 D 放在回封后侧，又会和玩家最终位置冲突。

## 下一步设计方向

继续 family B 不应再从“d4 出门/回封 + 横向 d6 打同排反弹墙”小修。更有希望的
方向是整体换轴：

```text
base:
  T1/T2 门核使用纵向或 L 形早期动作成立；
  横向 d6 线在 base 时间只作为不可触发的潜伏结构。

meta:
  C 先通过非 d6 的短动作改变 T1/T2 中的一个目标状态；
  然后横向 d6 不只是开路，而是把 projectile 停成另一轴的 stopper；
  该 stopper 必须被后续目标回封或 D 门动作消费。
```

具体几何建议：

- d6 第一段横向，restart 后不要让 projectile 沿同一目标通道长距离滑走；应让它
  停在门核的侧向凹槽中，成为垂直推的 stopper。
- D 不应在 d6 后立即同侧可达；D 应位于“回封后玩家所在侧”，且入口需要 d6 产物
  或 d6 破坏后的缺口再加一次目标状态变化。
- 若使用两个目标，两个目标不能只是两个补位点；其中一个目标冰应兼任 base 门，
  另一个目标冰应兼任 meta d6 后 stopper 或 D 门封条。
- 下一轮优先手画一个 L 形门核，再小范围枚举，而不是继续随机墙/接口。

## 当前结论

```yaml
worker_result: failed_search_for_this_attempt
candidate_to_submit: none
hard_evidence_ready_for_candidate: false
recommended_next_action: redesign_geometry_L_shaped_horizontal_d6_to_vertical_stopper
```
