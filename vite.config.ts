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
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: id => {
          // React ecosystem
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router')
          ) {
            return 'react-vendor';
          }
          // Radix UI components
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // Supabase
          if (id.includes('@supabase') || id.includes('supabase')) {
            return 'supabase-vendor';
          }
          // Query libraries
          if (id.includes('@tanstack') || id.includes('react-query')) {
            return 'query-vendor';
          }
          // Utility libraries
          if (
            id.includes('clsx') ||
            id.includes('tailwind-merge') ||
            id.includes('class-variance-authority') ||
            id.includes('lucide-react')
          ) {
            return 'utils-vendor';
          }
          // Theme and styling
          if (id.includes('next-themes') || id.includes('tailwindcss')) {
            return 'theme-vendor';
          }
        },
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split('/')
                .pop()
                ?.replace('.tsx', '')
                .replace('.ts', '')
                .replace('.jsx', '')
                .replace('.js', '') || 'chunk'
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name]-[hash].${extType}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/[name]-[hash].${extType}`;
          }
          return `assets/[name]-[hash].${extType}`;
        },
      },
    },
    // Disable source maps in production for smaller bundles
    sourcemap: mode !== 'production',
    // Optimize CSS
    cssCodeSplit: true,
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        // Additional optimizations
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        safari10: true,
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable build optimizations
    reportCompressedSize: false, // Faster builds
    target: 'esnext', // Modern browsers
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
      'clsx',
      'tailwind-merge',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  // Add preload optimization
  esbuild: {
    // Remove console.log in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
