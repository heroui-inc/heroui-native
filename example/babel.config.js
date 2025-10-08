const path = require('path');
const pkg = require('../package.json');

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
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
