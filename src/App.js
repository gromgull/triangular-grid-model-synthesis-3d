import React, { useRef, useState, Suspense } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";

import './App.css';

import { default as Tile0 } from './0.js';
import { default as Tile1 } from './1.js';
import { default as Tile2 } from './2.js';
import { default as Tile3 } from './3.js';

const tiles = [ Tile0, Tile1, Tile2, Tile3 ];

const Tile = props => {

  const TileModel = tiles[props.t];

  return (
    <>
	  <group dispose={null}>
	  <object3D rotation={[0,props.d*2*Math.PI/6,0]} >
		<object3D position={[0,0,-2*Math.sqrt(3)/6]} rotation={[0,props.r*2*Math.PI/6,0]}>
		  <TileModel position={[0,0,2*(Math.sqrt(3)/6)]} rotation={[0,-2*Math.PI/12,0]} />
		</object3D>
	  </object3D>
</group>

    </>
  );
};

const Grid = props => {
  return (
	<>
	  <Tile t="2" r="4" d="0"/>
	  <Tile t="3" r="0" d="1"/>
	  <Tile t="2" r="2" d="2"/>

	  <Tile t="2" r="4" d="3"/>
	  <Tile t="3" r="0" d="4"/>
	  <Tile t="2" r="2" d="5"/>

	</>
  )
};


function App() {

  return <Canvas>
		   <Suspense fallback={null}>
			 <OrbitControls />
			 <axesHelper />
			 <Environment preset="sunset" />
			 <Grid />
		   </Suspense>
		 </Canvas>;
}

export default App;
