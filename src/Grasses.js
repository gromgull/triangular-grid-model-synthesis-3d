
import { Scatter } from './Scatter';

import useGrass from './models/Grass.js';

import { scale1_3, light25pct, rotateY360 } from "./transforms";

export const Grasses = (props) => {

  const { geometries, materials } = useGrass();

  return <Scatter
			 scale={scale1_3}
			 color={light25pct}
			 rotate={rotateY360}
			 position={props.position}
			 geometry={props.geometry}
			 material={materials}
			 childGeometry={geometries}
			 density={1000}>
		 </Scatter>

};
