/*

cube tiles with grass/building/roof

0 is empty/air

1-5 are rotation invariant

15 in total

*/


const m = 16;
const n = 6 + m*4;

const tiles = [...Array(n).keys()];

const tile_map = [0,1,2,3,4,5,...[...Array(m).keys()].map(i=>i+6).flatMap( i => [i,i,i,i] )]
const rotation_map = [-1,-1,-1,-1,-1,-1, ...[...Array(m).keys()].flatMap( () => [0,1,2,3] )]

// 0 nothing, 1 grass, 2 building, 3 roof
// bottom nw,ne,se,sw - then top
const base_corners = [
  [0,0,0,0,0,0,0,0],

  [1,1,1,1,0,0,0,0],
  [2,2,2,2,0,0,0,0],
  [1,1,1,1,2,2,2,2],
  [2,2,2,2,2,2,2,2],
  [2,2,2,2,3,3,3,3],

  [2,2,2,2,2,0,0,0],
  [2,2,2,2,2,2,0,0],
  [2,2,2,2,2,2,0,2],

  [1,1,1,1,2,0,0,0],
  [1,1,1,1,2,2,0,0],
  [1,1,1,1,2,2,0,2],

  [2,0,0,0,3,0,0,0],
  [2,2,0,0,3,3,0,0],
  [2,2,0,2,3,3,0,3],

  [2,0,0,0,2,0,0,0],
  [2,2,0,0,2,2,0,0],
  [2,2,0,2,2,2,0,2],

  [2,2,2,2,2,2,0,3],
  [2,2,2,2,2,2,3,0],

  [2,2,0,2,2,2,0,3],
  [2,2,2,0,2,2,3,0],

  [2,2,2,2,3,3,0,0],
  [2,2,0,2,3,3,0,0],
  [2,2,2,0,3,3,0,0],

  [2,2,2,2,3,0,0,0],

];

const rotate = ( a, n ) => a.slice(n, a.length).concat(a.slice(0, n));

const rotate_cube = (a,n) => rotate(a.slice(0,4), n).concat(rotate(a.slice(4), n));

const corners = tile_map.map( (t,i) => rotate_cube(base_corners[t], rotation_map[i]) );


const sides = {
  bottom: [0,1,2,3],
  left:   [7,4,0,3],
  front:  [7,6,2,3],
  right:  [6,5,1,2],
  back:   [4,5,1,0],
  top:    [4,5,6,7],
}

function match_corners(x,y,side_a,side_b) {
  if (side_a === 'top' || side_b === 'top')
	return x === y || (x === 3 && y === 0) || (x === 0 && y === 3);
  else
	return x === y || (x === 3 && y === 2) || (x === 2 && y === 3);;
}

function match(x,y,a,b) {
  return sides[a].every( (side,i) => match_corners(x[side], y[sides[b][i]], a, b));
}

// bottom, left, front, right, back, top

const make_constraints = corners => corners.map( c => {
  return [
	corners.flatMap((o,i) => match(c,o,'bottom','top') ? [i] : []),
	corners.flatMap((o,i) => match(c,o,'left','right') ? [i] : []),
	corners.flatMap((o,i) => match(c,o,'front','back') ? [i] : []),
	corners.flatMap((o,i) => match(c,o,'right','left') ? [i] : []),
	corners.flatMap((o,i) => match(c,o,'back','front') ? [i] : []),
	corners.flatMap((o,i) => match(c,o,'top','bottom') ? [i] : []),
  ];
});

const constraints = make_constraints(corners);

console.log(constraints);

export default { make_constraints, constraints, corners, rotation_map, tile_map, tiles, n };
