# Development

## Testing

### Library

[Vitest](https://vitest.dev/) framework is used for library testing.

To run the library tests, use this command:

```sh
VITEST_ENV=$ENVIRONMENT npm run test:lib -- --environment $ENVIRONMENT
```

where `$ENVIRONMENT` is one of:

- `node`
- `jsdom`
- `happy-dom`

By default the tests are going to run in watch mode. But when the `process.env.CI` is present, they're gonna run in default mode returning the result of the test run. For more information, see [Vitest: Watch Mode](https://vitest.dev/guide/features.html#watch-mode) documentation.

### Code Style

[ESLint](https://eslint.org/) tool is used for code style testing.

To run the code style tests, use this command:

```sh
npm run test:lint
```
