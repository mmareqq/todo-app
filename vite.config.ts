import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         '@components': path.resolve(__dirname, 'frontend/components'),
         '@assets': path.resolve(__dirname, 'frontend/assets'),
         '@ui': path.resolve(__dirname, 'frontend/components/ui'),
         '@hooks': path.resolve(__dirname, 'frontend/shared/hooks'),
         '@data': path.resolve(__dirname, 'frontend/shared/data'),
         '@contexts': path.resolve(__dirname, 'frontend/shared/contexts'),
         '@utils': path.resolve(__dirname, 'frontend/shared/utils'),
      },
   },
});
