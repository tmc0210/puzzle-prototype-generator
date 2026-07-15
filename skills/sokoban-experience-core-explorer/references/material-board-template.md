# 任务内材料面板合同

Explorer 在本轮作品集目录下维护：

```text
exploration/
  exploration_brief.yml
  material_board.md
  explorer_requests.md
  runs/<batch_id>/...
```

`material_board.md` 由 explorer 单独写入；`explorer_requests.md` 由 designer 单独写入。不要让两个 agent 修改同一个文件。

## Exploration brief

```yaml
exploration_id: ""
prototype_id: ""
experience_seed: ""
player_prior: []
allowed_mechanisms: []
allowed_tools: []
source_boundary:
  allowed: []
  forbidden: []
workspace: ""
```

## Material board

```markdown
# Material Board: <exploration_id>

- status: starting | active | idle_waiting_request | stopped
- experience_seed:
- updated_at:
- current_direction:

## 已验证最小 witness

- layout_ref:
- exact_inputs:
- before_after_refs:
- seed_relation:
- witnessed_relation:
- proven_necessary_conditions:
- not_yet_proven:
- incidental_conditions:
- counterfactual_refs:

## 可取用材料

### <material_id>

- 开始局面：
- 玩家动作：
- 可见变化：
- 后续关系：
- 继承的已证关系与新增证明：
- 与已有材料的实质差异：
- 近邻退化：
- evidence_refs:

## 已合并材料

- <variant_id> -> <material_id>：只改变了什么，为什么没有形成新玩家关系。

## 未成立方向

- 方向：
  - 实际结果：
  - 不能推出的结论：
  - evidence_refs:

## 待探索问题

- ...

## 最近批次

- batch_id:
- 新增：
- 合并：
- 未成立：
```

## Designer requests

```markdown
# Explorer Requests

## <request_id>

- status: open | answered | withdrawn
- designer_problem:
- current_material_refs:
- requested_relation:
- candidate_fragment_ref: none | <ref>
- answer_refs:
```

Explorer 不把材料映射为 baseline/application/combination/challenge。Designer 读取具体材料后自行声明作品方向。
