# Submission: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1

candidate_version: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
prototype: reality_anchor
status: ready_for_playtest_queue

## Layout

```text
########
####G###
###.MM@#
##G.M..#
###.MM##
####G###
###BS###
########
```

## Intended Solve

Inputs: `down left left up down down up left`

Core events:

- `sticky_to_box:n3`
- `sticky_split:n1`
- `push_object:sticky#1`
- `push_object:sticky#2`
- `push_object:crate#2`
- `move_sticky_rigid`

## Review Status

- Candidate packet: `prototypes/reality_anchor/reports/candidate_packet_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_review1.zh.md`
- Evidence review: `supports_with_caveats`, `required_action: none`
- Puzzle critic: `supports_with_noncore_caveats`, `required_action: none`
- Designer action: accept for playtest queue

## Score Calibration

- Difficulty: 3, semantic-reading type.
- Aesthetic: strong 3 floor.
- The candidate should not be described as high difficulty or guaranteed 4+ aesthetic before human playtest.

## Design Lexicon Used

- `固定 B/S 断桥：sticky split 端点目标袋`
- `刚体黏块 + 墙口：单格目标袋消费 connected footprint / 端点独立性`
- `固定 B/S 切割谱的尾债思想`

The final design uses these as a compact composition: one fixed B/S severing step creates two sticky endpoint responsibilities and one center crate bridge responsibility, and all three are consumed by separate targets.
