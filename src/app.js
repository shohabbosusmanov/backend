import "dotenv/config";
import express from "express";
import Routes from "./routes/routes.js";
import db from "./config/db-config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
    cors({
        origin: ["https://shopcoreact.netlify.app"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With, Cookie"
    );
    res.sendStatus(200);
});

app.use(cookieParser());
app.use(express.json());
app.use("/api", Routes());

const initApp = async () => {
    try {
        await db.connect();

        console.log("database connected");

        app.listen(PORT, console.log("server is running port: ", PORT));
    } catch (error) {
        console.error(error.message);

        process.exit(1);
    }
};

initApp();
