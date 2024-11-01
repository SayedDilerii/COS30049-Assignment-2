import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import AboutUsPage from "./pages/about-us/AboutUsPage.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import FeedbackPage from "./pages/feedback/FeedbackPage.tsx";
import ViewFeedbackPage from "./pages/feedback/ViewFeedbackPage.tsx";
import HelpPage from "./pages/help-center/HelpPage.tsx";
import OnBoardingPage from "./pages/onboarding/OnboardingPage.tsx";
import SandBoxPage from "./pages/sandbox/SandboxPage.tsx";
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
        element: <FeedbackPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "help-page",
        element: <HelpPage />,
      },
      {
        path: "community-feedback",
        element: <ViewFeedbackPage />,
      },
    ],
  },
  {
    path: "sandbox",
    element: <SandBoxPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
