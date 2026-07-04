import type { LevelDoc, MechanicDoc, WinCondition } from "../core/types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "../core/puzzleRuntime.js";
import { iceSlideAdapter } from "./ice_slide_escape/runtime.js";
import { pullPortalAdapter } from "./pull_portal_fallback/runtime.js";
import { realityAnchorAdapter } from "./reality_anchor/runtime.js";

export type AdapterStepResult<State, Action extends string> = {
  legal: boolean;
  input: Action;
  state: State;
  events: string[];
  reason?: string;
};

export type AdapterReplayResult<State> = {
  state: State;
  events: string[];
  legal: boolean;
};

export type VisualLayer = {
  visualKey: string;
  fallbackGlyph: string;
  label?: string;
  tags?: string[];
};

export type VisualTile = {
  x: number;
  y: number;
  terrain?: VisualLayer;
  target?: VisualLayer;
  actors?: VisualLayer[];
  objects?: VisualLayer[];
};

export type VisualBoard = {
  width: number;
  height: number;
  tiles: VisualTile[];
};

export type RuntimeAdapter<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
> = {
  id: string;
  createRuntime(mechanic: MechanicDoc): PuzzleRuntime<State, Action, Options>;
  parseLevel(level: LevelDoc): State;
  renderState(state: State): string;
  step(
    mechanic: MechanicDoc,
    state: State,
    action: Action,
    options: Options,
  ): AdapterStepResult<State, Action>;
  replay(
    mechanic: MechanicDoc,
    initialState: State,
    actions: Action[],
    options: Options,
  ): AdapterReplayResult<State>;
  isWin(state: State, winCondition: WinCondition): boolean;
  isEventWin(events: string[], winCondition?: WinCondition): boolean;
  renderVisualState?(state: State, mechanic: MechanicDoc): VisualBoard;
};

export type CurrentRuntimeAdapter = RuntimeAdapter<any, any, any>;

export function renderVisualStateWithFallback<State extends { width: number; height: number }>(
  adapter: RuntimeAdapter<State, string, RuntimeSearchOptions>,
  mechanic: MechanicDoc,
  state: State,
): VisualBoard {
  return adapter.renderVisualState?.(state, mechanic) ?? renderGlyphVisualBoard(adapter.renderState(state), state);
}

export function renderGlyphVisualBoard(
  renderedState: string,
  size: { width: number; height: number },
): VisualBoard {
  const rows = renderedState
    .split("\n")
    .map((row) => row.padEnd(size.width, " "));
  const tiles: VisualTile[] = [];

  for (let y = 0; y < size.height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < size.width; x += 1) {
      tiles.push(glyphTile(row[x] ?? " ", x, y));
    }
  }

  return { width: size.width, height: size.height, tiles };
}

function glyphTile(glyph: string, x: number, y: number): VisualTile {
  const tile: VisualTile = {
    x,
    y,
    terrain: layer("terrain.floor", " ", "floor"),
  };

  switch (glyph) {
    case " ":
    case ".":
      return tile;
    case "#":
      tile.terrain = layer("terrain.wall", "#", "wall");
      return tile;
    case "G":
      tile.target = layer("target.goal", "G", "goal");
      return tile;
    case "+":
      tile.target = layer("target.goal", "G", "goal");
      tile.actors = [layer("actor.player", "@", "player")];
      return tile;
    case "@":
      tile.actors = [layer("actor.player", "@", "player")];
      return tile;
    case "*":
      tile.target = layer("target.goal", "G", "goal");
      tile.objects = [layer("object.crate", "C", "crate")];
      return tile;
    case "C":
      tile.objects = [layer("object.crate", "C", "crate")];
      return tile;
    case "m":
      tile.target = layer("target.goal", "G", "goal");
      tile.objects = [layer("object.sticky", "M", "sticky")];
      return tile;
    case "M":
      tile.objects = [layer("object.sticky", "M", "sticky")];
      return tile;
    default:
      tile.objects = [layer(`glyph.${glyph}`, glyph, glyph, ["glyph-fallback"])];
      return tile;
  }
}

function layer(
  visualKey: string,
  fallbackGlyph: string,
  label: string,
  tags: string[] = [],
): VisualLayer {
  return { visualKey, fallbackGlyph, label, tags };
}

export function getRuntimeAdapter(mechanic: MechanicDoc): CurrentRuntimeAdapter {
  if (mechanic.id === pullPortalAdapter.id) {
    return pullPortalAdapter;
  }
  if (mechanic.id === iceSlideAdapter.id) {
    return iceSlideAdapter;
  }
  if (mechanic.id === realityAnchorAdapter.id) {
    return realityAnchorAdapter;
  }

  throw new Error(
    `No runtime adapter registered for mechanic '${mechanic.id}'. ` +
      "Add an adapter before running solver, analyzer, playable, or exporter commands.",
  );
}
