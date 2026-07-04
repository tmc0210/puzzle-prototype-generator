export type SpriteLayerRole = "terrain" | "target" | "object" | "actor";

export type PixelSpriteAsset = {
  label: string;
  file: string;
  src: string;
  layerRole: SpriteLayerRole;
  size: 16;
};

function sprite(
  file: string,
  label: string,
  layerRole: SpriteLayerRole,
): PixelSpriteAsset {
  return {
    file,
    label,
    layerRole,
    size: 16,
    src: `./assets/puzzlescript16/${file}`,
  };
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
};

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
