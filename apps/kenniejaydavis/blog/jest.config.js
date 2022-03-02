module.exports = {
  displayName: 'kenniejaydavis-blog',
  preset: '../../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/kenniejaydavis/blog',
  globals: {
    __PATH_PREFIX__: 'blog',
  },
};
