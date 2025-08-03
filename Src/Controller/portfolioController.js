import Portfolio from '../Model/Portfolio.model.js';

// // CREATE PORTFOLIO
// // export const createPortfolio = async (req, res) => {
// //   try {
// //     const {
// //       title,
// //       description,
// //       thumbnailUrl,
// //       imageUrls,
// //       category,
// //       creatorId,
// //       creator,
// //     } = req.body;

//     // Create portfolio
// //     const newPortfolio = new Portfolio({
// //       title,
// //       description,
// //       thumbnailUrl,
// //       imageUrls,
// //       category,
// //       creatorId,
// //       creator,
// //     });

// //     await newPortfolio.save();
// //     return res.status(201).json({ success: true, data: newPortfolio });
// //   } catch (error) {
// //     console.error('Create Portfolio Error:', error);
// //     return res.status(500).json({ success: false, message: 'Server Error' });
// //   }
// // };

export const createPortfolio = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      imageUrls,
      category,
      creatorId,
      creator,
      preview,
      source,
    } = req.body;

    const newPortfolio = new Portfolio({
      title,
      description,
      thumbnailUrl,
      imageUrls,
      category,
      creatorId,
      creator,
      preview, 
      source,  
    });

    await newPortfolio.save();
    return res.status(201).json({ success: true, data: newPortfolio });
  } catch (error) {
    console.error('Create Portfolio Error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// // GET ALL PORTFOLIOS
// // export const getAllPortfolios = async (req, res) => {
// //   try {
// //     const portfolios = await Portfolio.find().sort({ createdAt: -1 });
// //     return res.status(200).json({ success: true, data: portfolios });
// //   } catch (error) {
// //     console.error('Fetch All Portfolios Error:', error);
// //     return res.status(500).json({ success: false, message: 'Server Error' });
// //   }
// // };
// // GET ALL PORTFOLIOS
// export const getAllPortfolios = async (req, res) => {
//   try {
//     const portfolios = await Portfolio.find().sort({ createdAt: -1 });
//     const userId = req.user?.id; // Get user ID from token (if authenticated)

//     // Map portfolios to include isLikedByUser for the current user
//     const portfoliosWithLikeStatus = portfolios.map((portfolio) => ({
//       ...portfolio._doc,
//       isLikedByUser: userId ? portfolio.likes.includes(userId) : false,
//     }));

//     return res.status(200).json({ success: true, data: portfoliosWithLikeStatus });
//   } catch (error) {
//     console.error('Fetch All Portfolios Error:', error);
//     return res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };

// // GET SINGLE PORTFOLIO BY ID
// export const getPortfolioById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const portfolio = await Portfolio.findById(id);
//     if (!portfolio) {
//       return res.status(404).json({ success: false, message: 'Not found' });
//     }

//     const userId = req.user?.id; // Get user ID from token (if authenticated)
//     const portfolioWithLikeStatus = {
//       ...portfolio._doc,
//       isLikedByUser: userId ? portfolio.likes.includes(userId) : false,
//     };

//     return res.status(200).json({ success: true, data: portfolioWithLikeStatus });
//   } catch (error) {
//     console.error('Fetch Portfolio By ID Error:', error);
//     return res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };

// // export const getPortfolioById = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const portfolio = await Portfolio.findById(id);
// //     if (!portfolio) {
// //       return res.status(404).json({ success: false, message: 'Not found' });
// //     }
// //     return res.status(200).json({ success: true, data: portfolio });
// //   } catch (error) {
// //     console.error('Fetch Portfolio By ID Error:', error);
// //     return res.status(500).json({ success: false, message: 'Server Error' });
// //   }
// // };


// // ///////////////////////////////////

// // Like / Unlike Portfolio
// // export const toggleLike = async (req, res) => {
// //   const { userId } = req.body;
// //   const { id } = req.params;

// //   try {
// //     const portfolio = await Portfolio.findById(id);
// //     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

// //     const alreadyLiked = portfolio.likes.includes(userId);
// //     if (alreadyLiked) {
// //       portfolio.likes.pull(userId);
// //     } else {
// //       portfolio.likes.push(userId);
// //     }

// //     await portfolio.save();

// //     res.status(200).json({
// //       message: alreadyLiked ? 'Unliked' : 'Liked',
// //       likesCount: portfolio.likes.length,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: 'Failed to toggle like', error: err.message });
// //   }
// // };
// export const toggleLike = async (req, res) => {
//   const userId = req.user.id; // 🔐 Secure from token
//   const { id } = req.params;

//   try {
//     const portfolio = await Portfolio.findById(id);
//     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

//     const alreadyLiked = portfolio.likes.includes(userId);
//     if (alreadyLiked) {
//       portfolio.likes.pull(userId);
//     } else {
//       portfolio.likes.push(userId);
//     }

//     portfolio.likesCount = portfolio.likes.length; // Update likesCount
//     await portfolio.save();

//     res.status(200).json({
//       message: alreadyLiked ? 'Unliked' : 'Liked',
//       likesCount: portfolio.likesCount,
//       isLikedByUser: !alreadyLiked, // Reflect the new state
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to toggle like', error: err.message });
//   }
// };


// // Update Portfolio
// // export const updatePortfolio = async (req, res) => {
// //   const { userId } = req.body;
// //   const { id } = req.params;

// //   try {
// //     const portfolio = await Portfolio.findById(id);
// //     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

// //     if (portfolio.creatorId.toString() !== userId) {
// //       return res.status(403).json({ message: 'Unauthorized to update' });
// //     }

// //     const updated = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
// //     res.status(200).json(updated);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Update failed', error: err.message });
// //   }
// // };

// export const updatePortfolio = async (req, res) => {
//   const { userId } = req.body;
//   const { id } = req.params;

//   try {
//     const portfolio = await Portfolio.findById(id);
//     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

//     if (portfolio.creatorId.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized to update' });
//     }

//     const updated = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ message: 'Update failed', error: err.message });
//   }
// };

// // Delete Portfolio
// export const deletePortfolio = async (req, res) => {
//   const { userId } = req.body;
//   const { id } = req.params;

//   try {
//     const portfolio = await Portfolio.findById(id);
//     if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

//     if (portfolio.creatorId.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized to delete' });
//     }

//     await Portfolio.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Portfolio deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Delete failed', error: err.message });
//   }
// };

// // Increment Views
// export const incrementView = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     await Portfolio.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
//     next(); // continue to getPortfolioById
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to count view', error: err.message });
//   }
// };









import mongoose from 'mongoose';
// import Portfolio from '../Model/Portfolio.model.js';
// import User from '../Model/user.model.js';

// CREATE PORTFOLIO
// export const createPortfolio = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       thumbnailUrl,
//       imageUrls,
//       category,
//       creatorId,
//       preview,
//       source
//     } = req.body;

//     // Validate required fields
//     if (!title || !creatorId) {
//       return res.status(400).json({ success: false, message: "Title and creatorId are required" });
//     }

//     // Validate creatorId
//     if (!mongoose.Types.ObjectId.isValid(creatorId)) {
//       return res.status(400).json({ success: false, message: "Invalid creatorId" });
//     }

//     // Check if creator exists
//     const creator = await User.findById(creatorId);
//     if (!creator) {
//       return res.status(404).json({ success: false, message: "Creator not found" });
//     }
//     return console.log(creator)

//     // Create new portfolio
//     const newPortfolio = new Portfolio({
//       title,
//       description,
//       thumbnailUrl,
//       imageUrls: imageUrls || [], // Default to empty array if not provided
//       category,
//       creatorId,
//       preview,
//       source,
//       likes: [], // Explicitly set to empty array
//       likesCount: 0, // Explicitly set to 0
//       viewsCount: 0 // Explicitly set to 0
//     });

//     console.log("New Portfolio:", newPortfolio);

//     // Save portfolio
//     await newPortfolio.save();

//     // Populate creatorId for response
//     const populatedPortfolio = await Portfolio.findById(newPortfolio._id).populate({
//       path: 'creatorId',
//       select: 'name avatar' // Select name and avatar from User model
//     });

//     return res.status(201).json({ success: true, data: populatedPortfolio });
//   } catch (error) {
//     console.error("Create Portfolio Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// GET ALL PORTFOLIOS (with pagination, filtering, and like status)
export const getAllPortfolios = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, sortBy, searchQuery } = req.query;
    const query = {};
    
    // Build query filters
    if (category) query.category = category;
    if (searchQuery) query.title = { $regex: searchQuery, $options: 'i' };

    // Sort options
    const sortOptions = {
      newest: { createdAt: -1 },
      mostLiked: { likesCount: -1 },
      mostViewed: { viewsCount: -1 },
    };

    // Get portfolios with pagination
    const portfolios = await Portfolio.find(query)
      .sort(sortOptions[sortBy] || sortOptions.newest)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean(); // Convert to plain JS objects

    const userId = req.user?.id; // Get user ID if authenticated

    // Add isLikedByUser field to each portfolio
    const portfoliosWithLikeStatus = portfolios.map(portfolio => ({
      ...portfolio,
      isLikedByUser: userId 
        ? portfolio.likes.some(like => like && like.toString() === userId) 
        : false,
    }));

    // Get total count for pagination info
    const total = await Portfolio.countDocuments(query);

    return res.status(200).json({ 
      success: true, 
      data: portfoliosWithLikeStatus,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('Fetch All Portfolios Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
};

// GET SINGLE PORTFOLIO BY ID (with like status)
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id).lean(); // Convert to plain JS object
    
    if (!portfolio) {
      return res.status(404).json({ 
        success: false, 
        message: 'Portfolio not found' 
      });
    }

    const userId = req.user?.id; // Get user ID if authenticated
    
    // Add isLikedByUser field
    const portfolioWithLikeStatus = {
      ...portfolio,
      isLikedByUser: userId 
        ? portfolio.likes.some(like => like && like.toString() === userId) 
        : false,
    };

    return res.status(200).json({ 
      success: true, 
      data: portfolioWithLikeStatus 
    });
  } catch (error) {
    console.error('Fetch Portfolio By ID Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
};

// TOGGLE LIKE ON PORTFOLIO
export const toggleLike = async (req, res) => {
  try {
    // Validate inputs
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid portfolio ID" });
    }

    // Find portfolio
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Ensure likes is an array (schema default should handle this, but double-check)
    if (!Array.isArray(portfolio.likes)) {
      portfolio.likes = [];
    }

    // Clean likes array (remove invalid ObjectIds)
    portfolio.likes = portfolio.likes.filter(like =>
      mongoose.Types.ObjectId.isValid(like)
    ).map(like => new mongoose.Types.ObjectId(like));

    // Check if user has already liked the portfolio
    const userId = req.user.id; // Already an ObjectId from verifyToken
    const likeIndex = portfolio.likes.findIndex(like =>
      like.equals(userId)
    );

    // Toggle like state
    if (likeIndex >= 0) {
      portfolio.likes.splice(likeIndex, 1); // Unlike
    } else {
      portfolio.likes.push(userId); // Like
    }

    // Update likesCount and save
    portfolio.likesCount = portfolio.likes.length;
    await portfolio.save();

    console.log("Portfolio after toggle:", portfolio);

    // Respond with complete state
    res.status(200).json({
      message: likeIndex >= 0 ? "Unliked" : "Liked",
      likesCount: portfolio.likesCount,
      isLikedByUser: likeIndex < 0,
      likes: portfolio.likes // For debugging
    });
  } catch (err) {
    console.error("Like Error:", {
      error: err.message,
      userId: req.user?.id,
      portfolioId: req.params.id
    });

    res.status(500).json({
      message: "Like operation failed",
      error: err.message
    });
  }
};

// UPDATE PORTFOLIO
export const updatePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    // ✅ Use req.user.id (set by verifyToken middleware)
    if (portfolio.creatorId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update' });
    }

    const updated = await Portfolio.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update Portfolio Error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};


// DELETE PORTFOLIO
export const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id; // Assuming middleware sets req.user.id
  console.log('userId from middleware:', userId);

  try {
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    if (portfolio.creatorId._id.toString() !== userId.toString()) {
      console.log('portfolio.creatorId._id:', portfolio.creatorId._id.toString());
      console.log('userId:', userId);
      return res.status(403).json({ message: 'Unauthorized to delete' });
    }

    await Portfolio.findByIdAndDelete(id);
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (err) {
    console.error('Delete Portfolio Error:', err);
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

// INCREMENT VIEWS
export const incrementView = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Portfolio.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });
    next(); // Continue to getPortfolioById
  } catch (err) {
    console.error('Increment View Error:', err);
    res.status(500).json({ message: 'Failed to count view', error: err.message });
  }
};