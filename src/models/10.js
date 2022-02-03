/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('assets/10.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.rock0015.geometry} material={nodes.rock0015.material} position={[0.17, -0.02, 0.04]} />
      <mesh geometry={nodes.rock1003.geometry} material={nodes.rock1003.material} position={[0.06, -0.01, -0.01]} />
      <mesh geometry={nodes.rock3003.geometry} material={nodes.rock3003.material} position={[0.08, -0.05, 0]} />
      <mesh geometry={nodes.rock4003.geometry} material={nodes.rock4003.material} position={[0, -0.06, 0]} />
      <mesh geometry={nodes.rock5003.geometry} material={nodes.rock5003.material} position={[-0.01, -0.07, -0.01]} />
      <mesh
        geometry={nodes.bush1005.geometry}
        material={nodes.bush1005.material}
        position={[0.38, 0.24, -0.03]}
        rotation={[0, 0.77, 0]}
      />
      <mesh geometry={nodes.bush2005.geometry} material={nodes.bush2005.material} position={[0.15, 0.25, 0.11]} />
      <mesh
        geometry={nodes.bush3005.geometry}
        material={nodes.bush3005.material}
        position={[-0.12, 0.25, 0.15]}
        rotation={[0, 0.18, 0]}
      />
      <mesh geometry={nodes.water4003.geometry} material={materials.water} position={[0, -0.04, 0]} />
      <group position={[0, 0.01, 0]} scale={[-1, 1, 1]}>
        <mesh geometry={nodes.Circle036.geometry} material={materials.ground} />
        <mesh geometry={nodes.Circle036_1.geometry} material={materials.sand} />
      </group>
      <mesh geometry={nodes.Cylinder018.geometry} material={nodes.Cylinder018.material} />
      <mesh geometry={nodes.Cylinder018_1.geometry} material={nodes.Cylinder018_1.material} />
    </group>
  )
}

useGLTF.preload('assets/10.glb')