import j from 'jscodeshift';

export const transform = () => {
  const sourceCode = `
const a = 1;
console.log(a);
`;

  const ast = j(sourceCode)
  ast
    .find(j.CallExpression, {
      callee: {
        object: { name: 'console' },
        property: { name: 'log' }
      }
    })
    .remove();
  console.log(ast.toSource());
}
