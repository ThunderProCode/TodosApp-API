import express, { Express, Request, Response  } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';

const app: Express = express();
const port = process.env.PORT;

connectDB();
app.get('/', (req:Request, res: Response) => {
    res.send('Api for TODO APP');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})


