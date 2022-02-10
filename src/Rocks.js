import { Scatter } from './Scatter';

import { scale1_3, lightPlus50pct } from "./transforms";

import vert from './shaders/rock.vert';
import { PatchShaderMaterial } from './utils';
import { GradientTexture } from "@react-three/drei";

export const Rocks = (props) => {

  return <Scatter
		   scale={scale1_3}
		   geometry={props.geometry}
		   color={lightPlus50pct}
		   position={props.position}
		   density={props.density || 20}>
		   <sphereGeometry args={[props.scale || 0.05,7,5,0,2*Math.PI,0,2*Math.PI/3]}/>
		   <PatchShaderMaterial aoMapIntensity={.5} vertexShaderUrl={vert} color={0x724C47} >
			 <GradientTexture
			   attach="aoMap"
			   stops={[0,.1,.8,1]}
			   colors={['white', 'white', 'black', 'black']}
			 />
		   </PatchShaderMaterial>
		 </Scatter>

};
