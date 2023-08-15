import express, {Express} from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 5000;

app.use(todoRoutes);

const uri: string = `mongodb://127.0.0.1:27017`;

mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    });