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

## Behavior of the API

From the project root, success, ignore patterns are applied:

```sh
./src/api/index.js src/public/index.html
# (no output)
```

From `src/public`, fail, ignore patterns are not applied:

```sh
cd src/public
../api/index.js index.html
# index.html
# 3:3  ✖  Expected ".should .not .lint .this" to have no more than 2 classes   selector-max-class
```