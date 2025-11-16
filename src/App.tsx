import { BrowserRouter, Route, Routes } from 'react-router';
import { publicRoutes } from './routes/public-routes';
import { authenticatedRoutes } from './routes/authenticated-routes';
import { ProtectedRoutes } from './features/auth/components/protected-routes';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/sonner';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map(route => (
            <Route key={route.path} {...route} />
          ))}

          <Route path="/" element={<ProtectedRoutes />}>
            {authenticatedRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Route>

          <Route element={<>404! page not found!</>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
