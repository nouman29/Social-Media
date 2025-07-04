import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import morgan from "morgan";
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/auth";


dotenv.config();
const app = express();
const PORT = process.env.PORT ;
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
connectDB();




app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});