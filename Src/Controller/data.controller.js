import Data from "../Model/data.model.js"

export const createData = async (req, res) => {
    try {
        const data = await Data.create(req.body);
        return res.status(201).json({
            message: "Data created successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the data.",
            error: error.message,
        });
    }
};

export const getAllData = async (req, res) => {
  try {
    const data = await Data.find(); // Fetch data from Mongoose
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDatabyId = async (req, res) => {
  try {
    const id = req.params.id; // Get the data ID from the request parameters
    const data = await Data.findById(id); // Fetch data from Mongoose
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDatabyId = async (req, res) => {
  try {
    const id = req.params.id; // Get the data ID from the request parameters
    const data = await Data.findByIdAndDelete(id); 
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editDatabyId = async (req, res) => {
  try {
    const id = req.params.id; // Get the data ID from the request parameters
    const updatedData = await Data.findByIdAndUpdate(
      id,
      req.body, // Update with data from the request body
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({ message: "Data edited successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};