
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    // Fix: Use '.' as the environment directory to avoid "Property 'cwd' does not exist on type 'Process'"
    const env = loadEnv(mode, '.', '');
    
    return {
      // 1. ADD THIS LINE (Replace with your repo name, e.g., /my-repo-name/)
      base: '/',
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
          // Fix: Use path.resolve('.') instead of __dirname to avoid "Cannot find name '__dirname'"
          '@': path.resolve('.'),
        }
      }
    };
});
