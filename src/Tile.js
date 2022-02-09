import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei'

import { Mesh, Group } from 'three';

import {Rocks}  from './Rocks';
import {Bushes}  from './Bushes';
import {Flowers} from './Flowers';
import {Trees} from './Trees';
import {Grasses} from './Grasses';

const scatterMap = {
  flowers: Flowers,
  trees: Trees,
  rocks: Rocks,
  bushes: Bushes,
  grasses: Grasses
}

function traverse(children) {
  return children.map( (c,i) => {
	if (c instanceof Mesh) {
	  const Tag = c.userData.scatter ? scatterMap[c.userData.scatter] : "mesh";
	  return <Tag key={i}
			   material={c.material}
			   geometry={c.geometry}
			   position={c.position}
			   density={c.userData.density} />;
	} else if (c instanceof Group) {
	  return <group key={i} position={c.position}> { traverse(c.children) } </group>;
	} else {
	  throw `I can't deal with ${c}`;
	}
  });
}

export default function Tile(props) {

  const fn = t => t === undefined ? 'empty' : 'tile'+t;

  const { nodes } = useGLTF(`assets/${fn(props.t)}.glb`)

  const meshes = useMemo( () => traverse(nodes.Scene.children), [ nodes ] );

  return (
	<group {...props} dispose={null}>
	  { meshes }
	</group>
  )
}

[...Array(10).keys()].forEach( i => useGLTF.preload(`assets/tile${i}.glb`) );
useGLTF.preload('assets/empty.glb');
useGLTF.preload('assets/flower.glb');
useGLTF.preload('assets/tree.glb');
useGLTF.preload('assets/grass.glb');
