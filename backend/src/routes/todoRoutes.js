import express from "express";
import { getTodos, createTodo, deleteTodo, updateTodo, editText } from "../controllers/todoController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', authMiddleware, getTodos);

router.post('/', authMiddleware, createTodo);

router.delete('/:id', authMiddleware, deleteTodo);

router.patch('/:id', authMiddleware, updateTodo);

router.put('/:id', authMiddleware, editText);

export default router