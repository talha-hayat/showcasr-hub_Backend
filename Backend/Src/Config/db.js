import mongoose from "mongoose";    

const connectDb  = ()=>{
    try {
        const db = mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDb is connected");
    } catch (error) {
        console.log("mongoDb is not connected", error.message);
    }
}

export default connectDb 