import { Router } from "express";
import { setTodo, getTodos, deleteTodo, updateTodo } from '../controllers/todos.controller';
const todosRouter = Router();


todosRouter.route('/').get(getTodos).post(setTodo);
todosRouter.route('/:id').delete(deleteTodo).put(updateTodo);

export default todosRouter;