import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.ts";
import loginRoute from "./routes/loginRoute.ts";
import registerRoute from "./routes/registerRoute.ts";
import teacherRoutes from "./routes/teacherRoutes.ts";
import mongoose from 'mongoose';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// Routes
app.use("/api/users", userRoutes);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/teacher', teacherRoutes);
app.get("/", (req, res) => {
    res.send("Backend running with TypeScript 🚀");
});
const MONGO_URI = "mongodb+srv://Meibub:ZfcS7hiH83rWbhkP@cluster0.eqko83n.mongodb.net/HPsystem?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`app listening at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
