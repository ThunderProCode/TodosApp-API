import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from "mongoose";
import { IUser } from '../Interfaces/Users.interfaces';

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = expressAsyncHandler(async (req:Request, res: Response) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // Create User
    const user: IUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

// @desc  Authenticate a user
// @route POST /api/users/login
// @access Public
export const loginUser = expressAsyncHandler(async (req:Request, res:Response) => {
    const {email,password} = req.body;
    
    // Check for user email
    const user:IUser | null = await User.findOne({email});
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials');
    }

} )

const generateToken = (id:ObjectId) => {

    let secret: string
    if (process.env.JWT_SECRET) {
        secret = process.env.JWT_SECRET
    } else {
    throw new Error("JWT_SECRET environment variable is not set")
    }

    return jwt.sign({id}, secret, {
        expiresIn: '30d',
    })
}