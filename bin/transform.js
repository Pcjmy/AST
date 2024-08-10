const j = require('jscodeshift');

module.exports = function(file) {
  return j(file.source)
    .find(j.VariableDeclaration, { kind: 'var' })
    .forEach(path => {
      path.node.kind = 'let';
    })
    .toSource();
};
