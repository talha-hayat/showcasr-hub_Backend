import mongoose, { Schema, model } from "mongoose";

const loanSchema = new Schema({
  loanType: {
    type: String,
    required: true,
    enum: ['personal', 'business', 'education', 'auto', 'home']
  },
  amount: {
    type: Number,
    required: true,
    min: 10000
  },
  tenure: {
    type: Number,
    required: true,
    min: 6,
    max: 60
  },

  // Personal Info
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true,
    enum: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'AJK']
  },
  postalCode: {
    type: String,
    required: true
  },

  // Financial Info
  employmentStatus: {
    type: String,
    required: true,
    enum: ['salaried', 'self-employed', 'business', 'student', 'unemployed']
  },
  monthlyIncome: {
    type: Number,
    required: true,
    min: 5000
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  agreeTerms: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Loan = model("Loan", loanSchema);

export default Loan;
