# Designer Notes: round46/47 strict exposure attempts

```yaml
date: 2026-07-03
status: no_qualified_candidate_yet
purpose: summarize attempts after v8 was held by review
```

## Held Baseline

`ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock` is the strongest
target-debt/internal-d6 artifact so far, but it is held:

- evidence is internally consistent;
- base winning paths are clean;
- meta d6 is all-winning required;
- base complete reachable graph can still trigger non-winning d6;
- independent critic judged aesthetic as 3+ / 4-, not a stable 4.

## Worker Round46

`worker_round46_order_gate_scratch_v2_layout.txt` independently converged on
the same family as v8:

- base A=[0,5] -> B=[10,10] solved, cost 29;
- meta C=[10,10] -> D=[22,5] solved, cost 47;
- no d6/d5 winning bypass;
- complete base reachable graph still hits d6.

Lesson: row7/row8 local order gates can preserve the route, but do not remove
the underlying B=C exposure problem.

## v10 Static Wrong-Push Wall

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round46_side_pocket_debt_v10_rebound_wrong_push_layout.txt
```

Hypothesis: add wall [4,8] so A's wrong horizontal push of the right refill ice
rebounds and remains a blocker.

Result:

- base solved, cost 29;
- base graph shrank to 1008 states;
- meta C=[10,10] -> D=[22,5] became unsolved.

Reason: [4,8] is also the stand cell C needs to push the side ice upward and
enter the left firing face.

## v11 Meta-Clearable Ice Gate

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round46_side_pocket_debt_v11_ice_wrong_push_gate_layout.txt
```

Hypothesis: replace [4,8] wall with an ice gate that C can clear from below.

Result:

- meta solved, cost 47;
- base collapsed to cost 15 side-pocket bypass.

Reason: making [4,9] a stand cell for C also gives A a lower passage that avoids
the target-debt chain.

## round47 top-right C

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round47_non_BC_top_right_entry_v1_layout.txt
```

Hypothesis: move C to [10,0] so B and C are no longer the same physical cell.

Result:

- base solved, cost 29;
- meta solved, cost 47;
- meta d6 required gate passed;
- base strict reachable gate still failed with the same lower-room d6 exposure.

Reason: changing the entrance does not remove A's access to the lower refill
misuse that produces the non-winning d6. The d6 material must itself be
meta-only, not merely reached from a different edge.

## Current Design Boundary

The family needs a stronger topology change:

- If the meta d6 station shares the lower refill room with base, A can often
  misuse refill ice to reach it before winning.
- If [4,8] is statically blocked, meta loses the left firing face.
- If [4,8] is clearable by C from below, base regains a side-pocket bypass.
- If only C is moved, A still reaches the same d6 material through base play.

Next promising direction: a separate meta-only chamber that can influence the
target-debt room without becoming a traversable base passage, or a reworked
target order where base can never create "left target full + right target debt
+ left firing face access" in the complete reachable graph.
