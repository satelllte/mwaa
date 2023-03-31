module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: 'xo',
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
			rules: {
				// Enforces no semicolons
				semi: 'off',
				'@typescript-eslint/semi': ['error', 'never'],

				// Enforces all class members to explicitly indicate their accessibility
				'@typescript-eslint/explicit-member-accessibility': 'error',

				// Enforces functions to explicitly indicate their return type
				'@typescript-eslint/explicit-function-return-type': 'error',

				// Enforces explicit type definitions over inferred types
				'@typescript-eslint/no-inferrable-types': 'off',
				'@typescript-eslint/typedef': ['error', {
					arrayDestructuring: true,
					arrowParameter: true,
					memberVariableDeclaration: true,
					objectDestructuring: true,
					parameter: true,
					propertyDeclaration: true,
					variableDeclaration: true,
					variableDeclarationIgnoreFunction: true,
				}],
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
};
