# Interface Probe: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1

```json
{
  "candidate_id": "ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1",
  "layout_size": [
    21,
    17
  ],
  "interfaces": {
    "A": [
      0,
      8
    ],
    "B": [
      20,
      11
    ],
    "C": [
      10,
      0
    ],
    "D": [
      3,
      16
    ]
  },
  "glyph_counts": {
    "star": 2,
    "g": 0,
    "i": 4
  },
  "target_star_coords": [
    [
      6,
      8
    ],
    [
      10,
      8
    ]
  ],
  "static_direct_seals": {
    "A_row_to_B_region": [
      [
        6,
        8,
        "*"
      ],
      [
        10,
        8,
        "*"
      ]
    ],
    "C_col_to_D_region": [
      [
        10,
        8,
        "*"
      ]
    ]
  },
  "coarse_static_reachability": {
    "A_to_B_with_stars_walls_ice_blocking": false,
    "C_to_D_with_stars_walls_ice_blocking": false,
    "A_to_B_ignoring_walls_and_removing_stars": true,
    "C_to_D_ignoring_walls_and_removing_stars": true
  },
  "edge_scan": {
    "edge_starts": [
      [
        10,
        0
      ],
      [
        0,
        8
      ]
    ],
    "solved_pairs": [
      {
        "start": [
          10,
          0
        ],
        "goal": [
          0,
          8
        ],
        "cost": 18,
        "pushes": 2,
        "events": [
          "push_ice",
          "ice_destroyed_d3",
          "ice_destroy_group_d6_plus",
          "slide_restart_after_group",
          "ice_boundary_disappear_after_group"
        ]
      }
    ]
  }
}
```
