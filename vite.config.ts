import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and React DOM into a vendor chunk
          'vendor': ['react', 'react-dom'],
          // Example for other installed libraries
          'charting': ['chart.js', 'react-chartjs-2'],
          // lodash example
          'lodash': ['lodash'],
        },
      }
    },
    chunkSizeWarningLimit: 1000, 
  }
});
// 
