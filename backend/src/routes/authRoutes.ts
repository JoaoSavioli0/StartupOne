import { Router } from "express";
import { login, logout, register } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

export default authRouter;
