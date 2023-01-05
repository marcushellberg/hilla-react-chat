import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

createRoot(document.getElementById('outlet')!).render(createElement(RouterProvider, { router }));
