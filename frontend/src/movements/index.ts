import { fetchMovements } from "./services/api";
import { moveItemAction } from "./services/actions";
import MovementsDashboardPage from "./pages/MovementsDahboardPage";
import MovementHistoryPage from "./pages/MovementHistoryPage";
import NewMovementPage from "./pages/NewMovementPage";
import { getAllMovementsLoader } from "./services/loaders";

export {
  MovementsDashboardPage,
  MovementHistoryPage,
  NewMovementPage,
  getAllMovementsLoader,
  moveItemAction,
  fetchMovements,
};
