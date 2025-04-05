import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'AvialaColor',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: ['color'],
      output: {
        globals: {
          color: 'Color'
        }
      }
    }
  },
  plugins: [
    dts({
      include: ['src/**/*.js'],
      beforeWriteFile: (filePath, content) => {
        return {
          filePath,
          content: content.replace(/import\s+Color\s+from\s+'color';/g, 
                                  "import * as Color from 'color';")
        };
      }
    })
  ]
});