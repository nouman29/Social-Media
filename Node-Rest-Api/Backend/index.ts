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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/users", checkAuth, userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", checkAuth, postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});