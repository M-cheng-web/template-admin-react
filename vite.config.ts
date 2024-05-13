import react from '@vitejs/plugin-react';
// 需要安装 @typings/node 插件
// import { resolve } from 'path';
import path, { resolve } from 'path';
import { loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import { wrapperEnv } from './build/utils';

import type { ConfigEnv, UserConfig } from 'vite';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const isBuild = command === 'build';

  const env = loadEnv(mode, root);

  // this function can be converted to different typings
  const viteEnv: any = wrapperEnv(env);
  const { VITE_PORT, VITE_DROP_CONSOLE, VITE_APP_BASE_URL } = viteEnv;

  return {
    base: VITE_APP_BASE_URL,
    server: {
      // Listening on all local ips
      host: true,
      port: VITE_PORT,
      proxy: {
        '/repos': {
          target: 'https://api.github.com',
          changeOrigin: true,
          secure: true,
          rewrite: (pt) => pt.replace(/^\/repos/, ''),
        },
        '/content_api': {
          target: 'https://api.juejin.cn',
          changeOrigin: true,
          secure: true,
        },
      },
    },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],

    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      minify: 'terser',
      // minify: 'esbuild',
      outDir: './dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // used to delete console and debugger in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      chunkSizeWarningLimit: 2000,
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
};
