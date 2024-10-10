module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: ["/node_modules/"],
};