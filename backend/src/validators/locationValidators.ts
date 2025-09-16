import { body } from "express-validator";

export const validateLocation = [
  body("name")
    .optional()
    .trim()
    .isString()
    .withMessage("Name must be a string"),
  body("aisle")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Aisle is required and must be a string"),
  body("section")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Section is required and must be a string"),
  body("sectionNumber")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Section number is required and must be an integer"),
  body("column")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Column is required and must be a string"),
  body("row")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Row is required and must be an integer"),
  body("products").trim().isArray().withMessage("Products must be an array"),
  body("products.*.productId")
    .trim()
    .notEmpty()
    .isMongoId()
    .withMessage("Product ID is required and must be a valid Mongo ID"),
  body("products.*.quantity")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Quantity is required and must be an integer"),
  body("index")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Index is required and must be an integer"),
];

export const validateNewLocation = [
  body("aisle")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Aisle is required and must be a string"),
  body("section")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Section is required and must be a string"),
  body("sectionNumber")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Section number is required and must be an integer"),
  body("column")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Column is required and must be a string"),
  body("row")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Row is required and must be an integer"),
];
