const path = require('path');
const exampleNodeModules = path.join(__dirname, 'node_modules'); // Example's node_modules
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/private/defaults/exclusionList');
const rootPkg = require('../package.json');
const { withUniwindConfig } = require('uniwind/metro');
const { getDefaultConfig } = require('@expo/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const root = path.resolve(__dirname, '..');
const peerDependencies = Object.keys({
  ...rootPkg.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configurations
 *
 * @type {import('metro-config').MetroConfig}
 */

const configObj = {
  ...defaultConfig,

  projectRoot: __dirname, // Ensure the example project is the main entry point
  watchFolders: [root], // Watch the root folder so changes in the library are detected

  resolver: {
    ...defaultConfig.resolver,
    disableHierarchicalLookup: true,
    nodeModulesPaths: [exampleNodeModules, path.resolve(root, 'node_modules')],

    blockList: exclusionList(
      peerDependencies.map(
        (m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}/.*$`) // Exclude root's node_modules
      )
    ),
    extraNodeModules: {
      ...peerDependencies.reduce((acc, name) => {
        acc[name] = path.join(exampleNodeModules, name); // Force Metro to use example's node_modules
        return acc;
      }, {}),
    },
  },
};

// Create the base config without react-native-builder-bob
const config = {
  ...defaultConfig,
  ...configObj,
};

module.exports = withUniwindConfig(wrapWithReanimatedMetroConfig(config), {
  cssEntryFile: './global.css',
  dtsFile: './src/uniwind.d.ts',
  extraThemes: [
    'lavender-light',
    'lavender-dark',
    'mint-light',
    'mint-dark',
    'sky-light',
    'sky-dark',
  ],
});
