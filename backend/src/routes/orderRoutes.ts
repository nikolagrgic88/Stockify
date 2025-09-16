import { Router } from "express";
import * as orders from "../controller/orderController";
import * as validator from "../validators/orderValidators";
import { authorize, verifyUserToken } from "../middleware/authMiddleware";
const router = Router();
router.use(verifyUserToken);
router.get("/", orders.getAllOrders); //TODO DELETE THIS ROUTE
router.get("/dispatcher/:dispatcher", orders.getOrdersByDispatcher); //TODO DELETE THIS ROUTE
router.get("/", orders.getOrderByFilter);
router.post(
  "/new-order",
  // authorize(["admin", "manager"]),
  validator.createOrderValidator,
  orders.createOrder
);
router.put("/:id", validator.updateOrderValidator, orders.updateOrderById);
router.delete(
  "/:id",
  authorize(["admin", "manager"]),
  validator.orderIdValidatior,
  orders.deleteOrderById
);

export default router;
