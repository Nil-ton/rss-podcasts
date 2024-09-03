import { createRoot } from 'react-dom/client';
import { RouterProvider } from './app/routes';

const root = createRoot(document.querySelector('#root_react'));
root.render(<RouterProvider />);