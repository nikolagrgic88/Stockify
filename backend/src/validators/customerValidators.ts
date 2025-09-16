import { body } from 'express-validator';

export const customerValidator = [
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('shippingAddress.streetName').trim().notEmpty().withMessage('Street name is required'),
  body('shippingAddress.streetNumber').trim().isInt({ min: 1 }).withMessage('Street number must be a positive integer'),
  body('shippingAddress.unitNumber').trim().isInt({ min: 1 }).withMessage('Unit number must be a positive integer'),
  body('shippingAddress.postCode').trim().isInt({ min: 1 }).withMessage('Post code must be a positive integer'),
  body('shippingAddress.country').trim().notEmpty().withMessage('Country is required'),
  body('shippingAddress.state').trim().notEmpty().withMessage('State is required'),
  body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
  body('phoneNumber').trim().isMobilePhone('any').withMessage('Invalid phone number'),
];
