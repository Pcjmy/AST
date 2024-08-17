const j = require('jscodeshift');
const parser = require('@babel/parser').parse;
const plugins = ['jsx', 'typescript']; // 根据需要启用插件

j.parser = {
  parse: (source) =>
    parser(source, {
      sourceType: 'module',
      plugins: plugins,
    }),
};

const getComponents = (code) => {
  // 读取.tsx文件
  const source = j(code);

  // 查找所有的React组件
  const components = [
    ...source.find(j.VariableDeclarator).paths(),
    ...source.find(j.FunctionDeclaration).paths(),
    ...source.find(j.ExportDefaultDeclaration).paths(),
  ];

  const printedComponents = new Set();

  // 打印组件名，起始行和结束行
  components.forEach(path => {
    let name = '';
    let startLine = 0;
    let endLine = 0;

    if (j.VariableDeclarator.check(path.node) && 
        (j.ArrowFunctionExpression.check(path.node.init) || j.FunctionExpression.check(path.node.init))) {
      name = path.node.id.name;
      startLine = path.node.init.loc && path.node.init.loc.start.line;
      endLine = path.node.init.loc && path.node.init.loc.end.line;
    } else if (j.ExportDefaultDeclaration.check(path.node) && 
      (j.FunctionDeclaration.check(path.node.declaration) || j.ArrowFunctionExpression.check(path.node.declaration) || j.FunctionExpression.check(path.node.declaration))) {
      name = path.node.declaration.id ? path.node.declaration.id.name : 'default';
      if (name === 'default' && j.FunctionDeclaration.check(path.node.declaration)) {
        name = path.node.declaration.id.name;
      }
      startLine = path.node.loc && path.node.loc.start.line;
      endLine = path.node.loc && path.node.loc.end.line;
    }

    if (name && !printedComponents.has(name)) {
      console.log(`Component Name: ${name}`);
      console.log(`Start Line: ${startLine}`);
      console.log(`End Line: ${endLine}`);
      printedComponents.add(name);
    }
  });
}

module.exports = { getComponents }
