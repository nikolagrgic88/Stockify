import { Router } from "express";
import * as user from "../controller/userController";
import * as validation from "../validators/userValidators";
import { authorize, verifyUserToken } from "../middleware/authMiddleware";
import { errorValidationService } from "../services/errorValidationService";

const router = Router();

router.use(verifyUserToken);

// router.get("/", user.getAllUsers); TODO: DELETE THIS ROUTE

router.post(
  "/new-user",
  validation.createUserValidation,
  errorValidationService,
  user.createUser
);

router.patch(
  "/:userId",
  validation.updateUserValidation,
  errorValidationService,
  user.updateUserById
);

router.get(
  "/:userId?",
  validation.filteringUserValidation,
  errorValidationService,
  user.getUserByFilter
);
router.delete(
  "/:userId",
  authorize(["admin", "manager"]),
  validation.userIdValidation,
  errorValidationService,
  user.deleteUserById
);
router.put(
  "/:userId/passwordUpdate",
  validation.passwordUpdateValidation,
  errorValidationService,
  user.updateUsersPassword
);
router.patch("/:userId/password-update", user.updateUsersPassword);
export default router;
