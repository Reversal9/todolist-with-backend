import express, { Express } from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | 5000 = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(todoRoutes);

const uri: string | undefined = process.env.DB_URL;

if (!uri) {
    throw new Error("DB_URL is not defined in environment variables");
}

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on ${process.env.DB_URL}:${PORT}`),
        ),
    )
    .catch((error) => {
        throw error;
    });
