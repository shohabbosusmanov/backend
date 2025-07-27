import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

export default class JwtService {
    generateToken(userId) {
        try {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
                expiresIn: "2h",
            });

            return token;
        } catch (error) {
            throw new CustomError("token yaratishda xatolik", 500);
        }
    }
    verifyToken(token) {
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET_KEY);

            return result;
        } catch (error) {
            throw new CustomError("token eskirgan yoki noto'gri", 400);
        }
    }
}
