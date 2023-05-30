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

const server = app.listen(PORT, () => {
    const address = server.address();
    const host = address.address === '::' ? 'localhost' : address.address;
    const port = address.port;

    console.log(`Server is running at http://${host}:${port}`.bgMagenta);
});

app.use(defaultRouter);