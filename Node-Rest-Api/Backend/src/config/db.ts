import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string from environment variables
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        // Log the host of the connected MongoDB instance
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        // Log any errors that occur during connection
        console.log(err);
    }
};

export default connectDB;