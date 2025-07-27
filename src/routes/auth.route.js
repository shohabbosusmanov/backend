import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const AuthRouter = Router();

const controller = new AuthController();

AuthRouter.post("/auth/register", (req, res) => controller.register(req, res));
AuthRouter.post("/auth/login", (req, res) => controller.login(req, res));

export default AuthRouter;
