export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|module.scss|scss|less)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
    "/src/setupTests.ts",
    "/src/mocks/",
  ],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 90,
      functions: 90,
      lines: 80,
    },
  },
  transformIgnorePatterns: ["/node_modules/"],
};
