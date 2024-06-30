module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@api/*': ['src/core/*'],
          '@utils': './src/utils',
          '@core': './src/core',
          '@assets': './src/assets',
          '@src/*': ['./src'],
        },
      },
    ],
  ],
};
