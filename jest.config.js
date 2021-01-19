module.exports = {
	displayName: 'TEST',
	rootDir: '.',
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			diagnostics: false,
		},
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/lib/**/*.ts',
	],
	coverageDirectory: './coverage',
	coverageReporters: [
		'lcov',
		'text',
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	moduleFileExtensions: [
		'js',
		'ts',
	],
	modulePathIgnorePatterns: [
		'<rootDir>/dist',
	],
	transform: {
		'.*/.(j|t)s$': 'ts-jest',
	},
	testMatch: [
		'<rootDir>/lib/**/*.spec.ts',
	],
	setupFilesAfterEnv: [
		'jest-extended',
	],
};
