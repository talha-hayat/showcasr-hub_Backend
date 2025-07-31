import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import User from '../Model/user.model.js';
import Portfolio from '../Model/Portfolio.model.js';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password -otp'); // Exclude sensitive fields
    if (!user) return res.status(404).json({ message: 'User not found' });

    const portfolios = await Portfolio.find({ creatorId: userId })
      .sort({ createdAt: -1 })
      .select('-__v'); // Optional: exclude version key

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || null,
      bio: user.bio || '',
      lastLogin: user.lastLogin,
      portfolios,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;