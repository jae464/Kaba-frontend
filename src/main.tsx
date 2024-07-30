import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const enableMocking = async () => {
  if (import.meta.env.DEV || import.meta.env.VITE_APP_USE_MOCKS === 'true') {
    console.log('process env development');
    console.log(import.meta.env.VITE_APP_USE_MOCKS);
    const { worker } = await import('./mocks/browser');
    worker.start();
  }
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
