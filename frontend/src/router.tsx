import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";

import { appRoutes } from "./routes";
import ErrorPage from "./shared/pages/ErrorPage";
import { GlobalLoader } from "./shared";

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
          element: <Navigate to="/home/dashboard" replace />,
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
