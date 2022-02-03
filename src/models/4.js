/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('assets/4.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.water4.geometry} material={materials.water} position={[0, -0.04, 0]} />
    </group>
  )
}

useGLTF.preload('assets/4.glb')
