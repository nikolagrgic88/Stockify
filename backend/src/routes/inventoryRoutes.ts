import { Router } from "express";
import * as inventory from "../controller/inventoryController";
import { authorize, verifyUserToken } from "../middleware/authMiddleware";
const router = Router();

router.use(verifyUserToken);
router.get("/all", inventory.getAllInventory);
router.get("/:locationId", inventory.getInventoryById);
router.post("/add-inventory/:locationId", inventory.addOrUpdateInventory);
router.put("/update/:locationId", inventory.updateInventoryById);
router.delete(
  "/delete/:locationId",
  authorize(["admin", "manager"]),
  inventory.deleteInventoryById
);
router.delete(
  "/:locationId/delete-product/:productId",
  authorize(["admin", "manager"]),
  inventory.deleteProductFromInventory
);

export default router;
