import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import OnBoarding from "./pages/onboarding/Onboarding.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";

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
        element: <SettingsPage />,
      },
      {
        path: "feedback",
        element: <div>feedback</div>,
      },
      {
        path: "data-policy",
        element: <div>data policy</div>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
