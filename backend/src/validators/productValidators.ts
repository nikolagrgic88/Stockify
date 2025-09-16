import { body, param } from "express-validator";

export const validateCreateProduct = [
  body("title")
    .trim()
    .isString()
    .notEmpty()
    .toLowerCase()
    .withMessage("Title is required!"),
  body("sku").trim().isNumeric().withMessage("SKU must be number"),
  body("size")
    .trim()
    .isString()
    .toLowerCase()
    .notEmpty()
    .withMessage("Size is required"),
  body("barcode").trim().isNumeric().withMessage("Barcode must be number"),
  body("description")
    .trim()
    .isString()
    .toLowerCase()
    .notEmpty()
    .withMessage("Description is required"),
  body("locations")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Locations must be an array if provided")
    .custom((locations) => {
      for (const location of locations) {
        if (
          typeof location.locationId !== "string" ||
          typeof location.quantity !== "number"
        ) {
          throw new Error(
            "Each location must have a valid 'locationId' (string) and 'quantity' (number)"
          );
        }
      }
      return true;
    }),
];
export const validateProductId = [
  param("productId")
    .trim()
    .notEmpty()
    .isMongoId()
    .withMessage("Product ID is required"),
];

export const validateProductUpdateData = [
  param("productId")
    .trim()
    .notEmpty()
    .isMongoId()
    .withMessage("Product ID is required"),
  body("updates.title")
    .optional()
    .trim()
    .isString()
    .notEmpty()
    .toLowerCase()
    .withMessage("Title is required!"),
  body("updates.sku")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("SKU must be number"),
  body("updates.size")
    .optional()
    .trim()
    .isString()
    .toLowerCase()
    .notEmpty()
    .withMessage("Size is required"),
  body("updates.barcode")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Barcode must be number"),
  body("updates.description")
    .optional()
    .trim()
    .isString()
    .toLowerCase()
    .notEmpty()
    .withMessage("Description is required"),
];

export const validateProductFilter = [
  body("id").optional().trim().isMongoId().withMessage("Invalid product ID"),
  body("size")
    .optional()
    .trim()
    .isString()
    .toLowerCase()
    .withMessage("Size must be a string"),
  body("title")
    .optional()
    .trim()
    .isString()
    .toLowerCase()
    .withMessage("Title must be a string"),
  body("color")
    .optional()
    .trim()
    .isString()
    .toLowerCase()
    .withMessage("Color must be a string"),
  body("location")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("Invalid location ID"),
];
