import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type Point = readonly [number, number];

type Piece = {
  id: string;
  cells: Point[];
  targetOffset: Point;
};

type Kit = {
  id: string;
  title: string;
  pieces: Piece[];
  handle: Point;
  contacts: Point[];
};

type Placement = {
  piece: Piece;
  dx: number;
  dy: number;
};

const key = ([x, y]: Point): string => `${x},${y}`;
const add = ([x, y]: Point, [dx, dy]: Point): Point => [x + dx, y + dy];

const kits: Kit[] = [
  {
    id: "serial_crown_3",
    title: "三件串联王冠",
    handle: [0, 0],
    contacts: [[8, -2], [8, 0], [8, 2]],
    pieces: [
      {
        id: "handle_T",
        cells: [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]],
        targetOffset: [0, 0],
      },
      {
        id: "relay_S",
        cells: [[0, 0], [1, 0], [2, 0], [3, 0], [1, -1], [2, 1]],
        targetOffset: [3, 0],
      },
      {
        id: "crown_head",
        cells: [
          [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3],
          [1, -2], [1, 0], [1, 2],
        ],
        targetOffset: [7, 0],
      },
    ],
  },
  {
    id: "split_wing_4",
    title: "四件分翼甲虫（反例族）",
    handle: [0, 0],
    contacts: [[8, -2], [8, 0], [8, 2]],
    pieces: [
      {
        id: "handle_C",
        cells: [[0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1], [2, 0]],
        targetOffset: [0, 0],
      },
      {
        id: "relay_bar",
        cells: [[0, 0], [1, 0], [2, 0], [3, 0]],
        targetOffset: [3, 0],
      },
      {
        id: "upper_wing_L",
        cells: [[0, 0], [0, -1], [0, -2], [1, -2]],
        targetOffset: [7, 0],
      },
      {
        id: "lower_wing_L",
        cells: [[0, 1], [0, 2], [1, 2], [1, 0]],
        targetOffset: [7, 0],
      },
    ],
  },
  {
    id: "serial_mask_4",
    title: "四件串联面具",
    handle: [0, 0],
    contacts: [[10, -2], [10, 0], [10, 2]],
    pieces: [
      {
        id: "rear_hook",
        cells: [[0, 0], [1, 0], [1, -1], [2, -1]],
        targetOffset: [0, 0],
      },
      {
        id: "lower_key",
        cells: [[0, 0], [1, 0], [1, 1], [2, 1]],
        targetOffset: [3, -1],
      },
      {
        id: "upper_key",
        cells: [[0, 0], [1, 0], [1, -1], [2, -1], [2, 0]],
        targetOffset: [6, 0],
      },
      {
        id: "mask_head",
        cells: [
          [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3],
          [1, -2], [1, 0], [1, 2],
        ],
        targetOffset: [9, 0],
      },
    ],
  },
];

function targetCells(piece: Piece): Point[] {
  return piece.cells.map((cell) => add(cell, piece.targetOffset));
}

function unionCells(placements: Placement[]): Set<string> {
  const result = new Set<string>();
  for (const placement of placements) {
    for (const [x, y] of placement.piece.cells) {
      result.add(key([x + placement.dx, y + placement.dy]));
    }
  }
  return result;
}

function overlaps(placements: Placement[]): boolean {
  const seen = new Set<string>();
  for (const placement of placements) {
    for (const [x, y] of placement.piece.cells) {
      const k = key([x + placement.dx, y + placement.dy]);
      if (seen.has(k)) return true;
      seen.add(k);
    }
  }
  return false;
}

function connected(cells: Set<string>): boolean {
  const first = cells.values().next().value as string | undefined;
  if (!first) return false;
  const open = [first];
  const visited = new Set([first]);
  while (open.length > 0) {
    const current = open.pop()!;
    const [x, y] = current.split(",").map(Number);
    for (const next of [`${x + 1},${y}`, `${x - 1},${y}`, `${x},${y + 1}`, `${x},${y - 1}`]) {
      if (cells.has(next) && !visited.has(next)) {
        visited.add(next);
        open.push(next);
      }
    }
  }
  return visited.size === cells.size;
}

function subsetOf(cells: Set<string>, mask: Set<string>): boolean {
  return [...cells].every((cell) => mask.has(cell));
}

function shifted(cells: Set<string>, dx: number, dy: number): Set<string> {
  return new Set([...cells].map((cell) => {
    const [x, y] = cell.split(",").map(Number);
    return `${x + dx},${y + dy}`;
  }));
}

function combinations<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  const visit = (start: number, chosen: T[]) => {
    if (chosen.length === size) {
      result.push([...chosen]);
      return;
    }
    for (let i = start; i < items.length; i += 1) {
      chosen.push(items[i]!);
      visit(i + 1, chosen);
      chosen.pop();
    }
  };
  visit(0, []);
  return result;
}

