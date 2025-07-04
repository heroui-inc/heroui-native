const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = function (api) {
  api.cache(true);

  return getConfig(
    {
      presets: [
        ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
        'nativewind/babel',
      ],
      plugins: [
        [
          'module-resolver',
          {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
              // For development, we want to alias the library to the source
              [pkg.name]: path.join(__dirname, '..', pkg.source),
            },
          },
        ],
      ],
    },
    { root, pkg }
  );
};
