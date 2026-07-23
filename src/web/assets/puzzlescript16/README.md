# puzzlescript16 临时素材包

这个目录是 web playable 当前默认使用的临时像素主题。Reality Anchor 继续使用
16×16 素材；Candle Sokoban 使用重新绘制的 32×32 素材。

- 运行时素材来源是 `png/` 下的 PNG 文件。
- 每张棋盘 sprite 的尺寸由 `manifest.ts` 声明，当前允许严格的 `16x16` 或
  `32x32`；Candle Sokoban 素材必须是 `32x32`。
- `manifest.ts` 负责维护 `visualKey -> PNG` 的映射。
- `generateSprites.ts` 是项目自绘临时素材的生成工具，不参与运行时渲染。
- `checkSprites.ts` 校验 manifest 覆盖和 PNG 尺寸。

常用命令：

```bash
npm run sprites:generate
npm run sprites:check
```

当前素材为项目自绘占位图，不包含授权不明的社区 PuzzleScript 游戏素材。
