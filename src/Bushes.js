import { useRef, useEffect } from "react";
import { Scatter } from './Scatter';

import { scale1_2, lightPlus50pct } from "./transforms";

import vert from './shaders/rock.vert';
import { PatchShaderMaterial } from './utils';
import { GradientTexture } from "@react-three/drei";

export const Bushes = (props) => {

  const geom = useRef();

  useEffect( () => {
	geom.current.attributes.uv2 = geom.current.attributes.uv;
  }, [geom.current])

  return <Scatter
		   scale={scale1_2}
		   geometry={props.geometry}
		   color={lightPlus50pct}
		   position={props.position}
		   density={props.density || 20}>
		   <sphereGeometry ref={geom} args={[props.scale || 0.05,7,5,0,2*Math.PI,0,Math.PI/2]}/>
		   <PatchShaderMaterial aoMapIntensity={0.5} vertexShaderUrl={vert} color={0x354928}>
			 <GradientTexture
			   attach="aoMap"
			   stops={[0,.8,1]}
			   colors={['white', 'white', 'black']}
			 />
			 </PatchShaderMaterial>
		 </Scatter>

};
