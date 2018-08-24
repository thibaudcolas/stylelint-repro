# Reproduction for stylelint issue [#2833](https://github.com/stylelint/stylelint/issues/2833)

## Setup

```
git clone git@github.com:thibaudcolas/stylelint-repro-2833.git
cd stylelint-repro-2833
npm install
```

## Reproducing the issue

- Both the configuration and `.stylelintignore` are at the project root
- `.stylelintignore` is set to ignore `*.html` files.
- `src/public/index.html` has styles that would trigger an error, and shouldn't be linted.

## Behavior of the CLI

From the project root, success, ignore patterns are applied:

```sh
npx stylelint 'src/public/**/*.html'
# (no output)
```

From `src/public`, fail, ignore patterns are not applied:

```sh
cd src/public
npx stylelint '**/*.html'
# index.html
# 3:3  ✖  Expected ".should .not .lint .this" to have no more than 2 classes   selector-max-class
```

With `--ignore-path`, from `src/public`, success, ignore patterns are applied:

```sh
npx stylelint --ignore-path ../../.stylelintignore '**/*.html'
```

## Behavior of the API

From the project root, success, ignore patterns are applied:

```sh
./src/api.js src/public/index.html
# (no output)
```

From `src/public`, success, ignore patterns are not applied:

```sh
cd src/public
../api.js index.html
{ errored: true,
  output: '\n\u001b[4mindex.html\u001b[24m\n \u001b[2m3:3\u001b[22m  \u001b[31m\u001b[31m✖\u001b[31m\u001b[39m  Expected ".should .not .lint .this" to have no more than 2   \u001b[2mselector-max-class\u001b[22m\n         classes\n\n',
  results:
   [ { source: '/Users/thibaudcolas/Dev/thibaudcolas/stylelint-repro-2833/src/public/index.html',
       deprecations: [],
       invalidOptionWarnings: [],
       parseErrors: [],
       errored: true,
       warnings: [Array],
       ignored: undefined,
       _postcssResult: [Object] } ] }
```

With `ignorePath`, from `src/public`, fail, output is empty but other results show errors:

```sh
../api.ignorePath.js index.html
{ errored: true,
  output: '',
  results:
   [ { source: '/Users/thibaudcolas/Dev/thibaudcolas/stylelint-repro-2833/src/public/index.html',
       deprecations: [],
       invalidOptionWarnings: [],
       parseErrors: [],
       errored: true,
       warnings: [Array],
       ignored: undefined,
       _postcssResult: [Object] } ] }
```
