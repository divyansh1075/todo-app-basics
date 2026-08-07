import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
    origin: [
        "https://todo-app-basics-frontend-hswa.onrender.com",
        "http://localhost:5173",
        "https://todo-app-basics.vercel.app"
    ]
}));

app.use('/api/todo', todoRoutes);
app.use('/api/auth', authRoutes);


export default app