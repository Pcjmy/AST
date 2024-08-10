#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const jscodeshift = require('jscodeshift');
const transform = require('./transform');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path');
  process.exit(1);
}

const code = fs.readFileSync(path.resolve(filePath), 'utf8');
const newCode = transform({ source: code }, { jscodeshift });

fs.writeFileSync(path.resolve(filePath), newCode);
