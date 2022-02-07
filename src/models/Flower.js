
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function useFlower() {
  const { nodes, materials } = useGLTF('assets/flower.glb')

  const geometries = useMemo( () => [ nodes.petal001.geometry, nodes.stem.geometry ], [ nodes ]);

  const _materials = useMemo( () => [ materials.flower, materials.top ], [ materials ] );

  return {
	geometries,
	materials: _materials
  };
}

useGLTF.preload('assets/flower.glb')
