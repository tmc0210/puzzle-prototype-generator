# Trace: RA_EXP_2026_07_04_SOFT_HANDOFF_altB

- Inputs: right down down right up left left left down right
- Steps: 10

## Step 0: start

- legal: true
- win: false
- events: none

```text
#######
##.@.C#
#P..C.#
#LGB..#
#M#SG.#
#######
```

## Step 1: right

- legal: true
- win: false
- events: walk

```text
#######
##..@C#
#P..C.#
#LGB..#
#M#SG.#
#######
```

## Step 2: down

- legal: true
- win: false
- events: push_object:crate#2

```text
#######
##...C#
#P..@.#
#LGBC.#
#M#SG.#
#######
```

## Step 3: down

- legal: true
- win: false
- events: push_object:crate#2 box_to_sticky:n1

```text
#######
##...C#
#P....#
#LGB@.#
#M#Sm.#
#######
```

## Step 4: right

- legal: true
- win: false
- events: pull_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid

```text
#######
##...C#
#P....#
#LG.B@#
#M#.SM#
#######
```

## Step 5: up

- legal: true
- win: false
- events: pull_object:sticky#2 move_sticky_rigid sticky_to_box:n1

```text
#######
##...C#
#P...@#
#LG.BC#
#M#.S.#
#######
```

## Step 6: left

- legal: true
- win: false
- events: walk

```text
#######
##...C#
#P..@.#
#LG.BC#
#M#.S.#
#######
```

## Step 7: left

- legal: true
- win: false
- events: walk

```text
#######
##...C#
#P.@..#
#LG.BC#
#M#.S.#
#######
```

## Step 8: left

- legal: true
- win: false
- events: walk

```text
#######
##...C#
#P@...#
#LG.BC#
#M#.S.#
#######
```

## Step 9: down

- legal: true
- win: false
- events: walk

```text
#######
##...C#
#P....#
#L+.BC#
#M#.S.#
#######
```

## Step 10: right

- legal: true
- win: true
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#######
##...C#
#.P...#
#.L@BC#
#M#.S.#
#######
```
