import path from 'path';
import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';
import todosRouter from './routes/todos.routes';
import usersRouter from './routes/user.routes';
import { errorHandler } from './Middleware/error.middleware';
const cors= require("cors");

const port = process.env.PORT;

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

connectDB();
const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../TodoApp/dist')));
    
    app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../../', 'TodoApp', 'dist', 'index.html')
        )
        );
    } else {
        app.get('/', (req, res) => res.send('Please set to production'));
    }
    
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})
















 