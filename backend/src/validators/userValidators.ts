import { body, param, query } from "express-validator";

export const createUserValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .isAlpha()
    .withMessage("First name should contain only letters")
    .toLowerCase(),
  body("lastName")
    .trim()
    .notEmpty()
    .matches(/^[A-Za-z]+$/)
    .toLowerCase()
    .withMessage("Last name is required and should contain only letters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is requried")
    .toLowerCase()
    .isEmail()
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("position")
    .trim()
    .notEmpty()
    .toLowerCase()
    .withMessage("Position must be provided"),
  body("userName")
    .optional()
    .trim()
    .notEmpty()
    .toLowerCase()
    .withMessage("Username is required"),
  body("auth")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["admin", "manager", "staff"])
    .withMessage("Invalid authorization role"),
  body("phoneNumber")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
  body("isActive")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["true", "false"])
    .withMessage("Invalid activity level"),
];

export const userIdValidation = [
  param("userId")
    .trim()
    .toLowerCase()
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
];

export const updateUserValidation = [
  param("userId")
    .trim()
    .toLowerCase()
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .matches(/^[A-Za-z]+$/)
    .toLowerCase()
    .withMessage("First name is required and should contain only letters"),
  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .matches(/^[A-Za-z]+$/)
    .toLowerCase()
    .withMessage("Last name is required and should contain only letters"),
  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Email is invalid")
    .normalizeEmail({
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
    }),
  body("auth")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["admin", "manager", "staff"])
    .withMessage("Invalid authorization role"),
  body("phoneNumber")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
];

export const passwordUpdateValidation = [
  param("userId")
    .trim()
    .toLowerCase()
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const filteringUserValidation = [
  param("userId")
    .optional()
    .trim()
    .toLowerCase()
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
  query("auth")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["admin", "manager", "staff"])
    .withMessage("Invalid authorization role"),
  query("isActive")
    .optional()
    .trim()
    .toLowerCase()
    .isBoolean()
    .withMessage("isActive must be a boolean value"),
  query("createdafter")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("createdafter must be a valid date"),
  query("createdbefore")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("createdbefore must be a valid date"),
  query("updatedafter")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("updatedafter must be a valid date"),
  query("updatedbefore")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("updatedbefore must be a valid date"),
  query("position")
    .optional()
    .trim()
    .isString()
    .toLowerCase()
    .withMessage("Position must be a string"),
];
