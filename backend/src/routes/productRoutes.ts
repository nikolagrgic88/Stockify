import { Router } from "express";
import * as products from "../controller/productController";
import {
  validateCreateProduct,
  validateProductId,
  validateProductUpdateData,
  validateProductFilter,
} from "../validators/productValidators";
import { errorValidationService } from "../services/errorValidationService";
import { authorize, verifyUserToken } from "../middleware/authMiddleware";

const router = Router();
router.use(verifyUserToken);
router.get("/", products.getAllProducts);
router.get(
  "/:productId",
  validateProductId,
  errorValidationService,
  products.getProductById
);
router.post(
  "/newProduct",
  validateCreateProduct,
  errorValidationService,
  products.createProduct
);
router.post("/newProducts", products.createProducts);
router.patch(
  "/:productId/updateProduct",
  validateProductUpdateData,
  errorValidationService,
  products.updateProductDetailsById
);
router.delete(
  "/:productId/delete",
  authorize(["admin", "manager"]),
  validateProductId,
  errorValidationService,
  products.deleteProductById
);
router.get(
  "/",
  validateProductFilter,
  errorValidationService,
  products.getProductByFilter
);

export default router;
