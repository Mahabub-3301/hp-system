import express from 'express';
import type { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


const app: Application = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form submissions
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


import userRoutes from "./routes/userRoutes.ts";
import loginRoute from "./routes/loginRoute.ts";
import registerRoute from "./routes/registerRoute.ts";
import teacherRoutes from "./routes/teacherRoutes.ts";
import mongoose from 'mongoose';


dotenv.config();



// Routes
app.use("/api/users", userRoutes);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/teacher', teacherRoutes);

app.get("/", (req, res) => {
  res.send("Backend running with TypeScript 🚀");
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI
).then(()=>{
    app.listen(PORT,()=>{
        console.log(`app listening at http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
