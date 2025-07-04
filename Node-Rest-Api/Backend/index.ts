import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
dotenv.config();
const app = express();
const PORT = process.env.PORT ;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();




app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});