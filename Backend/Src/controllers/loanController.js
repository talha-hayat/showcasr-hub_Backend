import Loan from '../Model/Loan.model.js';

// Create new loan
export const createLoan = async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all loans (Admin only)
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single loan
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update loan status (Admin only)
export const updateLoanStatus = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.status = req.body.status;
    await loan.save();

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete loan (Admin only)
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};