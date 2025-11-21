import { describe, it, expect } from 'vitest';
import { render, screen } from '@test/utils';
import { LandingPage } from '../landing';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router';
import { signUpPageRoutes } from '@features/auth/routes/sign-up';

const renderWithRoutes = () => {
  return render(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path={signUpPageRoutes.SING_UP} element={<div>Sign Up Page</div>} />
    </Routes>
  );
};

describe('LandingPage', () => {
  it('should navigate to signUp page after click on cadastrar button', async () => {
    const user = userEvent.setup();
    renderWithRoutes();

    const cadastrarButton = screen.getAllByRole('button', { name: /cadastrar/i });
    await user.click(cadastrarButton[1]);

    expect(screen.getByText('Sign Up Page')).toBeInTheDocument();
  });
});
