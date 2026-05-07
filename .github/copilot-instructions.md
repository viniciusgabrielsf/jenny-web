# Jenny Frontend Instructions (Copilot + Claude)

## Product context

- Jenny is a web app that helps young adults manage their finances.
- Primary platforms are mobile and desktop browsers.
- UX should be clear, calm, and fast, with accessible defaults.

## Stack overview

- React 19 + TypeScript + Vite
- React Router for routing
- TanStack Query for server state
- Axios with interceptors for API access
- Zustand for auth and user state
- React Hook Form + Zod for forms and validation
- Tailwind CSS v4 + shadcn UI style components + Radix primitives
- Sonner for toasts, next-themes for theming
- Vitest + Testing Library for tests

## Build and test commands

- `npm run dev`: start Vite dev server (port from `VITE_PORT`, default 7000).
- `npm run build`: run `tsc -b` and build to the public directory.
- `npm run lint`: run ESLint.
- `npm run test`: run Vitest with coverage.
- `npm run preview`: preview the production build.

## Architecture (key files)

- App wiring lives in [src/App.tsx](src/App.tsx) (`QueryClient`, `ThemeProvider`, `Router`, `Toaster`).
- Entry point is [src/main.tsx](src/main.tsx).
- Router config is in [src/routes/browser-router.tsx](src/routes/browser-router.tsx) with arrays in [src/routes/public-routes.ts](src/routes/public-routes.ts) and [src/routes/protected-routes.ts](src/routes/protected-routes.ts).
- Feature structure is src/features/<feature>/ with api, components, hooks, helpers (schemas), pages, routes, stores.
- Shared UI primitives live in shared components; see [src/components/button.tsx](src/components/button.tsx) and [src/components/field.tsx](src/components/field.tsx).
- API client and interceptors are in [src/api/client.ts](src/api/client.ts), [src/api/auth-interceptor.ts](src/api/auth-interceptor.ts), and [src/api/error-interceptor.ts](src/api/error-interceptor.ts).
- Utilities live in [src/lib/utils.ts](src/lib/utils.ts).
- Shared hooks live in [src/hooks/use-media-query.ts](src/hooks/use-media-query.ts).
- Test setup is in [src/test/setup.ts](src/test/setup.ts); feature tests live in **test** folders such as [src/features/landing/pages/**test**/landing.test.tsx](src/features/landing/pages/__test__/landing.test.tsx).

## Conventions and patterns

- Use path aliases: `@`, `@features`, `@components`, `@api`, `@lib`, `@routes`, `@assets`, `@test`.
- Keep pages thin; move side effects and data fetching into feature hooks.
- Prefer shared UI components (Button, Input, Field, Card, Page) over custom one-offs.
- Keep UI copy in pt-BR unless a new locale is explicitly added.

## Package usage notes

- react-router: keep route constants in feature route files and redirect with `Navigate`.
- @tanstack/react-query: prefer feature scoped query keys and one shared `QueryClient` instance.
- axios: use apiClient and feature clients; do not create ad hoc instances.
- zustand: use selectors for reads and getState() outside React components only.
- react-hook-form + zod: keep schemas in helpers and infer types from schemas.
- radix-ui and shadcn components: use shared wrappers (see [src/components/button.tsx](src/components/button.tsx) and [src/components/field.tsx](src/components/field.tsx)).
- react-day-picker: use the `Calendar` wrapper in [src/components/calendar.tsx](src/components/calendar.tsx).
- sonner: use `toast.loading` + `toast.dismiss` with stable ids for async actions (see [src/components/sonner.tsx](src/components/sonner.tsx)).
- next-themes: keep theme logic inside [src/components/theme-provider.tsx](src/components/theme-provider.tsx) and use [src/components/mode-toggler.tsx](src/components/mode-toggler.tsx).
- moment: keep API format as `YYYY-MM-DD` and display format as `DD/MM/YYYY`.
- lucide-react and @phosphor-icons/react: keep icon sizes and weights consistent in a view.

## Routing rules

