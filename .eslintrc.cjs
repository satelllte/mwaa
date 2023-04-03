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

				// Turns off "readonly" enforcing in classes
				'@typescript-eslint/prefer-readonly': 'off',

				// Enforces all class members (except constructor) to explicitly indicate their accessibility
				'@typescript-eslint/explicit-member-accessibility': ['error', {
					accessibility: 'explicit',
					overrides: {
						constructors: 'no-public',
					},
				}],

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

				// Allows extraneous empty or static classes
				'@typescript-eslint/no-extraneous-class': 'off',

				// Allows empty functions
				'no-empty-function': 'off',
				'@typescript-eslint/no-empty-function': 'off',

				// Allows up to 10 nested callbacks
				'max-nested-callbacks': ['error', 10],

				// Allows useless constructors
				'@typescript-eslint/no-useless-constructor': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
};
