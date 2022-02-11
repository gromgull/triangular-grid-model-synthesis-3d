export default class Cube {
  static center(x,y,z) {
	return [x,y,z]
  }

  static neighbours(x,y,z) {
	return [
	  [ x,   y-1, z ],
	  [ x-1, y,   z ],
	  [ x,   y,   z+1 ],
	  [ x+1, y,   z ],
	  [ x,   y,   z-1 ],
	  [ x,   y+1, z ],
	];
  }


}
