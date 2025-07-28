import AuthService from "../services/auth.service.js";

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async register(req, res) {
        try {
            const result = await this.authService.register(req.body);
            res.cookie("token", result.token, {
                sameSite: "lax",
                httpOnly: true,
                maxAge: 2 * 3600 * 1000,
                path: "/",
                secure: true,
            });
            res.status(201).json(result);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const result = await this.authService.login(
                req.body.email,
                req.body.password
            );

            res.cookie("token", result.token, {
                sameSite: "lax",
                httpOnly: true,
                maxAge: 2 * 3600 * 1000,
                path: "/",
                secure: true,
            });

            res.status(200).json(result);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
}
