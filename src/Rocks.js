import { Scatter } from './Scatter';

import { scale1_3, light25pct } from "./transforms";

import vert from './shaders/rock.vert';
import { usePatchShader } from './utils';

export const Rocks = (props) => {

  const material = usePatchShader(vert, null, 0x724C47);

  return <Scatter
		   scale={scale1_3}
		   geometry={props.geometry}
		   material={material}
		   color={light25pct}
		   position={props.position}
		   density={props.density || 20}>
		   <sphereGeometry args={[props.scale || 0.05,7,5]}/>
		 </Scatter>

};
