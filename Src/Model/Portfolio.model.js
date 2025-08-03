import { model, Schema } from "mongoose";

const portfolioSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  imageUrls: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: [] // Ensure likes is an empty array by default
  }],
  likesCount: {
    type: Number,
    default: 0 // Default to 0 for new portfolios
  },
  viewsCount: {
    type: Number,
    default: 0 // Default to 0 for views
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Portfolio = model("Portfolio", portfolioSchema);

export default Portfolio;