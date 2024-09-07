import j from 'jscodeshift';

export const transform = () => {
  const sourceCode = `
import React from 'react';
import { Button } from 'antd';
`;

  const ast = j(sourceCode)
  ast
    .find(j.ImportDeclaration, { source: { value: "antd" } })
    .forEach((path) => {
      console.log(path.node.source.value);
    });
}
