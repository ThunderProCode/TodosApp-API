import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

export const protect = expressAsyncHandler( async(req:Request, res:Response, next:NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //Verify token

            let secret: string
            if (process.env.JWT_SECRET) {
                secret = process.env.JWT_SECRET
            } else {
            throw new Error("JWT_SECRET environment variable is not set")
            }

            const decoded = jwt.verify(token, secret);

            //Get user from the token
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.user = await User.findById(decoded.id).select('-password');
            
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized');
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Now Authorized, no token');
    }
    
})
