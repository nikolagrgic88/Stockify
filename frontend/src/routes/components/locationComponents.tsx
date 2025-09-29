import { lazy } from "react";

export const LocationDashboardPage = lazy(
  () => import("../../locations/pages/LocationDashboardPage")
);
export const NewLocationPage = lazy(
  () => import("../../locations/pages/NewLocationPage")
);
export const FindLocationPage = lazy(
  () => import("../../locations/pages/FindLocationPage")
);
export const LocationDetailsPage = lazy(
  () => import("../../locations/pages/LocationDetailsPage")
);
