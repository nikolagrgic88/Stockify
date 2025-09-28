import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";

import { appRoutes } from "./routes";
import ErrorPage from "./shared/pages/ErrorPage";
import { GlobalLoader } from "./shared";
import { ProtectedRoute } from "./routes/components/ProtectedRoute";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      hydrateFallbackElement: <GlobalLoader />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute requireCompany>
              <Navigate to="/home/dashboard" replace />
            </ProtectedRoute>
          ),
        },
        ...appRoutes,
      ],
    },
  ],
  {
    future: {
      v7_partialHydration: true,
    },
  }
);
