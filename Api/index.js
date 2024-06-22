import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import responseMiddleware from "./middlewares/responseMiddlewares.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.use(responseMiddleware);
app.use(express.json());
app.use(cookieParser());

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
