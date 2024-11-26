import { Router } from 'express';
import { login, register, logout, profile } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validateToken.js'; // Ensure this is used

const router = Router();

router.post("/api/register", validateSchema(RegisterSchema), register);
router.post("/api/login", validateSchema(LoginSchema), login);
router.post("/api/logout", logout);
router.get("/api/profile", authRequired, profile); // Use authRequired middleware

export default router;
