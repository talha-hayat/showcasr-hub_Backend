import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { loanValidationRules } from '../validators/loanValidator.js';
import { validationResult } from 'express-validator';
import {
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoanStatus,
  deleteLoan
} from '../controllers/loanController.js';

const router = express.Router();

// Create Loan (User)
router.post(
  '/',
  protect,
  loanValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createLoan
);

// Get all loans (Admin only)
router.get('/', protect, adminOnly, getAllLoans);

// Get single loan by ID (Admin only)
router.get('/:id', protect, adminOnly, getLoanById);

// Update loan status (Admin only)
router.put('/:id/status', protect, adminOnly, updateLoanStatus);

// Delete loan (Admin only)
router.delete('/:id', protect, adminOnly, deleteLoan);

export default router;
