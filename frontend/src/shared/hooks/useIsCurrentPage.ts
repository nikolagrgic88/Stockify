import { useLocation } from "react-router";

export const useIsCurrentPage = (pathName: string) =>
  useLocation().pathname === pathName;
