import j from 'jscodeshift';

export const transform = () => {
  const sourceCode = `
const a = 1;
console.log(a);
try {
  const s = 'abc';
  console.log(s);
} catch (e) {
  console.log(e);
}
`;

  const ast = j(sourceCode)
  ast
    .find(j.CallExpression, {
      callee: {
        object: { name: 'console' },
        property: { name: 'log' }
      }
    })
    .filter(path => {
      // 检查是否在 catch 语句块中
      let parent = path.parent;
      while (parent) {
        if (parent.value.type === 'CatchClause') {
          return false;
        }
        parent = parent.parent;
      }
      return true;
    })
    .remove();
  console.log(ast.toSource());
}
