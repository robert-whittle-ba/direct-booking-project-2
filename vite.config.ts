import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Fix: Property 'cwd' does not exist on type 'Process'.
    // Use '.' to refer to the current working directory (project root).
    const env = loadEnv(mode, '.', '');
    
    return {
      // 1. ADD THIS LINE (Replace with your repo name, e.g., /my-repo-name/)
      base: '/direct-booking-project-2/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // This maps the secret from your environment into the code
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_API_KEY)
      },
      resolve: {
        alias: {
          // Fix: Cannot find name '__dirname'.
          // path.resolve('.') resolves to the current working directory.
          '@': path.resolve('.'),
        }
      }
    };
});