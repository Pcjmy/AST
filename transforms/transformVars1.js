import j from 'jscodeshift';

export const transformVars = (code) => {
  return j(code)
    .find(j.VariableDeclaration, { kind: 'var' })
    .forEach(path => {
      path.node.kind = 'let';
    })
    .toSource();
};
