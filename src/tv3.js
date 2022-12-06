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

const make_constraints = corners => corners.map( c => {
  return [
	corners.flatMap((o,i) => c[0] === o[2] && c[2] === o[0] ? [i] : []),
	corners.flatMap((o,i) => c[1] === o[2] && c[2] === o[1] ? [i] : []),
	corners.flatMap((o,i) => c[0] === o[1] && c[1] === o[0] ? [i] : []),
  ];
});

const constraints = make_constraints(corners);

const tv3 = { constraints, corners, rotation_map, tile_map, tiles, n };
export default tv3;