- The root router uses `authLoader` from [src/features/auth/loaders/auth-loader.ts](src/features/auth/loaders/auth-loader.ts) in [src/routes/browser-router.tsx](src/routes/browser-router.tsx).
- Public and protected gating lives in [src/features/auth/components/public-routes.tsx](src/features/auth/components/public-routes.tsx) and [src/features/auth/components/protected-routes.tsx](src/features/auth/components/protected-routes.tsx).
- Add new routes to feature route files and then to [src/routes/public-routes.ts](src/routes/public-routes.ts) or [src/routes/protected-routes.ts](src/routes/protected-routes.ts).

## Data and state

- Use TanStack Query for server state (queries and mutations).
- Keep query keys stable and scoped by feature and params.
- Use feature clients instead of raw axios: [src/features/auth/api/auth-client.ts](src/features/auth/api/auth-client.ts), [src/features/auth/api/user-client.ts](src/features/auth/api/user-client.ts), [src/features/profile/api/profile-client.ts](src/features/profile/api/profile-client.ts), [src/features/payments/api/payments-client.ts](src/features/payments/api/payments-client.ts).
- Do not bypass [src/api/client.ts](src/api/client.ts); interceptors handle refresh and error shaping.
- Use Zustand stores for auth and user data (see [src/features/auth/stores/auth-store.ts](src/features/auth/stores/auth-store.ts) and [src/features/auth/stores/user-store.ts](src/features/auth/stores/user-store.ts)); call `getState()` outside React components.

## Forms and validation

- Use react-hook-form with `zodResolver`.
- Use `Controller` for custom inputs (see [src/components/fields/birth-date-picker.tsx](src/components/fields/birth-date-picker.tsx) and [src/components/fields/password-input.tsx](src/components/fields/password-input.tsx)).
- Use `Field`, `FieldLabel`, `FieldError` for consistent a11y and error display (see [src/components/field.tsx](src/components/field.tsx)).
- Always set `aria-invalid` and label associations for inputs.

## UI, theming, and styling

- Tailwind v4 tokens are defined in [src/index.css](src/index.css) (CSS variables + @theme inline).
- Use `cn()` to merge class names (see [src/lib/utils.ts](src/lib/utils.ts)) and `cva()` for variants.
- Prefer Radix primitives wrapped in shared components (see [src/components/dialog.tsx](src/components/dialog.tsx)).
- Theme is controlled by [src/components/theme-provider.tsx](src/components/theme-provider.tsx); keep `Toaster` inside it (see [src/components/sonner.tsx](src/components/sonner.tsx)).
- Prefer phospor icons for UI consistency, but lucide-react is also available; keep icon sizes and weights consistent in a view.
- prefer shadcn components for common patterns, but customize with Tailwind as needed; avoid one-off custom components when a shared component can be adapted, ask if needed to add a new component so we can add a shadcn one.

## Dates and formatting

- Current code uses moment in pages and hooks.
- Keep API date format as `YYYY-MM-DD`.
- Avoid adding another date library; reuse existing utilities.

## Testing

- Use Vitest + Testing Library.
- Keep tests close to features in **test** folders (see [src/features/landing/pages/**test**/landing.test.tsx](src/features/landing/pages/__test__/landing.test.tsx)).
- MSW is configured in [src/test/setup.ts](src/test/setup.ts) for API mocking.
- Add tests for new pages and critical flows when possible.

## Mobile and responsive behavior

- Design for small screens first; validate layouts at 320px+.
- Avoid fixed widths; prefer responsive Tailwind classes and fluid layouts.
- Ensure touch targets are at least 44px when possible.

## Environment variables (runtime)

- `VITE_PORT` and `VITE_API` for local dev server and proxy (see [vite.config.ts](vite.config.ts)).
- `VITE_API_URL` and `VITE_TIMEOUT` for apiClient configuration (see [src/api/client.ts](src/api/client.ts)).

## Project references

- Design direction lives in [.impeccable.md](.impeccable.md).
- shadcn config and aliases live in [components.json](components.json).
- Vite aliases and React Compiler plugin are configured in [vite.config.ts](vite.config.ts).

## Pitfalls and gotchas

- React Compiler is enabled via `babel-plugin-react-compiler` in [vite.config.ts](vite.config.ts); expect a dev perf trade-off.
- Build output goes to the `public` directory (see [vite.config.ts](vite.config.ts)); avoid assuming `dist`.
- All HTTP calls should use [src/api/client.ts](src/api/client.ts) to preserve refresh and error behavior.
- Both moment and date-fns are installed; avoid adding a third date library and consider consolidating later.
