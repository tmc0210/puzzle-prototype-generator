# Trace: RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1

- Inputs: right right up left right right right right down
- Steps: 9

## Step 0: start

- legal: true
- win: false
- events: none

```text
########
####PL##
########
#.#M..M#
#GC...G#
#@BS...#
########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1

```text
########
####PL##
########
#.#C..M#
#GC...G#
#.@BS..#
########
```

## Step 2: right

- legal: true
- win: false
- events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky

```text
########
####PL##
########
#.#C..M#
#GC...G#
#..@BS.#
########
```

## Step 3: up

- legal: true
- win: false
- events: walk

```text
########
####PL##
########
#.#C..M#
#GC@..G#
#...BS.#
########
```

## Step 4: left

- legal: true
- win: false
- events: push_object:crate#2

```text
########
####PL##
########
#.#C..M#
#*@...G#
#...BS.#
########
```

## Step 5: right

- legal: true
- win: false
- events: walk

```text
########
####PL##
########
#.#C..M#
#*.@..G#
#...BS.#
########
```

## Step 6: right

- legal: true
- win: false
- events: walk

```text
########
####PL##
########
#.#C..M#
#*..@.G#
#...BS.#
########
```

## Step 7: right

- legal: true
- win: false
- events: walk

```text
########
####PL##
########
#.#C..M#
#*...@G#
#...BS.#
########
```

## Step 8: right

- legal: true
- win: false
- events: walk

```text
########
####PL##
########
#.#C..M#
#*....+#
#...BS.#
########
```

## Step 9: down

- legal: true
- win: true
- events: pull_object:sticky#1 move_sticky_rigid

```text
########
####PL##
########
#.#C...#
#*....m#
#...BS@#
########
```
