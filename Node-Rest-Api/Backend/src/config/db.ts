import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
    }
};

export default connectDB;