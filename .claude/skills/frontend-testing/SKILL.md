---
name: frontend-testing
description: 'Write or update Vitest + Testing Library tests for Jenny, especially under src/**/__test__/**. Always use @test/utils render helpers (never raw RTL render) and always mock network via MSW (never client mocks). Covers routing, userEvent interactions, and store resets.'
argument-hint: '[feature|component|page]'
user-invocable: true
version: 1.0.0
---

# Frontend Testing (Jenny)

Write consistent frontend tests that match existing patterns and helpers in this repo.

## When to Use

- Adding or updating tests in `src/**/__test__/**`.
- Writing tests for forms, routes, navigation, or API behavior.
- Creating or overriding MSW handlers.

## Required Context

- Identify the component/page/hook under test and any route context.
- Check for API calls (auth, profile, payments) to decide on MSW overrides.
- Check if Zustand stores need preloading or cleanup.

## Non-negotiable rules

- Always import `render` and `renderHook` from `@test/utils`. Do not use raw RTL `render`.
- Always mock network behavior with MSW. Do not mock feature clients, axios, or fetch directly.

## Workflow

1. Use shared test helpers.
   - Import `render`, `screen`, `waitFor` from [src/test/utils.tsx](src/test/utils.tsx) instead of raw RTL render.
   - Use `renderHook` from [src/test/utils.tsx](src/test/utils.tsx) for hooks.
   - Do not import `render` from `@testing-library/react`.
   - The wrapper already includes `ThemeProvider`, `QueryClientProvider`, `MemoryRouter`, and `Toaster`.
2. Render routes and pages.
   - Wrap with `Routes`/`Route` from `react-router` when navigation is part of the test (see [src/features/landing/pages/**test**/landing.test.tsx](src/features/landing/pages/__test__/landing.test.tsx)).
   - For components that call `useNavigate`, mock it with `vi.mock('react-router', ...)` (see [src/components/pages/**test**/header.test.tsx](src/components/pages/__test__/header.test.tsx)).
3. Drive user interactions.
   - Use `const user = userEvent.setup()` and `await user.type`/`click` (see [src/features/auth/pages/**test**/log-in.test.tsx](src/features/auth/pages/__test__/log-in.test.tsx)).
   - Prefer queries by role/label: `getByRole`, `getByLabelText`, `findByText`.
4. Mock API behavior with MSW.
   - Base handlers live in [src/mocks/handlers.ts](src/mocks/handlers.ts).
   - Override within tests using `server.use(http.<method>(\`\${API_URL}/path\`, ...))` (see [src/features/auth/pages/**test**/log-in.test.tsx](src/features/auth/pages/__test__/log-in.test.tsx) and [src/features/profile/pages/**test**/profile.test.tsx](src/features/profile/pages/__test__/profile.test.tsx)).
   - The MSW server is started/reset in [src/test/setup.ts](src/test/setup.ts).
   - Do not mock API clients or axios directly.
5. Assert outcomes.
   - Use `findBy...` for async UI and toast messages.
   - Use `waitFor` when multiple async updates are expected.
6. Cleanup and state reset.
   - Reset stores as needed (auth/user) using `useAuthStore.setState` and `useUserStore.setState` inside `act` when a test changes auth state (see [src/features/auth/pages/**test**/log-in.test.tsx](src/features/auth/pages/__test__/log-in.test.tsx)).

## Patterns to Follow

- Forms: fill inputs by label; submit via button role.
- Date picker: interact via "Go to the Previous Month" and day buttons (see [src/features/auth/pages/**test**/sign-up.test.tsx](src/features/auth/pages/__test__/sign-up.test.tsx)).
- Toasts: assert visible text after submit (see [src/features/auth/pages/**test**/sign-up.test.tsx](src/features/auth/pages/__test__/sign-up.test.tsx)).
- Router pages: define a minimal route tree with `Routes` + `Route` when testing navigation.
- Test setup already mocks `matchMedia` and `ResizeObserver` in [src/test/setup.ts](src/test/setup.ts).

## References

- [src/test/utils.tsx](src/test/utils.tsx)
- [src/test/setup.ts](src/test/setup.ts)
- [src/mocks/handlers.ts](src/mocks/handlers.ts)
- [src/mocks/server.ts](src/mocks/server.ts)
- [src/features/auth/pages/**test**/log-in.test.tsx](src/features/auth/pages/__test__/log-in.test.tsx)
- [src/features/auth/pages/**test**/sign-up.test.tsx](src/features/auth/pages/__test__/sign-up.test.tsx)
- [src/features/profile/pages/**test**/profile.test.tsx](src/features/profile/pages/__test__/profile.test.tsx)
- [src/components/pages/**test**/header.test.tsx](src/components/pages/__test__/header.test.tsx)
- [src/features/landing/pages/**test**/landing.test.tsx](src/features/landing/pages/__test__/landing.test.tsx)
