export type SpriteLayerRole = "terrain" | "target" | "object" | "actor";

export type PixelSpriteAsset = {
  label: string;
  file: string;
  src: string;
  layerRole: SpriteLayerRole;
  size: 16 | 32;
};

function sprite(
  file: string,
  label: string,
  layerRole: SpriteLayerRole,
  size: 16 | 32 = 16,
): PixelSpriteAsset {
  return {
    file,
    label,
    layerRole,
    size,
    src: `./assets/puzzlescript16/${file}`,
  };
}

function candleSprite(
  file: string,
  label: string,
  layerRole: SpriteLayerRole,
): PixelSpriteAsset {
  return sprite(file, label, layerRole, 32);
}

export const puzzleScript16Sprites: Record<string, PixelSpriteAsset> = {
  "terrain.floor": sprite("terrain_floor_box_side.png", "floor", "terrain"),
  "terrain.wall": sprite("terrain_wall_box_side.png", "wall", "terrain"),
  "target.goal": sprite("target_goal.png", "goal", "target"),
  "actor.player": sprite("ra_player_push_side.png", "player", "actor"),
  "object.crate": sprite("ra_crate_box_side.png", "crate", "object"),
  "object.sticky": sprite("ra_sticky_sticky_side.png", "sticky block", "object"),

  "ra.terrain.floor.box_side": sprite("terrain_floor_box_side.png", "box-side floor", "terrain"),
  "ra.terrain.floor.sticky_side": sprite("terrain_floor_sticky_side.png", "sticky-side floor", "terrain"),
  "ra.terrain.wall.box_side": sprite("terrain_wall_box_side.png", "box-side wall", "terrain"),
  "ra.terrain.wall.sticky_side": sprite("terrain_wall_sticky_side.png", "sticky-side wall", "terrain"),

  "ra.player.push_side": sprite("ra_player_push_side.png", "push-side player", "actor"),
  "ra.player.pull_side": sprite("ra_player_pull_side.png", "pull-side player", "actor"),
  "ra.crate.box_side": sprite("ra_crate_box_side.png", "box-side crate", "object"),
  "ra.crate.sticky_side": sprite("ra_crate_sticky_side.png", "sticky-side crate", "object"),
  "ra.sticky.box_side": sprite("ra_sticky_box_side.png", "box-side sticky block", "object"),
  "ra.sticky.sticky_side": sprite("ra_sticky_sticky_side.png", "sticky-side sticky block", "object"),
  "ra.anchor.push_end": sprite("ra_anchor_push_end.png", "push anchor end", "object"),
  "ra.anchor.pull_end": sprite("ra_anchor_pull_end.png", "pull anchor end", "object"),
  "ra.anchor.push_end.join_left": sprite("ra_anchor_push_end_join_left.png", "push anchor end joined left", "object"),
  "ra.anchor.push_end.join_right": sprite("ra_anchor_push_end_join_right.png", "push anchor end joined right", "object"),
  "ra.anchor.push_end.join_up": sprite("ra_anchor_push_end_join_up.png", "push anchor end joined up", "object"),
  "ra.anchor.push_end.join_down": sprite("ra_anchor_push_end_join_down.png", "push anchor end joined down", "object"),
  "ra.anchor.pull_end.join_left": sprite("ra_anchor_pull_end_join_left.png", "pull anchor end joined left", "object"),
  "ra.anchor.pull_end.join_right": sprite("ra_anchor_pull_end_join_right.png", "pull anchor end joined right", "object"),
  "ra.anchor.pull_end.join_up": sprite("ra_anchor_pull_end_join_up.png", "pull anchor end joined up", "object"),
  "ra.anchor.pull_end.join_down": sprite("ra_anchor_pull_end_join_down.png", "pull anchor end joined down", "object"),
  "ra.anchor.box_end": sprite("ra_anchor_box_end.png", "box anchor end", "object"),
  "ra.anchor.sticky_end": sprite("ra_anchor_sticky_end.png", "sticky anchor end", "object"),
  "ra.anchor.box_end.join_left": sprite("ra_anchor_box_end_join_left.png", "box anchor end joined left", "object"),
  "ra.anchor.box_end.join_right": sprite("ra_anchor_box_end_join_right.png", "box anchor end joined right", "object"),
  "ra.anchor.box_end.join_up": sprite("ra_anchor_box_end_join_up.png", "box anchor end joined up", "object"),
  "ra.anchor.box_end.join_down": sprite("ra_anchor_box_end_join_down.png", "box anchor end joined down", "object"),
  "ra.anchor.sticky_end.join_left": sprite("ra_anchor_sticky_end_join_left.png", "sticky anchor end joined left", "object"),
  "ra.anchor.sticky_end.join_right": sprite("ra_anchor_sticky_end_join_right.png", "sticky anchor end joined right", "object"),
  "ra.anchor.sticky_end.join_up": sprite("ra_anchor_sticky_end_join_up.png", "sticky anchor end joined up", "object"),
  "ra.anchor.sticky_end.join_down": sprite("ra_anchor_sticky_end_join_down.png", "sticky anchor end joined down", "object"),
  "candle.terrain.floor": candleSprite("candle_terrain_floor.png", "tomb floor", "terrain"),
  "candle.terrain.wall": candleSprite("candle_terrain_wall.png", "tomb wall", "terrain"),
  "candle.player.alive": candleSprite("candle_player_alive.png", "player", "actor"),
  "candle.player.dead": candleSprite("candle_player_dead.png", "dead player", "actor"),
  "candle.brazier.unlit": candleSprite("candle_brazier_unlit.png", "unlit brazier", "object"),
  "candle.brazier.lit": candleSprite("candle_brazier_lit.png", "lit brazier", "object"),
  "candle.wick.left.unlit": candleSprite("candle_wick_left_unlit.png", "unlit wick facing left", "object"),
  "candle.wick.right.unlit": candleSprite("candle_wick_right_unlit.png", "unlit wick facing right", "object"),
  "candle.wick.up.unlit": candleSprite("candle_wick_up_unlit.png", "unlit wick facing up", "object"),
  "candle.wick.down.unlit": candleSprite("candle_wick_down_unlit.png", "unlit wick facing down", "object"),
  "candle.wick.left.lit": candleSprite("candle_wick_left_lit.png", "lit wick facing left", "object"),
  "candle.wick.right.lit": candleSprite("candle_wick_right_lit.png", "lit wick facing right", "object"),
  "candle.wick.up.lit": candleSprite("candle_wick_up_lit.png", "lit wick facing up", "object"),
  "candle.wick.down.lit": candleSprite("candle_wick_down_lit.png", "lit wick facing down", "object"),
};

const candleIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const candleDirections = ["left", "right", "up", "down"] as const;

for (const id of candleIds) {
  puzzleScript16Sprites[`candle.body.${id}.middle_horizontal`] = candleSprite(
    `candle_body_${id}_middle_horizontal.png`,
    `candle ${id} horizontal body`,
    "object",
  );
  puzzleScript16Sprites[`candle.body.${id}.middle_vertical`] = candleSprite(
    `candle_body_${id}_middle_vertical.png`,
    `candle ${id} vertical body`,
    "object",
  );
  for (const direction of candleDirections) {
    puzzleScript16Sprites[`candle.body.${id}.tail_${direction}`] = candleSprite(
      `candle_body_${id}_tail_${direction}.png`,
      `candle ${id} tail joined ${direction}`,
      "object",
    );
  }
}

for (const id of [...candleIds, "single"] as const) {
  for (const direction of candleDirections) {
    for (const state of ["unlit", "lit"] as const) {
      puzzleScript16Sprites[`candle.cap.${id}.${direction}.${state}`] = candleSprite(
        `candle_cap_${id}_${direction}_${state}.png`,
        `${state} candle ${id} wick end facing ${direction}`,
        "object",
      );
    }
  }
}

export const requiredRealityAnchorSpriteKeys = [
  "ra.terrain.floor.box_side",
  "ra.terrain.floor.sticky_side",
  "ra.terrain.wall.box_side",
  "ra.terrain.wall.sticky_side",
  "ra.player.push_side",
  "ra.player.pull_side",
  "ra.crate.box_side",
  "ra.crate.sticky_side",
  "ra.sticky.box_side",
  "ra.sticky.sticky_side",
  "ra.anchor.push_end",
  "ra.anchor.pull_end",
  "ra.anchor.push_end.join_left",
  "ra.anchor.push_end.join_right",
  "ra.anchor.push_end.join_up",
  "ra.anchor.push_end.join_down",
  "ra.anchor.pull_end.join_left",
  "ra.anchor.pull_end.join_right",
  "ra.anchor.pull_end.join_up",
  "ra.anchor.pull_end.join_down",
  "ra.anchor.box_end",
  "ra.anchor.sticky_end",
  "ra.anchor.box_end.join_left",
  "ra.anchor.box_end.join_right",
  "ra.anchor.box_end.join_up",
  "ra.anchor.box_end.join_down",
  "ra.anchor.sticky_end.join_left",
  "ra.anchor.sticky_end.join_right",
  "ra.anchor.sticky_end.join_up",
  "ra.anchor.sticky_end.join_down",
] as const;

export const requiredCandleSokobanSpriteKeys = [
  "candle.terrain.floor",
  "candle.terrain.wall",
  "candle.player.alive",
  "candle.player.dead",
  "candle.brazier.unlit",
  "candle.brazier.lit",
  "candle.wick.left.unlit",
  "candle.wick.right.unlit",
  "candle.wick.up.unlit",
  "candle.wick.down.unlit",
  "candle.wick.left.lit",
  "candle.wick.right.lit",
  "candle.wick.up.lit",
  "candle.wick.down.lit",
  ...candleIds.flatMap((id) => [
    `candle.body.${id}.middle_horizontal`,
    `candle.body.${id}.middle_vertical`,
    ...candleDirections.map((direction) => `candle.body.${id}.tail_${direction}`),
  ]),
  ...[...candleIds, "single"].flatMap((id) =>
    candleDirections.flatMap((direction) => [
      `candle.cap.${id}.${direction}.unlit`,
      `candle.cap.${id}.${direction}.lit`,
    ]),
  ),
] as const;
