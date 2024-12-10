module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',  // Make sure axios is transformed by Babel
    ],
    testEnvironment: 'jsdom',  // if using React and browser-like environment
  };
  