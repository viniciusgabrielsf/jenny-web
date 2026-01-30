import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@test/utils';
import userEvent from '@testing-library/user-event';
import { ProfilePage } from '../profile';
import { server } from '../../../../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '@/mocks/handlers';
import { useUserStore } from '@/features/auth/stores/user-store';

const mockUser = {
  id: '1',
  fullName: 'Killua Zoldyck Old',
  email: 'killua.zoldyck.old@email.com',
  birthDate: new Date('1990-01-15'),
  avatar: 'avatar-old',
};

const submitProfileFormValidData = async () => {
  const user = userEvent.setup();

  const fullNameInput = screen.getByLabelText('Nome Completo');
  const emailInput = screen.getByLabelText('Email');

  await user.clear(fullNameInput);
  await user.type(fullNameInput, 'Killua Zoldyck');

  await user.clear(emailInput);
  await user.type(emailInput, 'killua.zoldyck@email.com');

  const birthDateInput = screen.getByLabelText('Data de Nascimento') as HTMLInputElement;
  await user.click(birthDateInput);

  const day10 = await screen.findByRole('button', { name: /10/i });
  if (day10) await user.click(day10);

  const submitButton = screen.getByRole('button', { name: /atualizar perfil/i });
  await user.click(submitButton);
};

const submitPasswordFormValidData = async () => {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Senha Antiga'), 'OldPassword123!');
  await user.type(screen.getByLabelText('Nova senha'), 'NewPassword456!');

  const submitButton = screen.getByRole('button', { name: /atualizar senha/i });
  await user.click(submitButton);
};

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({ user: mockUser });
  });

  describe('Profile Update Form Validation', () => {
    it('should show error when full name is too short', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const fullNameInput = screen.getByLabelText('Nome Completo');
      const submitButton = screen.getByRole('button', { name: /atualizar perfil/i });

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Ki');
      await user.click(submitButton);

      expect(await screen.findByText(/O nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();
    });

    it('should show error when full name exceeds maximum length', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const fullNameInput = screen.getByLabelText('Nome Completo');
      const submitButton = screen.getByRole('button', { name: /atualizar perfil/i });

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'A'.repeat(101));
      await user.click(submitButton);

      expect(await screen.findByText(/O nome deve ter no máximo 100 caracteres/i)).toBeInTheDocument();
    });

    it('should show error when email is invalid', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: /atualizar perfil/i });

      await user.clear(emailInput);
      await user.type(emailInput, 'email@invalid');
      await user.click(submitButton);

      expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
    });
  });

  describe('Password Update Form Validation', () => {
    it('should show error when old password is too short', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'Pass1!');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha antiga deve ter pelo menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('should show error when old password does not contain a letter', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, '12345678!');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha antiga deve conter pelo menos uma letra/i)).toBeInTheDocument();
    });

    it('should show error when old password does not contain a number', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'Password!');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha antiga deve conter pelo menos um número/i)).toBeInTheDocument();
    });

    it('should show error when old password does not contain a symbol', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'Password123');
      await user.click(submitButton);

      expect(await screen.findByText(/A senha antiga deve conter pelo menos um símbolo/i)).toBeInTheDocument();
    });

    it('should show error when new password is too short', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const newPasswordInput = screen.getByLabelText('Nova senha');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'OldPassword123!');
      await user.type(newPasswordInput, 'New1!');
      await user.click(submitButton);

      expect(await screen.findByText(/A nova senha deve ter pelo menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('should show error when new password does not contain a letter', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const newPasswordInput = screen.getByLabelText('Nova senha');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'OldPassword123!');
      await user.type(newPasswordInput, '12345678!');
      await user.click(submitButton);

      expect(await screen.findByText(/A nova senha deve conter pelo menos uma letra/i)).toBeInTheDocument();
    });

    it('should show error when new password does not contain a number', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const newPasswordInput = screen.getByLabelText('Nova senha');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'OldPassword123!');
      await user.type(newPasswordInput, 'NewPassword!');
      await user.click(submitButton);

      expect(await screen.findByText(/A nova senha deve conter pelo menos um número/i)).toBeInTheDocument();
    });

    it('should show error when new password does not contain a symbol', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const newPasswordInput = screen.getByLabelText('Nova senha');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'OldPassword123!');
      await user.type(newPasswordInput, 'NewPassword123');
      await user.click(submitButton);

      expect(await screen.findByText(/A nova senha deve conter pelo menos um símbolo/i)).toBeInTheDocument();
    });

    it('should show error when new password is the same as old password', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga');
      const newPasswordInput = screen.getByLabelText('Nova senha');
      const submitButton = screen.getByRole('button', { name: /atualizar senha/i });

      await user.type(oldPasswordInput, 'SamePassword123!');
      await user.type(newPasswordInput, 'SamePassword123!');
      await user.click(submitButton);

      expect(await screen.findByText(/A nova senha precisa ser diferente da antiga/i)).toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should toggle old password visibility when clicking eye icon', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga') as HTMLInputElement;
      const passwordToggleButtons = screen.getAllByRole('button', { name: /mostrar senha|esconder senha/i });

      expect(oldPasswordInput.type).toBe('password');

      await user.click(passwordToggleButtons[0]);
      expect(oldPasswordInput.type).toBe('text');

      await user.click(passwordToggleButtons[0]);
      expect(oldPasswordInput.type).toBe('password');
    });

    it('should toggle new password visibility when clicking eye icon', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const newPasswordInput = screen.getByLabelText('Nova senha') as HTMLInputElement;
      const passwordToggleButtons = screen.getAllByRole('button', { name: /mostrar senha|esconder senha/i });

      expect(newPasswordInput.type).toBe('password');

      await user.click(passwordToggleButtons[1]);
      expect(newPasswordInput.type).toBe('text');

      await user.click(passwordToggleButtons[1]);
      expect(newPasswordInput.type).toBe('password');
    });

    it('should allow user to fill all profile form fields', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const fullNameInput = screen.getByLabelText('Nome Completo') as HTMLInputElement;
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
      const birthDateInput = screen.getByLabelText('Data de Nascimento') as HTMLInputElement;

      await user.clear(fullNameInput);
      await user.type(fullNameInput, 'Leorio Paradinight');
      await user.clear(emailInput);
      await user.type(emailInput, 'leorio.paradinight@email.com');
      await user.click(birthDateInput);
      await waitFor(() => {
        const day15 = screen.getByRole('button', { name: /15/i });
        if (day15) user.click(day15);
      });

      expect(fullNameInput.value).toBe('Leorio Paradinight');
      expect(emailInput.value).toBe('leorio.paradinight@email.com');
      expect(birthDateInput.value).toBeDefined();
    });

    it('should allow user to fill all password form fields', async () => {
      const user = userEvent.setup();
      render(<ProfilePage />);

      const oldPasswordInput = screen.getByLabelText('Senha Antiga') as HTMLInputElement;
      const newPasswordInput = screen.getByLabelText('Nova senha') as HTMLInputElement;

      await user.type(oldPasswordInput, 'OldPassword123!');
      await user.type(newPasswordInput, 'NewPassword456!');

      expect(oldPasswordInput.value).toBe('OldPassword123!');
      expect(newPasswordInput.value).toBe('NewPassword456!');
    });

    it('should load user data in the profile form', async () => {
      render(<ProfilePage />);

      const fullNameInput = screen.getByLabelText('Nome Completo') as HTMLInputElement;
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement;

      expect(fullNameInput.value).toBe(mockUser.fullName);
      expect(emailInput.value).toBe(mockUser.email);
    });
  });

  describe('Profile Update API Integration', () => {
    it('should successfully submit profile form with valid data', async () => {
      render(<ProfilePage />);

      await submitProfileFormValidData();

      expect(await screen.findByText(/Perfil atualizado com sucesso!/i)).toBeInTheDocument();
    });

    it('should show error message when profile update API request fails', async () => {
      server.use(
        http.patch(`${API_URL}/users/me`, () => {
          return HttpResponse.json({ message: 'Erro ao atualizar perfil' }, { status: 400 });
        })
      );

      render(<ProfilePage />);

      await submitProfileFormValidData();

      expect(await screen.findByText(/Erro ao atualizar perfil/i)).toBeInTheDocument();
    });

    it('should show loading toast while submitting profile form', async () => {
      render(<ProfilePage />);

      await submitProfileFormValidData();

      expect(await screen.findByText(/Atualizando perfil.../i)).toBeInTheDocument();
      expect(await screen.findByText(/Perfil atualizado com sucesso!/i)).toBeInTheDocument();
    });
  });

  describe('Password Update API Integration', () => {
    it('should successfully submit password form with valid data', async () => {
      render(<ProfilePage />);

      await submitPasswordFormValidData();

      expect(await screen.findByText(/Senha atualizada com sucesso!/i)).toBeInTheDocument();
    });

    it('should show error message when password update API request fails', async () => {
      server.use(
        http.patch(`${API_URL}/users/me/password`, () => {
          return HttpResponse.json({ message: 'Senha antiga incorreta' }, { status: 400 });
        })
      );

      render(<ProfilePage />);

      await submitPasswordFormValidData();

      expect(await screen.findByText(/Erro ao atualizar senha/i)).toBeInTheDocument();
    });

    it('should show loading toast while submitting password form', async () => {
      render(<ProfilePage />);

      await submitPasswordFormValidData();

      expect(await screen.findByText(/Atualizando senha.../i)).toBeInTheDocument();
      expect(await screen.findByText(/Senha atualizada com sucesso!/i)).toBeInTheDocument();
    });
  });
});
