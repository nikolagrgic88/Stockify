import { Router } from "express";
import { getDashboardStats } from "../controller/dashboardController";
import { verifyUserToken } from "../middleware/authMiddleware";

const router = Router();
router.use(verifyUserToken);
router.get("/", getDashboardStats);

export default router;
