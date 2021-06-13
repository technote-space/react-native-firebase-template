const tsconfig = require('./tsconfig.json');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-paper/babel'],
      ['babel-plugin-transform-typescript-metadata'],
      [
        'module-resolver',
        {
          alias: Object.assign({}, ...Object.keys(tsconfig.compilerOptions.paths).map(key => ({[key.replace(/\/\*$/, '')]: tsconfig.compilerOptions.paths[key][0].replace(/\/\*$/, '')}))),
        },
      ],
    ],
  };
};
