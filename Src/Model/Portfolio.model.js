// import mongoose from 'mongoose';

// // const PortfolioSchema = new mongoose.Schema(
// //     {
// //         title: {
// //             type: String,
// //             required: true,
// //             trim: true,
// //         },
// //         description: {
// //             type: String,
// //             trim: true,
// //         },
// //         thumbnailUrl: {
// //             type: String,
// //             required: true,
// //         },
// //         imageUrls: {
// //             type: [String],
// //             default: [],
// //         },
// //         category: {
// //             type: String,
// //             required: true,
// //         },
// //         creatorId: {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: 'User',
// //             required: true,
// //         },
// //         creator: {
// //             name: {
// //                 type: String,
// //                 required: true,
// //             },
// //             avatar: {
// //                 type: String,
// //                 default: '/placeholder.svg',
// //             },
// //         },
// //         likesCount: {
// //             type: Number,
// //             default: 0,
// //         },
// //         viewsCount: {
// //             type: Number,
// //             default: 0,
// //         },
// //         isLikedByUser: {
// //             type: Boolean,
// //             default: false,
// //         },
// //         likes: [{
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref: 'User',
// //         }],
// //         viewsCount: {
// //             type: Number,
// //             default: 0,
// //         },
// //         preview: {
// //             type: String,
// //             trim: true,
// //         },
// //         source: {
// //             type: String,
// //             trim: true,
// //         },
// //     },
// //     {
// //         timestamps: true, // adds createdAt & updatedAt
// //     }
// // );

// const PortfolioSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     description: { type: String, trim: true },
//     thumbnailUrl: { type: String, required: true },
//     imageUrls: { type: [String], default: [] },
//     category: { type: String, required: true },
//     creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     creator: {
//       name: { type: String, required: true },
//       avatar: { type: String, default: '/placeholder.svg' },
//     },
//     likesCount: { type: Number, default: 0 }, // optional, for performance
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     viewsCount: { type: Number, default: 0 }, // Keep only one
//     isLikedByUser: { type: Boolean, default: false },
//     preview: { type: String, trim: true },
//     source: { type: String, trim: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);


import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    thumbnailUrl: { type: String, required: true },
    imageUrls: { type: [String], default: [] },
    category: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creator: {
      name: { type: String, required: true },
      avatar: { type: String, default: '/placeholder.svg' },
    },
    likesCount: { type: Number, default: 0 },
     likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true // Ensure user ID is required
    }],
    viewsCount: { type: Number, default: 0 },
    preview: { type: String, trim: true },
    source: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);