import React, { useEffect, useState, useMemo, Suspense } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";

import './App.css';

import tri from './tri.js';
import tc2 from './tc2.js';

import EmptyTile from './Empty';

const d60 = 2*Math.PI/6;
const th = Math.sqrt(3)/6;

function intersection(a,b) {
  // TODO: a and b are sorted, we can do better.
  const r = [];
  a.forEach( v => b.indexOf(v) !== -1 && r.push(v) );
  return r;
}

const Tile = props => {

  let r,TileModel;

  if (props.t === undefined) {
	r = 0;
	TileModel = EmptyTile;
  } else {
	r = tc2.rotation_map[props.t];
	TileModel = tc2.tile_models[tc2.tile_map[props.t]];
  }

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

  const [ options, setOptions ] = useState(() =>
	Object.fromEntries( Object.keys(props.cells).map( c => [c, [...tc2.tiles]]) )
  );

  const [ vals, setVals ] = useState( { } );
  const [ dirty, setDirty ] = useState( [] );

  function neighbours(c) {
	return tri.neighbours(...props.cells[c])
	  .map( n => n.toString() )
	  .filter( n => props.cells[n] !== undefined);
  }

  function propegate(dirty) {
	const new_options = {...options};
	const new_vals = {...vals};
	let i = 0;
	let changed = false;

	while (dirty.length) {
	  i += 1;
	  const c = dirty.pop();
	  const pre_length = new_options[c].length;
	  const pre = [ ... new_options[c]];

	  neighbours(c).forEach( (n,i) => {
		new_options[c] = new_options[c].filter( o => intersection(tc2.constraints[o][i], new_options[n]).length);
		if (new_options[c].length === 0) {
		  console.log(pre.map(o => {
			return intersection(tc2.constraints[o][i], new_options[n]).length;
		  }));
		  console.log('oh no', c, n, i, pre);
		  return;
		}
	  });

	  if (new_options[c].length !== pre_length) {
		console.log(`reduce ${c} from ${pre_length} to ${new_options[c].length}`);
		dirty.push(...neighbours(c));
		changed = true;

		if (new_options[c].length === 1) {
		  console.log(c,'collapsed to', new_options[c][0]);
		  new_vals[c] = new_options[c][0];
		  setVals(new_vals);
		}

	  }
	}
	console.log(`propegate visited ${i} cells`);
	if (changed) setOptions(new_options);
  }

  function pick_one() {

	// pick cell with least options ("least entropy")

	const [ min_cell, len ] = Object.keys(options).map( c => [ c, options[c].length ] ).
	  reduce( (min, e) => vals[e[0]] === undefined && e[1] < min[1] ? e : min, [undefined, 1000000]);

	if (min_cell === undefined) {
	  console.log('all done!');
	  return;
	}

	const val = options[min_cell][Math.floor(Math.random()*options[min_cell].length)];

	console.log("Setting", min_cell, "to", val, "(had",len,"options)");

	setOptions( { ...options, [min_cell]: [val] } );
	setVals( { ...vals, [min_cell]: val });
	setDirty( neighbours(min_cell) );

  }

  useEffect(() => pick_one(), [props.iteration]);

  useEffect( () => {
	if (options === undefined) return;
	propegate(dirty);
  }, [ dirty ]);

  return (
	<>
	  { props.cells ? Object.keys(props.cells).map( c =>
		<Tile key={c} t={vals[c]} pos={props.cells[c]} /> ) : [] }

{/*	  <Tile pos={[0,0,1]} t="3" r="0"/>
	  <Tile pos={[0,1,1]} t="2" r="2"/> */}

	</>
  )
};

function App() {

  const [ iteration, setIteration ] = useState(0);

  const cells = useMemo( () => {

	const cells = {};

	// the triangle coordinate system makes it hard to define a rectangle,
	// so we start with a tile and just move out n steps.
	let nxt = [ [ 0,0,1 ]];
	for (let i = 0; i<3; i++) {
	  nxt = nxt.flatMap( t => {
		cells[t] = t;
		return tri.neighbours(...t);
	  });
	}
	console.log(`Grid is ${Object.keys(cells).length} tiles`);

	return cells;
  }, []);

  useEffect(() => {
    const handleWindowKeydown = (e) => e.keyCode == 32 && setIteration(iteration+1);

    window.addEventListener('keydown', handleWindowKeydown);

    return () => window.removeEventListener('keydown', handleWindowKeydown);
  }, [iteration, setIteration]);


  return <Canvas>
		   <Suspense fallback={null}>
			 <OrbitControls />
			 <axesHelper />
			 <Environment preset="sunset" />
			 <Grid iteration={iteration} cells={cells} />
		   </Suspense>
		 </Canvas>;
}

export default App;
