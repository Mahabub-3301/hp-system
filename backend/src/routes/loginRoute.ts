import { Router } from "express";
import { login } from "../controllers/authController.ts";
import { validateLogin } from "../middlewares/validationMiddleware.ts";

const router = Router();


router.post('/',validateLogin,login);

export default router;

