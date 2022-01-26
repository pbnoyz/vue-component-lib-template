/**
 * Replace all `vue` import with `vue-demi`
 */
export default function replaceImportPath(_: any) {
  return {
    name: 'replace-vue',
    visitor: {
      ImportDeclaration(path: any) {

        const { node } = path;

        if (node && node.source.value === 'vue') {
          node.source.value = 'vue-demi';
        }

      }
    }
  }
}
