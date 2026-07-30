const path = require('path');
const pkg = require('../package.json');

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // Must run first so Lingui macros are expanded before any other transform.
    '@lingui/babel-plugin-lingui-macro',
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          // For development, we want to alias the library to the source
          [pkg.name]: path.join(__dirname, '..', pkg.source),
          '@': path.join(__dirname, '../src'),
        },
      },
    ],
  ],
};
