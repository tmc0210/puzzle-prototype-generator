# 源码目录分层

`src/` 根目录只保留 CLI 入口和少量顶层子系统目录。不要把新机制、实验工具或工作流文件直接放在根目录。

## 目录职责

```text
src/core/
  机制无关的基础能力：类型、事件匹配、runtime 接口、solver、graph、agency、
  package IO、通用 level analyzer 依赖的低层工具。

src/prototypes/
  原型注册表和具体原型实现。

src/prototypes/<mechanic_id>/
  该原型专属的 mechanics、runtime、sampler profile、原型工具。

src/workflows/
  依赖 package / adapter 的上层流程：audit、evaluator、curriculum、generator、
  miner、calibration、tool maturity 等。

src/archive/
  设计归档维护工具。这里不应知道具体机制规则。

src/exporters/
  外部格式导出和检查器。当前 PuzzleScript Next 导出仍是机制专属能力，
  但入口放在统一 exporter 目录。

src/playable/ 和 src/web/
  runtime-backed playable 的构建入口和浏览器应用。
```

## 边界规则

- `src/core/` 不应导入 `src/prototypes/*`。
- 具体原型代码必须放在 `src/prototypes/<mechanic_id>/`。
- 原型专属设计工具也放在该原型目录下，例如 `tools/startComparison.ts`。
- 通用归档维护放在 `src/archive/`，不要放进某个原型目录。
- CLI 应保持薄调度层；业务逻辑放进对应目录。
- 新机制模板应实例化到 `src/prototypes/<mechanic_id>/`，再在 `src/prototypes/runtimeAdapter.ts` 或相应 registry 中显式注册。
