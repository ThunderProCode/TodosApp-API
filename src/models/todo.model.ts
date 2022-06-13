import { Schema, model } from "mongoose";
import { ITodo } from "../Interfaces/Todos.interfaces";

const todoSchema = new Schema<ITodo>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            red: 'User'
        },
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

export default model<ITodo>('Todo', todoSchema);
