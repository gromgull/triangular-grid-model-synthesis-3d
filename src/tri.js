const sqrt3 = Math.sqrt(3);

class Tri {

  static points_up = (a,b,c) => a+b+c===2;

  static center(a, b, c) {
    // Returns the center of a given triangle in cartesian co-ordinates
    return [[       0.5 * a +                      -0.5 * c],
            [-sqrt3 / 6 * a + sqrt3 / 3 * b - sqrt3 / 6 * c] ];
  }


  static neighbours(a, b, c) {

    return this.points_up(a, b, c) ? [
      [a - 1, b    , c    ],
      [a    , b - 1, c    ],
      [a    , b    , c - 1],
    ] : [
      [a + 1, b    , c    ],
      [a    , b + 1, c    ],
      [a    , b    , c + 1],
    ];
  }
}

export default Tri;
