
import { default as Tile0 } from './0.js';
import { default as Tile1 } from './1.js';
import { default as Tile2 } from './2.js';
import { default as Tile3 } from './3.js';

const tile_models = [ Tile0, Tile1, Tile2, Tile3 ];

const n = 8;

const tiles = [...Array(8).keys()];

const tile_map = [0,1,2,2,2,3,3,3];
const rotation_map = [0,0,0,1,2,0,1,2];



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
const constraints = tiles.map( t => {
  const c = corners[t];
  return [
	corners.flatMap((o,i) => c[0] === o[2] && c[2] === o[0] ? [i] : []),
	corners.flatMap((o,i) => c[1] === o[2] && c[2] === o[1] ? [i] : []),
	corners.flatMap((o,i) => c[0] === o[1] && c[1] === o[0] ? [i] : []),
  ];
});

const tc2 = { constraints, corners, rotation_map, tile_map, tiles, n, tile_models };
export default tc2;
