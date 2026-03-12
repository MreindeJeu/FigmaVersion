import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
      <Toaster 
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: '#052e16',
            border: '1px solid #15803d',
            color: '#86efac',
          },
        }}
      />
    </DataProvider>
  );
}