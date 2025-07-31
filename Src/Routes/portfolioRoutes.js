import express from 'express';
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  toggleLike,
  updatePortfolio,
  deletePortfolio,
  incrementView,
} from '../Controller/portfolioController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { requireOwnership } from '../middlewares/requireOwnership.js';

const router = express.Router();

// 📌 Public routes
router.get('/', getAllPortfolios);
router.get('/:id', incrementView, getPortfolioById); // also increments views

// 🔒 Protected routes
router.post('/', verifyToken, createPortfolio);
router.post('/:id/like', verifyToken, toggleLike);
router.put('/:id', verifyToken, requireOwnership, updatePortfolio);
router.delete('/:id', verifyToken, requireOwnership, deletePortfolio);

export default router;