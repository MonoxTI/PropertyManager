import express from 'express';
import dotenv from 'dotenv';

import router from './Router/PropRoutes.js';
import connectDB from './config/mogodb.js';

dotenv.config();
const app = express();
const port = process.env.port || 4000;

connectDB();

app.use(express.json());
app.use('/api',router)
app.listen(port, ()=> console.log(`localhost:${port}`))