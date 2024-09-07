import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generator from "@babel/generator";

export const transform = () => {
  // 源代码
  const code = `
  const hello = () => {};
  `;

  // 1. 源代码解析成 ast
  const ast = parser.parse(code);

  // 2. 转换
  const visitor = {
    // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
    ArrowFunctionExpression(path) {
      let { node } = path;
      node.type = "FunctionExpression";
    },
  };
  traverse.default(ast, visitor);

  // 3. 生成
  const result = generator.default(ast, {}, code);

  console.log(result.code);
}
