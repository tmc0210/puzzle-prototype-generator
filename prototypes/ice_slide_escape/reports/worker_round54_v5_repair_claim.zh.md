# worker round54 v5 repair claim

- worker_scope: 仅修复 `ICE_EXP_META_2026_07_03_round54_v5_t2_gate_cut_layout.txt` 的 near-miss，不调用 reviewer / critic。
- base_interface_preference: A=[0,6], B=[6,12]，可调整但优先保留。
- meta_interface_preference: C=[7,0], D=[0,10]，可调整但优先保留。
- hard_gate_1: A->B 的完整可达扫描不得命中 `ice_pass_through_d5`, `slide_restart_after_group`, `ice_destroy_group_d6_plus`。
- hard_gate_2: A/B/C/D 起点不得可解到 A/B/C/D 之外 edge goal；未忽略 internal non-target pair，尤其 A/B->C，必须消除；C/D->A/B 可按 policy 记录为 ignored。
- retained_core: 两目标交换 + d6 产物开 D + T2 回封。
- base_claim: base 应在 d6 前或更早成立，最好所有胜路依赖 `ice_rebound_d4`，且不需要 d5/restart/d6+。
- meta_claim: meta 胜路应 required `ice_destroy_group_d6_plus`, `slide_restart_after_group`, `ice_rebound_d4`，并且 d6 产物或破坏结果需要被后续动作消费，而不是独立钥匙。
- repair_strategy: 先用确定几何隔离封住 base 到 meta 发射/右侧区域的后期事件入口，再用小范围枚举检查边界逃逸与 A/B->C non-target pair。
- non_candidate_policy: 本轮产物仅供主 controller 继续判断；除非两个硬 gate 同时通过且核心保持，否则标记为不可送审。
