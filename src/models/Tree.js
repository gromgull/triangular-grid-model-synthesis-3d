
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function useFlower() {
  const { nodes, materials } = useGLTF('assets/tree.glb')

  return useMemo( () => [ [nodes.tree.geometry], [materials.tree] ], [ nodes, materials]);
}

useGLTF.preload('assets/tree.glb')
