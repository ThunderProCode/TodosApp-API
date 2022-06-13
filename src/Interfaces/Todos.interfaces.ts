import { IUser } from './Users.interfaces';
export interface ITodo {
    user: IUser;
    text: string;
    completed: boolean;
}