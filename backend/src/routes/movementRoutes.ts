import { Router } from "express";
import * as movement from "../controller/movementController";
import { verifyUserToken } from "../middleware/authMiddleware";
import * as validate from "../validators/movementValidators";
// •	POST /movement – Record a product transfer from one location to another.
// •	GET /movement – Get a list of all movements.
// •	GET /movement/:id – Get a specific product movement.

const router = Router();
router.use(verifyUserToken);
router.post("/", validate.validateMovement, movement.createMovement);
router.get("/", movement.getAllMovements);
router.get(
  "/:id",
  validate.getMovementByFilterValidation,
  movement.getMovementByFilter
);

export default router;
