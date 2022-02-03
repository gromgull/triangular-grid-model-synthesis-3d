/*

  This defines the tiles available and the constraints between them

  The model-synthesis code doesn't really about the grid or anything else,
  you can replace this file and have a square grid, or true 3d,
  or anything you want.

*/

import { default as Tile0 } from './models/0.js';
import { default as Tile1 } from './models/1.js';
import { default as Tile2 } from './models/2.js';
import { default as Tile3 } from './models/3.js';

const tile_models = [ Tile0, Tile1, Tile2, Tile3 ];

const n = 8;

const tiles = [...Array(n).keys()];

const tile_map = [0,1,2,2,2,3,3,3];
const rotation_map = [-1,-1,0,1,2,0,1,2];

const corners = [
  [0,0,0],
  [1,1,1],
  [1,0,0],
  [0,1,0],
  [0,0,1],
  [0,1,1],
  [1,0,1],
  [1,1,0],
];

/*
Which corners have to match for neighbours?
________________
\1    2/\1    2/
 \    /0 \    /
0 \0 /2  1\0 / 2
   \/______\/
    \1    2/
     \    /
      \0 / 1
       \/

luckily this magically works out the same if the triangle is upside-down
*/

const make_constraints = corners => corners.map( c => {
  return [
	corners.flatMap((o,i) => c[0] === o[2] && c[2] === o[0] ? [i] : []),
	corners.flatMap((o,i) => c[1] === o[2] && c[2] === o[1] ? [i] : []),
	corners.flatMap((o,i) => c[0] === o[1] && c[1] === o[0] ? [i] : []),
  ];
});

const constraints = make_constraints(corners);

export default { make_constraints, constraints, corners, rotation_map, tile_map, tiles, n, tile_models };
