import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import responseMiddleware from "./middlewares/responseMiddlewares.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(responseMiddleware);
app.use(express.json());
app.use(cookieParser())

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
app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Server internal error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
