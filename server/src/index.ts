//* libraries and packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"
dotenv.config();
import cookieParser from "cookie-parser";
import { env } from "./configs/env.config";
import { connectDb } from "./configs/db.config";
import { auth } from "./routes/index.route";
import { task } from "./routes/task.route";
import { errorHandler } from "./middlewares/error-catch";

const app = express();
app.use(
  cors({
    origin: env.CLIENT_ORIGIN_LOCAL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
       allowedHeaders: ['Content-Type', 'Authorization'],
   
  }) 
);
app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));



app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",auth)
app.use("/api/task",task)

connectDb();
     

app.use(errorHandler);
app.listen(env.PORT, () => console.log(`Server started at ${env.PORT} `));

  