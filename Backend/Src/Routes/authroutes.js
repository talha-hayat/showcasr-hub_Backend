import express from "express";
import { signup, login, verifyOtp } from "../Controller/authController.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/verify-otp", verifyOtp)

export default route;
