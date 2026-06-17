import express from 'express';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/todo', todoRoutes);


export default app
