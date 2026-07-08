# Design Claim: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1

candidate_version: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
prototype: reality_anchor
archive_lineage_policy: fresh_required
candidate_relation: fresh

lexicon_basis:
  - "固定 B/S 断桥：sticky split 端点目标袋"
  - "刚体黏块 + 墙口：单格目标袋消费 connected footprint / 端点独立性"
  - "固定 B/S 切割谱的尾债思想：切割输出必须被后续目标或门口消费，而不是只见证事件"

design_target:
  role: challenge
  aesthetic_target: "3+，若 critic 认可三输出消费的紧凑性则尝试 4-"
  difficulty_target: "3+，追求比简单断桥 witness 更高，但避免路线税"

player_insight: >
  玩家需要看出 C 形 sticky 不是要整体塞进目标，而是要先推过固定 B/S 边界，
  把连接桥切成普通箱，同时释放上下两个可独立推动的 sticky 端点。随后三个输出
  各自承担不同职责：上端点进上目标、下端点进下目标、中间 crate 桥向左进桥目标。

causal_chain:
  - "从右侧进入 C 形中段，把 connected sticky footprint 左推过固定 B/S 边界。"
  - "边界把左列变成 crate 桥，并把右列上下端点保留为两个独立 sticky 组件。"
  - "上端点单独上推覆盖上目标；未切断时 connected footprint 会被墙口拒绝。"
  - "下端点单独下推覆盖下目标；端点顺序可有局部自由，但二者都需要 split 输出。"
  - "中间 crate 桥从右侧左推覆盖左目标，证明 bridge debt 被消费，而不是无责任残留。"

why_not_execution: >
  不是简单照着最近目标推。整体 C 形必须先被拆成三种责任对象；如果玩家只把上端点
  或下端点看成普通 sticky 移动，会忽略中间 crate 桥目标。难度来自一次断桥产生的
  多输出分配，而不是长路线、重复推数或开放空间搜索。

required_winning_path_events:
  - sticky_to_box
  - sticky_split
  - move_sticky_rigid
  - push_object:sticky
  - push_object:crate

forbidden_winning_path_events: []
forbidden_if_seen_anywhere:
  - anchor_boundary_shift:box_sticky
  - anchor_boundary_shift:push_pull
  - box_to_sticky
  - sticky_merge
  - pull_object

falsification:
  - "若存在缺少 sticky_split 或 sticky_to_box 的胜路，核心断桥 claim 失败。"
  - "若存在缺少 sticky endpoint move 的胜路，上下端点消费 claim 失败。"
  - "若存在缺少 crate push 的胜路，中间 bridge debt 消费 claim 失败。"
  - "若任一目标删除后最短成本不降低且核心事件仍必经，该目标应被视为冗余。"
  - "若完整图耗尽，所有 all-solution 必要性 claim 降为 unknown。"

