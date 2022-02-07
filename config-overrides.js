module.export = function overrides(config, env) {

  config.moduleloaders.push({
    test: /\.glsl$/,
    loader: 'webpack-glsl'
  });
};
