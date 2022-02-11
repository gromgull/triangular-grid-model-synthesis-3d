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

// function traverse(children) {
//   return children.map( (c,i) => {
// 	if (c instanceof Mesh) {
// 	  const Tag = c.userData.scatter ? scatterMap[c.userData.scatter] : "mesh";
// 	  return <Tag key={i}
// 			   material={c.material}
// 			   geometry={c.geometry}
// 			   position={c.position}
// 			   density={c.userData.density} />;
// 	} else if (c instanceof Group) {
// 	  return <group key={i} position={c.position}> { traverse(c.children) } </group>;
// 	} else {
// 	  throw `I can't deal with ${c}`;
// 	}
//   });
// }

export default function Tile(props) {

  const { nodes } = useGLTF(`assets/house.glb`)

  const t = `Cube${props.t.toString().padStart(3,'0')}`;

  const object = useMemo( () => {
	const o = nodes[t].clone(true);
	o.position.setScalar(0);
	return o;
  }, [ t ]);

  //const meshes = useMemo( () => traverse(nodes.Scene.children), [ nodes ] );

  return (
	<group {...props} dispose={null}>
	  <primitive object={object} />
	</group>
  )
}

useGLTF.preload('assets/house.glb');
