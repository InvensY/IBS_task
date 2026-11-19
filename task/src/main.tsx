import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ← добавь импорт
import './css/reset.css';
import App from './App.tsx';
import './css/main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {' '}
      {/* ← обёртка */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
