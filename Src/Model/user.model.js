// import mongoose, { Schema, model } from 'mongoose';

import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type : String
    // public_id: { type: String, default: '' },
    // url: { type: String, default: '' }
  },
  otp: {
    code: { type: String, default: null },
    expiresAt: { type: Date, default: null }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const User = model('User', userSchema);

export default User;
