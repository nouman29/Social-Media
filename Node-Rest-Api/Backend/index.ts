import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import morgan from "morgan";
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/auth";
import postRoutes from "./src/routes/postRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkAuth from "./src/middleware/check";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing (CORS) for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies to be sent
}));

// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json());

// Parse cookies from incoming requests (required for JWT cookies)
app.use(cookieParser());

// Log HTTP requests using morgan middleware
app.use(morgan("common"));

// Parse URL-encoded data with the querystring library
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Define routes for different parts of the application
// Note: Auth middleware should be applied individually to protected routes, not globally
app.use("/api/users", checkAuth, userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", checkAuth, postRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});