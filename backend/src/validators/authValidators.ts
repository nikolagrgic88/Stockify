import { body } from "express-validator"

export const userAuthValidator = [
    body('email').trim().isEmail().toLowerCase().withMessage('Invalid email address'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

export const companyAuthValidator = [
    body('companyId').trim().isLength({ min: 6 }).toLowerCase().withMessage('Company ID must be at least 6 characters long'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]