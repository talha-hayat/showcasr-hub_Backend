import Loan from "../Model/Loan.model.js";

/**
 * @desc Create new loan application
 * @route POST /api/loans
 */
export const createLoan = async (req, res) => {
  try {
    const loan = new Loan(req.body);

    await loan.save();

    res.status(201).json({
      message: "Loan application submitted successfully",
      loan
    });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(400).json({
      message: "Failed to submit loan application",
      error: error.message
    });
  }
};

/**
 * @desc Get all loan applications
 * @route GET /api/loans
 */
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ createdAt: -1 });

    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({
      message: "Failed to fetch loans",
      error: error.message
    });
  }
};

/**
 * @desc Get single loan by ID
 * @route GET /api/loans/:id
 */
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    console.error("Error fetching loan:", error);
    res.status(500).json({
      message: "Failed to fetch loan",
      error: error.message
    });
  }
};

/**
 * @desc Update loan status (approve/reject)
 * @route PATCH /api/loans/:id/status
 */
export const updateLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({
      message: `Loan status updated to ${status}`,
      loan
    });
  } catch (error) {
    console.error("Error updating loan status:", error);
    res.status(500).json({
      message: "Failed to update loan status",
      error: error.message
    });
  }
};

/**
 * @desc Delete loan application
 * @route DELETE /api/loans/:id
 */
export const deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({
      message: "Loan deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting loan:", error);
    res.status(500).json({
      message: "Failed to delete loan",
      error: error.message
    });
  }
};
