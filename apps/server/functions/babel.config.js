const tsconfig = require('./tsconfig.json');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      ['babel-plugin-transform-typescript-metadata'],
      ['@babel/plugin-transform-runtime'],
      ['@babel/plugin-proposal-decorators', {'legacy': true}],
      [
        'module-resolver',
        {
          alias: Object.assign({}, ...Object.keys(tsconfig.compilerOptions.paths).map(key => ({[key.replace(/\/\*$/, '')]: tsconfig.compilerOptions.paths[key][0].replace(/\/\*$/, '')}))),
        },
      ],
    ],
  };
};
