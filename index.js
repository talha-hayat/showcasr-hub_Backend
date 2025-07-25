import express from "express";
import connectDb from "./Src/Config/db.js";
import dotenv from "dotenv";
import authRoutes from "./Src/Routes/authroutes.js";
import imageroutes from "./Src/Routes/image.routes.js";
import dataRoute from "./Src/Routes/data.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDb();

// Routes
app.use("/api", authRoutes);

// image routes
app.use("/upload", imageroutes);

// data routes
app.use("/data", dataRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from "express"
// import connectDb from "./Src/Config/db.js"
// import dotenv from "dotenv";
// import authRoutes from "./Src/Routes/authroutes.js";
// import loanRoutes  from "./Src/Routes/loanRoute.js";
// import imageroutes from "./Src/Routes/image.routes.js";
// import cors from "cors";
// import productRoute from "./Src/Routes/product.route.js" 

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors())

// // Connect to MongoDB
// connectDb()

// // Routes
// app.use("/api", authRoutes);
// // Loan routes
// app.use("/api/loans", loanRoutes);
// // image routes
// app.use("/upload", imageroutes);
// // create product route
// app.use("/products", productRoute);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
