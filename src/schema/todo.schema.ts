import { Schema, Document, model } from "mongoose";

export interface Todo_interface extends Document {
    title: string;
    isCompleted: boolean;
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: Date;
    description?: string;
    category: string;
}

const todoSchema = new Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date },
    description: { type: String },
    category: { type: String, default: 'General' }
}, { timestamps: true });

const TodoModel = model<Todo_interface>('task', todoSchema);
export default TodoModel;
