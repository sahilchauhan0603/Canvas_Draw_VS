import express from 'express';
import { config } from "dotenv";    
import cors from 'cors';
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";

// Load environment variables
config({ path: "./config/config.env" });


const app = express();
// Set up CORS
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],   
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Router
app.use("/api/v1/user", userRouter);

//Database connection
connection();
app.use(errorMiddleware);

export default app;
