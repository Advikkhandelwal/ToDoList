import { Schema,Document,model } from "mongoose";
export interface Todo_interface extends Document{
    title:String;
}
const todoSchema=new Schema({title:String})
const TodoModel=model('task',todoSchema)
export default TodoModel
