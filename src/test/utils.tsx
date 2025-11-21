import { render, renderHook, type RenderHookOptions, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@components/sonner';
import { MemoryRouter } from 'react-router';
// TODO import { AuthProvider } from './auth';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AuthProvider>
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
    // </AuthProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderHook = <Result, Props>(render: (initialProps: Props) => Result, options?: RenderHookOptions<Props>) =>
  renderHook(render, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, customRenderHook as renderHook };
