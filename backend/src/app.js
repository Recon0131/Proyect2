import express from 'express';
import morgan from 'morgan';
import {connectDB} from './db.js';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { FRONTEND_URL } from "./config.js";

const app = express(); 


connectDB();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());

app.use(cookieParser());

app.use('/api',authRoutes);


export default app;