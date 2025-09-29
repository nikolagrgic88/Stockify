import { lazy } from "react";

export const MovementsDashboardPage = lazy(
    () => import("../../movements/pages/MovementsDahboardPage")
);

export const MovementHistoryPage = lazy(
    () => import("../../movements/pages/MovementHistoryPage")
);

export const NewMovementPage = lazy(
    () => import("../../movements/pages/NewMovementPage")
);