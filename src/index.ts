import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';
import todosRouter from './routes/todos.routes';
import usersRouter from './routes/user.routes';
import { errorHandler } from './Middleware/error.middleware';

const app: Express = express();
const port = process.env.PORT;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
















 