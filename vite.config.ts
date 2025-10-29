import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   server: {
//     port: 7000, // Set your desired port here
//   },
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: Number(env.VITE_PORT) || 7000, // convert to number, fallback to 7000
      proxy: {
        '/api': env.VITE_API,
      },
    },
    build: {
      outDir: 'public',
    },
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
