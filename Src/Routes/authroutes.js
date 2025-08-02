import express from "express";
import { signup, login, verifyOtp, getProfile, updateProfile, changePassword } from "../Controller/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/verify-otp", verifyOtp);
route.get("/me", verifyToken, getProfile);
route.put("/me", verifyToken, updateProfile);
route.put("/me/password", verifyToken, changePassword);

export default route;