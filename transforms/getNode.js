import j from 'jscodeshift';
import parser from '@babel/parser';

const options = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'asyncGenerators',
    'decoratorAutoAccessors',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    'decorators-legacy',
    'doExpressions',
    'dynamicImport',
    'exportDefaultFrom',
    'exportExtensions',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importAttributes',
    'importMeta',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    ['pipelineOperator', { proposal: 'minimal' }],
    'throwExpressions',
    'typescript',
    'jsx',
  ],
};

export const transform = (code) => {
  const ast = j(code, {
    parser: {
      parse: (source) =>
        parser.parse(source, options),
    }
  });
  const nodes = ast.find(j.Program).nodes();
  const arr = nodes[0].body;
  arr.forEach((node) => {
    console.log('type:', node.type);
    console.log('startLine:', node.loc.start.line);
    console.log('endLine:', node.loc.end.line);
  })
}
