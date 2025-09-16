import { body, param, query } from "express-validator";

export const createOrderValidator = [
  body("items").isArray().withMessage("Items must be an array"),
  body("items.*.itemId").isMongoId().withMessage("Invalid product ID"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("customer.email").trim().isEmail().withMessage("Invalid email address"),
  body("customer.shippingAddress")
    .notEmpty()
    .withMessage("Shipping address is required"),
  body("customer.shippingAddress.streetName")
    .notEmpty()
    .withMessage("Street name is required"),
  body("customer.shippingAddress.streetNumber")
    .isNumeric()
    .withMessage("Street number must be a number"),
  body("customer.shippingAddress.unitNumber")
    .isNumeric()
    .withMessage("Unit number must be a number"),
  body("customer.shippingAddress.postCode")
    .isNumeric()
    .withMessage("Post code must be a number"),
  body("customer.shippingAddress.country")
    .notEmpty()
    .withMessage("Country is required"),
  body("customer.shippingAddress.state")
    .notEmpty()
    .withMessage("State is required"),
  body("customer.shippingAddress.city")
    .notEmpty()
    .withMessage("City is required"),
  body("customer.phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
  body("orderStatus")
    .trim()
    .isIn(["pending", "packing", "picked", "shipped", "fulfilled"])
    .withMessage("Invalid order status"),
  body("dispatcher")
    .trim()
    .isIn(["auspost", "startrack", "tollgroup", "couriersplease", "aramex"])
    .withMessage("Invalid dispatcher"),
];

export const updateOrderValidator = [
  param("id").isMongoId().withMessage("Invalid order ID"),
  body("orderStatus")
    .trim()
    .isIn(["pending", "packing", "picked", "shipped", "fulfilled"])
    .withMessage("Invalid order status"),
  body("dispatcher")
    .trim()
    .isIn(["auspost", "startrack", "tollgroup", "couriersplease", "aramex"])
    .withMessage("Invalid dispatcher"),
];

export const getOrderByFilterValidator = [
  query("customerId").optional().isMongoId().withMessage("Invalid customer ID"),
  query("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Invalid email address"),
  query("orderStatus")
    .optional()
    .trim()
    .notEmpty()
    .isIn(["pending", "packing", "picked", "shipped", "fulfilled"])
    .withMessage("Invalid order status"),
  query("dispatcher")
    .optional()
    .trim()
    .notEmpty()
    .isIn(["auspost", "startrack", "tollgroup", "couriersplease", "aramex"])
    .withMessage("Invalid dispatcher"),
  query("dateCreated").optional().isDate().withMessage("Invalid date"),
  query("createdAfter").optional().isDate().withMessage("Invalid date"),
  query("createdBefore").optional().isDate().withMessage("Invalid date"),
];
export const orderIdValidatior = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];
