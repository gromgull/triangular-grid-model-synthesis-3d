import { Scatter } from './Scatter';

import { scale1_2, light25pct } from "./transforms";

import vert from './shaders/rock.vert';
import { usePatchShader } from './utils';

export const Bushes = (props) => {

  const material = usePatchShader(vert, null, 0x354928);

  return <Scatter
		   scale={scale1_2}
		   geometry={props.geometry}
		   material={material}
		   color={light25pct}
		   position={props.position}
		   density={props.density || 20}>
		   <sphereGeometry args={[props.scale || 0.05,7,5,0,2*Math.PI,0,Math.PI/2]}/>
		 </Scatter>

};
