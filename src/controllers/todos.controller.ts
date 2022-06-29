import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Todo from '../models/todo.model';

// @desc    Get Specific Todo
// @route   GET /api/todos/:id
// @access  Private
export const getTodo = expressAsyncHandler( async (req:Request, res:Response) => {
    
    // Check for user
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    const todo = await Todo.findById(req.params.id); 
    if(!todo){
        res.status(400)
        throw new Error('Todo not found')
    }

     // Make sure the logged in user matches the Todo user
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(todo.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized');
    }


    res.status(200).json(todo);
} )


// @desc    Get Todos
// @route   GET /api/todos
// @access  Private
export const getTodos = expressAsyncHandler( async (req:any, res:Response) => {
    // Check for user
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    const todos = await Todo.find({ user: req.user.id });
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user: req.user.id
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

    // Check for user
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the Todo user
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(todo.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized');
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

    // Check for user
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(!req.user){
        res.status(401)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the Todo User
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(todo.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized');
    }

    todo.remove();
    res.status(200).json({ id: req.params.id });
})
