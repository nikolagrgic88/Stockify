import { body, param } from "express-validator";

export const validateMovement = [
  body("itemsMoved")
    .isArray()
    .isLength({ min: 1 })
    .withMessage("Item is required"),
  body("fromLocation").notEmpty().withMessage("From location is required"),
  body("toLocation").notEmpty().withMessage("To location is required"),
  body("timestamp")
    .isISO8601()
    .toDate()
    .withMessage("Timestamp must be a valid date"),
  body("user").isMongoId().withMessage("User is required"),
];
export const idValidation = [param("id").isMongoId().withMessage("Invalid ID")];

export const getMovementByFilterValidation = [
  param("id").optional().isMongoId().withMessage("Invalid ID"),
  body("fromLocationId")
    .optional()
    .isMongoId()
    .withMessage("Invalid fromLocationId"),
  body("toLocationId")
    .optional()
    .isMongoId()
    .withMessage("Invalid toLocationId"),
  body("userId").optional().isMongoId().withMessage("Invalid userId"),
  body("startTime").optional().isISO8601().withMessage("Invalid startTime"),
  body("endTime").optional().isISO8601().withMessage("Invalid endTime"),
  body("quantity").optional().isInt({ min: 0 }).withMessage("Invalid quantity"),
  body("quantityMoreThan")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid quantityMoreThan"),
  body("quantityLessThan")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid quantityLessThan"),
  body("quantityMoreAndEqual")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid quantityMoreAndEqual"),
  body("quantityLessAndEqual")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid quantityLessAndEqual"),
];
