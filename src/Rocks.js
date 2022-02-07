import { useState } from 'react';
import { Scatter } from './Scatter';

import { scale1_3, light25pct } from "./transforms";

import { MeshStandardMaterial } from "three";




export const Rocks = (props) => {

  const [ mat, setMat ] = useState( () => [ new MeshStandardMaterial( { color: props.color || 0xa0a4a4, flatShading: true }) ]);


  return <Scatter
		   scale={scale1_3}
		   geometry={props.geometry}
		   material={mat}
		   color={light25pct}
		   position={props.position}
		   density={props.density || 20}>
		   <sphereGeometry args={[props.scale,7,5]}/>
		 </Scatter>

};
