import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from '@components/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/browser-router';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
