/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('./assets/2.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder007.geometry} material={nodes.Cylinder007.material} />
      <mesh geometry={nodes.Cylinder007_1.geometry} material={nodes.Cylinder007_1.material} />
      <mesh geometry={nodes.ground002.geometry} material={materials.ground} position={[0, 0.01, 0]} />
      <mesh geometry={nodes.rock0.geometry} material={nodes.rock0.material} />
      <mesh geometry={nodes.rock1.geometry} material={nodes.rock1.material} />
      <mesh geometry={nodes.rock3.geometry} material={nodes.rock3.material} />
      <mesh geometry={nodes.rock4.geometry} material={nodes.rock4.material} />
      <mesh geometry={nodes.rock5.geometry} material={nodes.rock5.material} />
      <mesh geometry={nodes.bush1001.geometry} material={nodes.bush1001.material} position={[-0.11, 0.24, 0.08]} />
      <mesh geometry={nodes.bush2001.geometry} material={nodes.bush2001.material} position={[0.02, 0.25, 0.17]} />
      <mesh geometry={nodes.bush3001.geometry} material={nodes.bush3001.material} position={[-0.25, 0.25, 0.12]} />
    </group>
  )
}

useGLTF.preload('./assets/2.glb')
