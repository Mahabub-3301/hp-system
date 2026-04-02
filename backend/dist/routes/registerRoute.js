import { Router } from "express";
import { register } from "../controllers/authController.ts";
import { validateRegister } from "../middlewares/validationMiddleware.ts";
const router = Router();
router.post('/', validateRegister, register);
export default router;
