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
    trim: true,
    default: [] // Ensure empty array by default
  }],
  category: {
    type: String,
    trim: true
  },
  preview: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default: [] // Ensure empty array by default
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
  creator:{
    name:{
      type : String 
    },
    avatar:{
      type: String
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
portfolioSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Populate creatorId automatically in queries
portfolioSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'creatorId',
    select: 'name avatar' // Select name and avatar from User model
  });
  next();
});

const Portfolio = model("Portfolio", portfolioSchema);

export default Portfolio;