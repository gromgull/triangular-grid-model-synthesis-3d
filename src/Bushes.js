import { useState } from 'react';
import { Scatter } from './Scatter';

import { scale1_2, light25pct } from "./transforms";

import { MeshStandardMaterial } from "three";

export const Bushes = (props) => {

  const [ mat, setMat ] = useState( () => [ new MeshStandardMaterial( { color: props.color || 0x354928, flatShading: true }) ]);


  return <Scatter
		   scale={scale1_2}
		   geometry={props.geometry}
		   material={mat}
		   color={light25pct}
		   position={props.position}
		   density={props.density || 20}>
		   <sphereGeometry args={[props.scale || 0.05,7,5,0,2*Math.PI,0,Math.PI/2]}/>
		 </Scatter>

};
