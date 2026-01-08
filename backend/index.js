import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv"
import { connectDb } from "./config/config.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

// dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDb();

// Connecting cors frontend and backend
// const allowedOrigins = process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(",") : [];
// app.use(cors({
//     origin: (origin, callback) => {
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.includes(origin)){
//             return callback(null, true);
//         }

//         return callback(new Error("CORS policy blocked the request from this origin: ",origin))
//     }
// }))

app.use(cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Routes connection
app.post("/__health", (req, res) => {
  res.send("HEALTH OK");
});

app.use("/api/users", userRoutes);


app.listen(process.env.PORT, () => console.log("back end listening at :",process.env.PORT ))