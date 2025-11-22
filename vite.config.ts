// Copyright © 2025 Rawat Innovations Private Limited. All rights reserved.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Simplified chunk splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-tabs',
          ],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
    // Disable source maps in production for smaller bundles
    sourcemap: mode !== 'production',
    // Optimize CSS
    cssCodeSplit: true,
    // Use esbuild for faster minification
    minify: mode === 'production' ? 'esbuild' : false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable build optimizations
    reportCompressedSize: false, // Faster builds
    target: 'es2020', // Good browser support with better optimization
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      '@tanstack/react-query',
      'lucide-react',
    ],
    // Force optimization for better dev server performance
    force: false,
  },
  // Add preload optimization
  esbuild: {
    // Remove console.log in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Faster builds with fewer transforms
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  // Cache optimization
  cacheDir: '.vite',
}));
