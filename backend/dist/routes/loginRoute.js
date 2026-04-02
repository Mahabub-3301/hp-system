import { Router } from "express";
import { login } from "../controllers/authController.ts";
import { validateLogin } from "../middlewares/validationMiddleware.ts";
const router = Router();
export default router.get('/', validateLogin, login);
