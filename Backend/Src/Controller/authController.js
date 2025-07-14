import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import USER from "../Model/user.model.js";
import bcrypt from "bcrypt"
import User from "../Model/user.model.js";
import nodemailer from "nodemailer";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const signup = async (req, res) => {
  const { profileImage, username, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already in use" });
    }

    // OTP generation 
    const otp = Math.floor(Math.random()*1000)+100000; // Generate a 6-digit OTP

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 1);

    // Create new user
    const newUser = await USER.create({
      profileImage,
      username,
      email,
      password: hashedPassword,
      otp 
    });

    const transformer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Welcome to Our Website</h2>
          <p>Hi there,</p>
          <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
          <h3 style="color: #0056b3;">${otp}</h3>
          <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          <br>
          <p>Regards,<br>Team</p>
        </div>
      `
    };

    // Send OTP email
    await transformer.sendMail(mailOptions);

    return res.status(201).json({
      message: "User created successfully",
      newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error checking...",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
  const userExists = await User.find({ email });
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check OTP
  if (userExists[0].otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  // Update user status to active
  User.isActive = true;

  // User.save()
  User.findOneAndUpdate({ email }, { isActive: true }, { new: true })
    .then(() => {
      console.log("User status updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user status:", error);
    })

  return res.status(201).json({
     message: "Email verified successfully",

  });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "An error occured while verifying OTP" });
    
  }

}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Sign JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
