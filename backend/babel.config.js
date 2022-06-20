module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-typescript'],
    plugins: [
      [
        'module:babel-plugin-module-resolver',
        {
          root: ['./src/'],
          alias: {
            '@': './src'
          }
        }
      ]
    ]
  };
};
