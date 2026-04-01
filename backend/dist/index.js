import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes";
import loginRoute from "./routes/loginRoute";
import registerRoute from "./routes/registerRoute";
import teacherRoutes from "./routes/teacherRoutes";
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
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
