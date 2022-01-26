import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import replaceVue from './build/babel-plugin-replace-vue';

const SRC_ROOT = 'src'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      babelPlugins: [[replaceVue]]
    }),
    dts({
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(SRC_ROOT, ''),
        content,
      })
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  build: {
    lib: {
      entry: `${SRC_ROOT}/index.ts`,
      fileName: (_) => 'index.js',
      formats: ['es'],
    },
    outDir: 'lib',
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: SRC_ROOT,
      }
    }
  }
})
