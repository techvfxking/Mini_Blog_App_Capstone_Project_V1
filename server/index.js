import express from "express";
import * as dotenv from "dotenv";
import * as colors from "colors";
import cors from "cors";
import defaultRouter from "./routes/defaultRoute.js";
import connectMongoDB from "./configs/connectMongoDB.js";

dotenv.config();

connectMongoDB();

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log(`Server has started on http://localhost:${PORT}`.bgMagenta));

app.use(defaultRouter);