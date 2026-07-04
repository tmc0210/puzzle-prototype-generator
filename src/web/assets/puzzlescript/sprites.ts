export type PuzzleScriptSprite = {
  label: string;
  colors: string[];
  pixels: string[];
};

export const puzzleScriptSprites: Record<string, PuzzleScriptSprite> = {
  "terrain.floor": {
    label: "floor",
    colors: ["#dfe8df", "#edf3ec"],
    pixels: [
      "01010",
      "10101",
      "01010",
      "10101",
      "01010",
    ],
  },
  "terrain.wall": {
    label: "wall",
    colors: ["#26313b", "#3a4651", "#151c23"],
    pixels: [
      "00000",
      "01110",
      "02220",
      "01110",
      "00000",
    ],
  },
  "target.goal": {
    label: "goal",
    colors: ["#e4a93a", "#fff0a8"],
    pixels: [
      "..0..",
      ".010.",
      "01110",
      ".010.",
      "..0..",
    ],
  },
  "actor.player": {
    label: "player",
    colors: ["#1f6ed4", "#f8fbff", "#12437f"],
    pixels: [
      ".000.",
      "01110",
      "00200",
      ".0.0.",
      ".2.2.",
    ],
  },
  "object.crate": {
    label: "crate",
    colors: ["#a45a31", "#d08a4a", "#6f351f"],
    pixels: [
      "22222",
      "21112",
      "21012",
      "21112",
      "22222",
    ],
  },
  "object.sticky": {
    label: "sticky",
    colors: ["#5f8f3b", "#a7d857", "#355b24"],
    pixels: [
      ".111.",
      "11211",
      "11111",
      "21112",
      ".222.",
    ],
  },
  "ra.player.push_side": {
    label: "push-side player",
    colors: ["#1f6ed4", "#f8fbff", "#103d78"],
    pixels: [
      ".000.",
      "01110",
      "00200",
      ".0.0.",
      ".2.2.",
    ],
  },
  "ra.player.pull_side": {
    label: "pull-side player",
    colors: ["#7b4bd1", "#f8fbff", "#3f2679"],
    pixels: [
      ".000.",
      "01110",
      "00200",
      "0...0",
      ".2.2.",
    ],
  },
  "ra.crate.box_side": {
    label: "box-side crate",
    colors: ["#a45a31", "#d08a4a", "#6f351f"],
    pixels: [
      "22222",
      "21112",
      "21012",
      "21112",
      "22222",
    ],
  },
  "ra.crate.sticky_side": {
    label: "sticky-side crate",
    colors: ["#a45a31", "#d08a4a", "#7fbf4d", "#355b24"],
    pixels: [
      "33333",
      "32223",
      "32123",
      "32223",
      "33333",
    ],
  },
  "ra.sticky.box_side": {
    label: "box-side sticky block",
    colors: ["#7b8a57", "#c5cc83", "#4f5b31"],
    pixels: [
      ".111.",
      "11211",
      "12221",
      "11211",
      ".222.",
    ],
  },
  "ra.sticky.sticky_side": {
    label: "sticky-side sticky block",
    colors: ["#5f8f3b", "#a7d857", "#355b24"],
    pixels: [
      ".111.",
      "11211",
      "11111",
      "21112",
      ".222.",
    ],
  },
  "ra.anchor.push_end": {
    label: "push anchor end",
    colors: ["#2f7f95", "#b7f3ff", "#164854"],
    pixels: [
      "0000.",
      "01100",
      "01110",
      "01100",
      "0000.",
    ],
  },
  "ra.anchor.pull_end": {
    label: "pull anchor end",
    colors: ["#7b5aa6", "#e2d1ff", "#3e2a5d"],
    pixels: [
      ".000.",
      "00110",
      "01110",
      "00100",
      ".000.",
    ],
  },
  "ra.anchor.box_end": {
    label: "box anchor end",
    colors: ["#9a573c", "#f0c09a", "#5f2f20"],
    pixels: [
      "00000",
      "01110",
      "01010",
      "01110",
      "00000",
    ],
  },
  "ra.anchor.sticky_end": {
    label: "sticky anchor end",
    colors: ["#628d33", "#c7ed83", "#344f1d"],
    pixels: [
      ".000.",
      "01110",
      "01110",
      "01110",
      ".000.",
    ],
  },
};
