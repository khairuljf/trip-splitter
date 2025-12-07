// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/api': './src/api',
            '@/db': './src/db',
            '@/store': './src/store',
            '@/utils': './src/utils',
            '@/libs': './src/libs',
            '@/schemas': './src/schemas',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};