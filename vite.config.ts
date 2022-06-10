import { resolve } from "path";
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      copy({
        targets: [
          {
            src: `src/configs/groups/${process.env.VITE_APP_BASIC_TYPE}.ts`,
            dest: 'dist/',
            rename: 'myConfig.ts'
          }
        ],
        hook: 'writeBundle'
      })
    ],
    server: {
      port: 8080,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      dedupe: ['vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import './src/scss/var.scss';"
        }
      },
    },
    build: {
      rollupOptions: {
        plugins: [dynamicImportVars()]
      }
    }
  });
}
