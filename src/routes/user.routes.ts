import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
const usersRouter = Router();

usersRouter.post('/', registerUser);
usersRouter.post('/login', loginUser);

export default usersRouter;