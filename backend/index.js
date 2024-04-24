import express from "express";
import cors from 'cors';
import { dbConnnect } from './config/dbConfig.js';
import blogRoutes from './routes/blog.routes.js';
import { configDotenv } from "dotenv";

configDotenv();
dbConnnect();

const app = express();
app.use(express.json());
app.use(cors());



app.use("/blogs", blogRoutes);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => [
    console.log(`server running on port ${PORT}`)
])
