import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Todo from '../models/todo.model';

// @desc    Get Todos
// @route   GET /api/todos
// @access  Private
export const getTodos = expressAsyncHandler( async (req:Request, res:Response) => {
    const todos = await Todo.find();
    res.status(200).json(todos);
} )


// @desc    Set Todos
// @route   POST /api/todos
// @access  Private
export const setTodo = expressAsyncHandler(async (req:Request, res:Response) => {
    
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }

    const todo = await Todo.create({
        text: req.body.text,
    })
    res.status(200).json(todo);
})

// @desc    Update Todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = expressAsyncHandler( async (req:Request,res:Response) => {
    const todo = await Todo.findById(req.params.id); 
    if(!todo){
        res.status(400)
        throw new Error('Todo not found')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTodo);

} )

// @desc    Delete Todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = expressAsyncHandler( async(req:Request, res:Response) => {
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        res.status(400)
        throw new Error('Todo not found')
    }
    todo.remove();
    res.status(200).json({ id: req.params.id });
})
