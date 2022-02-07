
import { Scatter } from './Scatter';

import useTree from './models/Tree.js';

import { rotateY360, scale1_2, lightPlus50pct } from "./transforms";

export const Trees = (props) => {

  const [ tree, material ] = useTree();

  return <Scatter
		   scale={scale1_2}
		   color={lightPlus50pct}
		   position={props.position}
		   material={material}
		   geometry={props.geometry}
		   childGeometry={tree}
		   density={50}>
		 </Scatter>

};
