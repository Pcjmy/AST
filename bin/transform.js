import j from 'jscodeshift';

export const transform = (file) => {
  return j(file.source)
    .find(j.VariableDeclaration, { kind: 'var' })
    .forEach(path => {
      path.node.kind = 'let';
    })
    .toSource();
};
