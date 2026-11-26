import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '');

  return {
    plugins: [
      {
        // Point canonical and social-preview links at the live address (VITE_SITE_URL) at build time.
        name: 'site-url',
        transformIndexHtml(html: string) {
          return siteUrl ? html.replaceAll('https://levitechsolutions.example', siteUrl) : html;
        },
      },
      react(),
      tailwindcss(),
    ],
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalized = id.replace(/\\/g, '/');
            if (normalized.includes('/node_modules/framer-motion/') || normalized.includes('/node_modules/motion-dom/')) return 'vendor-motion';
            if (normalized.includes('/node_modules/react/') || normalized.includes('/node_modules/react-dom/') || normalized.includes('/node_modules/react-router')) return 'vendor-react';
          },
        },
      },
    },
    server: {
      port: 5173,
      strictPort: false,
    },
  };
});
