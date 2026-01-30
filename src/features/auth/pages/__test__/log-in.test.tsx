import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { LogInPage } from '../log-in';
import { server } from '../../../../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '@/mocks/handlers';
import { Routes, Route } from 'react-router';
import { useAuthStore } from '../../stores/auth-store';
import { useUserStore } from '../../stores/user-store';
import { render, screen, waitFor, act } from '@/test/utils';

const renderLogInWithRouter = () => {
  return render(
    <Routes>
      <Route path="/" element={<LogInPage />} />
      <Route path="/profile" element={<div>Home page</div>} />
    </Routes>
  );
};

const submitFormValidData = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Email'), 'killua.zoldyck@example.com');
  await user.type(screen.getByLabelText('Senha'), 'SecurePass123!');

  const submitButton = screen.getAllByRole('button', { name: /entrar/i })[1];
  await user.click(submitButton);
};

describe('LogInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    act(() => {
      useAuthStore.setState({ isAuthenticated: false });
      useUserStore.setState({ user: null });
    });
  });

  describe('Form Validation', () => {
    it('should show error when email is invalid', async () => {
      const user = userEvent.setup();
      renderLogInWithRouter();

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getAllByRole('button', { name: /entrar/i })[1];

      await user.type(emailInput, 'email@invalid');
      await user.click(submitButton);

      expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
    });

    it('should show error when password is empty', async () => {
      const user = userEvent.setup();
      renderLogInWithRouter();

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getAllByRole('button', { name: /entrar/i })[1];

      await user.type(emailInput, 'killua.zoldyck@example.com');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha não pode ser vazia/i)).toBeInTheDocument();
    });

    it('should show error when password exceeds maximum length', async () => {
      const user = userEvent.setup();
      renderLogInWithRouter();

      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getAllByRole('button', { name: /entrar/i })[1];

      await user.type(passwordInput, 'A'.repeat(33));
      await user.click(submitButton);

      expect(await screen.findByText(/A senha deve ter no máximo 32 caracteres/i)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should toggle password visibility when clicking eye icon', async () => {
      const user = userEvent.setup();
      renderLogInWithRouter();

      const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;

      const passwordToggleButton = screen.getByRole('button', { name: /mostrar senha|esconder senha/i });

      expect(passwordInput.type).toBe('password');

      await user.click(passwordToggleButton);
      expect(passwordInput.type).toBe('text');

      await user.click(passwordToggleButton);
      expect(passwordInput.type).toBe('password');
    });

    it('should allow user to fill all form fields', async () => {
      const user = userEvent.setup();
      renderLogInWithRouter();

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;

      await user.type(emailInput, 'killua.zoldyck@example.com');
      await user.type(passwordInput, 'SecurePass123!');

      expect(emailInput.value).toBe('killua.zoldyck@example.com');
      expect(passwordInput.value).toBe('SecurePass123!');
    });
  });

  describe('API Integration', () => {
    it('should show loading toast while submitting', async () => {
      renderLogInWithRouter();

      await submitFormValidData();

      expect(await screen.findByText(/Entrando na conta.../i)).toBeInTheDocument();
    });

    it('should successfully submit form and navigate to home page', async () => {
      renderLogInWithRouter();

      await submitFormValidData();

      expect(await screen.findByText(/Home/i)).toBeInTheDocument();
    });

    it('should stay on login page when API request fails', async () => {
      server.use(
        http.post(`${API_URL}/auth/login`, () => {
          return HttpResponse.json({ message: 'Credenciais inválidas' }, { status: 400 });
        })
      );

      renderLogInWithRouter();

      await submitFormValidData();

      expect(await screen.findByText(/Erro ao entrar na conta/i)).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha')).toBeInTheDocument();
      });
    });
  });
});
