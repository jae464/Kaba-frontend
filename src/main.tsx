import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const enableMocking = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.USE_MOCKS === 'true'
  ) {
    const { worker } = await import('./mocks/browser');
    worker.start();
  }
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
