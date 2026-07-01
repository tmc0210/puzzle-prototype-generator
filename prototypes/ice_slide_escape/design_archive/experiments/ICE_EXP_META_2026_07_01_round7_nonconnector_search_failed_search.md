# ICE_EXP_META_2026_07_01_round7_nonconnector_search_failed_search

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round7_nonconnector_search_failed_search
prototype: ice_slide_escape
terminal_state: failed_search
candidate_id: null
review_integrity: not_applicable_no_serious_candidate
archive_eligibility: raw_run_only
human_final_status: pending
```

## Brief

继续 meta 优先设计尝试，但显式排除上一轮 `ICE_CAND_0025` 的局部
`short-stop wall -> d6 gate -> D-wall exit` 结构族。目标不是生产 0020 式
clean connector，而是寻找更强的状态债、非局部回读、异质 push 角色或共享空间
耦合。

Hard gates kept from the round brief:

```yaml
reject_if:
  - any selected start solves a non-selected perimeter goal
  - any A or B start solves C or D
  - candidate substantially reuses an archive candidate layout, geometry, main causal chain, route, object placement, or entrance/exit relation
```

## Archive Taste Context

只使用带人类评语的 candidate 做 taste calibration；没有复用其 layout、几何结构、
主因果链、路线、对象摆放或入口出口关系。

```yaml
used:
  ICE_CAND_0024:
    role: positive_meta_reference
    lesson: 需要强空间/要素复用，以及 base-time lure 或状态不兼容，而不是只要流程干净。
  ICE_CAND_0022:
    role: functional_meta_reference_with_caveats
    lesson: 扎实 meta 可接受，但低污染/轻 base 本身不是优点；更强候选需要更多空间交融。
  ICE_CAND_0020:
    role: lower_bound_negative_calibration_for_this_round
    lesson: 能走通的 clean connector 不是本轮生产目标。
  ICE_CAND_0019:
    role: high_difficulty_calibration
    lesson: 延迟 hidden stopper / compound lock 是后期强耦合参考，但不直接复用结构。
```

## Search Families

### family_1: d5/d4 mixed-mechanic miner material

Source material was mined only for mechanism inspiration, not reused as an
archive candidate. The most interesting material had `d5 pass-through + restart`
and later `d4 rebound`.

Scratch file:

```text
prototypes/ice_slide_escape/reports/ICE_CAND_0026_scratch_mf0235_material_layout.txt
```

Result:

```yaml
status: rejected_material
reason: only one natural open edge start; not usable as ABCD meta interface without heavy redesign
```

### family_2: MF_0287 right revisit modification

Scratch layout:

```text
######.####
#..I.....I.
#....I...#.
..#.I..G.I#
#####.#####
#...#.....#
###########
```

Scratch file:

```text
prototypes/ice_slide_escape/reports/ICE_CAND_0026_scratch_v1_mf0287_right_revisit_layout.txt
```

Intended interfaces:

```yaml
A: [6, 0]
B: [0, 3]
C: [10, 1]
D: [10, 2]
```

Result:

```yaml
status: rejected_candidate
reason: route hard gate failed
early_to_late:
  - A -> C
  - A -> D
  - B -> C
  - B -> D
selected_to_nonselected:
  - A/B -> [0,1]
```

Design note: the C->D chain itself had useful material:
`d5 pass-through/restart/short-stop -> d4 -> blocked d4`, but opening the
right interface made it a normal walkable exit for A/B after target completion.

### family_3: MF_0343 opposite-flow material

Scratch layout:

```text
####.######
#..I..G.I.#
#...#......
##...I.....
#...I......
###########
```

Scratch file:

```text
prototypes/ice_slide_escape/reports/ICE_CAND_0026_scratch_v2_mf0343_opposite_flows_layout.txt
```

Result:

```yaml
status: rejected_candidate
reason: route hard gate failed
problem: top/right starts could solve too many selected and non-selected right-edge goals
```

Design note: this material had opposite-direction chains, but the entrance/exit
relation was too symmetric; it did not create the required A/B -> not C/D
partial order.

### family_4: random material search without route gate

Temporary report:

```text
prototypes/ice_slide_escape/reports/temporary_meta_random_material_0026.json
```

Best material:

```text
###########
#I..###.#.#
..GI.......
#I.I...#.##
.I.........
#.....#.I##
###########
```

Scratch file:

```text
prototypes/ice_slide_escape/reports/ICE_CAND_0026_scratch_v3_random401_material_layout.txt
```

Positive material facts:

```yaml
base_A_to_B:
  pushes: 9
  events:
    - boundary_disappear:d9
    - multiple ice_blocks_ice_no_chain_push
    - multiple ice_stop_short:d1
    - ice_rebound_d4
  graph_states: 6036
  winning_states: 1
  scc_irreversible_steps: 7
  forced_prefix: "7/7"
meta_C_to_D:
  pushes: 4
  events:
    - boundary_disappear:d1
    - ice_blocks_ice_no_chain_push
    - ice_stop_short:d1
    - ice_destroyed_d3
  graph_states: 6616
  winning_states: 16
  scc_irreversible_steps: 4
```

Reject reason:

```yaml
route_hard_gate_failed: true
early_to_late:
  - A -> C
  - A -> D
  - B -> C
  - B -> D
selected_to_nonselected: 0
```

Design note: this is the strongest non-0020 material found in this run, but it
still lacks interface partial-order isolation. It may be useful as inspiration
for a future structurally separated design, not as a candidate.

### family_5: structured barrier random search

Attempted a generator with a forced center barrier separating A/B and C/D, then
looked for both A->B and C->D solves with different event signatures and route
gates. The run timed out before producing a hit.

```yaml
status: no_hit_before_timeout
reason: structured search was too expensive with complete graph checks
next_adjustment:
  - first search for solvable material with incomplete/low-budget graph
  - only run route + complete graph after a promising C->D chain is found
```

## Current Verdict

```yaml
terminal_state: failed_search
proposal: none
why_not_structural_redesign_needed: >
  The target direction is still plausible: a stronger non-connector meta likely
  needs structural separation plus remote state interaction. This run failed to
  find an instance satisfying both chain quality and routing gates.
why_not_proposal_ready: >
  Every nontrivial material found failed the A/B -> C/D hard gate or lacked a
  valid four-interface structure. No serious candidate reached review loop.
```

## Lessons For Next Attempt

```yaml
avoid:
  - local short-stop wall -> d6 gate -> D-wall exit
  - opening a right-side interface in an otherwise shared walkable room
  - treating route-clean simple connectors as success
prefer:
  - physically separated A/B and C/D player regions
  - remote ice interaction across the separator
  - target debt that can be created only from the meta side
  - a first meta action whose state is consumed by later meta actions
search_process_change:
  - use two-stage search: cheap solve/event scan first, full graph/routing only after material passes a taste prefilter
```
