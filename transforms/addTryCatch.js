import j from 'jscodeshift';

export const transform = () => {
  const sourceCode = `
const axios = require('axios');

async function fetchData() {
  const response = await axios.get('https://api.example.com/data');
  console.log(response.data);
}

fetchData();
`;
  const root = j(sourceCode);
  root.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { name: 'axios' }
    }
  }).forEach(path => {
    let target = path;
    // console.log(target);
    while (target.value.type !== 'VariableDeclaration' && target.value.type !== 'ExpressionStatement') {
      target = target.parent;
    }
    const axiosCall = target.node;
    const tryCatchBlock = j.tryStatement(
      j.blockStatement([axiosCall]),
      j.catchClause(
        j.identifier('error'),
        null,
        j.blockStatement([
          j.expressionStatement(
            j.callExpression(
              j.memberExpression(j.identifier('console'), j.identifier('error')),
              [j.identifier('error')]
            )
          )
        ])
      )
    );

    j(target).replaceWith(tryCatchBlock);
  });

  console.log(root.toSource());
};
