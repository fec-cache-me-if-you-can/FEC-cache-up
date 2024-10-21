module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/client/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/StyleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/FileMock.js",
  }
};