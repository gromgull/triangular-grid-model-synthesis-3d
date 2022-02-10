
import { useMemo, createRef, useLayoutEffect } from "react";

import { Object3D, Vector3, Color } from 'three';
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";

import { area } from './utils';

const _obj = new Object3D();
const _vec = new Vector3();
const _color = new Color();

export const Scatter = ({ geometry, material, position, childGeometry, children, density, color, scale, rotate }) => {

  const nonIndexedGeometry = useMemo( () => geometry.toNonIndexed(), [ geometry ]);

  const count = useMemo( () =>
	Math.ceil(area(nonIndexedGeometry)*(density || 1))
  , [ geometry, density ]);

  const childGeometries = useMemo( () => childGeometry || [ null ], [ childGeometry ]);

  const meshRefs = useMemo( () => childGeometries.map(() => createRef()), [ childGeometries ]); // this means we cannot change the number!

  useLayoutEffect( () => {
	if (!geometry) return;

	const sampler = new MeshSurfaceSampler({ geometry: nonIndexedGeometry });
	sampler.build();

	console.log('scatter', color);
	// sample
	for(let i = 0 ; i<count; i++) {
	  sampler.sample(_vec);
	  _obj.position.copy( _vec );
	  if (color) {
		meshRefs.forEach((m,j) =>
		  m.current.setColorAt(i,
							   color(i, _vec,
									 _color.copy(m.current.material.color))));
	  }
	  if (rotate) _obj.setRotationFromEuler(rotate(i, _vec));
	  if (scale) {
		const s = scale(i, _vec);
		if (Array.isArray(s)) _obj.scale.fromArray(s);
		else _obj.scale.setScalar(s);
	  }
	  _obj.updateMatrix();
	  meshRefs.forEach( m => m.current.setMatrixAt( i, _obj.matrix ));
	}
	if (color)
 	  meshRefs.forEach( m => m.current.instanceColor.needsUpdate = true );
	meshRefs.forEach( m => m.current.instanceMatrix.needsUpdate = true );

  }, [meshRefs, count, scale, rotate, color, geometry, material]);

  return meshRefs.map( (m,i) =>
	<instancedMesh
	  key={i}
	  position={position}
	  ref={m}
	  args={[childGeometries[i], Array.isArray(material)?material[i]:material, count]} >
	{children}
  </instancedMesh>);

};
