import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function useGrass() {
  const { nodes, materials } = useGLTF('assets/grass.glb')

  return useMemo( () => ({
	geometries: [ nodes.grass.geometry, nodes.grass001.geometry, nodes.grass002.geometry ] ,
	materials: [ materials.grass,materials.grass,materials.grass ],
  }), [nodes, materials]);
}

useGLTF.preload('assets/grass.glb')
