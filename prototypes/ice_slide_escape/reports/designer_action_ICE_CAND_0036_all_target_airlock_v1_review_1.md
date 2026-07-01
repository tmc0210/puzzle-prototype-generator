# Designer Action 1: ICE_CAND_0036_all_target_airlock_v1

```yaml
candidate_version: ICE_CAND_0036_all_target_airlock_v1
after_review_iteration: review_1
designer_action_1: revise_claim
layout_changed: false
start_changed: false
goal_changed: false
win_condition_changed: false
core_mechanism_changed: false
requires_review_2: true
reason: >
  Evidence review found that the strict LIFO repayment order in the review_1
  packet is overclaimed. A replay can win after opening A, opening B, then
  repaying A before B. The claim is therefore revised to "two target-ice doors
  must be borrowed and repaid; the returned solver trace uses B-then-A repayment,
  but strict repayment order is not asserted."
```

## Claim Revision

Keep:

- all initial ice is on target, and all target cells are initially occupied;
- target-ice blocks the initial start-to-goal route;
- winning paths require `push_ice`, `ice_rebound_d4`, and `ice_blocks_ice_no_chain_push`;
- no winning path uses d3, boundary disappearance, d5, d6, or restart events;
- the returned trace borrows two door ice blocks and repays both with d4.

Remove / downgrade:

- Do not claim that B must be repaid before A.
- Do not claim exact four-d4 / per-object necessity as complete all-solution proof.
- Treat four returned d4 snapshots as returned-trace evidence plus layout reading, not identity-complete proof.

## Revised Design Claim For Review 2

```yaml
design_claim:
  player_insight: >
    初始状态看起来“箱子全在目标上”，但这正是矛盾：目标冰同时也是门和 d4 障碍。
    玩家要理解胜利条件不是保持当前静态，而是临时借走已经正确的门冰，穿过后
    再从背面把被借走的门冰还回 target。两扇门形成嵌套 airlock：返回 trace 是
    先开 A、再开 B、先还 B、再还 A；但候选不再声称这个还债顺序对所有解严格必要。
  causal_chain:
    - A门 [5,5] 向上推，借助 [5,0] target-ice 障碍 d4 回弹到 [5,2]，打开左门。
    - B门 [10,5] 向上推，借助 [10,0] target-ice 障碍 d4 回弹到 [10,2]，打开右门。
    - 从上侧推被借走的门冰向下，借助对应下方 target-ice 障碍 d4 回弹回原 target。
    - 两个门 target 都重新被 ice 覆盖后，玩家沿上廊到达 [14,1]。
  why_not_execution: >
    不是“看见冰就推到目标”的执行题：初始目标全满，正确动作反而是制造 target debt；
    若玩家把四个锚点冰当普通箱子消费，会进入死路。核心读法是被目标冰封住的路径、
    借走门冰后的债务、以及从背面偿还门冰；还债顺序存在分支，因此难度主张降为
    稳定 3，而非 4/5。
  falsification:
    - 存在无需 push_ice 的步行胜利路径。
    - 存在不触发 d4 / ice obstacle 的胜利路径。
    - 存在使用 d3、边界消失、d5、d6/restart 的胜利路径。
    - 两扇门不需要被借走并还回，或玩家可以在不产生 target debt 的情况下到达终点。
```
