import { createRoot } from 'react-dom/client';
import { RouterProvider } from './routes';

const root = createRoot(document.querySelector('#root_react'));
root.render(<RouterProvider />);