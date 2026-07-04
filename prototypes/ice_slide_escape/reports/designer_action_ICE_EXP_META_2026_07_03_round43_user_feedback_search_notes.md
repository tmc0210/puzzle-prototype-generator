# Designer Action: round43 用户反馈后的搜索记录

```yaml
date: 2026-07-03
prototype: ice_slide_escape
trigger: user_feedback_on_round42_v2
status: no_new_candidate_submitted
```

## 用户反馈吸收

round42 v2 虽然通过了独立 evidence / critic 的形式门，但用户指出其核心只是：

- d4 留出反推空间；
- d3 可从相反方向摧毁；
- 两个局部结构在地图中拼接。

该反馈成立。v2 已记录为 `held_after_user_feedback`，不再作为最终方向提交。

## 新拒绝标准

```yaml
reject_patterns:
  - d4 双向锁 + d3 双向门串联
  - L-ladder / repeated target-door 串接
  - base/meta 只是同一路线换入口、换终点或后缀
  - 非 walk 事件签名相同或互为子序列
  - 审美 claim 依赖“初始 target 冰封路”本身
prefer_patterns:
  - 单个紧缩小室
  - target debt 真的在返回解中出现
  - 目标冰本身是静态割点
  - base 可达无 d5/restart/d6
  - meta 的对象顺序或机制读法与 base 非同构
```

## 新增工具/脚本

```yaml
search_scripts:
  - prototypes/ice_slide_escape/reports/round43_compact_meta_search.ts
  - prototypes/ice_slide_escape/reports/round43_patch_0035_like_probe.ts
  - prototypes/ice_slide_escape/reports/round43_probe_miner_findings.ts
worker_artifacts:
  - prototypes/ice_slide_escape/reports/worker_round43_tight_l_ladder_v1_layout.txt
  - prototypes/ice_slide_escape/reports/worker_round43_tight_l_ladder_v1_notes.md
```

## 搜索结论

### round42 v2

撤回。形式合格但设计思路偏局部拼接。

### worker_round43_tight_l_ladder_v1

不提交。它硬指标较干净，但本质接近 round39 / `ICE_CAND_0037` 的 L-ladder target-door 反例，并且存在 A->D 非目标 pair 风险。

### 0035-like 反事实

不提交。把归档正例 0035 的裸 target 改为 `*` 后，可得到 base d3+d4+short、meta boundary+d6 的更好读法，但：

- 太接近 human archive 正例，不满足 fresh 要求；
- 目标冰本身没有封住 base 路径；
- base d4 required gate 失败。

### fresh miner / random 严格搜索

不提交。严格筛选后无合格命中；near-miss 主要是同一路线换终点：

```yaml
observed_near_miss_pattern:
  - target debt: true
  - base no d5/restart/d6: pass
  - static target seal: often pass
  - failure: base/meta 非 walk 事件签名相同或互为子序列
```

## 当前判断

本轮没有新的合格候选。下一步不应降低 critic 标准来强行提交；应改为专门构造“非交换顺序”的小室，例如：

- 一个目标冰被借走后，同时打开玩家通路并改变另一块冰的滑行障碍；
- meta 从另一入口进入时，先处理同一对象会破坏 base 顺序，但可利用后期机制修复；
- 目标冰不只是门，而是后续 stopper / obstacle / replacement source 的角色切换点。
