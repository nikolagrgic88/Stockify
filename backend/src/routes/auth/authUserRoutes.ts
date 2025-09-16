import { Router } from "express";
import * as auth from "../../controller/authUserController";
import {
  verifyCompanyToken,
  verifyUserToken,
} from "../../middleware/authMiddleware";
import { userIdValidation } from "../../validators/userValidators";

const router = Router();

router.post("/login", verifyCompanyToken, auth.postUserLogin);

router.use(verifyUserToken);

router.post("/logout", auth.postUserLogout);
router.post("/current-user", userIdValidation, auth.getCurrentUser);

export default router;
