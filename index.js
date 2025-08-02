import express from "express";
import connectDb from "./Src/Config/db.js";
import dotenv from "dotenv";
import authRoutes from "./Src/Routes/authroutes.js";
import imageroutes from "./Src/Routes/image.routes.js";
// import dataRoute from "./Src/Routes/data.routes.js";
import cors from "cors";
import portfolioRoutes from "./Src/Routes/portfolioRoutes.js"
import profileRoutes from "./Src/Routes/profileRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDb();

// Routes
app.use("/auth", authRoutes);

// image routes
app.use("/upload", imageroutes);

// data routes
// app.use("/data", dataRoute);

app.use('/api/portfolios', portfolioRoutes);
app.use("/api", profileRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
