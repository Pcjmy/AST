import j from 'jscodeshift';

export const transform = () => {
  const sourceCode = `const a = 1;`;
  const ast = j(sourceCode).getAST();
  console.log(JSON.stringify(ast, null, 2));
}
