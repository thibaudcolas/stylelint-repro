#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const stylelint = require('stylelint');

const input = process.argv[process.argv.length - 1];
const filePath = path.resolve(input);
const fileContent = fs.readFileSync(filePath, 'utf-8');

stylelint.lint({
  code: fileContent,
  codeFilename: filePath,
  formatter: "string",
  ignorePath: path.join(__dirname, '..', '.stylelintignore'),
}).then(res => console.log(res.output));
