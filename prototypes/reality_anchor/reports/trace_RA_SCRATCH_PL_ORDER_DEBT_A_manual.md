# Trace: RA_SCRATCH_PL_ORDER_DEBT_A_manual

- Inputs: right up right up right down right down right
- Steps: 9

## Step 0: start

- legal: true
- win: false
- events: none

```text
#########
##PL..###
###.G..##
#.@CC.G.#
#########
```

## Step 1: right

- legal: true
- win: false
- events: push_object:crate#1 force_chain:n2

```text
#########
##PL..###
###.G..##
#..@CCG.#
#########
```

## Step 2: up

- legal: true
- win: false
- events: walk

```text
#########
##PL..###
###@G..##
#...CCG.#
#########
```

## Step 3: right

- legal: true
- win: false
- events: walk

```text
#########
##PL..###
###.+..##
#...CCG.#
#########
```

## Step 4: up

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
##PL@.###
###.*..##
#....CG.#
#########
```

## Step 5: right

- legal: true
- win: false
- events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull

```text
#########
##.PL@###
###.*..##
#....CG.#
#########
```

## Step 6: down

- legal: true
- win: false
- events: walk

```text
#########
##.PL.###
###.*@.##
#....CG.#
#########
```

## Step 7: right

- legal: true
- win: false
- events: pull_object:crate#1

```text
#########
##.PL.###
###.GC@##
#....CG.#
#########
```

## Step 8: down

- legal: true
- win: false
- events: walk

```text
#########
##.PL.###
###.GC.##
#....C+.#
#########
```

## Step 9: right

- legal: true
- win: false
- events: pull_object:crate#2

```text
#########
##.PL.###
###.GC.##
#.....*@#
#########
```
