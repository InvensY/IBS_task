/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(import.meta.dirname, './node_modules/react'),
      'react-dom': path.resolve(import.meta.dirname, './node_modules/react-dom'),
    },
  },
  test: {
    environment: 'jsdom', // имитация браузера
    globals: true, // чтобы describe/it/expect были доступны без импортов
    setupFiles: './src/setupTests.ts', // файл с настройками (подключение jest-dom)
  },
});
