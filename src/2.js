/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/2.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.ground001.geometry} material={materials['Material.001']} position={[0, 0.01, 0]} />
      <mesh geometry={nodes.Cylinder001.geometry} material={nodes.Cylinder001.material} />
    </group>
  )
}

useGLTF.preload('/assets/2.glb')