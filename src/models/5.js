/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('assets/5.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.water5.geometry} material={materials.water} position={[0, -0.04, 0]} />
      <group position={[0, 0.01, 0]}>
        <mesh geometry={nodes.Circle028.geometry} material={materials.ground} />
        <mesh geometry={nodes.Circle028_1.geometry} material={materials.sand} />
      </group>
    </group>
  )
}

useGLTF.preload('assets/5.glb')