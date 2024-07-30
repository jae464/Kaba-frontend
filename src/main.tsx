import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const enableMocking = async () => {
  if (import.meta.env.DEV || import.meta.env.REACT_APP_USE_MOCKS === 'true') {
    console.log('process env development');
    const { worker } = await import('./mocks/browser');
    worker.start();
  }
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
