
import { MeshStandardMaterial, Vector3 } from 'three';

import { useAsset } from "use-asset";


export function area(geometry) {

  const [a,b,c] = [ new Vector3(), new Vector3(), new Vector3() ];

  const pos = geometry.attributes.position;
  let res = 0;
  for(let i = 0 ; i<pos.count/3 ; i ++) {
	a.fromArray(pos.array, i*9);
	b.fromArray(pos.array, i*9+3);
	c.fromArray(pos.array, i*9+6);
	res += b.sub(a).cross(c.sub(a)).length();
  }


  return res/2;

}


export function PatchShaderMaterial({ vertexShaderUrl, fragmentShaderUrl, children, ...props}) {

  const vertexShader = useAsset( async ([url]) => {
	if (!url) return new Promise( r => r(null) );
	const res = await fetch(url);
	return await res.text();
  }, [vertexShaderUrl]);

  const fragmentShader = useAsset( async ([url]) => {
	if (!url) return new Promise( r => r(null) );
	const res = await fetch(url);
	return await res.text();
  }, [fragmentShaderUrl]);


  const [ obc, key ] = useAsset( ([vertexShader, fragmentShader]) => {

	const obc = shader => {
	  const [ funcs, to ] = vertexShader.split('----');

	  shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',to);
	  shader.vertexShader = shader.vertexShader.replace('void main() {',funcs+'\nvoid main() {');
	  // TODO Fragment
	  //console.log(vertexShaderUrl, vertexShader.substr(vertexShader.length-100, vertexShader.length));

	};

	return new Promise( r => r([obc, () => [ vertexShaderUrl, fragmentShaderUrl ].join()]));

  }, [vertexShader, fragmentShader]);


  return <meshStandardMaterial
		   {...props}
		   flatShading
		   onBeforeCompile={obc}
		   customProgramCacheKey={key}
		 >
		   {children}
		 </meshStandardMaterial>


}
