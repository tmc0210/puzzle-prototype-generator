import { writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../core/io.js";
import type { LevelDoc, PrototypePackage } from "../core/types.js";
import { unavailableToolMessage } from "../workflows/toolMaturity.js";

const portalPairs = [
  ["A", "B"],
  ["D", "E"],
  ["H", "I"],
] as const;

const portalGlyphs = portalPairs.flat();

const packagePath = process.argv[2] ?? "prototypes/pull_portal_fallback";
const pkg = await loadPrototypePackage(packagePath);
if (pkg.mechanic.id !== "pull_portal_fallback") {
  throw new Error(unavailableToolMessage(pkg.mechanic.id, "puzzlescript_exporter"));
}
const outPath = path.join(pkg.root, "game.ps");

await writeFile(outPath, buildPuzzleScriptNext(pkg), "utf8");
console.log(`Wrote PuzzleScript Next export to ${outPath}`);

function buildPuzzleScriptNext(pkg: PrototypePackage): string {
  return [
    buildPrelude(pkg),
    buildObjects(),
    buildLegend(),
    buildCollisionLayers(),
    buildRules(pkg),
    buildWinConditions(),
    buildLevels(pkg),
    "",
  ].join("\n\n");
}

function buildPrelude(pkg: PrototypePackage): string {
  return `title ${pkg.mechanic.title}
author Codex
homepage https://example.local/sokoban

// Generated from ${pkg.mechanic.id}.
// Runtime-backed playable and solver reports are authoritative.
// This PuzzleScript Next export is a conservative fixture adapter for the
// current pull_portal_fallback prototype.
// It uses a global Done object to support both event-style witness levels
// and crate-on-goal levels in one exported file.`;
}

function buildObjects(): string {
  return `========
OBJECTS
========

Background
LIGHTGRAY
.....
.....
.....
.....
.....

Wall
DARKGRAY
00000
00000
00000
00000
00000

Target
YELLOW
..0..
.000.
00000
.000.
..0..

Player
BLUE
..0..
.000.
00000
.0.0.
.0.0.

Crate
BROWN
00000
0...0
0...0
0...0
00000

${portalGlyphs.map(formatPortalObject).join("\n\n")}

DirRight
transparent

DirLeft
transparent

DirUp
transparent

DirDown
transparent

Done
transparent`;
}

function buildLegend(): string {
  return `========
LEGEND
========

. = Background
# = Wall
G = Target
@ = Player
C = Crate
${portalGlyphs.map((glyph) => `${glyph} = Portal${glyph}`).join("\n")}

Portal = ${portalGlyphs.map((glyph) => `Portal${glyph}`).join(" or ")}
Marker = DirRight or DirLeft or DirUp or DirDown
Blocking = Wall or Crate or ${portalGlyphs.map((glyph) => `Portal${glyph}`).join(" or ")}`;
}

function buildCollisionLayers(): string {
  return `================
COLLISIONLAYERS
================

Background
Target
Marker, Done
${portalGlyphs.map((glyph) => `Portal${glyph}`).join(", ")}
Wall, Crate
Player`;
}

function buildRules(pkg: PrototypePackage): string {
  return `=======
RULES
=======

// @rule cannot_push_crate
// @emits push_crate_failed
[ > Player | Crate ] -> CANCEL
[ > Player | Wall ] -> CANCEL

// @rule pull_single_crate
// @emits pull_crate
// The player moves away from an adjacent crate, pulling it into the old player cell.
[ Crate | > Player | no Blocking no Player ] -> [ > Crate | > Player | ]

// Direction markers preserve the attempted portal entry direction until late rules.
${portalGlyphs.map(formatPortalMarkerRules).join("\n\n")}

// @rule enter_portal.normal_teleport
// @emits portal_enter portal_teleport
${portalPairs.flatMap(([a, b]) => [formatNormalTeleportRules(a, b), formatNormalTeleportRules(b, a)]).join("\n\n")}

// @rule enter_portal.blocked_exit_push_entrance
// @emits portal_enter portal_exit_blocked portal_fallback_push
// If the paired portal's exit cell is blocked, push the entrance portal instead.
${portalPairs.flatMap(([a, b]) => [formatFallbackPushRules(a, b), formatFallbackPushRules(b, a)]).join("\n\n")}

// Crate-goal levels use the same Done-based win adapter.
late [ Crate Target ] -> [ Crate Target Done ]
late [ Player Target ] -> [ Player Target Done ]

// Clean up stale markers when no portal adapter rule consumed them.
late [ Marker ] -> []

// Exported knowledge ids:
${pkg.knowledge.knowledge.map((item) => `// - ${item.id}: ${item.statement}`).join("\n")}`;
}

function formatPortalObject(glyph: string): string {
  return `Portal${glyph}
${portalColor(glyph)}
.000.
0...0
0...0
0...0
.000.`;
}

function portalColor(glyph: string): string {
  switch (glyph) {
    case "A":
    case "D":
    case "H":
      return "PURPLE";
    default:
      return "GREEN";
  }
}

function formatPortalMarkerRules(glyph: string): string {
  return `right [ > Player | Portal${glyph} ] -> [ > Player | Portal${glyph} DirRight ]
left [ > Player | Portal${glyph} ] -> [ > Player | Portal${glyph} DirLeft ]
up [ > Player | Portal${glyph} ] -> [ > Player | Portal${glyph} DirUp ]
down [ > Player | Portal${glyph} ] -> [ > Player | Portal${glyph} DirDown ]`;
}

function formatNormalTeleportRules(from: string, to: string): string {
  return `late right [ Player Portal${from} DirRight ] [ Portal${to} | no Blocking no Player ] -> [ Portal${from} ] [ Portal${to} | Player Done ]
late left  [ Player Portal${from} DirLeft  ] [ Portal${to} | no Blocking no Player ] -> [ Portal${from} ] [ Portal${to} | Player Done ]
late up    [ Player Portal${from} DirUp    ] [ Portal${to} | no Blocking no Player ] -> [ Portal${from} ] [ Portal${to} | Player Done ]
late down  [ Player Portal${from} DirDown  ] [ Portal${to} | no Blocking no Player ] -> [ Portal${from} ] [ Portal${to} | Player Done ]`;
}

function formatFallbackPushRules(from: string, to: string): string {
  return `late right [ Player Portal${from} DirRight | no Blocking no Player ] [ Portal${to} | Blocking ] -> [ Player | Portal${from} Done ] [ Portal${to} | Blocking ]
late left  [ Player Portal${from} DirLeft  | no Blocking no Player ] [ Portal${to} | Blocking ] -> [ Player | Portal${from} Done ] [ Portal${to} | Blocking ]
late up    [ Player Portal${from} DirUp    | no Blocking no Player ] [ Portal${to} | Blocking ] -> [ Player | Portal${from} Done ] [ Portal${to} | Blocking ]
late down  [ Player Portal${from} DirDown  | no Blocking no Player ] [ Portal${to} | Blocking ] -> [ Player | Portal${from} Done ] [ Portal${to} | Blocking ]`;
}

function buildWinConditions(): string {
  return `=============
WINCONDITIONS
=============

Some Done`;
}

function buildLevels(pkg: PrototypePackage): string {
  return `=======
LEVELS
=======

${pkg.levels.levels.map(formatLevel).join("\n\n")}`;
}

function formatLevel(level: LevelDoc): string {
  const normalized = level.layout
    .replace(/\r/g, "")
    .split("\n")
    .filter((line, index, lines) => !(line === "" && index === lines.length - 1))
    .map((line) => line.replaceAll(" ", "."))
    .join("\n");

  return [
    `// ${level.id}: ${level.title}`,
    `// role: ${level.role}`,
    `// targets: ${level.targets.join(", ")}`,
    `// win: ${level.win ? JSON.stringify(level.win) : "mechanic default"}`,
    normalized,
  ].join("\n");
}
