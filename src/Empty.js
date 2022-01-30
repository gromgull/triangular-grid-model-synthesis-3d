/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/empty.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.ground002.geometry} material={materials['Material.004']} position={[0, 0.01, 0]} />
    </group>
  )
}

useGLTF.preload('/assets/empty.glb')
