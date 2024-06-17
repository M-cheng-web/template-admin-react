import { defineApplicationConfig } from './vite-config/src';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: ['@iconify/react', 'lodash-es', 'echarts', 'echarts-for-react'],
    },
    server: {
      // Listening on all local ips
      host: true,
      port: 5174,
      proxy: {
        '/content_api': {
          target: 'https://api.juejin.cn',
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});
