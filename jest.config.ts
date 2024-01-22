export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "node_modules/",
    "tests/",
    "src/infrastructure/data/context",
    "src/infrastructure/data/migrations",
    "src/infrastructure/log"
  ],
  coverageProvider: "v8",
  coverageReporters: ["json", "html"],
  preset: "ts-jest",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  setupFiles: ["./tests/jest.setup.ts"],
  setupFilesAfterEnv: ["./tests/jest.setup.ts"],
  testMatch: [
    "**/tests/unit/**/*.test.ts",
    "**/tests/integration/**/*.test.ts",
  ]
};
