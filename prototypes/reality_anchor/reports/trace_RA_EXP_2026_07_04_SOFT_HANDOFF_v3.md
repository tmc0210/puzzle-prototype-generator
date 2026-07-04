# Trace: RA_EXP_2026_07_04_SOFT_HANDOFF_v3

- Inputs: down up right right down left down left down left up right left
- Steps: 13

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########
```

## Step 1: down

- legal: true
- win: false
- events: walk

```text
#########
####C...#
###G.+..#
####PL.M#
####..BS#
#########
```

## Step 2: up

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
####C@..#
###GPL..#
####...M#
####..BS#
#########
```

## Step 3: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
####.C@.#
###GPL..#
####...M#
####..BS#
#########
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
####..C@#
###GPL..#
####...M#
####..BS#
#########
```

## Step 5: down

- legal: true
- win: false
- events: walk

```text
#########
####..C.#
###GPL.@#
####...M#
####..BS#
#########
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
#########
####..C.#
###GPL@.#
####...M#
####..BS#
#########
```

## Step 7: down

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
####....#
###GPLC.#
####..@M#
####..BS#
#########
```

## Step 8: left

- legal: true
- win: false
- events: pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1

```text
#########
####....#
###GPLC.#
####.@C.#
####..BS#
#########
```

## Step 9: down

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
####....#
###G.GC.#
####PLC.#
####.@BS#
#########
```

## Step 10: left

- legal: true
- win: false
- events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2 sticky_merge:n1

```text
#########
####....#
###G.GM.#
####PLM.#
####@BS.#
#########
```

## Step 11: up

- legal: true
- win: false
- events: push_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
####....#
###GPLM.#
####@.M.#
####.BS.#
#########
```

## Step 12: right

- legal: true
- win: false
- events: walk

```text
#########
####....#
###GPLM.#
####.@M.#
####.BS.#
#########
```

## Step 13: left

- legal: true
- win: true
- events: pull_object:sticky#1 force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2

```text
#########
####....#
###PL*..#
####@C..#
####.BS.#
#########
```
