import { Router } from "express";
import { register } from "../controllers/authController";
import { validateRegister } from "../middlewares/validationMiddleware";
const router = Router();
router.post('/', validateRegister, register);
export default router;
