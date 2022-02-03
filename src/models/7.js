/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('assets/7.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.water4001.geometry} material={materials.water} position={[0, -0.04, 0]} />
      <group position={[0, 0.01, 0]}>
        <mesh geometry={nodes.Circle034.geometry} material={materials.ground} />
        <mesh geometry={nodes.Circle034_1.geometry} material={materials.sand} />
      </group>
    </group>
  )
}

useGLTF.preload('assets/7.glb')