function enumerateAgainstMask(kit: Kit, chamberMask: Set<string>, variant: string) {
  const xs = [...chamberMask].map((cell) => Number(cell.split(",")[0]));
  const ys = [...chamberMask].map((cell) => Number(cell.split(",")[1]));
  const minX = Math.min(...xs) - 2;
  const maxX = Math.max(...xs) + 2;
  const minY = Math.min(...ys) - 2;
  const maxY = Math.max(...ys) + 2;

  const perPiecePlacements = new Map<string, Placement[]>();
  for (const piece of kit.pieces) {
    const possible: Placement[] = [];
    for (let dx = minX; dx <= maxX; dx += 1) {
      for (let dy = minY; dy <= maxY; dy += 1) {
        const placement = { piece, dx, dy };
        const cells = unionCells([placement]);
        if (subsetOf(cells, chamberMask) && subsetOf(shifted(cells, 1, 0), chamberMask)) {
          possible.push(placement);
        }
      }
    }
    perPiecePlacements.set(piece.id, possible);
  }

  const classifications: Record<string, number> = {
    no_handle: 0,
    handle_no_contact: 0,
    partial_contact: 0,
    all_contacts: 0,
  };
  const witnesses: Record<string, unknown[]> = {
    partial_contact: [],
    all_contacts: [],
  };
  const subsetSummary: unknown[] = [];

  for (let size = 1; size <= kit.pieces.length; size += 1) {
    for (const subset of combinations(kit.pieces, size)) {
      let validConnected = 0;
      let partial = 0;
      let all = 0;
      const recurse = (index: number, placements: Placement[]) => {
        if (index === subset.length) {
          if (overlaps(placements)) return;
          const cells = unionCells(placements);
          if (!connected(cells)) return;
          if (!subsetOf(cells, chamberMask) || !subsetOf(shifted(cells, 1, 0), chamberMask)) return;
          validConnected += 1;
          const hasHandle = cells.has(key(kit.handle));
          const hit = kit.contacts.filter((contact) => cells.has(key(contact))).length;
          if (!hasHandle) {
            classifications.no_handle += 1;
          } else if (hit === 0) {
            classifications.handle_no_contact += 1;
          } else if (hit < kit.contacts.length) {
            classifications.partial_contact += 1;
            partial += 1;
            if (witnesses.partial_contact.length < 8) {
              witnesses.partial_contact.push({
                pieces: subset.map((piece) => piece.id),
                placements: placements.map(({ piece, dx, dy }) => ({ id: piece.id, dx, dy })),
                hit,
                cells: [...cells].sort(),
              });
            }
          } else {
            classifications.all_contacts += 1;
            all += 1;
            if (witnesses.all_contacts.length < 8) {
              witnesses.all_contacts.push({
                pieces: subset.map((piece) => piece.id),
                placements: placements.map(({ piece, dx, dy }) => ({ id: piece.id, dx, dy })),
                cells: [...cells].sort(),
              });
            }
          }
          return;
        }
        const piece = subset[index]!;
        for (const placement of perPiecePlacements.get(piece.id) ?? []) {
          recurse(index + 1, [...placements, placement]);
        }
      };
      recurse(0, []);
      subsetSummary.push({
        pieces: subset.map((piece) => piece.id),
        validConnected,
        partialContact: partial,
        allContacts: all,
      });
    }
  }

  return {
    variant,
    maskCellCount: chamberMask.size,
    model: {
      movement: "fixed-orientation translations only",
      stroke: "all assembly cells and their +x targets must lie in chamber mask",
      actuator: `must include handle ${key(kit.handle)}`,
      contacts: kit.contacts.map(key),
      note: "This is a terminal-topology filter, not yet a player reachability proof.",
    },
    classifications,
    subsetSummary,
    witnesses,
  };
}

function enumerate(kit: Kit) {
  const targetUnion = new Set(kit.pieces.flatMap(targetCells).map(key));
  const tightMask = new Set([...targetUnion, ...shifted(targetUnion, 1, 0)]);

  const rearBayMask = new Set(tightMask);
  for (let x = -5; x <= -1; x += 1) {
    for (let y = -4; y <= 4; y += 1) {
      rearBayMask.add(`${x},${y}`);
    }
  }

  const loadableMask = new Set(rearBayMask);
  if (kit.id.startsWith("serial_")) {
    const head = kit.pieces.at(-1)!;
    for (let dy = -4; dy <= 0; dy += 1) {
      for (const cell of targetCells(head)) {
        loadableMask.add(key(add(cell, [0, dy])));
      }
    }
  }

  return {
    kit: kit.id,
    title: kit.title,
    target: {
      pieces: kit.pieces.map((piece) => ({ id: piece.id, offset: piece.targetOffset, cells: targetCells(piece).map(key) })),
      connected: connected(targetUnion),
      handle: targetUnion.has(key(kit.handle)),
      contactCount: kit.contacts.filter((contact) => targetUnion.has(key(contact))).length,
    },
    variants: [
      enumerateAgainstMask(kit, tightMask, "tight_terminal_mold"),
      enumerateAgainstMask(kit, rearBayMask, "tight_mold_plus_rear_open_bay"),
      enumerateAgainstMask(kit, loadableMask, "rear_bay_plus_vertical_head_loader"),
    ],
  };
}

const output = {
  schema: "ra_component_interface_enumeration_v1",
  generatedAt: new Date().toISOString(),
  kits: kits.map(enumerate),
};

const outputPath = join(dirname(fileURLToPath(import.meta.url)), "component_interface_enumeration.json");
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
process.stdout.write(`${outputPath}\n`);
for (const kit of output.kits) {
  for (const variant of kit.variants) {
    process.stdout.write(`${kit.kit}/${variant.variant}: partial=${variant.classifications.partial_contact}, all=${variant.classifications.all_contacts}\n`);
  }
}
