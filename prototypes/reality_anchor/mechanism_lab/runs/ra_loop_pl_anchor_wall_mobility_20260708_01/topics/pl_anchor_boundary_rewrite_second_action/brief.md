# Explorer Brief: pl_anchor_boundary_rewrite_second_action

- prototype: `reality_anchor`
- topic: P/L anchor 移动后，边界重写被第二动作消费。
- seed_source: 用户指定“推拉锚点”实验不足；现有 P/L 边界交接多研究普通对象，P/L anchor 自身移动后的新边界消费不足。
- scope: 先移动 P/L anchor 本体，再让玩家或小对象在新 P/L 分界下执行第二个关键动作；墙用于封旧把手、开新把手或关闭失败对照。
- exclusions: 不把普通箱子推拉作为主成果；若没有 `anchor_boundary_shift:push_pull` 后的第二动作差异，停在 weak finding。
- source_boundary: 可读本 brief、本轮 manifest、Reality Anchor runtime / mechanics、runner、`P/L 长轴墙廊`、`P/L 横向把手`、`P/L 边界交接` 的正式条目。
- do_not_repeat: 不要只证明锚点能移动；关键是移动后边界改变 `forceModeAt`，并被下一动作消费。
- compare_checklist:
  - push 锚点后，新站位从 P 侧变 L 侧，第二步 pull 成立 / 失败对照。
  - pull 锚点后，新站位从 L 侧变 P 侧，第二步 push 成立 / 失败对照。
  - 墙封旧把手但开放新把手，证明不是普通绕路。
  - 对照：锚点移动量少一格、墙口错位或前格墙导致第二动作不再成立。
- budget: 5-8 cases，允许使用一个普通 crate 作为第二动作的被消费对象，但 family 主语必须仍是 P/L anchor rewrite。
- success_criterion: 至少一个结构族能写成“移动锚点 -> 边界重写 -> 第二动作被墙/站位消费”的 I/O 链。
- output_contract: 产出 runner 文件、notes、proposed families；不达 consumption probe 时明确 `defer`，不要硬入库。
