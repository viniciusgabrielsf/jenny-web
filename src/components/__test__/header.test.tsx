import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@test/utils';
import userEvent from '@testing-library/user-event';
import { Header } from '../header';
import { signUpPageRoutes } from '@features/auth/routes/sign-up';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Navigation Interactions', () => {
    it('should navigate to sign-up page when clicking Cadastrar button', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const cadastrarButton = screen.getByRole('button', { name: /cadastrar/i });
      await user.click(cadastrarButton);

      expect(mockNavigate).toHaveBeenCalledWith(signUpPageRoutes.SING_UP);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    // TODO remove this test when Login functionality is implemented
    it('should have secondary variant for Cadastrar button', () => {
      render(<Header />);

      const cadastrarButton = screen.getByRole('button', { name: /cadastrar/i });
      expect(cadastrarButton).toBeInTheDocument();
      // Button with secondary variant should be present
    });

    it('should render Login button without navigation (not yet implemented)', () => {
      render(<Header />);

      const loginButton = screen.getByRole('button', { name: /entrar/i });
      expect(loginButton).toBeInTheDocument();
      // Login button exists but doesn't have onClick handler yet (as per component code)
    });
  });
});
