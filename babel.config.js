module.exports = {
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: [
        [
          'module:react-native-builder-bob/babel-preset',
          { jsxImportSource: 'nativewind', modules: 'commonjs' },
        ],
        'nativewind/babel',
      ],
      plugins: [
        [
          'module-resolver',
          {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
              '@': './src',
            },
          },
        ],
      ],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
  ],
};
