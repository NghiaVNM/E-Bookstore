import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import express, { Router } from 'express';
import cors from 'cors';
import bookRouter from './router/book.router.js';
import userRouter from './router/user.router.js';
import orderRouter from './router/order.router.js';
import uploadRouter from './router/upload.router.js';

import {dbconnect} from './config/database.config.js';
import path, { dirname } from 'path';
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
    })
);

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
    const indexFilePath = path.join(publicFolder, 'index.html');
    res.sendFile(indexFilePath);
  });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);

});
