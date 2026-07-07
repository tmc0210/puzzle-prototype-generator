# Proposed Families

## 刚体黏块推进后的回返谱系

局部问题：

同一次刚体黏块推进后，什么局部结构让它可回返，什么结构让它成为承诺？

结构旋钮：

- 推进后是否存在可达的反向施力站位格。
- 直条长度与墙口余量。
- 非矩形块是否提供侧向把手。
- 把手是否被墙堵住。

变体谱：

- `vertical2_single_column_push_down`：2 格竖条单列通道，下推后不可回返。
- `vertical2_loop_room_push_down`：2 格竖条可绕行房间，下推后可回返。
- `sticky3_narrow_mouth_push_right`：3 格横条窄口，右推后不可回返。
- `sticky3_wide_mouth_push_right`：3 格横条加宽一格，右推后可回返。
- `sticky4_wide_for_3_not_4_push_right`：4 格横条放进刚好救 3 格条的口，右推后不可回返。
- `sticky4_extra_wide_push_right`：4 格横条再加宽一格，右推后可回返。
- `square2_narrow_push_right`：2x2 窄口，右推后不可回返。
- `square2_wide_push_right`：2x2 加宽口，右推后可回返。
- `lshape_handle_open`：L 形顶端封死但侧把手开放，右推后可回返。
- `lshape_handle_blocked_by_wall`：L 形侧把手被墙堵住，右推后不可回返。

修正后的共同解释：

第一轮说“能绕到右侧”太粗。更准确的是：推进后必须存在可达的反向施力站位格。这个站位格不一定在整体端点外侧；L 形可以通过侧向凸出格提供把手。

建议 curator 收录：

可以收录为一个结构族，而不是拆成“2 格条可回返”“L 形可回返”等孤立结论。

不建议收录：

- “黏块能刚体移动”：一阶规则。
- “越长越不可逆”：被加宽口变体修正。
- “能绕到附近就能推回”：被 2x2 窄口反驳。
