import tv2 from './tv2.js';

import { default as Tile0 } from './models/0.js';
import { default as Tile1 } from './models/1.js';
import { default as Tile2 } from './models/2.js';
import { default as Tile3 } from './models/3.js';
import { default as Tile4 } from './models/4.js';
import { default as Tile5 } from './models/5.js';
import { default as Tile6 } from './models/6.js';
import { default as Tile7 } from './models/7.js';
import { default as Tile8 } from './models/8.js';
import { default as Tile9 } from './models/9.js';
import { default as Tile10 } from './models/10.js';

const tile_models = [ Tile0, Tile1, Tile2, Tile3, Tile4, Tile5, Tile6, Tile7, Tile8, Tile9, Tile10 ];

const tile_map = [0,1,2,2,2,3,3,3,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10];
const rotation_map = [-1,-1,0,1,2,0,1,2,-1,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2];

const n = tile_map.length;

const tiles = [...Array(n).keys()];

const rotate = ( a, n ) => a.slice(n, a.length).concat(a.slice(0, n));

const base_corners = [
  [0,0,0],
  [1,1,1],
  [1,0,0],
  [0,1,1],
  [2,2,2],
  [2,0,0],
  [2,1,1],
  [0,2,2],
  [1,2,2],
  [1,0,2],
  [1,2,0],
];


const corners = tile_map.map( (t,i) => rotate(base_corners[t], -rotation_map[i]) );

const constraints = tv2.make_constraints(corners);

const tv3 = { constraints, corners, rotation_map, tile_map, tiles, n, tile_models };
export default tv3;
