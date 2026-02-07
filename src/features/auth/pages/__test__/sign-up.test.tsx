import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@test/utils';
import userEvent from '@testing-library/user-event';
import { SignUpPage } from '../sign-up';
import { server } from '../../../../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '@/mocks/handlers';

const submitFormValidData = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Nome Completo'), 'Killua Zoldyck');
  await user.type(screen.getByLabelText('Email'), 'killua.zoldyck@example.com');

  const birthDateInput = screen.getByLabelText('Data de Nascimento') as HTMLInputElement;
  await user.click(birthDateInput);

  const prevMonthButton = screen.getByRole('button', { name: /Go to the Previous Month/i });
  await user.click(prevMonthButton);

  const day15 = await screen.findByRole('button', { name: /15/i });
  await user.click(day15);

  await user.type(screen.getByLabelText('Senha'), 'SecurePass123!');
  await user.type(screen.getByLabelText('Confirmar senha'), 'SecurePass123!');

  const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];
  await user.click(submitButton);
};

describe('SignUpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Validation', () => {
    it('should show error when full name is too short', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const fullNameInput = screen.getByLabelText('Nome Completo');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(fullNameInput, 'Jo');
      await user.click(submitButton);

      expect(await screen.findByText(/O nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    });

    it('should show error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(emailInput, 'email@invalid');
      await user.click(submitButton);

      expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
    });

    it('should show error when password is too short', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(passwordInput, 'Pass1!');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha deve ter pelo menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('should show error when password does not contain a letter', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(passwordInput, '12345678!');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha deve conter pelo menos uma letra/i)).toBeInTheDocument();
    });

    it('should show error when password does not contain a number', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(passwordInput, 'Password!');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha deve conter pelo menos um número/i)).toBeInTheDocument();
    });

    it('should show error when password does not contain a symbol', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(passwordInput, 'Password123');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha deve conter pelo menos um símbolo/i)).toBeInTheDocument();
    });

    it('should show error when passwords do not match', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const fullNameInput = screen.getByLabelText('Nome Completo') as HTMLInputElement;
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const birthDateInput = screen.getByLabelText('Data de Nascimento') as HTMLInputElement;

      await user.type(fullNameInput, 'Killua Zoldyck');
      await user.type(emailInput, 'killua.zoldyck@example.com');

      await user.click(birthDateInput);
      const prevMonthBtn = screen.getByRole('button', { name: /Go to the Previous Month/i });
      await user.click(prevMonthBtn);
      const day15 = await screen.findByRole('button', { name: /15/i });
      await user.click(day15);

      const passwordInput = screen.getByLabelText('Senha');
      const confirmPasswordInput = screen.getByLabelText('Confirmar senha');
      const submitButton = screen.getAllByRole('button', { name: /cadastrar/i })[1];

      await user.type(passwordInput, 'Password123!');
      await user.type(confirmPasswordInput, 'DifferentPass123!');
      await user.click(submitButton);

      expect(await screen.findByText(/As senhas precisam ser iguais/i)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should toggle password visibility when clicking eye icon', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;

      const passwordToggleButton = screen.getAllByRole('button', { name: /mostrar senha|esconder senha/i })[0];

      expect(passwordInput.type).toBe('password');

      await user.click(passwordToggleButton);
      expect(passwordInput.type).toBe('text');

      await user.click(passwordToggleButton);
      expect(passwordInput.type).toBe('password');
    });

    it('should allow user to fill all form fields', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const fullNameInput = screen.getByLabelText('Nome Completo') as HTMLInputElement;
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const birthDateInput = screen.getByLabelText('Data de Nascimento') as HTMLInputElement;
      const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;
      const confirmPasswordInput = screen.getByLabelText('Confirmar senha') as HTMLInputElement;

      await user.type(fullNameInput, 'Killua Zoldyck');
      await user.type(emailInput, 'killua.zoldyck@example.com');

      await user.click(birthDateInput);
      const prevMonthBtn = screen.getByRole('button', { name: /Go to the Previous Month/i });
      await user.click(prevMonthBtn);
      const day15 = await screen.findByRole('button', { name: /15/i });
      await user.click(day15);

      await user.type(passwordInput, 'SecurePass123!');
      await user.type(confirmPasswordInput, 'SecurePass123!');

      expect(fullNameInput.value).toBe('Killua Zoldyck');
      expect(emailInput.value).toBe('killua.zoldyck@example.com');
      expect(birthDateInput.value).toBeDefined();
      expect(passwordInput.value).toBe('SecurePass123!');
      expect(confirmPasswordInput.value).toBe('SecurePass123!');
    });
  });

  describe('API Integration', () => {
    it('should show loading toast while submitting', async () => {
      render(<SignUpPage />);

      await submitFormValidData();

      expect(await screen.findByText(/Criando conta.../i)).toBeInTheDocument();
    });

    it('should successfully submit form with valid data', async () => {
      render(<SignUpPage />);

      await submitFormValidData();

      expect(await screen.findByText(/Conta criada com sucesso!/i)).toBeInTheDocument();
    });

    it('should show error message when API request fails', async () => {
      server.use(
        http.post(`${API_URL}/users`, () => {
          return HttpResponse.json({ message: 'Email já cadastrado' }, { status: 400 });
        })
      );

      render(<SignUpPage />);

      await submitFormValidData();

      expect(await screen.findByText(/Erro ao criar conta/i)).toBeInTheDocument();
    });
  });
});
