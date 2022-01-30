/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/1.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.top001.geometry} material={materials['Material.003']} />
      <mesh geometry={nodes.ground001.geometry} material={materials['Material.001']} position={[0, 0.01, 0]} />
    </group>
  )
}

useGLTF.preload('/assets/1.glb')
