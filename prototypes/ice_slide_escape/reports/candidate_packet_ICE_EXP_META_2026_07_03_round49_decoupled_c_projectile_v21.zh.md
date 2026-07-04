# candidate_packet: ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21

```yaml
prototype_context:
  prototype: ice_slide_escape
  win_condition: ice_slide_escape_explicit_goal
  confirmed_rules:
    - "所有 target 必须被 ice 占据。"
    - "玩家必须站在本 solve request 的显式 player_goal。"
    - "d1/d2 stop_short；d3 destroys moving ice；d6+ destroys obstacle group and restarts slide."
  tool_boundary: "solver/analyzer 证据只证明可达、事件覆盖和图事实，不证明审美。"

slot_brief:
  intended_role: meta_first_dual_instance_challenge
  known_before:
    base: "d6 前或更早；本 packet 按 strict reachable no d6/d5/restart 路由。"
    meta: "默认可用全部知识。"
  target:
    - "base 使用紧缩目标债务链。"
    - "meta 使用后期破坏性机制作为核心，并尽量重读同一主结构。"
  difficulty_or_support_expectation: "两流程均不低于 2；至少一条不低于 3。"

mechanic_exposure_context:
  mechanic_window:
    base_allowed: "pre_d6_or_earlier"
    meta_allowed: "all"
  allowed_exposure_through:
    base: "ice_stop_short / ice_destroyed_d3; no reachable d6/d5/restart claimed"
    meta: "ice_destroy_group_d6_plus"
  claimed_core_events:
    base: [ice_destroyed_d3, ice_stop_short]
    meta: [ice_stop_short, ice_destroy_group_d6_plus, ice_destroyed_d3]

design_target:
  aesthetic_score_target: "4 floor, pursue 5"
  difficulty_score_target: ">=2 both; >=3 at least one"
  target_role_notes: >
    v21 是 round49 decoupled C-side projectile family 的 first serious probe。
    它保留 v14 的 base 双目标债务链，并把 meta d6 projectile 放在 A 完全不可达的右侧 C 腔。
    主要待 critic 攻击点：meta 的 stop 是否只是独立小钥匙，而非与目标债务主结构足够耦合。

solve_instances:
  layout: |
    #######################
    #######################
    #######################
    ####.##################
    ####.#################.
    .....*...*...##......II
    #####.###..###########.
    ####II#.#I..###########
    ####.......############
    ####**.##..############
    ##########..###########
  interfaces:
    A: [0, 5]
    B: [11, 10]
    C: [22, 4]
    D: [11, 10]
  base_instance:
    player_start: [0, 5]
    player_goal: [11, 10]
  meta_instance:
    player_start: [22, 4]
    player_goal: [11, 10]

mechanism_scope:
  central:
    base:
      - "左/右目标冰被临时借走，随后以下层冰补回。"
      - "base 完整可达图不能接触右侧 C 腔 projectile。"
    meta:
      - "C 腔第一步 d1 stop 移开站位冰，第二步 d6 打开右墙并进入主结构。"
      - "d6 后进入主结构，抵达 D。"
  required_winning_path_events:
    base: [ice_destroyed_d3, ice_stop_short]
    meta: [ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short]
  forbidden_winning_path_events:
    base: [ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group]
  forbidden_if_seen_anywhere:
    base: [ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group]

design_claim:
  player_insight: >
    Base 要读出目标债务：先借走目标冰开路，再从下层补回目标。Meta 要读出右侧 C 腔
    是一个独立回访入口：先用短停让出 d6 projectile 的推位，再用 d6 改写右墙进入同一主结构。
  causal_chain:
    base:
      - "A 侧推开左目标冰，制造左目标债。"
      - "继续推开右目标冰，打开下层回补路线。"
      - "用右下冰 stop_short 补回右目标。"
      - "用左下冰 stop_short 补回左目标，随后到 B。"
    meta:
      - "C=[22,4] 先向下推右腔站位冰，d1 stop 后站到 d6 projectile 右侧。"
      - "向左推 projectile，d6 摧毁右墙组并伴随 d3，打开主结构。"
      - "穿过被打开的右墙到 D=[11,10]。"
  why_not_execution: >
    Base 的状态责任高于纯执行；meta 当前有硬 required events，但玩家侧是否只是两步钥匙加走路，
    需要 critic 独立攻击。
  falsification:
    - "若 base reachable 出现 d6/d5/restart，candidate hard-gate fail。"
    - "若 critic 判定 meta 只是独立 C 腔钥匙、没有足够重读主结构，则需要 structural revision。"

evidence:
  commands_run:
    - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe.txt --id ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_base --player-start 0,5 --player-goal 11,10 --max-states 120000 --max-depth 180 --graph-max-states 120000 --write"
    - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe.txt --id ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_meta --player-start 22,4 --player-goal 11,10 --max-states 120000 --max-depth 180 --graph-max-states 120000 --write"
    - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe.txt --id ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_base_strict --player-goal 11,10 --starts 0,5 --required-winning-events ice_destroyed_d3,ice_stop_short --forbidden-winning-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --forbidden-reachable-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --max-states 120000 --max-depth 180 --graph-max-states 120000 --write"
    - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe.txt --id ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_meta_required --player-goal 11,10 --starts 22,4 --required-winning-events ice_destroy_group_d6_plus,ice_destroyed_d3,ice_stop_short --max-states 120000 --max-depth 180 --graph-max-states 120000 --write"
  solver_result:
    base: "solved, cost 30, graph complete 641 states, wins 1"
    meta: "solved, cost 19, graph complete 1795 states, wins 9"
  trace_summary:
    base: "4 pushes: d3 left target, d3 right target, stop_short d2 right refill, stop_short d2 left refill."
    meta: "2 pushes: C-chamber d1 stop; C projectile d6 group destruction + d3; then walk to D."
  winning_path_event_checks:
    base: "pass: no winning path missing required; no winning path with forbidden late events."
    meta: "pass: no winning path missing d6+d3+stop."
  reachable_event_exposure:
    base: "pass: complete reachable scan has no d6/d5/restart."
  graph_or_counterfactual_evidence:
    base: "initial region dist=4; forced viable prefix 2/4; compressed regions=23."
    meta: "initial region dist=2; forced viable/optimal prefix 2/2; compressed regions=48."
  evidence_limits:
    - "No object-level participation was reported."
    - "No counterfactual model configured."
    - "Meta player-side quality is not proven by required-event pass."

diagnostic_routing:
  hard_evidence:
    route_to: evidence_reviewer
    question: "Do the provided complete scans support base strict no-late and meta required-event claims?"
  taste_probes:
    route_to: puzzle_critic
    question: "Is meta too thin / too independent from target-debt structure to meet aesthetic 4?"
  scc_graph:
    route_to: puzzle_critic
    note: "Meta SCC path is only two forced commitments before a long walk; likely player-side caveat."
  variant_family:
    prior_failed_family: "v12/v14 shared-left-target projectile caused base reachable d6 leakage."
    current_change: "decoupled C-side projectile."

prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: [[0,5], [11,10], [22,4], [11,10]]
    target_pairs: ["A->B", "C->D"]
    ignored_pair_classes:
      - "C/D -> A/B reverse internal pairs per meta_first_design default"
    risky_pair_classes:
      - "A/B/C/D -> edge goals outside declared interfaces"
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: "fresh family informed by failed current-run probes, not archive variant"
  why_not_archive_variant: "Uses current-run failure analysis only; does not inherit archived layout or chain."

attempt_log:
  serious_structural_attempts:
    - "v14: base strict-clean dual target debt, meta dead."
    - "v17/v19: target-debt + meta d6 shape, but base reachable d6 leakage."
    - "v20: decoupled C projectile; base strict pass; meta too thin and missing required stop."
    - "v21: C chamber stop added; hard gates pass; critic quality unknown."
  abandoned_families:
    - "shared left target as both base refill debt and meta d6 projectile"

archive_taste_context:
  examples:
    - candidate_id: ICE_CAND_0035
      role: positive_high_aesthetic_reference
      human_reviewed: true
      aesthetic_score: 5
      difficulty_score: 4
      human_comment_summary: >
        Human accepted as a beautiful one-level meta case because old exit becomes return entrance under return pressure;
        value depends on real role change and surrounding wrapper, not on B=C geometry itself.
    - candidate_id: ICE_CAND_0034
      role: positive_aesthetic_4_reference
      human_reviewed: true
      aesthetic_score: 4
      difficulty_score: 2
      human_comment_summary: >
        Human accepted because meta left-push disrupts and rewrites lower structure rather than replaying base;
        base itself is low difficulty.
    - candidate_id: ICE_CAND_0037
      role: negative_target_debt_reference
      human_reviewed: true
      aesthetic_score: 1
      difficulty_score: 2
      human_comment_summary: >
        Human rejected repeated target-door stitching as no-insight, plus fatal A->D spillover;
        tool pass cannot replace real meta value.
  score_claim_allowed: true

claim_last_review:
  mode: not_used
```

## Evidence Files

- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe.txt`
- `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_base.md`
- `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_meta.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_base_strict.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round49_decoupled_c_projectile_v21_c_chamber_stop_probe_meta_required.md`
