import React, { useRef, useState, useMemo, Suspense } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";

import './App.css';

import { default as Tile0 } from './0.js';
import { default as Tile1 } from './1.js';
import { default as Tile2 } from './2.js';
import { default as Tile3 } from './3.js';

import tri from './tri.js';

const tiles = [ Tile0, Tile1, Tile2, Tile3 ];

const d60 = 2*Math.PI/6;
const th = Math.sqrt(3)/6;

const Tile = props => {

  const t = [0,1,2,2,2,3,3,3][props.t];
  const r = [0,0,0,1,2,0,1,2][props.t];

  const TileModel = tiles[t];

  const [cx,cy] = tri.center(...props.pos);

  const up = tri.points_up(...props.pos);

  // Innermost position puts pivot at triangle center
  // then rotation to give us right orientation of triangle (3 options), r=0,1,2
  // then rotation for up or down triangles
  // finally position
  return (
    <>
	  <group position={[cx,0,cy]}>
		<object3D rotation={[0,up ? 0 : 3*d60,0]} >
		  <object3D rotation={[0,r*2*d60,0]}>
			<TileModel position={[0,0,2*th]}  />
		  </object3D>
		</object3D>
	  </group>

    </>
  );
};

const Grid = props => {
  return (
	<>
	  { props.cells ? Object.values(props.cells).map( c =>
		<Tile key={c} t="6" pos={c} /> ) : [] }

{/*	  <Tile pos={[0,0,1]} t="3" r="0"/>
	  <Tile pos={[0,1,1]} t="2" r="2"/> */}

	</>
  )
};

function App() {


  const cells = useMemo( () => {

	const cells = {};

	// the triangle coordinate system makes it hard to define a rectangle,
	// so we start with a tile and just move out n steps.
	let nxt = [ [ 0,0,1 ]];
	for (let i = 0; i<5; i++) {
	  let nnxt = [];
	  nxt.forEach( t => {
		cells[t] = t;
		tri.neighbours(...t).forEach( n => nnxt.push(n) );
	  });
	  nxt = nnxt;
	}
	console.log(Object.keys(cells).length);

	return cells;
  }, []);


  return <Canvas>
		   <Suspense fallback={null}>
			 <OrbitControls />
			 <axesHelper />
			 <Environment preset="sunset" />
			 <Grid cells={cells} />
		   </Suspense>
		 </Canvas>;
}

export default App;
