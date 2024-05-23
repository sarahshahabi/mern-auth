import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongodb database");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
} catch (err) {
    console.log(err);
}

app.use("/api/user", userRoutes);
