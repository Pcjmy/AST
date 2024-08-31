const j = require('jscodeshift');
const parser = require('@babel/parser').parse;
const plugins = ['jsx', 'typescript']; // 根据需要启用插件
// const { parse } = require('react-docgen');

j.parser = {
  parse: (source) =>
    parser(source, {
      sourceType: 'module',
      plugins: plugins,
    }),
};

const getComponents = (code) => {
  const source = j(code);

  const components = [
    ...source.find(j.ExportDefaultDeclaration).paths(),
    ...source.find(j.VariableDeclarator).paths(),
    ...source.find(j.FunctionDeclaration).paths(),
    ...source.find(j.FunctionExpression).paths(),
    ...source.find(j.ArrowFunctionExpression).paths(),
  ];

  const printedComponents = new Set();

  components.forEach(path => {
    let name = '';
    let startLine = 0;
    let endLine = 0;

    const isComponent = path => {
      if (path.node.body && path.node.body.body && Array.isArray(path.node.body.body)) {
        for (let i = 0; i < path.node.body.body.length; i++) {
          if (j.ReturnStatement.check(path.node.body.body[i]) && j.JSXElement.check(path.node.body.body[i].argument)) {
            return true;
          }
        }
      }
      if (path.node.declaration && path.node.declaration.body && path.node.declaration.body.body && Array.isArray(path.node.declaration.body.body)) {
        for (let i = 0; i < path.node.declaration.body.body.length; i++) {
          if (j.ReturnStatement.check(path.node.declaration.body.body[i]) && j.JSXElement.check(path.node.declaration.body.body[i].argument)) {
            return true;
          }
        }
      }
      return false;
    };

    if ((j.VariableDeclarator.check(path.node) && 
        (j.ArrowFunctionExpression.check(path.node.init) || j.FunctionExpression.check(path.node.init))) ||
        (j.FunctionDeclaration.check(path.node)) ||
        (j.ExportDefaultDeclaration.check(path.node) && 
         (j.FunctionDeclaration.check(path.node.declaration) || j.ArrowFunctionExpression.check(path.node.declaration) || j.FunctionExpression.check(path.node.declaration))) ||
        (j.FunctionExpression.check(path.node) || j.ArrowFunctionExpression.check(path.node))) {
      if (isComponent(path)) {
        if (j.VariableDeclarator.check(path.node)) {
          name = path.node.id.name;
          startLine = path.node.init.loc && path.node.init.loc.start.line;
          endLine = path.node.init.loc && path.node.init.loc.end.line;
        } else if (j.ExportDefaultDeclaration.check(path.node)) {
          if (j.FunctionDeclaration.check(path.node.declaration)) {
            name = path.node.declaration.id ? path.node.declaration.id.name : 'default';
          } else if (j.FunctionExpression.check(path.node.declaration) || j.ArrowFunctionExpression.check(path.node.declaration)) {
            name = path.parentPath.node.id ? path.parentPath.node.id.name : 'default';
          }
          startLine = path.node.loc && path.node.loc.start.line;
          endLine = path.node.loc && path.node.loc.end.line;
        } else if (j.FunctionDeclaration.check(path.node)) {
          name = path.node.id.name;
          startLine = path.node.id.loc && path.node.id.loc.start.line;
          endLine = path.node.id.loc && path.node.id.loc.end.line;
        } else if (j.FunctionExpression.check(path.node) || j.ArrowFunctionExpression.check(path.node)) {
          name = path.parentPath.node.id.name;
          startLine = path.node.loc && path.node.loc.start.line;
          endLine = path.node.loc && path.node.loc.end.line;
        }

        if (name && !printedComponents.has(name)) {
          console.log(`Component Name: ${name}`);
          console.log(`Start Line: ${startLine}`);
          console.log(`End Line: ${endLine}`);
          printedComponents.add(name);
        }
      }
    }
  });
}

// const getComponents2 = (code) => {
//   const componentsInfo = parse(code);

//   componentsInfo.forEach(componentInfo => {
//     console.log(`Component Name: ${componentInfo.displayName}`);
//     console.log(`Start Line: ${componentInfo.loc.start.line}`);
//     console.log(`End Line: ${componentInfo.loc.end.line}`);
//   });
// }

module.exports = { getComponents }
