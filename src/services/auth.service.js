import CustomError from "../utils/customError.js";
import DatabaseService from "./database.service.js";
import bcrypt from "bcrypt";
import JwtService from "./jwt.service.js";

export default class AuthService {
    constructor() {
        this.databaseService = new DatabaseService();

        this.jwtService = new JwtService();
    }
    async register(user_data) {
        const findEmail = await this.databaseService.findUserEmail({
            email: user_data.email,
        });

        if (findEmail)
            throw new CustomError(
                "Bu email manzil allaqachon ro'yxatdan o'tgan",
                409
            );

        const hashedPassword = await bcrypt.hash(user_data.password, 12);

        const user = await this.databaseService.createUser({
            ...user_data,
            password: hashedPassword,
        });

        const token = this.jwtService.generateToken(user.id);

        return {
            success: true,
            message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
            token,
            data: user.email,
        };
    }

    async login(email, password) {
        const findUser = await this.databaseService.findUserEmail({ email });

        if (!findUser)
            throw new CustomError("Noto'g'ri login ma'lumotlari", 401);

        try {
            const comparePassword = await bcrypt.compare(
                password,
                findUser.password
            );

            if (!comparePassword)
                throw new CustomError("Noto'g'ri login ma'lumotlari", 401);

            const token = this.jwtService.generateToken(findUser.id);

            return {
                success: true,
                message: "Muvaffaqiyatli tizimga kirdingiz",
                token,
                data: findUser.email,
            };
        } catch (error) {
            throw new CustomError(error.message, 401);
        }
    }
}
