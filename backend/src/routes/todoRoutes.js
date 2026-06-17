import express from "express";
import { getTodos, createTodo, deleteTodo, updateTodo, editText } from "../controllers/todoController.js";

const router = express.Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.delete('/:id', deleteTodo);

router.patch('/:id', updateTodo);

router.put('/:id', editText);

export default router