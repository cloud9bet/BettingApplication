import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/BettingApplication/',
  test: {
    environment: 'jsdom',
    globals: true, 
  },
});
