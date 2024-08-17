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
  const components = source.find(j.VariableDeclarator);

  // 打印组件名
  components.forEach(path => {
    if (
      path.node.init &&
      (j.ArrowFunctionExpression.check(path.node.init) ||
        j.FunctionExpression.check(path.node.init))
    ) {
      console.log(path.node.id.name);
    }
  });
}

module.exports = { getComponents }
