/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/3.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder011.geometry} material={nodes.Cylinder011.material} />
      <mesh geometry={nodes.Cylinder011_1.geometry} material={nodes.Cylinder011_1.material} />
      <mesh geometry={nodes.ground003.geometry} material={materials.ground} position={[0, 0.01, 0]} />
      <mesh geometry={nodes.rock0001.geometry} material={nodes.rock0001.material} position={[-0.05, 0, 0.05]} />
      <mesh geometry={nodes.rock0002.geometry} material={nodes.rock0002.material} position={[0.18, -0.01, 0.11]} />
      <mesh geometry={nodes.rock0003.geometry} material={nodes.rock0003.material} position={[0.09, -0.02, 0.09]} />
      <mesh geometry={nodes.rock0004.geometry} material={nodes.rock0004.material} position={[-0.15, -0.01, 0.03]} />
      <mesh geometry={nodes.rock0005.geometry} material={nodes.rock0005.material} position={[-0.1, 0.04, 0.03]} />
      <mesh geometry={nodes.rock0006.geometry} material={nodes.rock0006.material} position={[-0.22, -0.03, 0.09]} />
      <mesh geometry={nodes.bush2.geometry} material={nodes.bush2.material} position={[-0.12, 0.25, 0.01]} />
      <mesh geometry={nodes.bush4.geometry} material={nodes.bush4.material} position={[-0.23, 0.25, 0.04]} />
      <mesh geometry={nodes.bush1.geometry} material={nodes.bush1.material} position={[0.22, 0.27, 0.04]} />
      <mesh geometry={nodes.bush3.geometry} material={nodes.bush3.material} position={[0.08, 0.25, -0.17]} />
    </group>
  )
}

useGLTF.preload('/assets/3.glb')
