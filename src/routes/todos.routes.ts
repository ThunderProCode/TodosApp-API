import { Router } from "express";
import { setTodo, getTodos, deleteTodo, updateTodo, getTodo } from '../controllers/todos.controller';
import { protect } from "../Middleware/auth.middleware";
const todosRouter = Router();


todosRouter.route('/').get(protect,getTodos).post(protect,setTodo);
todosRouter.route('/:id').get(protect,getTodo).delete(protect,deleteTodo).put(protect,updateTodo);

export default todosRouter;