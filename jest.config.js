module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/client/src/$1"
  }
};