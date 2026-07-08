# Explorer Notes: sticky_wall_pull_shape_spectrum

## 运行边界

- 运行命令成功：

```text
npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/sticky_wall_pull_shape_spectrum/cases.yml --run-id ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_shape_spectrum --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pull_boundary_mobility_20260708_01/topics/sticky_wall_pull_shape_spectrum --write
```

- runner 产物：`cases.json`、`results.json`、`report.md`。
- 11 个 case 的局部可达图均为 `complete`。
- B/S 只提供合法 sticky material；P/L 只提供 pull side。关键观察点是 sticky footprint under pull 与墙 / blocker consumer。

## 逐族观察

### 3 格竖条与 2x2 侧拉

- `bar3_side_pull_mid_wall_blocked`：3 格竖条向右 pull，玩家前格开放，但中段目标格是墙，首步 `force_blocked`。
- `bar3_side_pull_open_mouth`：打开中段目标格后，3 格竖条整体 pull 成功，回返 found depth 9。
- `square2_side_pull_lower_wall_blocked`：2x2 向右 pull，右下目标格为墙，首步 `force_blocked`。
- `square2_side_pull_open_mouth`：打开右下目标格后，2x2 整体 pull 成功，回返 found depth 11。

结论：pull 侧多格 sticky 不只看玩家前格；侧拉时整块 footprint 的每个目标格都必须开放。3 格竖条和 2x2 都支撑同一 footprint 目标口规则。

### L 形方向补充

- `l_upper_hook_pull_tooth_blocked`：上钩 L 形远端目标格为墙，`right:force_blocked`。
- `l_upper_hook_pull_notch_open`：打开同一远端目标格后，`right` legal；但封闭 patch 中 return complete no。

结论：换 L 形方向后，远端脚目标格仍是可调旋钮；“打开目标格”只证明首步可动，不自动证明可回返。

### 沿轴横条 vs 侧拉

- `hbar3_axis_pull_clear`：3 格横条沿轴被 pull 成功；没有额外侧向目标格，但封闭 patch 中 return complete no。
- `hbar3_axis_pull_front_wall_blocked`：同形把玩家前格改墙，首步 `destination_blocked`。

结论：沿轴 pull 主要看玩家前格与前端空间；它和侧拉的 footprint 目标格谱不同。沿轴合法不保证回返。

### 把手通路被资源占用

- `bar2_post_pull_handle_open_control`：2 格竖条 pull 后，上侧通路开放，return found depth 9。
- `bar2_post_pull_handle_crate_blocker`：把手通路放 box-side crate，首步仍 legal，最终 return found depth 15；图中出现 `box_to_sticky:n1`、`sticky_to_box:n1`、`sticky_merge:n1`，说明 crate blocker 可被转化/搬运成资源，不是硬封门。
- `bar2_post_pull_handle_sticky_blocker`：把手通路放 sticky blocker，首步触发 `sticky_merge:n1`，形成三格竖向 sticky；return complete no。

结论：把手占用物类型是实质旋钮。墙/纯 sticky 债会关闭回返；box-side crate 可能被转换并搬走，反而保留较长回返路径。

## 结论范围

已支撑：

- 3 格竖条、2x2、两个 L 方向的 pull-side footprint 目标口规则。
- 3 格横条沿轴 pull 与侧拉不同：前者不产生同样的侧向目标格门。
- post-mouth handle 不只是开/关墙格；被 crate 或 sticky 占用会产生不同资源后果。

未声称：

- 没有穷尽所有 L 形四旋转与所有目标口形状。
- 没有把 `returnToInitial.status=not_applicable` 写成不可回返。
- 没有把 B/S 作为 active_rule；crate blocker case 中 B/S 竖向放置只是为了保持 crate 位于 box side。
