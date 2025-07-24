import express from "express"
import connectDb from "./Src/Config/db.js"
import dotenv from "dotenv";
import authRoutes from "./Src/Routes/authroutes.js";
import loanRoutes  from "./Src/Routes/loanRoute.js";
import imageroutes from "./Src/Routes/image.routes.js";
import cors from "cors";
import productRoute from "./Src/Routes/product.route.js" 
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

// Connect to MongoDB
connectDb()

// Routes
app.use("/api", authRoutes);
// Loan routes
app.use("/api/loans", loanRoutes);

// upload image
// const upload = multer({ storage })
// app.post("/upload", upload.single("key"), (req, res) => {
//     try {
//         return res.status(201).json({
//             ImageUrl: req.file.path
//         })
//     } catch (error) {
//         res.status(500).status({
//             message: "Image not upload",
//             error: error.message
//         })
//     }
// })

app.use("/upload", imageroutes);

app.use("/products", productRoute);





// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
