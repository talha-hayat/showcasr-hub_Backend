import Portfolio from "../Model/Portfolio.model.js";

export const requireOwnership = async (req, res, next) => {
  try {
    // 1. Get portfolio
    const portfolio = await Portfolio.findById(req.params.id);
    // console.log(portfolio.creatorId._id)

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found." });
    }

    // 2. Make sure req.user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // 3. Check ownership
    if (portfolio.creatorId._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "You do not own this portfolio." });
    }

    // 4. User owns the portfolio
    next();
  } catch (err) {
    console.error("Ownership check error:", err);
    return res.status(500).json({ message: "Server error during ownership check." });
  }
};
