#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
// import { getComponents2 } from './utils.js';
// import { transformVars } from '../transforms/transformVars1.js';
// import { transformVars } from '../transforms/transformVars2.js';
// import { transform } from '../transforms/rename.js';
// import { transform } from '../transforms/transformArrowFunction.js';
// import { transform } from '../transforms/jscodeshift.js';
// import { transform } from '../transforms/getNode.js';
// import { transform } from '../transforms/deleteConsole.js';
import { transform } from '../transforms/addTryCatch.js';

// const filePath = process.argv[2];

// if (!filePath) {
//   console.error('Please provide a file path');
//   process.exit(1);
// }

// const code = fs.readFileSync(path.resolve(filePath), 'utf8');
// const newCode = transformVars(code);

// fs.writeFileSync(path.resolve(filePath), newCode);
// getComponents2(code);
// const res = transformVars(code);
// console.log(res);

transform();
