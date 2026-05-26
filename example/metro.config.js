const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

// Project root (this Expo app) and the monorepo workspace root.
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Recommended monorepo setup from
// https://docs.expo.dev/guides/monorepos/#modify-the-metro-config :
//   - Watch the workspace root so changes in sibling packages (i.e. the
//     `heroui-native` library at the repo root) trigger reloads.
//   - Tell Metro about every `node_modules` location it should resolve from
//     so peer/transitive dependencies of the library resolve cleanly even
//     when its source files live outside the example app.
// IMPORTANT: do NOT set `disableHierarchicalLookup: true`; Metro 0.84+
// throws "Unexpectedly escaped traversal" when hoisted deps are reached
// without hierarchical lookup.
config.watchFolders = Array.from(
  new Set([...(config.watchFolders ?? []), workspaceRoot])
);

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

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
