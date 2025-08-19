import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Router/PropRoutes.js';
import connectDB from './config/mogodb.js';

dotenv.config();
const app = express();
const port = process.env.port || 4000;
app.use(cors({
    origin: 'http://localhost:5173'
}))

connectDB();

app.use(express.json());
app.use('/api',router)
app.listen(port, ()=> console.log(`localhost:${port}`))