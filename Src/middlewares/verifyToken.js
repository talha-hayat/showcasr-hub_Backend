import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return console.log("error")
    return res.status(401).json({ message: 'Unauthorized' });
  }


  const token = authHeader.split(' ')[1];

  
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    // Convert to ObjectId immediately
    req.user = {
      ...decoded,
      id: new mongoose.Types.ObjectId(decoded.userId) // Ensure proper ObjectId
    };
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: 'Invalid token',
      error: error.message 
    });
  }
};