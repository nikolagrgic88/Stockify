

import { Router } from "express";
import * as auth from "../../controller/authCompanyController";
import { companyAuthValidator } from "../../validators/authValidators";

import { verifyCompanyToken } from "../../middleware/authMiddleware";
// import { csrfProtection } from "../../middleware/authMiddleware";

const router = Router();
router.post("/update-company-password", auth.updateCompanyPassword);
router.use(companyAuthValidator);

router.post("/", auth.postCompanyLogin);
router.post("/new", auth.createCompany);
// router.post("/logout", auth.postUserLogout);

// router.post("/register", auth.postRegisterUser);

router.get("/me", verifyCompanyToken, auth.getCurrentUser);

export default router;
