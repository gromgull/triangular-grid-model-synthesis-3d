import React, { useEffect, useState, Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { Sky, Environment, OrbitControls } from "@react-three/drei";

import './App.css';

import tri from './tri.js';
import tv2 from './tv2.js';
import tv3 from './tv3.js';

import TileModel from './Tile';

import Clouds from './Clouds';

const d60 = 2*Math.PI/6;
const th = Math.sqrt(3)/6;

const verbose = false;

function log(msg) {
  if (verbose) console.log(msg);
}

function intersection(a,b) {
  // TODO: a and b are sorted, we can do better.
  const r = [];
  a.forEach( v => b.indexOf(v) !== -1 && r.push(v) );
  return r;
}

const Tile = props => {

  let r, t;

  if (props.t === undefined) {
	r = 0;
  } else {
	t = props.rules.tile_map[props.t];
	r = props.rules.rotation_map[props.t];
	if (r==-1) r = (props.pos[0]+17*props.pos[1]+23*props.pos[2])%3;
  }

  const [cx,cy] = tri.center(...props.pos);

  const up = tri.points_up(...props.pos);

  const scale = 1;

  // Innermost position puts pivot at triangle center
  // then rotation to give us right orientation of triangle (3 options), r=0,1,2
  // then rotation for up or down triangles
  // finally position
  return (
    <>
	  <group position={[scale*cx,0,scale*cy]}>
		<object3D rotation={[0,up ? 0 : 3*d60,0]} >
		  <object3D rotation={[0,r*2*d60,0]}>
			<TileModel t={t} scale={scale} position={[0,0,scale*2*th]}  />
		  </object3D>
		</object3D>
	  </group>

    </>
  );
};

const Grid = props => {

  const [ options, setOptions ] = useState({});

  const [ cells, setCells ] = useState();

  const [ dirty, setDirty ] = useState( [] );
  const [ iteration, setIteration ] = useState(0);

  if (props.cells !== cells) {
	// reset
	setCells(props.cells);
	setOptions(Object.fromEntries( Object.keys(props.cells).map( c => [c, [...props.rules.tiles]]) ));
	setDirty([]);
  }

  useEffect( () => {

	// propegate changes

	if (options === undefined) return;
	if (!dirty.length) return;

	const todo = [...dirty];

	const new_options = {...options};
	let i = 0;
	let changed = false;

	while (todo.length) {
	  i += 1;
	  const c = todo.pop();
	  const pre_length = new_options[c].length;

	  if (pre_length === 1) continue;

	  const pre = [ ...new_options[c]];
	  const neighbours = tri.neighbours(...props.cells[c])
			.map( n => n.toString() );

	  neighbours.forEach( (n,i) => {

	    if (props.cells[n] === undefined) return; // outside grid

		// check that all of our options are still compatible with this neighbours current options
		new_options[c] = new_options[c].filter( o => intersection(props.rules.constraints[o][i], new_options[n]).length);

		if (new_options[c].length === 0) {
		  // no solutions - if you tileset is complete/simple this should never happen
		  // there is where we would backtrack
		  console.log('oh no', c, n, i, pre);
		}
	  });

	  if (new_options[c].length !== pre_length) {
		log(`reduce ${c} from ${pre_length} to ${new_options[c].length}`);
		todo.push(...neighbours.filter(n => props.cells[n] !== undefined));
		changed = true;

		if (new_options[c].length === 1) {
		  log(`${c} collapsed to ${new_options[c][0]}`);
		}

	  }
	}
	log(`propegate visited ${i} cells`);
	if (changed) setOptions(new_options);

	setDirty([]);

  }, [ dirty, options, props.cells ]);


  useEffect(() => {
	// pick one

	// TODO: turn back time :sweaty_grin:
	if (iteration === props.iteration) return; // already processed this one

	if (dirty.length) return; // process these first

	// pick cell with least options ("least entropy")

	const [ min_cell, len ] = Object.keys(options).map( c => [ c, options[c].length ] )
	  .reduce( (min, e) => options[e[0]].length>1 && e[1] < min[1] ? e : min, [undefined, 1000000]);

	if (min_cell === undefined) {
	  log('all done!');
	  return;
	}

	// pick a random option
	const val = options[min_cell][Math.floor(Math.random()*options[min_cell].length)];

	log(`Setting ${min_cell} to ${val} (had ${len} options)`);

	setOptions( { ...options, [min_cell]: [val] } );
	setDirty( tri.neighbours(...props.cells[min_cell])
			  .map( n => n.toString() )
			  .filter( n => props.cells[n] !== undefined) );

	setIteration(props.iteration);

  }, [props.cells, iteration, props.iteration, dirty.length, options]);


  return (
	<group position={props.position}>
	  { Object.keys(options).map( c =>
		<Tile key={c} rules={props.rules} t={options[c].length===1 ? options[c][0] : undefined} pos={props.cells[c]} /> ) }
	</group>
  )
};

function App() {

  const [ iteration, setIteration ] = useState(0);
  const [ autoRotate, setAutoRotate ] = useState(false);

  const [ cells, setCells ] = useState( () => {

	let cells = {};

	// the triangle coordinate system makes it hard to define a rectangle,
	// so we start with a tile and just move out n steps.
	const n = 8;
	let nxt = [ [ 0,0,1 ]];
	for (let i = 0; i<n; i++) {
	  nxt = nxt.flatMap( t => {
		cells[t] = t;
		return tri.neighbours(...t);
	  });
	}

	// for looks - filter out cells with only one neighbour
	cells = Object.fromEntries( Object.keys(cells).flatMap( c => tri.neighbours(...cells[c]).filter( n => cells[n] !== undefined ).length > 1?[[ c, cells[c]]]:[] ));

	log(`Grid is ${Object.keys(cells).length} tiles`);

	return cells;
  });

  useEffect(() => {
    const handleWindowKeydown = e => {
	  if (e.keyCode === 32) setIteration(iteration+1);
	  if (e.keyCode === 82) setCells({...cells});
	  if (e.keyCode === 65) setAutoRotate(!autoRotate);
	};
	const handleClick = e => { setIteration(iteration+1); };
	window.addEventListener('click', handleClick);

    window.addEventListener('keydown', handleWindowKeydown);

    return () => {
	  window.removeEventListener('keydown', handleWindowKeydown);
	  window.removeEventListener('click', handleClick);
	};
  }, [iteration, autoRotate, cells]);

  return <Canvas camera={{ fov: 45, position: [5, 5, 5] }}>
		   <Suspense fallback={null}>
			 <OrbitControls autoRotate={autoRotate}/>
			 <directionalLight args={[0xffeedd, 1.0]} castShadow position={[1,.6,0]}/>
			 <ambientLight args={[2]}/>
			 { /* <axesHelper /> */ }
			 <Environment preset="sunset" />
			 <fog color="white" far={30} near={0.01} attach="fog" />
			 <Sky distance={450000} sunPosition={[1, .02, 0]} inclination={.1} azimuth={0.25}  />
			 <Clouds position={[0,2.5,0]}/>
			 <Grid position={[0,0,0]} rules={tv3} iteration={iteration} cells={cells} />
		   </Suspense>
		 </Canvas>;
}

export default App;
