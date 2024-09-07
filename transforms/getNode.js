import j from 'jscodeshift';

export const transform = (code) => {
  const ast = j(code);
  const nodes = ast.find(j.Program).nodes();
  const arr = nodes[0].body;
  arr.forEach((node) => {
    console.log('type:', node.type);
    console.log('startLine:', node.loc.start.line);
    console.log('endLine:', node.loc.end.line);
  })
}
