import { useMemo } from "react";
import { useGLTF } from '@react-three/drei'

/*

cube tiles with grass/building/roof

corner info read from blender custom properties / gltf userData
*/

export default function useCV3() {

  const { nodes } = useGLTF(`assets/house.glb`)

  return useMemo( () => {
	const tiles = nodes.Scene.children.flatMap( n => n.userData['rotate'] ? [ n,n,n,n ] : [n] );
	const tile_map = tiles.map( n => n.name );
	const n = tile_map.length;

	const rotation_map = nodes.Scene.children.flatMap( n => n.userData['rotate'] ? [ 0,1,2,3 ] : [-1] );

	// 0 nothing, 1 grass, 2 building, 3 roof
	// bottom nw,ne,se,sw - then top

	const rotate = ( a, n ) => a.slice(n, a.length).concat(a.slice(0, n));

	const rotate_cube = (a,n) => rotate(a.slice(0,4), n).concat(rotate(a.slice(4), n));

	const corners = tiles.map( (n,i) => rotate_cube(n.userData['corners'], rotation_map[i]) );


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

	const constraints = corners.map( c => {
	  return [
		corners.flatMap((o,i) => match(c,o,'bottom','top') ? [i] : []),
		corners.flatMap((o,i) => match(c,o,'left','right') ? [i] : []),
		corners.flatMap((o,i) => match(c,o,'front','back') ? [i] : []),
		corners.flatMap((o,i) => match(c,o,'right','left') ? [i] : []),
		corners.flatMap((o,i) => match(c,o,'back','front') ? [i] : []),
		corners.flatMap((o,i) => match(c,o,'top','bottom') ? [i] : []),
	  ];
	});

	return { constraints, corners, rotation_map, tile_map, tiles, n };
  }, [ nodes ]);
};
