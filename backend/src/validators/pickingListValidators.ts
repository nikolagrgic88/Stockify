import { body } from "express-validator";

export const validateCreatePickingList = [
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required!")
    .isNumeric()
    .withMessage("Quantity must be a number!"),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required!")
    .isIn(["unassigned", "assigned", "inProgress", "completed"])
    .withMessage(
      "Status must be one of 'unassigned', 'assigned', 'inProgress', or 'completed'!"
    ),
  body("staffId")
    .trim()
    .notEmpty()
    .withMessage("Staff ID is required!")
    .isMongoId()
    .withMessage("Staff ID must be a valid MongoDB ObjectId!"),
  body("listItems")
    .isArray({ min: 1 })
    .withMessage("List items must be an array with at least one item!"),
  body("listItems.*.locationId")
    .trim()
    .notEmpty()
    .withMessage("Location ID is required for each list item!")
    .isMongoId()
    .withMessage("Location ID must be a valid MongoDB ObjectId!"),
  body("listItems.*.description")
    .trim()
    .notEmpty()
    .withMessage("Description is required for each list item!"),
  body("listItems.*.quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required for each list item!")
    .isNumeric()
    .withMessage("Quantity must be a number for each list item!"),
];

export const validateCreateCombinedPickingList = [
  body("priority")
    .trim()
    .notEmpty()
    .withMessage("Priority is required!")
    .isIn(["High", "Low", "Medium"])
    .withMessage("Priority must be one of 'low', 'medium' or 'high'!"),
  body("assignTo")
    .trim()
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Staff ID must be a valid MongoDB ObjectId!"),
  body("orders")
    .isArray({ min: 1 })
    .withMessage("List items must be an array with at least one item!"),
  body("orders.*")
    .trim()
    .notEmpty()
    .withMessage("Each list item is required!")
    .isMongoId()
    .withMessage("Each list item must be a valid MongoDB ObjectId!"),
  body("notes")
    .trim()
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Notes must be a string"),
];
