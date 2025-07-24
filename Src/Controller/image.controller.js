
export const imageController = async (req, res) => {
    const ImageUrl = req.file.path;
    try {
        message: "Image uploaded successfully",
        ImageUrl
    } catch (error) {
        res.status(500).json({
            message: "Error processing image",
            error: error.message
        });
        
    }
}