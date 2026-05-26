const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');
const exampleNodeModules = path.join(projectRoot, 'node_modules');
const workspaceRootNodeModules = path.join(workspaceRoot, 'node_modules');

// Library peer deps must resolve to a single copy (the example's).
const rootPkg = require('../package.json');
const peerDependencies = Object.keys(rootPkg.peerDependencies ?? {});

const config = getDefaultConfig(projectRoot);

// Watch the workspace root so library source changes trigger reloads.
config.watchFolders = Array.from(
  new Set([...(config.watchFolders ?? []), workspaceRoot])
);

// The library source is consumed from outside the example via a babel alias,
// and the workspace root has its own `node_modules` with overlapping deps.
// Pinning resolution here prevents duplicate copies of `react`, reanimated,
// etc., which would otherwise crash Hermes with
// "Maximum call stack size exceeded (native stack depth)" at startup.
// Requires `uniwind >= 1.6.3` (see https://github.com/uni-stack/uniwind/issues/505).
config.resolver.nodeModulesPaths = [
  exampleNodeModules,
  workspaceRootNodeModules,
];
config.resolver.disableHierarchicalLookup = true;

// Explicit hardening on top of `disableHierarchicalLookup`.
config.resolver.blockList = [
  ...(toArray(config.resolver.blockList) ?? []),
  ...peerDependencies.map(
    (name) =>
      new RegExp(`^${escape(path.join(workspaceRootNodeModules, name))}\\/.*$`)
  ),
];

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  ...peerDependencies.reduce((acc, name) => {
    acc[name] = path.join(exampleNodeModules, name);
    return acc;
  }, {}),
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

/**
 * Normalizes Metro's `blockList` (RegExp | RegExp[] | undefined) to an array.
 *
 * @param {RegExp | readonly RegExp[] | null | undefined} value
 * @returns {RegExp[] | undefined}
 */
function toArray(value) {
  if (value == null) return undefined;
  if (Array.isArray(value)) return value;
  return [value];
}
