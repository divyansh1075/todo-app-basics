import express from 'express';
import todoRoutes from './routes/todoRoutes.js';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "https://todo-app-basics-frontend-hswa.onrender.com",
        "http://localhost:5173"
    ]
}));

app.use('/api/todo', todoRoutes);


export default app