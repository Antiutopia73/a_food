import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from './error/error.js';
import reservationRouter from './routes/reservationRoute.js';
import commentRouter from './routes/commentRoutes.js';

const app = express();
dotenv.config({ path: './config/config.env' });

 // Исправлено

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservationRouter);
app.use('/api/v1/comments', commentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
