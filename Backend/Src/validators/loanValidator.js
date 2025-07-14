import { body } from 'express-validator';

export const loanValidationRules = [
  body('loanType')
    .isIn(['personal', 'business', 'education', 'auto', 'home'])
    .withMessage('Invalid loan type'),

  body('amount')
    .isInt({ min: 10000 })
    .withMessage('Amount must be at least 10,000'),

  body('tenure')
    .isInt({ min: 6, max: 60 })
    .withMessage('Tenure must be between 6 and 60 months'),

  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').isLength({ min: 10 }).withMessage('Valid phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),

  body('province')
    .isIn(['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'AJK'])
    .withMessage('Invalid province'),

  body('postalCode')
    .isPostalCode('any')
    .withMessage('Valid postal code is required'),

  body('employmentStatus')
    .isIn(['salaried', 'self-employed', 'business', 'student', 'unemployed'])
    .withMessage('Invalid employment status'),

  body('monthlyIncome')
    .isInt({ min: 5000 })
    .withMessage('Monthly income must be at least 5000'),

  body('agreeTerms')
    .equals('true')
    .withMessage('You must agree to the terms')
];
