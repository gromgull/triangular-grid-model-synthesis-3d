import { useMemo } from "react";
import { Instances, Instance, GradientTexture } from "@react-three/drei";

const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]

function Cloud() {

 const n = 6;
  const bits = useMemo( () => [...Array(n).keys()].map( (_,i) => {
	const pos = [ 0.15*(i-n/2)+Math.random()*0.2-0.1, Math.random()*0.1, Math.random()*0.1-0.05 ];
	const s = 1-1*(Math.abs(pos[0]))/(.15*n);
	pos[1] = Math.random()*0.1+(s-1)*0.1;
	return { rotation: randomEuler(), position: pos, scale: s };
  }), []);

  return bits.map( (p, i) =>
	<Instance key={i} {...p} />
  )

}

export default function Clouds(props) {

  const clouds = useMemo( ()=> [ ...Array(5).keys() ].map( _ => ({ rotation: [ 0, Math.random()*0.3, 0], position: [ Math.random()*5-2.5, 0, Math.random()*5-2.5 ] })), []);

  return <Instances range={100} limit={100} {...props}>
		   <icosahedronGeometry args={[0.2]}/>
		   <meshStandardMaterial flatShading>
			 <GradientTexture
			   stops={[0, 1]} // As many stops as you want
			   colors={['white', 'grey']} // Colors need to match the number of stops
			   size={256} // Size is optional, default = 256
			 />
		   </meshStandardMaterial>

		   { clouds.map( (c,i) => <group key={i} {...c}><Cloud /></group> ) }

		 </Instances>

}
