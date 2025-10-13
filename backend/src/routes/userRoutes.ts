import { Router } from "express";
import * as user from "../controller/userController";
import * as validation from "../validators/userValidators";
import { authorize, verifyUserToken } from "../middleware/authMiddleware";
import { errorValidationService } from "../services/errorValidationService";

const router = Router();

// router.get("/", user.getAllUsers); TODO: DELETE THIS ROUTE
router.put(
  "/:userId/passwordUpdate",
  validation.passwordUpdateValidation,
  errorValidationService,
  user.updateUsersPassword
);
router.use(verifyUserToken);
router.post(
  "/new-user",
  authorize(["admin", "manager"]),
  validation.createUserValidation,
  errorValidationService,
  user.createUser
);

router.patch(
  "/:userId",
  authorize(["admin", "manager"]),
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

router.patch("/:userId/password-update", user.updateUsersPassword);
export default router;
