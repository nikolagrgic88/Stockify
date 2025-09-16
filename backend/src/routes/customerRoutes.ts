import { Router } from "express";
import * as customer from "../controller/customerController";
import { customerValidator } from "../validators/customerValidators";
import { verifyUserToken } from "../middleware/authMiddleware";
const router = Router();
router.use(verifyUserToken);
router.post("/newCustomer", customerValidator, customer.createCustomer);

export default router;
