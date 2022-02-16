import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei'

import { Mesh, Group } from 'three';

// import {Rocks}  from './Rocks';
// import {Bushes}  from './Bushes';
// import {Flowers} from './Flowers';
// import {Trees} from './Trees';
// import {Grasses} from './Grasses';

// const scatterMap = {
//   flowers: Flowers,
//   trees: Trees,
//   rocks: Rocks,
//   bushes: Bushes,
//   grasses: Grasses
// }


export default function Tile(props) {

  const { nodes } = useGLTF(`assets/house.glb`)

  const object = useMemo( () => {
	const o = nodes[props.t].clone(true);
	o.position.setScalar(0);
	return o;
  }, [ props.t ]);

  //const meshes = useMemo( () => traverse(nodes.Scene.children), [ nodes ] );

  return (
	<group {...props} dispose={null}>
	  <primitive object={object} />
	</group>
  )
}

useGLTF.preload('assets/house.glb');
