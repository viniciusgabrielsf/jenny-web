import { LandingPage } from "../pages/landing";

export const landingPageRoutes = {
  LANDING: "/landing",
};

export const landingRoutes = [
  {
    path: landingPageRoutes.LANDING,
    element: <LandingPage />,
  },
];
