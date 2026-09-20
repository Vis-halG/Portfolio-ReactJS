import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Every browser that supports the <script type="module"> this app ships
    // also supports these, so there is no reason to down-level and grow the
    // bundle.
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    // Inline anything small enough that a round trip would cost more than the
    // bytes.
    assetsInlineLimit: 4096,
    reportCompressedSize: true,

    rollupOptions: {
      output: {
        // React changes far less often than this site does; keeping it in its
        // own chunk lets returning visitors reuse it across deploys.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
