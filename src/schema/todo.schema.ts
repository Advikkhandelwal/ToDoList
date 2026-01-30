import { Schema,Document,model } from "mongoose";
export interface Todo_interface extends Document{
    title:string;
}
const todoSchema=new Schema({title:{type:String,required:true}})
const TodoModel=model<Todo_interface>('task',todoSchema)
export default TodoModel
