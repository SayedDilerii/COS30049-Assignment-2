import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import OnBoardingPage from "./pages/onboarding/OnboardingPage.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import HelpPage from "./pages/help-center/HelpPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "onboarding",
        element: <OnBoardingPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <div>settings</div>,
      },
      {
        path: "feedback",
        element: <div>feedback</div>,
      },
      {
        path: "data-policy",
        element: <div>data policy</div>,
      },
      {
        path: "help-page",
        element: <HelpPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
