import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  /**
   * BACKEND API PROXY CONFIGURATION
   * ================================
   * 
   * Proxies all /api requests to the Node.js backend server running on port 3001.
   * This allows the frontend to make API calls to /api/* which get forwarded to
   * http://localhost:3001/api/*
   * 
   * USAGE:
   * - Frontend: fetch('/api/pilots')
   * - Proxied to: http://localhost:3001/api/pilots
   * 
   * Start backend: npm run server
   * 
   * See DataContext.tsx for API endpoint documentation.
   */
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})